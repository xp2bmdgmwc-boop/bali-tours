#target indesign
// Builds the Bali deck (7-day sample route, two places per slide) for the Swiss guests and exports the PDF.
// A file named ai_*.jpg in the photo folder replaces its fallback photo (see AI_SLOTS.md there).

var DOC_NAME = "Bali_7_Days_Switzerland_v3.indd";
var PDF_NAME = "Бали 7 дней - Валерий Латыпов v3.pdf";
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
        pagesPerDocument = haveInvite ? 11 : 10;
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
    tf(p1, [690, 110, 890, 600], "Храмы и королевские сады на воде, горное озеро и океан, люди, к которым не водят туристов. Всё в спокойном ритме и с комфортом, о котором не нужно думать.", ST.lead);
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

    // SLIDE 3 — Odalan photo essay
    var p3 = p[2];
    img(p3, [0, 0, H, 700], "r_odalan_gate_girl.jpg", 0.5, 0.4);
    tf(p3, [100, 780, 122, 1800], "ПРАЗДНИК · ОДАЛАН", ST.label);
    tf(p3, [142, 780, 292, 1820], "Когда храм справляет день рождения", ST.h1);
    tf(p3, [318, 780, 580, 1800],
        "Одалан это день рождения храма. Обычно он повторяется раз в 210 дней по балийскому календарю, и вся деревня выходит в праздничных нарядах. Женщины несут подношения, дети в костюмах танцоров ждут своего выхода, а на ступенях храма никто никуда не спешит. Почти каждую неделю какой-нибудь храм острова справляет свой Одалан, и мы постараемся подобрать даты так, чтобы вы попали на один из них.", ST.body);
    var odal = [["r_odalan_three_girls.jpg", 0.5, 0.5], ["r_odalan_boys_drinks.jpg", 0.5, 0.5], ["r_odalan_boys_stage.jpg", 0.5, 0.5]];
    for (var oi = 0; oi < 3; oi++) {
        var ox = 780 + oi * 356;
        img(p3, [620, ox, 930, ox + 328], odal[oi][0], odal[oi][1], odal[oi][2]);
    }
    footer(p3, 780, 1820);

    // SLIDES 4-7 — the route, two days per slide, in geographic order
    var d1photo = pick("ai_d1_villa.jpg", "d1_villa_fallback.jpg");
    var bathPhoto = pick("ai_flower_bath.jpg", "spa_flower_bath.jpg");
    var s4 = p[3], s5 = p[4], s6 = p[5], s7 = p[6];

    header(s4, "МАРШРУТ · ДНИ 1 И 2", [1, 2], ROUTE_NOTE);
    place(s4, "L", {photo: [d1photo, 0.5, 0.5], label: "ДЕНЬ 1 · УБУД", title: "Сады Убуда",
        body: "Вас встретят у трапа самолёта и проведут через паспортный контроль без очередей. Дорога до Убуда около часа. Отель стоит в джунглях над рекой, с террасой и бассейном. После перелёта сначала массаж, потом ужин без спешки. Первые четыре ночи вы живёте в Убуде и никуда не переезжаете."});
    place(s4, "R", {photo: ["r_blessing_water.jpg", 0.5, 0.45], label: "ДЕНЬ 2 · УБУД, СЕБАТУ", title: "Храм у источника",
        body: "Из Убуда до Себату около получаса. Храм Гунунг Кави стоит в джунглях среди рисовых террас, вокруг пруды с карпами. Он посвящён Вишну: по преданию, бог создал здесь источник для деревни, оставшейся без воды. Мой друг Манку, священник I Ketut Ibek, проведёт мягкий обряд благословения и покажет свою коллекцию крисов. Вечер свободный."});

    header(s5, "МАРШРУТ · ДНИ 3 И 4", [3, 4], ROUTE_NOTE);
    place(s5, "L", {photo: ["r_neka_kris_pavilion.jpg", 0.5, 0.5], label: "ДЕНЬ 3 · УБУД", title: "Искусство Убуда",
        body: "Весь день в пределах Убуда, долгих переездов нет. Утром музей Нека, одно из лучших собраний балийской живописи и старинных крисов. В экспозиции есть и мои фотографии, по залам я проведу вас сам. После обеда отдых в отеле, а вечером танец Легонг во дворце Убуда: гамелан и золотые костюмы."});
    place(s5, "R", {photo: ["d4_ulun_danu_flowers.jpg", 0.45, 0.5], label: "ДЕНЬ 4 · УБУД, БЕДУГУЛ", title: "Горы и озеро",
        body: "Утром едем в горы к озеру Братан, около полутора часов в одну сторону, с остановками на виды. Храм Улун Дану построен в 1633 году и посвящён богине воды Деви Дану. Он стоит у самой кромки озера и в тихую погоду словно плывёт по воде. Рядом ботанический сад на 157 гектаров. Обед с видом на озеро, к ужину возвращаемся в Убуд."});

    header(s6, "МАРШРУТ · ДНИ 5 И 6", [5, 6], ROUTE_NOTE);
    place(s6, "L", {photo: ["d5_tirta_gangga.jpg", 0.5, 0.5], label: "ДЕНЬ 5 · КАРАНГАСЕМ, САНУР", title: "Водные дворцы",
        body: "Самый долгий день по дороге, но с остановками и комфортом. После завтрака едем на восток, в бывшее королевство Карангасем, около полутора-двух часов. Тирта Ганга построил в 1940-х последний правитель этих мест: пруды, фонтаны, мостики и золотые карпы. Рядом Таман Уджунг, резиденция с павильонами на воде. Для меня это балийский Петергоф. К вечеру переезжаем в отель у океана в Сануре."});
    place(s6, "R", {photo: ["d5_sanur_sunrise_agung.jpg", 0.45, 0.5], label: "ДЕНЬ 6 · САНУР", title: "Океан и гости",
        body: "Санур наша база на две ночи. Утро у спокойной лагуны: риф далеко от берега гасит волны. Днём спа с цветочной ванной. После обеда в гости к Брюсу Карпентеру, он живёт в районе Санура, дорога короткая. В золотой час я сниму ваши портреты на берегу, а на ужин будет свежая рыба у самой воды."});

    header(s7, "МАРШРУТ · ДЕНЬ 7 И ТЕЛО", [7], ROUTE_NOTE);
    place(s7, "L", {photo: ["d7_canggu_ricefield.jpg", 0.5, 0.5], label: "ДЕНЬ 7 · ЧАНГУ, АЭРОПОРТ", title: "Чангу и отлёт",
        body: "Последний день. Из Санура в Чангу около часа: рисовые поля почти у самого океана. Там живёт Лоуренс Блэр, автор сериала Ring of Fire об Индонезии, с ним обед. Из Чангу до аэропорта около 45 минут. Время подстроим под ваш рейс, а если вылет вечером, день останется свободным."});
    place(s7, "R", {photo: [bathPhoto, 0.5, 0.5], label: "ТЕЛО И ПОКОЙ · ПО ЖЕЛАНИЮ", title: "Хиропрактик и массаж",
        body: "Хороший хиропрактик ставит косточки на место и делает массаж. Прийти к нему можно в любой день поездки, например после долгого перелёта. Решаем по самочувствию, без спешки. К такому визиту хорошо добавить спа с цветочной ванной."});

    // SLIDE 8 — extras
    var s8 = p[7];
    header(s8, "ПО ЖЕЛАНИЮ · ДОБАВИТЬ К МАРШРУТУ", null, "БАЛИ · ЧАСТНОЕ ПУТЕШЕСТВИЕ");
    place(s8, "L", {photo: ["w1_zoo_bird.jpg", 0.3, 0.4], label: "ДОБАВИТЬ · ИЗ УБУДА ОКОЛО ПОЛУЧАСА", title: "Бали Зоо",
        body: "Двенадцать гектаров тропического парка в Сингападу. Тигры, слоны, гиббоны, орангутаны, редкие птицы. Можно устроить завтрак рядом с орангутанами. Спокойный, лёгкий день без храмов и обрядов, просто радость от живой природы. Хорошо ложится на день 3."});
    place(s8, "R", {photo: ["w4_kecak.jpg", 0.5, 0.55], label: "ДОБАВИТЬ · ИЗ САНУРА ОКОЛО ЧАСА", title: "Улувату и Кечак",
        body: "Храм на скале примерно в семидесяти метрах над океаном, на самом юге острова. На закате там танцуют Кечак, огненный танец по мотивам «Рамаяны», который поёт хор из нескольких десятков мужчин. Место туристическое, но красота настоящая. Подойдёт для вечера дня 6, домой вернёмся уже в темноте."});

    // SLIDE 9 — people and care
    var s9 = p[8];
    img(s9, [0, 1240, H, W], "r_manku_kris_portrait.jpg", 0.5, 0.35);
    tf(s9, [90, 100, 112, 1150], "ЛЮДИ", ST.label);
    tf(s9, [135, 100, 205, 1160], "Двери, которые откроются для вас", ST.h1);
    var people = [
        ["I Ketut Ibek, Манку из Себату", "Священник из Себату и мой близкий друг, его семья давно стала мне родной. Проведёт мягкий обряд благословения, покажет коллекцию крисов, а если захотите, поработает с телом по точкам."],
        ["Брюс Карпентер", "Знаток балийского искусства, живёт в районе Санура. Примет нас дома, среди старинных масок и крисов, и расскажет об острове то, чего нет в путеводителях."],
        ["Лоуренс Блэр", "Автор сериала Ring of Fire об Индонезии, живёт в районе Чангу. Встретимся с ним в последний день, по дороге в аэропорт."],
        ["Музей Нека", "Одно из лучших собраний балийской живописи и старинных крисов. В постоянной экспозиции есть и мои фотографии, по залам я проведу вас сам."]
    ];
    for (var q = 0; q < 4; q++) {
        var qx = 100 + (q % 2) * 550;
        var qy = 250 + Math.floor(q / 2) * 240;
        tf(s9, [qy, qx, qy + 38, qx + 520], people[q][0], ST.name);
        tf(s9, [qy + 55, qx, qy + 225, qx + 500], people[q][1], ST.small);
    }
    rule(s9, 780, 100, 1150);
    tf(s9, [805, 100, 827, 1150], "О ЧЁМ НЕ НУЖНО ДУМАТЬ", ST.label);
    var care = ["Визы, страховка и связь заранее", "Личный автомобиль с водителем", "Спа с цветочными ваннами",
                "Маршрут без лишних переездов", "Я на связи днём и ночью", "Альбом ваших портретов в подарок"];
    for (var c = 0; c < 6; c++) {
        var cx = 100 + (c % 3) * 363;
        var cy = 860 + Math.floor(c / 3) * 62;
        rule(s9, cy - 8, cx, cx + 24, cGold, 1.5);
        tf(s9, [cy, cx, cy + 50, cx + 345], care[c], ST.care);
    }
    footer(s9, 100, 1150);

    // SLIDE 10 (optional) — invitation, only when the generated image exists
    var next = 9;
    if (haveInvite) {
        var sv = p[next]; next++;
        img(sv, [0, 0, H, 1240], "ai_invite_ladies.jpg", 0.5, 0.5);
        tf(sv, [120, 1310, 142, 1820], "ПРЕДСТАВЬТЕ", ST.label);
        tf(sv, [170, 1310, 400, 1820], "Утро, в которое некуда спешить", ST.inviteH);
        tf(sv, [430, 1310, 770, 1820], "Тёплый воздух, рисовые террасы, подруга рядом. Никаких экскурсионных автобусов, очередей и ранних подъёмов. Вы идёте в своём темпе, а всё остальное устроено заранее.", ST.inviteB);
        rule(sv, 800, 1310, 1820);
        tf(sv, [830, 1310, 960, 1820], "Расскажите, каким должен быть ваш Бали. Остальное соберу я.", ST.quote);
        footer(sv, 1310, 1820, "ИЛЛЮСТРАЦИЯ", 260);
    }

    // LAST SLIDE — about + call
    var sl = p[next];
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
        colorBitmapSampling: Sampling.BICUBIC_DOWNSAMPLE, colorBitmapSamplingDPI: 200, thresholdToCompressColor: 300,
        colorBitmapCompression: BitmapCompression.JPEG, colorBitmapQuality: CompressionQuality.HIGH,
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
