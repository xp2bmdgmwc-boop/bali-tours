#target indesign
// Builds the Bali deck (7-day sample route, two places per slide) for the Swiss guests and exports the PDF.
// A file named ai_*.jpg in the photo folder replaces its fallback photo (see AI_SLOTS.md there).

var DOC_NAME = "Bali_7_Days_Switzerland_v4.indd";
var PDF_NAME = "Бали 7 дней - Валерий Латыпов v4.pdf";
var PH = "/Volumes/Genius Art/Авторские Туры/_Bali/Swiss_Deck_Photos/";
var BACKUP_DIR = "/Volumes/Genius Art/Antigravity/archives/Bali_Tours_Print_and_Design/backups";
var LOG_PATH = "/Volumes/Genius Art/Antigravity/Bali Tours/scripts/logs/build_swiss_deck_log.txt";
var W = 1920, H = 1080;
var logLines = [];
function log(s) { logLines.push(s); }

function pad2(n) { return (n < 10 ? "0" : "") + n; }
function stamp() {
    var d = new Date();
    return d.getFullYear() + pad2(d.getMonth() + 1) + pad2(d.getDate()) + "_" + pad2(d.getHours()) + pad2(d.getMinutes());
}
function backupName(name) {
    var m = name.match(/^(.*)(\.[^.]+)$/);
    return BACKUP_DIR + "/" + m[1] + "_" + stamp() + m[2];
}
function haveFile(name) { return new File(PH + name).exists; }
function pick(aiName, fallbackName) {
    if (haveFile(aiName)) { log("AI image used: " + aiName); return aiName; }
    log("AI image missing, fallback: " + fallbackName + " (wanted " + aiName + ")");
    return fallbackName;
}

function nb(s) {
    var w = "в|во|и|к|ко|с|со|у|о|об|а|я|на|по|до|за|из|от|не|но|для|без|при|про|над|под|В|Во|И|К|Ко|С|Со|У|О|Об|А|Я|На|По|До|За|Из|От|Не|Но|Для|Без|При|Про|Над|Под";
    var re = new RegExp("(^|[\\s«( ])(" + w + ") ", "g");
    s = s.replace(re, "$1$2 ");
    s = s.replace(re, "$1$2 ");
    s = s.replace(/(\d) (?=\S)/g, "$1 ");
    return s;
}

