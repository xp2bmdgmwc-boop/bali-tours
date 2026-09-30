#!/usr/bin/env python3
"""Local image generation for Bali Tours: Gemini for tests, OpenAI for finals.

Keys are read at call time from ~/.config/archi_art/{openai,gemini}_key and are never printed,
logged or stored. Every generating call must carry --approved-usd (the amount the owner agreed
to), and OpenAI calls are also checked against a monthly ledger with a $5 cap.

  imagegen.py models                       free: list image models each key can see
  imagegen.py ledger                       show this month's recorded spend
  imagegen.py gemini --name N --prompt-file F --aspect 16:9 --approved-usd 0.14 [--n 2] [--ref IMG]
  imagegen.py openai --name N --prompt-file F --size 1536x1024 --quality high --approved-usd 0.17
  add --dry-run to any generating call to see the plan and cost without reading a key
"""
import argparse
import base64
import datetime
import json
import mimetypes
import os
import re
import sys
import urllib.error
import urllib.request
import uuid

KEY_DIR = os.path.expanduser("~/.config/archi_art")
LEDGER = os.path.join(KEY_DIR, "spend_ledger.json")
DEFAULT_OUT = "/Volumes/Genius Art/Авторские Туры/_Bali/Swiss_Deck_Photos/_ai_tests"
OPENAI_MONTHLY_CAP = 5.0
OPENAI_URL = "https://api.openai.com/v1"
GEMINI_URL = "https://generativelanguage.googleapis.com/v1beta"
DEFAULT_OPENAI_MODEL = "gpt-image-2.5-sunburst"
DEFAULT_GEMINI_MODEL = "gemini-3.1-flash-image"
OPENAI_EST = {"low": 0.005, "medium": 0.041, "high": 0.165}
GEMINI_EST = 0.067


class ApiError(Exception):
    def __init__(self, code, body):
        Exception.__init__(self, "HTTP %s: %s" % (code, body))
        self.code = code
        self.body = body


def redact(text, key):
    if key:
        text = text.replace(key, "***")
    text = re.sub(r"sk-[A-Za-z0-9_\-]{6}[A-Za-z0-9_\-*.]*", "sk-***", text)
    text = re.sub(r"AIza[0-9A-Za-z_\-]{6}[0-9A-Za-z_\-]*", "AIza***", text)
    return text


def load_key(name):
    path = os.path.join(KEY_DIR, name + "_key")
    if not os.path.exists(path):
        sys.exit("no key file: %s" % path)
    if os.stat(path).st_mode & 0o077:
        sys.exit("key file is readable by others, run: chmod 600 %s" % path)
    with open(path) as f:
        key = f.read().strip()
    if not key:
        sys.exit("key file is empty: %s" % path)
    return key


def http(url, key, headers, data=None, content_type=None, timeout=300):
    hdrs = dict(headers)
    if content_type:
        hdrs["Content-Type"] = content_type
    req = urllib.request.Request(url, data=data, headers=hdrs)
    try:
        with urllib.request.urlopen(req, timeout=timeout) as resp:
            return json.loads(resp.read().decode("utf-8"))
    except urllib.error.HTTPError as e:
        raise ApiError(e.code, redact(e.read().decode("utf-8", "replace")[:1200], key))
    except urllib.error.URLError as e:
        raise ApiError(0, redact(str(e.reason), key))


def multipart(fields, files):
    boundary = "----bali" + uuid.uuid4().hex
    body = b""
    for k, v in fields.items():
        body += ('--%s\r\nContent-Disposition: form-data; name="%s"\r\n\r\n%s\r\n' % (boundary, k, v)).encode("utf-8")
    for i, (k, path) in enumerate(files):
        ext = os.path.splitext(path)[1].lower() or ".png"
        mime = mimetypes.guess_type(path)[0] or "image/png"
        with open(path, "rb") as f:
            blob = f.read()
        head = '--%s\r\nContent-Disposition: form-data; name="%s"; filename="ref%d%s"\r\nContent-Type: %s\r\n\r\n' % (boundary, k, i, ext, mime)
        body += head.encode("utf-8") + blob + b"\r\n"
    body += ("--%s--\r\n" % boundary).encode("utf-8")
    return "multipart/form-data; boundary=" + boundary, body


def ledger_load():
    month = datetime.date.today().strftime("%Y-%m")
    try:
        with open(LEDGER) as f:
            data = json.load(f)
    except (IOError, ValueError):
        data = {}
    if data.get("month") != month:
        data = {"month": month, "openai_usd": 0.0, "gemini_usd": 0.0, "log": []}
    return data


