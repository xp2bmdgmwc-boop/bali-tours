import os
import glob

html_files = glob.glob("**/*.html", recursive=True)
meta_tag = '<meta name="robots" content="noindex, nofollow, noarchive" />'

for filePath in html_files:
    with open(filePath, "r", encoding="utf-8") as f:
        content = f.read()

    if meta_tag in content:
        content = content.replace(meta_tag, '')
        with open(filePath, "w", encoding="utf-8") as f:
            f.write(content)

print(f"Removed noindex from {len(html_files)} HTML files.")