function main() {
    var bdir = new Folder(BACKUP_DIR);
    if (!bdir.exists) bdir.create();
    for (var i = app.documents.length - 1; i >= 0; i--) {
        var od = app.documents[i];
        if (od.name == DOC_NAME) {
            if (od.modified) { od.saveACopy(new File(backupName(DOC_NAME))); log("Open unsaved copy of " + DOC_NAME + " backed up"); }
            od.close(SaveOptions.NO);
        }
    }
    var target = new File(Folder.desktop.fsName + "/" + DOC_NAME);
    if (target.exists) { target.copy(backupName(DOC_NAME)); log("Previous " + DOC_NAME + " backed up"); }

    var haveInvite = haveFile("ai_invite_ladies.jpg");
    var doc = app.documents.add(true);
    with (doc.documentPreferences) {
        intent = DocumentIntentOptions.WEB_INTENT;
        facingPages = false;
        pageWidth = W;
        pageHeight = H;
        pagesPerDocument = 18;
    }
    doc.viewPreferences.horizontalMeasurementUnits = MeasurementUnits.POINTS;
    doc.viewPreferences.verticalMeasurementUnits = MeasurementUnits.POINTS;
    doc.viewPreferences.rulerOrigin = RulerOrigin.PAGE_ORIGIN;
    try { doc.transparencyPreferences.blendingSpace = BlendingSpace.RGB; } catch (e) {}
    for (var m = 0; m < doc.masterSpreads.length; m++) {
        for (var mp = 0; mp < doc.masterSpreads[m].pages.length; mp++) {
            doc.masterSpreads[m].pages[mp].marginPreferences.properties = {top: 0, left: 0, bottom: 0, right: 0};
        }
    }

    function color(name, rgb) {
        var c = doc.colors.itemByName(name);
        if (!c.isValid) c = doc.colors.add({name: name, model: ColorModel.PROCESS, space: ColorSpace.RGB, colorValue: rgb});
        return c;
    }
    var cWhite = color("GalleryWhite", [252, 252, 250]);
    var cInk = color("ObsidianInk", [14, 16, 15]);
    var cChar = color("CharcoalSoft", [68, 74, 71]);
    var cGold = color("GoldAccent", [180, 145, 95]);
    var cHair = color("HairlineRule", [220, 218, 212]);
    var cMuted = color("MutedText", [150, 154, 151]);
    var cNone = doc.swatches.itemByName("None");

    function font(name, style) {
        var f = app.fonts.itemByName(name + "\t" + style);
        if (f.isValid) return f;
        var alt = {"SemiBold": "Medium", "Bold": "Medium", "Medium": "Regular"}[style];
        if (alt) { log("FONT fallback " + name + " " + style + " -> " + alt); return font(name, alt); }
        log("FONT MISSING " + name + " " + style);
        return app.fonts.itemByName("Manrope\tRegular");
    }
    var TENOR = font("Tenor Sans", "Regular");
    var M_REG = font("Manrope", "Regular");
    var M_MED = font("Manrope", "Medium");
    var M_BOLD = font("Manrope", "Bold");

    var ST = {
        kicker:   {f: M_BOLD, size: 16, lead: 21, track: 220, color: cGold},
        label:    {f: M_BOLD, size: 16, lead: 21, track: 200, color: cGold},
        labelInk: {f: M_BOLD, size: 16, lead: 21, track: 200, color: cInk},
        title:    {f: TENOR, size: 200, lead: 200, track: -10, color: cInk},
        subtitle: {f: TENOR, size: 40, lead: 50, track: 0, color: cInk},
        lead:     {f: M_REG, size: 21, lead: 34, track: 0, color: cChar},
        h1:       {f: TENOR, size: 62, lead: 70, track: -5, color: cInk},
        body:     {f: M_REG, size: 23, lead: 38, track: 0, color: cChar, after: 16},
        small:    {f: M_REG, size: 20, lead: 31, track: 0, color: cChar},
        name:     {f: TENOR, size: 30, lead: 36, track: 0, color: cInk},
        care:     {f: M_MED, size: 19, lead: 27, track: 0, color: cInk},
        quote:    {f: TENOR, size: 30, lead: 40, track: 0, color: cInk},
        cta:      {f: TENOR, size: 44, lead: 52, track: 0, color: cInk},
        ctaBody:  {f: M_REG, size: 19, lead: 30, track: 0, color: cChar},
        contact:  {f: M_MED, size: 22, lead: 28, track: 0, color: cInk},
        base:     {f: M_BOLD, size: 11, lead: 14, track: 160, color: cMuted},
        footer:   {f: M_MED, size: 13.5, lead: 17, track: 200, color: cChar},
        placeTitle: {f: TENOR, size: 46, lead: 54, track: 0, color: cInk},
        placeBody:  {f: M_REG, size: 23, lead: 37, track: 0, color: cChar},
        step:     {f: M_BOLD, size: 15, lead: 20, track: 0, color: cInk},
        stepOff:  {f: M_BOLD, size: 15, lead: 20, track: 0, color: cMuted},
        inviteH:  {f: TENOR, size: 56, lead: 64, track: -5, color: cInk},
        inviteB:  {f: M_REG, size: 22, lead: 35, track: 0, color: cChar}
    };

    function tf(page, gb, text, st, align) {
        var t = page.textFrames.add({geometricBounds: gb});
        t.textFramePreferences.insetSpacing = [0, 0, 0, 0];
        t.textFramePreferences.firstBaselineOffset = FirstBaseline.CAP_HEIGHT;
        t.textFramePreferences.verticalJustification = VerticalJustification.TOP_ALIGN;
        t.contents = nb(text);
        var tx = t.texts[0];
        tx.appliedFont = st.f;
        tx.pointSize = st.size;
        tx.leading = st.lead;
        tx.tracking = st.track;
        tx.fillColor = st.color;
        tx.hyphenation = false;
        tx.justification = align || Justification.LEFT_ALIGN;
        if (st.after) tx.spaceAfter = st.after;
        var steps = 0;
        while (t.overflows && steps < 24) {
            steps++;
            var k = (st.size - steps * 0.5) / st.size;
            tx.pointSize = st.size * k;
            tx.leading = st.lead * k;
        }
        if (steps) log("SHRINK p" + page.name + " -" + (steps * 0.5) + "pt: " + text.substring(0, 40));
        if (t.overflows) log("OVERSET p" + page.name + ": " + text.substring(0, 40));
        return t;
    }

    function img(page, gb, file, fx, fy) {
        var r = page.rectangles.add({geometricBounds: gb, strokeWeight: 0, strokeColor: cNone, fillColor: cNone});
        var f = new File(PH + file);
        if (!f.exists) { log("MISSING IMAGE " + file); return r; }
        r.place(f);
        r.fit(FitOptions.FILL_PROPORTIONALLY);
        r.fit(FitOptions.CENTER_CONTENT);
        var g = r.graphics[0];
        var fb = r.geometricBounds, ib = g.geometricBounds;
        var slackX = (ib[3] - ib[1]) - (fb[3] - fb[1]);
        var slackY = (ib[2] - ib[0]) - (fb[2] - fb[0]);
        g.move(undefined, [(fb[1] - slackX * fx) - ib[1], (fb[0] - slackY * fy) - ib[0]]);
        return r;
    }

    function rule(page, y, x1, x2, c, wgt) {
        return page.graphicLines.add({geometricBounds: [y, x1, y, x2], strokeWeight: wgt || 1, strokeColor: c || cHair});
    }

    function vrule(page, x, y1, y2, c, wgt) {
        return page.graphicLines.add({geometricBounds: [y1, x, y2, x], strokeWeight: wgt || 1, strokeColor: c || cHair});
    }

    function bg(page) {
        var r = page.rectangles.add({geometricBounds: [0, 0, H, W], fillColor: cWhite, strokeWeight: 0, strokeColor: cNone});
        r.sendToBack();
        r.locked = true;
    }

    function footer(page, x1, x2, leftText, leftW) {
        tf(page, [1032, x1, 1052, x1 + (leftW || 700)], leftText || "БАЛИ · ЧАСТНОЕ ПУТЕШЕСТВИЕ", ST.footer);
        tf(page, [1032, x2 - 420, 1052, x2], "VALERYLATYPOV.COM", ST.footer, Justification.RIGHT_ALIGN);
    }

    function link(textObj, url, name) {
        var src = doc.hyperlinkTextSources.add(textObj);
        var dest = doc.hyperlinkURLDestinations.add(url, {name: name});
        var h = doc.hyperlinks.add(src, dest, {name: name});
        h.visible = false;
    }

    // Header of every two-place slide: kicker, hairline, optional 7-day tracker, footer.
    function header(page, kicker, activeDays, footerNote) {
        tf(page, [66, 100, 88, 1300], kicker, ST.kicker);
        rule(page, 112, 100, 1820);
        if (activeDays) {
            for (var n = 1; n <= 7; n++) {
                var on = false;
                for (var a = 0; a < activeDays.length; a++) if (activeDays[a] == n) on = true;
                var sx = 1540 + (n - 1) * 40;
                tf(page, [62, sx, 84, sx + 30], String(n), on ? ST.step : ST.stepOff, Justification.CENTER_ALIGN);
                rule(page, 96, sx + 3, sx + 27, on ? cGold : cHair, on ? 2 : 1);
            }
            tf(page, [34, 1540, 50, 1700], "УБУД", ST.base, Justification.CENTER_ALIGN);
            tf(page, [34, 1700, 50, 1772], "САНУР", ST.base, Justification.CENTER_ALIGN);
            tf(page, [34, 1772, 50, 1834], "ЧАНГУ", ST.base, Justification.CENTER_ALIGN);
        }
        vrule(page, 960, 150, 1000);
        footer(page, 100, 1820, footerNote, 900);
    }

    // One place: photo plus label, title and body. side "L": photo on top; side "R": text on top.
    function place(page, side, spec) {
        var x1 = side == "L" ? 100 : 1020;
        var x2 = side == "L" ? 900 : 1820;
        var photoTop = side == "L" ? 150 : 550;
        var textTop = side == "L" ? 630 : 150;
        img(page, [photoTop, x1, photoTop + 450, x2], spec.photo[0], spec.photo[1], spec.photo[2]);
        if (spec.photo2) {
            var ib = img(page, [photoTop + 270, x2 - 300, photoTop + 450, x2], spec.photo2[0], spec.photo2[1], spec.photo2[2]);
            ib.strokeWeight = 6; ib.strokeColor = cWhite;
            ib.geometricBounds = [photoTop + 270, x2 - 300, photoTop + 450, x2];
        }
        if (spec.ai) tf(page, [photoTop + 454, x1, photoTop + 468, x1 + 300], (typeof spec.ai == "string" ? spec.ai : "ИЛЛЮСТРАЦИЯ"), {f: M_BOLD, size: 10, lead: 13, track: 160, color: cMuted});
        tf(page, [textTop, x1, textTop + 22, x2], spec.label, ST.label);
        tf(page, [textTop + 32, x1, textTop + 88, x2], spec.title, ST.placeTitle);
        tf(page, [textTop + 104, x1, textTop + 374, x2], spec.body, ST.placeBody);
    }

    var p = doc.pages;
    for (var pi = 0; pi < p.length; pi++) {
        p[pi].marginPreferences.properties = {top: 0, left: 0, bottom: 0, right: 0};
        bg(p[pi]);
    }
    var ROUTE_NOTE = "ПРИМЕРНЫЙ МАРШРУТ · СОБЕРУ ПОД ВАШИ ЖЕЛАНИЯ";

    // SLIDE 1 — cover
    var p1 = p[0];
    img(p1, [0, 700, H, W], "cover_ulun_danu_dawn.jpg", 0.3, 0.5);
    tf(p1, [150, 110, 172, 650], "ЧАСТНОЕ ПУТЕШЕСТВИЕ · 7 ДНЕЙ", ST.kicker);
    tf(p1, [210, 100, 440, 690], "Бали", ST.title);
    tf(p1, [455, 110, 610, 620], "Семь дней на острове, где каждое утро начинается с цветов", ST.subtitle);
    rule(p1, 655, 112, 172, cGold, 1.5);
    tf(p1, [690, 110, 890, 600], "Храмы и королевские сады на воде, горное озеро и океан, люди, к которым не водят туристов. Всё в райской красоте и комфорте, о котором не нужно думать.", ST.lead);
    rule(p1, 945, 110, 600);
    tf(p1, [968, 110, 990, 650], "ВАЛЕРИЙ ЛАТЫПОВ · АВТОР И ПРОВОДНИК", ST.labelInk);

    // SLIDE 2 — the island
    var p2 = p[1];
    img(p2, [0, 0, H, 780], "r_odalan_girl_crown.jpg", 0.5, 0.3);
    tf(p2, [120, 880, 142, 1780], "ОСТРОВ", ST.label);
    tf(p2, [170, 880, 250, 1790], "Здесь благодарят цветами", ST.h1);
    tf(p2, [300, 880, 720, 1700],
        "На рассвете балийские женщины раскладывают маленькие корзинки из пальмовых листьев у порогов домов, на ступенях храмов, даже на приборной панели машины. В каждой цветы, щепотка риса и тонкая палочка благовоний. Так остров говорит спасибо за новый день.\r" +
        "На Бали тысячи храмов, и в каждом своя жизнь. Звучит гамелан, женщины несут на головах башни из фруктов, старики учат детей танцу. Я покажу вам этот Бали вблизи, в спокойном ритме и без толп.", ST.body);
    rule(p2, 760, 880, 1780);
    var promises = [
        ["СПОКОЙНЫЙ РИТМ", "Каждый день устроен мягко. Без ранних подъёмов и крутых лестниц, с долгими обедами и временем для отдыха."],
        ["КОМФОРТ", "Отели четыре или пять звёзд на ваш выбор, в садах Убуда и у океана. Личный автомобиль с водителем, встреча у трапа самолёта."],
        ["СВОИ ЛЮДИ", "На Бали у меня друзья, которые давно стали семьёй. Я говорю по-индонезийски, и вас везде примут как дорогих гостей."]
    ];
    for (var k = 0; k < 3; k++) {
        var px = 880 + k * 313;
        tf(p2, [790, px, 812, px + 274], promises[k][0], ST.labelInk);
        tf(p2, [832, px, 1005, px + 280], promises[k][1], ST.small);
    }
    footer(p2, 880, 1780);

    // SLIDE 3 — the story
    var p3 = p[2];
    img(p3, [0, 0, H, 880], pick("ai_invite_ladies.jpg", "d5_sanur_sunrise_agung.jpg"), 0.5, 0.5);
    if (haveFile("ai_invite_ladies.jpg")) tf(p3, [1040, 40, 1056, 400], "ИЛЛЮСТРАЦИЯ", {f: M_BOLD, size: 10, lead: 13, track: 160, color: cWhite});
    tf(p3, [100, 960, 122, 1820], "ПРЕДСТАВЬТЕ", ST.label);
    tf(p3, [142, 960, 290, 1830], "Утро, в которое некуда спешить", ST.h1);
    tf(p3, [318, 960, 1010, 1810],
        "Вы просыпаетесь в доме среди рисовых террас. За окном переливается вода, на веранде уже накрыт завтрак: спелая папайя, кофе, цветок франжипани на блюдце. Через час тёплые руки мастера напомнят телу, что такое лёгкость.\r" +
        "Потом остров начнёт открываться. Вы встанете под тёплую воду священного источника, где балийцы смывают усталость и старые заботы. Сядете в круг у моего друга Манку, который расскажет о крисах, о своей деревне и о цветах на порогах. Поднимемся к главному храму острова, и вы загадаете желание, которое давно носите с собой. Никто не будет торопить вас и объяснять, во что верить.\r" +
        "Вечера будут другими: музей, где работал «балийский Дали», танец, от которого бегут мурашки, закат над океаном и ужин, за которым хочется сидеть до темноты. Домой вы улетите с лёгкой спиной, загорелым лицом и фотографиями, которые захочется показать подругам.",
        {f: M_REG, size: 21.5, lead: 35, track: 0, color: cChar, after: 14});
    footer(p3, 960, 1820);

    // SLIDE 4 — how the week flows
    var p4 = p[3];
    tf(p4, [66, 100, 88, 1300], "КАК УСТРОЕНА НЕДЕЛЯ", ST.kicker);
    rule(p4, 112, 100, 1820);
    tf(p4, [140, 100, 215, 1700], "Сначала отдых, потом очищение, потом культура", ST.h1);
    var arc = [
        ["ДЕНЬ 1", "Расслабление", "Дом в садах Убуда, массаж после перелёта, ужин без спешки.", pick("ai_d1_villa.jpg", "d1_villa_fallback.jpg"), [0.5, 0.5]],
        ["ДЕНЬ 2", "Очищение", "Мелукат у священного источника, благословение и круг у Манку.", "r_melukat_spouts.jpg", [0.5, 0.35]],
        ["ДНИ 3 И 4", "Культура и горы", "Музеи Убуда, танец Легонг, озеро Братан и большой водопад.", "d3_legong_ubud_palace.jpg", [0.4, 0.5]],
        ["ДЕНЬ 5", "Храм желаний", "Бесаких, где загадывают желание, и королевские сады на воде.", "d5_tirta_gangga.jpg", [0.5, 0.5]],
        ["ДНИ 6 И 7", "Океан и прощание", "Медитация у воды, Нуану, обед у Лоуренса и отлёт без спешки.", "r_beach_evening.jpg", [0.5, 0.5]]
    ];
    for (var a = 0; a < 5; a++) {
        var ax = 100 + a * 349;
        img(p4, [270, ax, 660, ax + 324], arc[a][3], arc[a][4][0], arc[a][4][1]);
        tf(p4, [690, ax, 712, ax + 324], arc[a][0], ST.label);
        tf(p4, [726, ax, 776, ax + 324], arc[a][1], {f: TENOR, size: 34, lead: 40, track: 0, color: cInk});
        tf(p4, [796, ax, 1000, ax + 324], arc[a][2], ST.small);
    }
    footer(p4, 100, 1820, "ПРИМЕРНЫЙ МАРШРУТ · СОБЕРУ ПОД ВАШИ ЖЕЛАНИЯ");

    // SLIDE 5 — Odalan
    var p5 = p[4];
    img(p5, [0, 0, H, 700], "r_odalan_gate_girl.jpg", 0.5, 0.4);
    tf(p5, [100, 780, 122, 1800], "ПРАЗДНИК · ОДАЛАН", ST.label);
    tf(p5, [142, 780, 292, 1820], "Когда храм справляет день рождения", ST.h1);
    tf(p5, [318, 780, 580, 1800],
        "Одалан это день рождения храма. Обычно он повторяется раз в 210 дней по балийскому календарю, и вся деревня выходит в праздничных нарядах. Женщины несут подношения, дети в костюмах танцоров ждут своего выхода, а на ступенях храма никто никуда не спешит. Почти каждую неделю какой-нибудь храм острова справляет свой Одалан, и мы постараемся подобрать даты так, чтобы вы попали на один из них.", ST.body);
    var odal = [["r_odalan_three_girls.jpg", 0.5, 0.5], ["r_odalan_boys_drinks.jpg", 0.5, 0.5], ["r_odalan_boys_stage.jpg", 0.5, 0.5]];
    for (var oi = 0; oi < 3; oi++) {
        var ox = 780 + oi * 356;
        img(p5, [620, ox, 930, ox + 328], odal[oi][0], odal[oi][1], odal[oi][2]);
    }
    footer(p5, 780, 1820);

    // SLIDES 6-9 — route
    var s6 = p[5], s7 = p[6], s8 = p[7], s9 = p[8];
    header(s6, "МАРШРУТ · ДНИ 1 И 2", [1, 2], ROUTE_NOTE);
    place(s6, "L", {photo: [pick("ai_d1_villa.jpg", "d1_villa_fallback.jpg"), 0.5, 0.5], photo2: ["r_hotel_rice_view.jpg", 0.5, 0.5], ai: haveFile("ai_d1_villa.jpg"), label: "ДЕНЬ 1 · УБУД · РАССЛАБЛЕНИЕ", title: "Сады Убуда",
        body: "Вас встретят у трапа самолёта и проведут через паспортный контроль без очередей. Дорога до Убуда около часа. Отель стоит среди рисовых террас, с террасой, бассейном и видом на долину. После перелёта сначала массаж, потом ужин без спешки. Первые четыре ночи вы живёте в Убуде и никуда не переезжаете."});
    place(s6, "R", {photo: ["r_melukat_spouts.jpg", 0.5, 0.4], photo2: ["r_blessing_water.jpg", 0.5, 0.5], label: "ДЕНЬ 2 · УБУД, СЕБАТУ · ОЧИЩЕНИЕ", title: "Мелукат и круг у Манку",
        body: "Утром едем в Себату, около получаса от Убуда. Мелукат это балийский обряд очищения водой: вы входите в священный источник, и вода смывает усталость. Потом мой друг Манку, священник I Ketut Ibek, проведёт мягкую церемонию Агни Хотра у огня и покажет свою коллекцию крисов. Вечер свободный."});

    header(s7, "МАРШРУТ · ДНИ 3 И 4", [3, 4], ROUTE_NOTE);
    place(s7, "L", {photo: ["d3_legong_ubud_palace.jpg", 0.4, 0.5], photo2: ["w_blanco_museum.jpg", 0.5, 0.5], label: "ДЕНЬ 3 · УБУД · КУЛЬТУРА", title: "Искусство Убуда",
        body: "Весь день в пределах Убуда. Утром музей Нека с собранием балийской живописи и старинных крисов, в экспозиции есть и мои работы. Потом музей Бланко, дом «балийского Дали» среди садов над рекой Кампухан. Вечером танец Легонг во дворце Убуда: гамелан и золотые костюмы."});
    place(s7, "R", {photo: ["d4_ulun_danu_flowers.jpg", 0.45, 0.5], photo2: ["r_waterfall_big.jpg", 0.5, 0.5], label: "ДЕНЬ 4 · БЕДУГУЛ · ГОРЫ И ВОДА", title: "Озеро и большой водопад",
        body: "Утром в горы к озеру Братан, около полутора часов в одну сторону. Храм Улун Дану стоит у самой кромки воды и в тихую погоду словно плывёт по озеру. Потом водопад, куда не ходят экскурсионные автобусы: большой, шумный и почти без людей. Место выберем под ваш темп. К ужину возвращаемся в Убуд."});

    header(s8, "МАРШРУТ · ДНИ 5 И 6", [5, 6], ROUTE_NOTE);
    place(s8, "L", {photo: ["d5_tirta_gangga.jpg", 0.5, 0.5], photo2: ["r_temple_ceremony_crowd.jpg", 0.5, 0.5], label: "ДЕНЬ 5 · КАРАНГАСЕМ, САНУР · ЖЕЛАНИЕ", title: "Бесаких и водные дворцы",
        body: "Самый долгий день по дороге, но с остановками. Едем на восток, в земли бывшего королевства Карангасем. Бесаких главный храм острова на склоне вулкана Агунг, там загадывают желание. Тирта Ганга построил в 1940-х последний правитель этих мест: пруды, фонтаны и золотые карпы. Для меня это балийский Петергоф. К вечеру переезжаем в отель у океана в Сануре."});
    place(s8, "R", {photo: ["d5_sanur_sunrise_agung.jpg", 0.45, 0.5], photo2: ["r_beach_ceremony.jpg", 0.5, 0.5], label: "ДЕНЬ 6 · САНУР · ОКЕАН", title: "Медитация у воды",
        body: "Санур наша база на две ночи. Утро у спокойной лагуны: риф далеко от берега гасит волны. Я проведу вас через медитацию у океана, а потом небольшую церемонию в райском месте на берегу. После обеда спа с цветочной ванной. К Брюсу Карпентеру в гости, если он на острове: он живёт рядом. Закат, портреты и ужин у самой воды."});

    header(s9, "МАРШРУТ · ДЕНЬ 7 И ТЕЛО", [7], ROUTE_NOTE);
    place(s9, "L", {photo: ["d7_canggu_ricefield.jpg", 0.5, 0.5], photo2: ["r_tanah_lot.jpg", 0.5, 0.5], label: "ДЕНЬ 7 · ЧАНГУ, НУАНУ, АЭРОПОРТ", title: "Нуану и отлёт",
        body: "Последний день без спешки. Из Санура в Чангу около часа: рисовые поля почти у океана. Заедем в Нуану, новый творческий город на 44 гектара к югу от Танах-Лот, с тропическим садом, орхидеями, бабочками и тенистыми дорожками. Там же обед. Если Лоуренс Блэр на острове, встретимся и с ним. До аэропорта около часа, время подстроим под ваш рейс."});
    place(s9, "R", {photo: [pick("ai_flower_bath.jpg", "spa_flower_bath.jpg"), 0.5, 0.5], photo2: ["r_hotel_pool_terraces.jpg", 0.5, 0.5], ai: haveFile("ai_flower_bath.jpg"), label: "ТЕЛО И ПОКОЙ · В ЛЮБОЙ ДЕНЬ", title: "Хиропрактик, спа и горячие источники",
        body: "Хороший хиропрактик ставит косточки на место и делает массаж. К нему можно прийти после долгого перелёта или в последнее утро. Добавьте к этому спа с ванной из лепестков и горячие источники: тёплая минеральная вода растапливает усталость. Всё решаем по самочувствию, без спешки."});

    // SLIDE 10 — cleansing and Manku
    var s10 = p[9];
    img(s10, [0, 0, H, 480], "r_melukat_stream.jpg", 0.5, 0.35);
    tf(s10, [90, 540, 112, 1000], "ОЧИЩЕНИЕ И БЛАГОСЛОВЕНИЕ", ST.label);
    tf(s10, [132, 540, 290, 1000], "Вода, огонь и слово Манку", ST.placeTitle);
    tf(s10, [320, 540, 960, 1000],
        "Мелукат. Вода священного источника смывает усталость и старые тревоги. Подношения и саронги мы берём на себя, вам нужно только войти в воду.\r" +
        "Агни Хотра. Огненная церемония у Манку. Тишина, треск огня и мягкое благословение для вас и вашей семьи.\r" +
        "Бесаких. Главный храм острова на склоне вулкана Агунг. Здесь загадывают желание, и мы поднимемся туда без спешки.", ST.small);
    img(s10, [90, 1040, 520, 1420], "r_melukat_spouts.jpg", 0.5, 0.35);
    img(s10, [90, 1440, 520, 1820], "r_valery_under_waterfall.jpg", 0.5, 0.3);
    img(s10, [540, 1040, 970, 1420], "r_manku_points_massage.jpg", 0.5, 0.5);
    img(s10, [540, 1440, 970, 1820], "r_manku_family.jpg", 0.5, 0.5);
    tf(s10, [1032, 540, 1052, 1830], "ПО ЖЕЛАНИЮ · ВЗАИМОДЕЙСТВИЕ С КРИСАМИ: МАНКУ ПОКАЖЕТ И РАССКАЖЕТ", ST.footer);

    // SLIDE 11 — hotels and spa
    var s11 = p[10];
    header(s11, "ОТЕЛИ И СПА", null, "БАЛИ · ЧАСТНОЕ ПУТЕШЕСТВИЕ");
    place(s11, "L", {photo: ["r_hotel_rice_view.jpg", 0.5, 0.5], photo2: ["r_hotel_pool.jpg", 0.5, 0.5], label: "ГДЕ ВЫ ЖИВЁТЕ", title: "Отели с видом на рисовые террасы",
        body: "Мы выбираем небольшие отели четыре или пять звёзд с бассейном, верандой и видом на долину. Утром из окна рисовые террасы, вечером тишина и прохлада. Я покажу несколько вариантов, и вы выберете тот, где вам будет уютнее."});
    place(s11, "R", {photo: [pick("ai_flower_bath.jpg", "spa_flower_bath.jpg"), 0.5, 0.5], photo2: ["r_hotel_lake_pool.jpg", 0.5, 0.5], ai: haveFile("ai_flower_bath.jpg"), label: "СПА И ТЕЛО", title: "Ванна из лепестков и окно в джунгли",
        body: "Балийский массаж, ванна из лепестков роз и франжипани, скраб и травяной уход. Кабинка открыта к джунглям, вода тёплая, свечи горят. Для этого дня ничего не планируем, только отдых."});

    // SLIDE 12 — food
    var s12 = p[11];
    tf(s12, [90, 100, 112, 900], "ВКУС ОСТРОВА", ST.label);
    tf(s12, [132, 100, 282, 820], "Еда, к которой хочется вернуться", ST.h1);
    tf(s12, [310, 100, 780, 800],
        "На Бали едят красиво. Тропические фрукты, свежая рыба с углей, салаты из цветов, кокос прямо из скорлупы, кофе с рисовыми полями за окном. Мы выбираем места, где готовят тонко и подают с уважением к продукту. У вас есть аллергии или диета? Заранее предупредим повара.", ST.body);
    var foodPics = [["r_food_board.jpg", 0.5, 0.5], ["r_food_plate_jungle.jpg", 0.5, 0.5], ["r_food_bowl.jpg", 0.5, 0.5], ["r_food_dessert.jpg", 0.5, 0.5], ["r_food_latte_rice.jpg", 0.5, 0.35], ["r_food_latte.jpg", 0.5, 0.5]];
    for (var fi2 = 0; fi2 < 6; fi2++) {
        var fx = 880 + (fi2 % 3) * 320, fy = 130 + Math.floor(fi2 / 3) * 450;
        img(s12, [fy, fx, fy + 420, fx + 300], foodPics[fi2][0], foodPics[fi2][1], foodPics[fi2][2]);
    }
    var eat = ["Свежие фрукты: мангостины, маракуйя, папайя", "Рыба и морепродукты с углей у самой воды", "Кокосы и свежевыжатые соки", "Кофе и десерты в кафе с видом на рисовые поля"];
    for (var ei = 0; ei < 4; ei++) { rule(s12, 620 + ei * 70 - 8, 100, 124, cGold, 1.5); tf(s12, [620 + ei * 70, 100, 660 + ei * 70, 820], eat[ei], ST.care); }
    tf(s12, [1032, 100, 1052, 820], "БАЛИ · ЧАСТНОЕ ПУТЕШЕСТВИЕ", ST.footer);

    // SLIDE 13 — Neka and kris
    var s13 = p[12];
    header(s13, "МУЗЕИ УБУДА", null, "БАЛИ · ЧАСТНОЕ ПУТЕШЕСТВИЕ");
    place(s13, "L", {photo: [pick("ai_neka_kris_case.jpg", "r_neka_kris_pavilion.jpg"), 0.5, 0.5], photo2: ["r_neka_kris_pavilion.jpg", 0.5, 0.5], ai: haveFile("ai_neka_kris_case.jpg") ? "ФОТО ОЧИЩЕНО ОТ БЛИКОВ В РЕДАКТОРЕ" : false, label: "МУЗЕЙ НЕКА · КРИСЫ", title: "Кинжалы, в которых живёт род",
        body: "Крис это священный клинок Индонезии, объект наследия ЮНЕСКО. Его куют годами, а передают из поколения в поколение. В музее Нека собрана одна из лучших коллекций, и я проведу вас по залам так, как показал бы другу. В постоянной экспозиции музея висят и мои фотографии."});
    place(s13, "R", {photo: ["w_blanco_museum.jpg", 0.5, 0.5], photo2: ["w_blanco_dancer_statue.jpg", 0.5, 0.5], label: "МУЗЕЙ БЛАНКО · УБУД", title: "Дом «балийского Дали»",
        body: "Антонио Бланко родился в Маниле в 1911 году, а в 1952 приехал на Бали и остался навсегда. Его называли «балийским Дали»: смелые, нежные картины с танцовщицами и сад над рекой Кампухан. В 1998 году он открыл дом для гостей. Это лёгкий, красивый и немного озорной музей."});

    // SLIDE 14 — extras
    var s14 = p[13];
    header(s14, "ПО ЖЕЛАНИЮ · ДОБАВИТЬ К МАРШРУТУ", null, "БАЛИ · ЧАСТНОЕ ПУТЕШЕСТВИЕ");
    place(s14, "L", {photo: [pick("ai_zoo_orangutan.jpg", "w1_zoo_bird.jpg"), 0.5, 0.5], photo2: ["w1_zoo_bird.jpg", 0.3, 0.4], ai: haveFile("ai_zoo_orangutan.jpg"), label: "ДОБАВИТЬ · ИЗ УБУДА ОКОЛО ПОЛУЧАСА", title: "Бали Зоо",
        body: "Двенадцать гектаров тропического парка в Сингападу. Тигры, слоны, гиббоны, орангутаны, редкие птицы. Можно устроить завтрак рядом с орангутанами. Спокойный, лёгкий день без храмов и обрядов, просто радость от живой природы. Хорошо ложится на день 3."});
    place(s14, "R", {photo: [pick("ai_kecak_sunset.jpg", "w4_kecak.jpg"), 0.5, 0.5], photo2: ["r_uluwatu_cliff.jpg", 0.5, 0.5], ai: haveFile("ai_kecak_sunset.jpg"), label: "ДОБАВИТЬ · ИЗ САНУРА ОКОЛО ЧАСА", title: "Улувату и Кечак",
        body: "Храм на скале примерно в семидесяти метрах над океаном, на самом юге острова. На закате там танцуют Кечак, огненный танец по мотивам «Рамаяны», который поёт хор из нескольких десятков мужчин. Место туристическое, но красота настоящая. Подойдёт для вечера дня 6, домой вернёмся уже в темноте."});

    // SLIDE 15 — people, Manku and Neka
    var s15 = p[14];
    tf(s15, [90, 100, 112, 900], "ЛЮДИ", ST.label);
    tf(s15, [132, 100, 205, 1700], "Двери, которые откроются для вас", ST.h1);
    img(s15, [250, 100, 700, 500], "r_manku_kris_portrait.jpg", 0.5, 0.3);
    img(s15, [250, 520, 700, 920], "r_valery_with_neka.jpg", 0.5, 0.4);
    img(s15, [250, 940, 700, 1340], "r_neka_portrait.jpg", 0.5, 0.25);
    tf(s15, [725, 100, 765, 500], "I Ketut Ibek, Манку", ST.name);
    tf(s15, [772, 100, 1015, 480], "Священник из Себату и мой близкий друг, его семья давно стала мне родной. Проведёт мягкий обряд благословения, покажет коллекцию крисов, а если захотите, поработает с телом по точкам.", ST.small);
    tf(s15, [725, 520, 765, 920], "Музей Нека", ST.name);
    tf(s15, [772, 520, 1015, 900], "Здесь хранятся картины и клинки, которые собирали десятилетиями. Мои фотографии вошли в постоянную экспозицию, и я расскажу вам об этом месте изнутри.", ST.small);
    tf(s15, [725, 940, 765, 1340], "Хозяева острова", ST.name);
    tf(s15, [772, 940, 1015, 1340], "Люди, у которых стоит учиться неспешности. Подробнее расскажу на нашем разговоре.", ST.small);
    img(s15, [250, 1370, 700, 1820], "r_odalan_boy.jpg", 0.5, 0.25);
    tf(s15, [725, 1370, 765, 1820], "Праздники без туристов", ST.name);
    tf(s15, [772, 1370, 1015, 1820], "Постараемся попасть на Одалан и другие церемонии, куда приглашают только своих.", ST.small);
    footer(s15, 100, 1820);

    // SLIDE 16 — Bruce and Lawrence
    var s16 = p[15];
    tf(s16, [90, 100, 112, 900], "ВСТРЕЧИ ПО ВОЗМОЖНОСТИ", ST.label);
    tf(s16, [132, 100, 205, 1800], "Двое, ради разговора с которыми стоит приехать", ST.h1);
    img(s16, [250, 100, 790, 480], "r_bruce_portrait.jpg", 0.5, 0.25);
    img(s16, [250, 500, 790, 880], "r_bruce_library.jpg", 0.5, 0.4);
    img(s16, [250, 1000, 790, 1380], "r_lawrence_1.jpg", 0.5, 0.25);
    img(s16, [250, 1400, 790, 1780], "r_lawrence_2.jpg", 0.5, 0.25);
    vrule(s16, 940, 250, 1000);
    tf(s16, [815, 100, 855, 880], "Брюс Карпентер", ST.name);
    tf(s16, [865, 100, 1000, 880], "Знаток балийского искусства и старинных крисов, автор книг, живёт в районе Санура. Принимает в доме среди масок, кинжалов и редких книг. Расскажет об острове то, чего нет в путеводителях.", ST.small);
    tf(s16, [815, 1000, 855, 1780], "Лоуренс Блэр", ST.name);
    tf(s16, [865, 1000, 1000, 1780], "Антрополог и режиссёр, автор документального сериала Ring of Fire об Индонезии (PBS и BBC, две премии Эмми) и одноимённой книги. Тридцать пять лет живёт на Бали, район Чангу.", ST.small);
    footer(s16, 100, 1820, "ВОЗМОЖНОСТЬ ВСТРЕЧИ ЕСТЬ, ДАТЫ УТОЧНЯЕМ ПОД ВАШУ ПОЕЗДКУ");

    // SLIDE 17 — Valery's work
    var s17 = p[16];
    img(s17, [0, 1240, H, W], "r_valery_meru.jpg", 0.5, 0.3);
    tf(s17, [90, 100, 112, 900], "С КЕМ Я РАБОТАЮ", ST.label);
    tf(s17, [132, 100, 205, 1150], "Люди, которых я снимал", ST.h1);
    tf(s17, [232, 100, 330, 1110], "Снимаю музыкантов, артистов, руководителей и их семьи. На Бали я работаю так же: внимательно, без суеты и с уважением к людям, которых снимаю.", ST.lead);
    var regalia = [
        ["МУЗЫКА И СЦЕНА", "Официальный фотограф фестиваля WOMAD Питера Гэбриэла и Carmina Burana в Dubai Opera, премьеры Большого театра."],
        ["ЛИДЕРЫ И БИЗНЕС", "Арнольд Шварценеггер, Ицхак Адизес, Игорь Рыбаков, Оскар Хартманн, лидеры проектов BRICS."],
        ["ГОСУДАРСТВО", "Дом Правительства РФ, мероприятия с Сергеем Собяниным, портреты Дмитрия Пескова и Татьяны Навки."],
        ["СЕМЬИ И НАСЛЕДИЕ", "Портреты наследников Emilio Pucci и Buccellati."],
        ["МУЗЕИ И КОЛЛЕКЦИИ", "Постоянная экспозиция музея Нека в Убуде, частные коллекции Нью-Йорка, Лондона, Берлина и Москвы."],
        ["ОБРАЗОВАНИЕ", "Инженер-физик, НИЯУ МИФИ. Спикер TEDx, член Союза фотохудожников России."]
    ];
    for (var rg = 0; rg < 6; rg++) {
        var rx = 100 + (rg % 2) * 560, ry = 380 + Math.floor(rg / 2) * 165;
        tf(s17, [ry, rx, ry + 22, rx + 500], regalia[rg][0], ST.labelInk);
        tf(s17, [ry + 30, rx, ry + 150, rx + 500], regalia[rg][1], ST.small);
    }
    rule(s17, 880, 100, 1150);
    var care = ["Визы, страховка и связь заранее", "Личный автомобиль с водителем", "Спа с цветочными ваннами",
                "Маршрут без лишних переездов", "Я на связи днём и ночью", "Альбом ваших портретов в подарок"];
    for (var c = 0; c < 6; c++) {
        var cx = 100 + (c % 3) * 363;
        var cy = 910 + Math.floor(c / 3) * 56;
        rule(s17, cy - 8, cx, cx + 24, cGold, 1.5);
        tf(s17, [cy, cx, cy + 50, cx + 345], care[c], ST.care);
    }
    footer(s17, 100, 1150);

    // LAST SLIDE — about + call
    var sl = p[17];
    img(sl, [0, 0, H, 720], "p5_valery_portrait.jpg", 0.5, 0.3);
    tf(sl, [95, 820, 117, 1800], "КТО ВАС ВСТРЕТИТ", ST.label);
    tf(sl, [138, 820, 208, 1800], "Валерий Латыпов", ST.h1);
    tf(sl, [245, 820, 560, 1660],
        "Фотохудожник. Двадцать лет снимаю музыкантов, артистов и людей культуры. Был официальным фотографом фестиваля WOMAD Питера Гэбриэла, снимал премьеры Большого театра и «Кармину Бурану» в Dubai Opera. Мои работы хранятся в постоянной экспозиции музея Нека на Бали.\r" +
        "На острове я подолгу живу, говорю по-индонезийски и дружу с семьями, которые хранят храмы. Много лет учусь у мастеров разных традиций, среди них тибетский учитель Чёгьял Намкай Норбу, а в 2011 году получил благословение последнего короля Мустанга. Из этого в поездках остаются спокойствие, внимание и умение слушать. Ничего навязывать я не буду.",
        {f: M_REG, size: 19.5, lead: 31, track: 0, color: cChar, after: 12});
    tf(sl, [585, 820, 665, 1720], "Мне важно, чтобы вам было спокойно, красиво и интересно. Остальное я беру на себя.", ST.quote);
    rule(sl, 705, 820, 1800);
    tf(sl, [735, 820, 790, 1320], "Давайте поговорим", ST.cta);
    tf(sl, [815, 820, 980, 1330], "Двадцать минут по видеосвязи в удобное для вас время. Вы расскажете о своих желаниях, а я соберу маршрут под них и отвечу на вопросы о комфорте и безопасности.", ST.ctaBody);
    var contacts = [
        ["WHATSAPP", "+7 985 224-67-89", "https://wa.me/79852246789"],
        ["TELEGRAM", "@latypovvalery", "https://t.me/latypovvalery"],
        ["ПОЧТА", "vision@valerylatypov.com", "mailto:vision@valerylatypov.com"]
    ];
    for (var ci = 0; ci < 3; ci++) {
        var y = 740 + ci * 88;
        tf(sl, [y, 1420, y + 20, 1800], contacts[ci][0], ST.label);
        var v = tf(sl, [y + 32, 1420, y + 62, 1820], contacts[ci][1], ST.contact);
        link(v.texts[0], contacts[ci][2], "contact_" + ci);
    }
    footer(sl, 820, 1800);

    // QA
    var over = 0, outside = 0;
    for (var qp = 0; qp < p.length; qp++) {
        var items = p[qp].allPageItems;
        for (var it = 0; it < items.length; it++) {
            var o = items[it];
            if (o.constructor.name == "TextFrame" && o.overflows) over++;
            if (o.constructor.name == "TextFrame") {
                var b = o.geometricBounds;
                if (b[0] < 0 || b[1] < 0 || b[2] > H || b[3] > W) { outside++; log("OUTSIDE p" + p[qp].name + ": " + o.contents.substring(0, 30)); }
            }
        }
    }
    var badLinks = 0;
    for (var l = 0; l < doc.links.length; l++) if (doc.links[l].status != LinkStatus.NORMAL) { badLinks++; log("BAD LINK " + doc.links[l].name); }
    var badFonts = 0;
    for (var fi = 0; fi < doc.fonts.length; fi++) if (doc.fonts[fi].status != FontStatus.INSTALLED) { badFonts++; log("BAD FONT " + doc.fonts[fi].name); }
    log("QA: pages=" + p.length + " overset=" + over + " outside=" + outside + " images=" + doc.links.length + " badLinks=" + badLinks + " badFonts=" + badFonts + " hyperlinks=" + doc.hyperlinks.length);

    doc.save(target);

    var pdf = app.pdfExportPreferences;
    var prefs = {
        pageRange: PageRange.ALL_PAGES, includeHyperlinks: true, includeBookmarks: false, exportReaderSpreads: false,
        colorBitmapSampling: Sampling.BICUBIC_DOWNSAMPLE, colorBitmapSamplingDPI: 144, thresholdToCompressColor: 300,
        colorBitmapCompression: BitmapCompression.JPEG, colorBitmapQuality: CompressionQuality.MEDIUM,
        cropMarks: false, bleedMarks: false, registrationMarks: false, colorBars: false, pageInformationMarks: false,
        useDocumentBleedWithPDF: false, optimizePDF: true, viewPDF: false, generateThumbnails: false
    };
    for (var key in prefs) { try { pdf[key] = prefs[key]; } catch (e) { log("PDF pref skipped: " + key); } }
    var out = new File(Folder.desktop.fsName + "/" + PDF_NAME);
    doc.exportFile(ExportFormat.PDF_TYPE, out, false);
    log("PDF: " + out.fsName + " exists=" + out.exists + " size=" + out.length);
}

var oldRedraw = app.scriptPreferences.enableRedraw;
var oldLevel = app.scriptPreferences.userInteractionLevel;
app.scriptPreferences.enableRedraw = false;
app.scriptPreferences.userInteractionLevel = UserInteractionLevels.NEVER_INTERACT;
try {
    app.doScript(main, ScriptLanguage.JAVASCRIPT, undefined, UndoModes.ENTIRE_SCRIPT, "Build Bali Swiss deck");
} catch (e) {
    log("ERROR line " + e.line + ": " + e.message);
} finally {
    app.scriptPreferences.enableRedraw = oldRedraw;
    app.scriptPreferences.userInteractionLevel = oldLevel;
    var lf = new File(LOG_PATH);
    lf.encoding = "UTF-8";
    lf.open("w");
    lf.write(logLines.join("\n"));
    lf.close();
}