def ledger_add(provider, usd, note):
    data = ledger_load()
    data[provider + "_usd"] = round(data.get(provider + "_usd", 0.0) + usd, 4)
    data["log"].append({"at": datetime.datetime.now().isoformat(timespec="seconds"), "provider": provider, "usd": round(usd, 4), "note": note})
    os.makedirs(KEY_DIR, exist_ok=True)
    fd = os.open(LEDGER, os.O_WRONLY | os.O_CREAT | os.O_TRUNC, 0o600)
    with os.fdopen(fd, "w") as f:
        json.dump(data, f, ensure_ascii=False, indent=1)


def ext_for(blob):
    if blob[:8] == b"\x89PNG\r\n\x1a\n":
        return "png"
    if blob[:3] == b"\xff\xd8\xff":
        return "jpg"
    if blob[:4] == b"RIFF" and blob[8:12] == b"WEBP":
        return "webp"
    return "bin"


def save_image(blob, out_dir, name, provider):
    os.makedirs(out_dir, exist_ok=True)
    idx = 1
    while any(os.path.exists(os.path.join(out_dir, "%s_%s_%d.%s" % (name, provider, idx, e))) for e in ("png", "jpg", "webp", "bin")):
        idx += 1
    path = os.path.join(out_dir, "%s_%s_%d.%s" % (name, provider, idx, ext_for(blob)))
    with open(path, "wb") as f:
        f.write(blob)
    return path


def read_prompt(a):
    if a.prompt_file:
        with open(a.prompt_file, encoding="utf-8") as f:
            return f.read().strip()
    if a.prompt:
        return a.prompt.strip()
    sys.exit("give --prompt or --prompt-file")


def plan_and_guard(a, provider, per_image):
    total = a.n * per_image
    print("plan: %s | model %s | %d image(s) | about $%.3f each, $%.3f total" % (provider, a.model, a.n, per_image, total))
    if provider == "openai":
        spent = ledger_load().get("openai_usd", 0.0)
        print("openai recorded this month: $%.2f of $%.2f cap (only this script's runs are counted)" % (spent, OPENAI_MONTHLY_CAP))
    if a.dry_run:
        print("dry run: nothing sent, no key read")
        return None
    if a.approved_usd is None or a.approved_usd + 1e-9 < total:
        sys.exit("refusing: this run costs about $%.3f. Ask the owner, then pass --approved-usd %.2f" % (total, total))
    if provider == "openai" and ledger_load().get("openai_usd", 0.0) + total > OPENAI_MONTHLY_CAP + 1e-9:
        sys.exit("refusing: would pass the $%.2f monthly OpenAI cap" % OPENAI_MONTHLY_CAP)
    return total


def cmd_models(a):
    for provider, name in (("openai", "openai"), ("gemini", "gemini")):
        key = load_key(name)
        try:
            if provider == "openai":
                res = http(OPENAI_URL + "/models", key, {"Authorization": "Bearer " + key}, timeout=60)
                ids = sorted(m["id"] for m in res.get("data", []) if "image" in m["id"])
            else:
                ids, token = [], ""
                for _ in range(6):
                    url = GEMINI_URL + "/models?pageSize=200" + ("&pageToken=" + token if token else "")
                    res = http(url, key, {"x-goog-api-key": key}, timeout=60)
                    ids += [m["name"].replace("models/", "") for m in res.get("models", []) if "image" in m["name"]]
                    token = res.get("nextPageToken", "")
                    if not token:
                        break
                ids.sort()
            print("%s: key works, %d image model(s)" % (provider, len(ids)))
            for i in ids:
                print("  " + i)
        except ApiError as e:
            print("%s: %s" % (provider, e))


def cmd_ledger(a):
    d = ledger_load()
    print("month %s: openai $%.2f of $%.2f, gemini $%.2f (recorded estimates, not the provider's bill)" % (d["month"], d.get("openai_usd", 0.0), OPENAI_MONTHLY_CAP, d.get("gemini_usd", 0.0)))


def guess_mime(path):
    return mimetypes.guess_type(path)[0] or "image/png"


