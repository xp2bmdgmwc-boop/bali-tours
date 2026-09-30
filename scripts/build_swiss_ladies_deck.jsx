#target indesign
// Builds the 13-slide Bali deck for the Swiss guests (funnel: dream, route, comfort, people, trust, call) and exports the PDF.
// A file named ai_*.jpg in the photo folder replaces its fallback photo (see AI_SLOTS.md there).

var DOC_NAME = "Bali_7_Days_Switzerland_v5.indd";
var PDF_NAME = "Бали 7 дней - Валерий Латыпов v5.pdf";
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
        pagesPerDocument = 13;
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

    // 1 — cover
    var p1 = p[0];
    img(p1, [0, 700, H, W], "cover_ulun_danu_dawn.jpg", 0.3, 0.5);
    tf(p1, [150, 110, 172, 650], "ЧАСТНОЕ ПУТЕШЕСТВИЕ · 7 ДНЕЙ", ST.kicker);
    tf(p1, [210, 100, 440, 690], "Бали", ST.title);
    tf(p1, [455, 110, 610, 620], "Семь дней на острове, где каждое утро начинается с цветов", ST.subtitle);
    rule(p1, 655, 112, 172, cGold, 1.5);
    tf(p1, [690, 110, 900, 600], "Для вас и ваших подруг: храмы и королевские сады на воде, джунгли и океан, люди, к которым не водят туристов. Всё в райской красоте и комфорте, о котором не нужно думать.", ST.lead);
    rule(p1, 945, 110, 600);
    tf(p1, [968, 110, 990, 650], "ВАЛЕРИЙ ЛАТЫПОВ · АВТОР И ПРОВОДНИК", ST.labelInk);

    // 2 — imagine
    var p2 = p[1];
    img(p2, [0, 0, H, 880], pick("ai_invite_ladies.jpg", "d5_sanur_sunrise_agung.jpg"), 0.5, 0.5);
    if (haveFile("ai_invite_ladies.jpg")) tf(p2, [1040, 40, 1056, 400], "ИЛЛЮСТРАЦИЯ", {f: M_BOLD, size: 10, lead: 13, track: 160, color: cWhite});
    tf(p2, [100, 960, 122, 1820], "ПРЕДСТАВЬТЕ", ST.label);
    tf(p2, [142, 960, 290, 1830], "Утро, в которое некуда спешить", ST.h1);
    tf(p2, [330, 960, 1000, 1810],
        "Вы просыпаетесь в доме среди рисовых террас. На веранде уже накрыт завтрак: папайя, кофе, цветок франжипани на блюдце. Днём тёплые руки мастера снимут усталость долгого перелёта.\r" +
        "Потом остров начнёт открываться. Вы увидите, как балийцы встают под струи священного источника, и сами решите, войти ли в воду. Мой друг Манку благословит вас у себя дома, а в Бесакихе, главном храме острова, вы загадаете желание, которое давно носите с собой.\r" +
        "По вечерам вас ждут музей «балийского Дали», танец под звуки гамелана, закат над океаном и ужин, за которым хочется сидеть до темноты. Домой вы вернётесь отдохнувшими, с лёгкой спиной и фотографиями, которые захочется показать близким.",
        {f: M_REG, size: 22, lead: 36, track: 0, color: cChar, after: 16});
    footer(p2, 960, 1820);

    // 3 — the island and three promises
    var p3 = p[2];
    img(p3, [0, 0, H, 780], "r_odalan_girl_crown.jpg", 0.5, 0.3);
    tf(p3, [120, 880, 142, 1780], "ОСТРОВ", ST.label);
    tf(p3, [170, 880, 250, 1790], "Здесь благодарят цветами", ST.h1);
    tf(p3, [300, 880, 720, 1700],
        "На рассвете балийские женщины раскладывают маленькие корзинки из пальмовых листьев у порогов домов, на ступенях храмов, даже на приборной панели машины. В каждой цветы, щепотка риса и тонкая палочка благовоний. Так остров говорит спасибо за новый день.\r" +
        "На Бали тысячи храмов, и в каждом своя жизнь. Звучит гамелан, женщины несут на головах башни из фруктов, старики учат детей танцу. Я покажу вам этот Бали вблизи, в спокойном ритме и без толп.", ST.body);
    rule(p3, 760, 880, 1780);
    var promises = [
        ["СПОКОЙНЫЙ РИТМ", "Одно главное впечатление в день. Без ранних подъёмов и крутых лестниц, с долгими обедами и временем для себя."],
        ["КОМФОРТ", "Отели четыре или пять звёзд на ваш выбор, личный автомобиль с водителем, встреча у трапа самолёта."],
        ["СВОИ ЛЮДИ", "На Бали у меня друзья, которые давно стали семьёй. Я говорю по-индонезийски, и вас везде примут как дорогих гостей."]
    ];
    for (var k = 0; k < 3; k++) {
        var px = 880 + k * 313;
        tf(p3, [790, px, 812, px + 274], promises[k][0], ST.labelInk);
        tf(p3, [832, px, 1005, px + 280], promises[k][1], ST.small);
    }
    footer(p3, 880, 1780);

    // 4 — the week at a glance
    var p4 = p[3];
    img(p4, [0, 1240, H, W], "p2_woman_prayer_incense.jpg", 0.5, 0.45);
    tf(p4, [90, 100, 112, 1150], "МАРШРУТ", ST.label);
    tf(p4, [132, 100, 205, 1160], "Неделя одним взглядом", ST.h1);
    var week = [
        ["1", "УБУД", "Встреча у трапа, отель среди рисовых террас, отдых после перелёта."],
        ["2", "СЕБАТУ", "Обряд воды Мелукат и благословение у моего друга Манку."],
        ["3", "БЕСАКИХ", "Главный храм острова, ваше желание и водопад Канто Лампо."],
        ["4", "УБУД", "Музеи Нека и Бланко, вечером танец Легонг."],
        ["5", "КАРАНГАСЕМ · САНУР", "Королевские сады на воде, вечером отель у океана."],
        ["6", "САНУР", "Утро тишины у океана, спа, портреты на закате."],
        ["7", "ЧАНГУ · НУАНУ", "Сады Нуану, прощальный обед и проводы в аэропорт."]
    ];
    for (var w = 0; w < 7; w++) {
        var wy = 250 + w * 100;
        tf(p4, [wy - 6, 100, wy + 40, 160], week[w][0], {f: TENOR, size: 40, lead: 44, track: 0, color: cGold});
        tf(p4, [wy, 180, wy + 20, 1150], week[w][1], ST.labelInk);
        tf(p4, [wy + 30, 180, wy + 64, 1150], week[w][2], ST.small);
        if (w < 6) rule(p4, wy + 84, 180, 1150);
    }
    tf(p4, [966, 100, 988, 1150], "4 НОЧИ В УБУДЕ · 2 НОЧИ У ОКЕАНА · СОБЕРУ ПОД ВАШИ ЖЕЛАНИЯ", ST.label);
    footer(p4, 100, 1150);

    // 5-8 — the route, two places per slide
    var s5 = p[4], s6 = p[5], s7 = p[6], s8 = p[7];
    header(s5, "МАРШРУТ · ДНИ 1 И 2", [1, 2], ROUTE_NOTE);
    place(s5, "L", {photo: [pick("ai_d1_villa.jpg", "d1_villa_fallback.jpg"), 0.5, 0.5], ai: haveFile("ai_d1_villa.jpg"), label: "ДЕНЬ 1 · УБУД", title: "Отдых после перелёта",
        body: "Вас встретят у трапа и проведут через паспортный контроль без очередей. Около часа дороги, и вы в отеле среди рисовых террас, с бассейном и видом на долину. Массаж, лёгкий ужин и никаких планов. Первые четыре ночи вы живёте здесь и никуда не переезжаете."});
    place(s5, "R", {photo: ["r_melukat_spouts.jpg", 0.5, 0.55], ai: "ОБРЯД МЕЛУКАТ", label: "ДЕНЬ 2 · СЕБАТУ", title: "Вода и благословение",
        body: "Около получаса от Убуда. Мелукат — балийский обряд воды: люди встают под струи священного источника и оставляют в воде усталость. Можно войти, а можно просто посмотреть. Потом мой друг Манку, священник I Ketut Ibek, проведёт у себя дома тихое благословение у огня и покажет старинные крисы."});

    header(s6, "МАРШРУТ · ДНИ 3 И 4", [3, 4], ROUTE_NOTE);
    place(s6, "L", {photo: ["r_valery_meru.jpg", 0.5, 0.4], ai: "ВАЛЕРИЙ ЛАТЫПОВ В БЕСАКИХЕ", label: "ДЕНЬ 3 · БЕСАКИХ", title: "Храм желаний",
        body: "Бесаких называют Матерью всех храмов Бали, он стоит на склоне вулкана Агунг. Дорога около полутора часов. Поднимемся без спешки, в вашем темпе, и вы загадаете здесь своё желание. На обратном пути водопад Канто Лампо, где вода каскадом бежит по каменным ступеням. К ужину возвращаемся в Убуд."});
    place(s6, "R", {photo: ["d3_legong_ubud_palace.jpg", 0.4, 0.5], label: "ДЕНЬ 4 · УБУД", title: "Искусство Убуда",
        body: "Весь день в Убуде, без долгих дорог. Утром музей Нека с лучшими балийскими картинами и старинными крисами, в его постоянной экспозиции есть и мои фотографии. Потом музей Бланко, дом «балийского Дали» над рекой Кампухан. Вечером танец Легонг во дворце Убуда под звуки гамелана."});

    header(s7, "МАРШРУТ · ДНИ 5 И 6", [5, 6], ROUTE_NOTE);
    place(s7, "L", {photo: ["d5_tirta_gangga.jpg", 0.5, 0.5], label: "ДЕНЬ 5 · КАРАНГАСЕМ · САНУР", title: "Сады на воде",
        body: "Тирта Гангу построил в 1940-х последний раджа Карангасема: пруды, фонтаны, каменные мостики и золотые карпы. Рядом Таман Уджунг, дворец с павильонами на воде. Для меня это балийский Петергоф. День самый долгий в дороге, поэтому обед будет неспешным, а к вечеру вы заселитесь в отель у океана в Сануре."});
    place(s7, "R", {photo: ["d5_sanur_sunrise_agung.jpg", 0.45, 0.5], label: "ДЕНЬ 6 · САНУР", title: "Утро у океана",
        body: "Риф далеко от берега гасит волны, и вода в лагуне спокойная. Утро начнём с тишины у океана и небольшой церемонии на берегу, а днём будет спа с ванной из лепестков. Если Брюс Карпентер на острове, заглянем к нему: он живёт рядом. На закате я сниму ваши портреты, а ужин будет у самой воды."});

    header(s8, "МАРШРУТ · ДЕНЬ 7", [7], ROUTE_NOTE);
    place(s8, "L", {photo: ["d7_canggu_ricefield.jpg", 0.5, 0.5], label: "ДЕНЬ 7 · ЧАНГУ · НУАНУ", title: "Сады Нуану и прощание",
        body: "Из Санура в Чангу около часа: рисовые поля почти у самого океана. Рядом Нуану, новый творческий город с тропическим садом, орхидеями и бабочками. Там же прощальный обед, а если Лоуренс Блэр на острове, пообедаем вместе с ним. До аэропорта около часа, время подстроим под ваш рейс."});
    place(s8, "R", {photo: ["r_odalan_three_girls.jpg", 0.5, 0.5], label: "ЕСЛИ СОВПАДУТ ДАТЫ", title: "Праздник в храме",
        body: "Одалан — день рождения храма, по балийскому календарю он бывает раз в 210 дней. Вся деревня выходит в праздничных нарядах, женщины несут башни из фруктов, дети танцуют. Почти каждую неделю такой праздник идёт в каком-нибудь храме, и мы постараемся попасть на один из них."});

    // 9 — where you stay and what you eat
    var s9 = p[8];
    header(s9, "ГДЕ ВЫ ЖИВЁТЕ И ЧТО ЕДИТЕ", null, "БАЛИ · ЧАСТНОЕ ПУТЕШЕСТВИЕ");
    place(s9, "L", {photo: ["r_hotel_rice_view.jpg", 0.5, 0.5], label: "ОТЕЛИ", title: "Вид на рисовые террасы",
        body: "Небольшие отели четыре или пять звёзд с бассейном, верандой и видом на долину: четыре ночи в садах Убуда и две у океана в Сануре. Я покажу несколько вариантов, и вы выберете тот, где вам будет уютнее."});
    tf(s9, [150, 1020, 172, 1820], "КУХНЯ", ST.label);
    tf(s9, [182, 1020, 238, 1820], "Вкус острова", ST.placeTitle);
    tf(s9, [254, 1020, 524, 1820], "Тропические фрукты на завтрак, рыба с углей у самой воды, салаты с цветами и кофе с видом на рисовые поля. Мы выбираем места, где готовят тонко и подают красиво. Об аллергиях и диете повара предупредим заранее.", ST.placeBody);
    var food = [["r_food_plate_jungle.jpg", 0.5, 0.5], ["r_food_bowl.jpg", 0.5, 0.5], ["r_food_dessert.jpg", 0.5, 0.5]];
    for (var fd = 0; fd < 3; fd++) {
        var fdx = 1020 + fd * 270;
        img(s9, [550, fdx, 1000, fdx + 260], food[fd][0], food[fd][1], food[fd][2]);
    }

    // 10 — people who open the island
    var s10 = p[9];
    tf(s10, [90, 100, 112, 900], "ЛЮДИ", ST.label);
    tf(s10, [132, 100, 205, 1820], "Люди, которые откроют вам остров", ST.h1);
    var ppl = [
        ["r_manku_kris_portrait.jpg", 0.5, 0.3, "I Ketut Ibek, Манку", "Священник из Себату и мой близкий друг, его семья давно стала мне родной. Проведёт тихое благословение и покажет свою коллекцию крисов."],
        ["r_neka_portrait.jpg", 0.5, 0.25, "Сутеджа Нека", "Основатель музея Нека, одного из главных собраний искусства Бали. Мои фотографии хранятся в постоянной экспозиции музея."],
        ["r_bruce_portrait.jpg", 0.5, 0.25, "Брюс Карпентер", "Историк балийского искусства и старинных крисов, автор книг. Живёт в районе Санура, в доме, полном масок и редких книг."],
        ["r_lawrence_1.jpg", 0.5, 0.25, "Лоуренс Блэр", "Антрополог и режиссёр, автор сериала Ring of Fire об Индонезии для PBS и BBC, удостоенного премии Эмми. Много лет живёт на Бали."]
    ];
    for (var pp = 0; pp < 4; pp++) {
        var ppx = 100 + pp * 437;
        img(s10, [250, ppx, 700, ppx + 410], ppl[pp][0], ppl[pp][1], ppl[pp][2]);
        tf(s10, [728, ppx, 768, ppx + 410], ppl[pp][3], ST.name);
        tf(s10, [782, ppx, 1010, ppx + 410], ppl[pp][4], ST.small);
    }
    footer(s10, 100, 1820, "С БРЮСОМ И ЛОУРЕНСОМ ВСТРЕТИМСЯ, ЕСЛИ ОНИ БУДУТ НА ОСТРОВЕ. ДАТЫ СВЕРИМ ЗАРАНЕЕ", 1250);

    // 11 — optional additions
    var s11 = p[10];
    tf(s11, [90, 100, 112, 900], "ПО ЖЕЛАНИЮ", ST.label);
    tf(s11, [132, 100, 205, 1820], "Можно добавить к маршруту", ST.h1);
    var ex = [
        ["w1_zoo_bird.jpg", 0.1, 0.4, "ОКОЛО 30 МИНУТ ОТ УБУДА", "Бали Зоо", "Тигры, слоны, орангутаны и редкие птицы. Можно позавтракать рядом с орангутанами."],
        ["r_uluwatu_cliff.jpg", 0.5, 0.5, "ОКОЛО ЧАСА ОТ САНУРА", "Улувату и Кечак", "Храм на скале над океаном и огненный танец Кечак на закате."],
        ["d4_ulun_danu_flowers.jpg", 0.45, 0.5, "ОКОЛО 1,5 ЧАСА ОТ УБУДА", "Озеро Братан", "Храм Улун Дану на воде и ботанический сад в прохладных горах."],
        ["r_hotel_lake_pool.jpg", 0.5, 0.5, "ОКОЛО 1,5 ЧАСА ОТ УБУДА", "Горячие источники", "Тёплая минеральная вода у озера Батур с видом на вулкан. Массаж и хиропрактик тоже по желанию."]
    ];
    for (var e = 0; e < 4; e++) {
        var exx = 100 + e * 437;
        img(s11, [250, exx, 620, exx + 410], ex[e][0], ex[e][1], ex[e][2]);
        tf(s11, [648, exx, 668, exx + 410], ex[e][3], ST.label);
        tf(s11, [680, exx, 720, exx + 410], ex[e][4], ST.name);
        tf(s11, [736, exx, 1000, exx + 410], ex[e][5], ST.small);
    }
    footer(s11, 100, 1820);

    // 12 — who meets you
    var s12 = p[11];
    tf(s12, [90, 100, 112, 900], "КТО ВАС ВСТРЕТИТ", ST.label);
    tf(s12, [132, 100, 205, 900], "Валерий Латыпов", ST.h1);
    tf(s12, [240, 100, 575, 880],
        "Фотохудожник. Двадцать лет снимаю музыкантов, артистов и людей культуры. На Бали подолгу живу, говорю по-индонезийски и дружу с семьями, которые хранят храмы.\r" +
        "Много лет учусь у мастеров тибетской традиции, в 2011 году получил благословение последнего короля Мустанга. В поездках из этого остаются спокойствие, внимание и умение слушать. Ничего навязывать я не буду.",
        {f: M_REG, size: 21, lead: 34, track: 0, color: cChar, after: 14});
    rule(s12, 510, 100, 880);
    var creds = [
        "Официальный фотограф фестиваля WOMAD Питера Гэбриэла",
        "«Кармина Бурана» в Dubai Opera, премьеры Большого театра",
        "Портреты наследников Emilio Pucci и Buccellati",
        "Снимал Арнольда Шварценеггера и Ицхака Адизеса",
        "Работы в музее Нека и в частных коллекциях Нью-Йорка, Лондона, Берлина",
        "Инженер-физик (МИФИ), спикер TEDx"
    ];
    for (var cr = 0; cr < creds.length; cr++) {
        var cy = 544 + cr * 64;
        rule(s12, cy - 8, 100, 124, cGold, 1.5);
        tf(s12, [cy, 100, cy + 44, 880], creds[cr], ST.care);
    }
    img(s12, [150, 980, 720, 1820], "r_valery_with_neka.jpg", 0.5, 0.45);
    tf(s12, [738, 980, 758, 1820], "С СУТЕДЖЕЙ НЕКОЙ, ОСНОВАТЕЛЕМ МУЗЕЯ НЕКА", ST.label);
    tf(s12, [800, 980, 900, 1800], "Мне важно, чтобы вам было спокойно, красиво и интересно. Остальное я беру на себя.", ST.quote);
    footer(s12, 100, 1820);

    // 13 — how we start + contacts
    var s13 = p[12];
    tf(s13, [90, 100, 112, 900], "ДАВАЙТЕ ПОГОВОРИМ", ST.label);
    tf(s13, [132, 100, 205, 1820], "Как мы начнём", ST.h1);
    var steps = [
        ["1", "Разговор", "Двадцать минут по видеосвязи в удобное вам время. Расскажете, каким видите свой Бали, а я отвечу на вопросы о комфорте и безопасности."],
        ["2", "Ваш маршрут", "Через пару дней пришлю маршрут и смету под ваши даты и пожелания. Что-то уберём, что-то добавим."],
        ["3", "Дорога", "Визы, страховку, отели, водителя и спа я беру на себя. Вам остаётся собрать чемодан."]
    ];
    for (var sp = 0; sp < 3; sp++) {
        var spx = 100 + sp * 590;
        tf(s13, [236, spx, 306, spx + 80], steps[sp][0], {f: TENOR, size: 64, lead: 66, track: 0, color: cGold});
        tf(s13, [250, spx + 90, 290, spx + 560], steps[sp][1], ST.name);
        tf(s13, [304, spx + 90, 480, spx + 550], steps[sp][2], ST.small);
    }
    rule(s13, 510, 100, 1820);
    tf(s13, [540, 100, 562, 1150], "ГОСТИ О ПОЕЗДКАХ", ST.label);
    tf(s13, [582, 100, 690, 1150], "«Огромное спасибо за путешествие по Бали! Особенно запомнилось место на вулкане и Индийском океане».", ST.quote);
    tf(s13, [700, 100, 722, 1150], "МАРАТ", ST.labelInk);
    tf(s13, [766, 100, 900, 1150], "«Вы мне как будто занавес приоткрыли. То, что было перед глазами и было на самом видном месте, не воспринималось мной, и я не прислушивался, а сейчас как будто частоту радио поменяли, и я всё слышу».", {f: TENOR, size: 23, lead: 31, track: 0, color: cInk});
    tf(s13, [908, 100, 930, 1150], "ИГОРЬ, ДУБАЙ", ST.labelInk);
    vrule(s13, 1250, 540, 960);
    tf(s13, [540, 1330, 562, 1820], "НАПИШИТЕ МНЕ", ST.label);
    var contacts = [
        ["WHATSAPP", "+7 985 224-67-89", "https://wa.me/79852246789"],
        ["TELEGRAM", "@latypovvalery", "https://t.me/latypovvalery"],
        ["ПОЧТА", "vision@valerylatypov.com", "mailto:vision@valerylatypov.com"]
    ];
    for (var ci = 0; ci < 3; ci++) {
        var y = 600 + ci * 110;
        tf(s13, [y, 1330, y + 20, 1820], contacts[ci][0], ST.label);
        var v = tf(s13, [y + 32, 1330, y + 66, 1830], contacts[ci][1], {f: M_MED, size: 26, lead: 32, track: 0, color: cInk});
        link(v.texts[0], contacts[ci][2], "contact_" + ci);
    }
    tf(s13, [1004, 100, 1024, 1830], "Фото: Валерий Латыпов; Jakub Hałun, Schnobby, Farhan Dhio (Wikimedia Commons, CC BY-SA); Unsplash. Иллюстрации: Gemini.", {f: M_REG, size: 10.5, lead: 14, track: 0, color: cMuted});
    footer(s13, 100, 1820);

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