def cmd_gemini(a):
    prompt = read_prompt(a)
    total = plan_and_guard(a, "gemini", a.est if a.est is not None else GEMINI_EST)
    if total is None:
        return
    key = load_key("gemini")
    parts = [{"text": prompt}]
    for r in a.ref:
        with open(r, "rb") as f:
            parts.append({"inline_data": {"mime_type": guess_mime(r), "data": base64.b64encode(f.read()).decode("ascii")}})
    url = "%s/models/%s:generateContent" % (GEMINI_URL, a.model)
    got, spent = 0, 0.0
    for n in range(a.n):
        cfg = {"responseModalities": ["IMAGE"]}
        if a.aspect:
            cfg["imageConfig"] = {"aspectRatio": a.aspect}
        for attempt in range(3):
            body = json.dumps({"contents": [{"parts": parts}], "generationConfig": cfg}).encode("utf-8")
            try:
                res = http(url, key, {"x-goog-api-key": key}, body, "application/json")
                break
            except ApiError as e:
                low = e.body.lower()
                if e.code == 400 and "imageconfig" in low and "imageConfig" in cfg:
                    cfg.pop("imageConfig")
                    parts[0]["text"] = prompt + " Aspect ratio " + a.aspect + "."
                elif e.code == 400 and "modalit" in low and cfg["responseModalities"] == ["IMAGE"]:
                    cfg["responseModalities"] = ["TEXT", "IMAGE"]
                else:
                    sys.exit(str(e))
        else:
            sys.exit("gemini: gave up after retries")
        blobs, notes = [], []
        for c in res.get("candidates", []):
            for p in c.get("content", {}).get("parts", []):
                d = p.get("inlineData") or p.get("inline_data")
                if d and d.get("data"):
                    blobs.append(base64.b64decode(d["data"]))
                elif p.get("text"):
                    notes.append(p["text"][:200])
            if c.get("finishReason") not in (None, "STOP"):
                notes.append("finishReason=" + str(c.get("finishReason")))
        if not blobs:
            print("no image in response %d. %s %s" % (n + 1, " | ".join(notes), json.dumps(res.get("promptFeedback", {}))[:300]))
            continue
        for blob in blobs:
            print("saved " + save_image(blob, a.out, a.name, "gemini"))
            got += 1
            spent += a.est if a.est is not None else GEMINI_EST
        u = res.get("usageMetadata", {})
        print("tokens: prompt %s, output %s" % (u.get("promptTokenCount"), u.get("candidatesTokenCount")))
    if spent:
        ledger_add("gemini", spent, "%s x%d" % (a.name, got))
    print("done: %d image(s), recorded about $%.3f" % (got, spent))


def cmd_openai(a):
    prompt = read_prompt(a)
    if a.ref and a.est is None:
        sys.exit("edits with reference images need an explicit --est (input image tokens add to the price)")
    per_image = a.est if a.est is not None else OPENAI_EST.get(a.quality, 0.165)
    total = plan_and_guard(a, "openai", per_image)
    if total is None:
        return
    key = load_key("openai")
    auth = {"Authorization": "Bearer " + key}
    try:
        if a.ref:
            fields = {"model": a.model, "prompt": prompt, "size": a.size, "quality": a.quality, "n": str(a.n)}
            ctype, body = multipart(fields, [("image[]", r) for r in a.ref])
            res = http(OPENAI_URL + "/images/edits", key, auth, body, ctype)
        else:
            body = json.dumps({"model": a.model, "prompt": prompt, "size": a.size, "quality": a.quality, "n": a.n}).encode("utf-8")
            res = http(OPENAI_URL + "/images/generations", key, auth, body, "application/json")
    except ApiError as e:
        sys.exit(str(e))
    blobs = [base64.b64decode(d["b64_json"]) for d in res.get("data", []) if d.get("b64_json")]
    if not blobs:
        sys.exit("no image in response: " + redact(json.dumps(res)[:300], key))
    for blob in blobs:
        print("saved " + save_image(blob, a.out, a.name, "openai"))
    spent = per_image * len(blobs)
    ledger_add("openai", spent, "%s x%d %s" % (a.name, len(blobs), a.quality))
    print("usage:", json.dumps(res.get("usage", {})))
    print("done: %d image(s), recorded about $%.3f" % (len(blobs), spent))


def main():
    ap = argparse.ArgumentParser(description=__doc__, formatter_class=argparse.RawDescriptionHelpFormatter)
    sub = ap.add_subparsers(dest="cmd", required=True)
    sub.add_parser("models").set_defaults(fn=cmd_models)
    sub.add_parser("ledger").set_defaults(fn=cmd_ledger)
    for name, fn, model in (("gemini", cmd_gemini, DEFAULT_GEMINI_MODEL), ("openai", cmd_openai, DEFAULT_OPENAI_MODEL)):
        p = sub.add_parser(name)
        p.add_argument("--name", required=True, help="base file name, e.g. ai_d1_villa")
        p.add_argument("--prompt")
        p.add_argument("--prompt-file")
        p.add_argument("--ref", action="append", default=[], help="reference image (repeatable)")
        p.add_argument("--n", type=int, default=1)
        p.add_argument("--out", default=DEFAULT_OUT)
        p.add_argument("--model", default=model)
        p.add_argument("--est", type=float, help="USD per image, overrides the built-in estimate")
        p.add_argument("--approved-usd", type=float, help="amount the owner agreed to for this run")
        p.add_argument("--dry-run", action="store_true")
        if name == "gemini":
            p.add_argument("--aspect", help='for example "16:9"')
        else:
            p.add_argument("--size", default="1536x1024")
            p.add_argument("--quality", default="high", choices=["low", "medium", "high"])
        p.set_defaults(fn=fn)
    args = ap.parse_args()
    args.fn(args)


if __name__ == "__main__":
    main()
