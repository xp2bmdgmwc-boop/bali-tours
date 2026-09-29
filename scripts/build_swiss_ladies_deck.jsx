#target indesign
// Builds the 6-page Bali deck (7-day sample route) for the Swiss guests from scratch and exports the PDF.

var DOC_NAME = "Bali_7_Days_Switzerland.indd";
var OLD_DOCS = ["Bali_5_Days_Switzerland.indd"];
var PDF_NAME = "Бали 7 дней - Валерий Латыпов.pdf";
var PH = "/Volumes/Genius Art/Авторские Туры/_Bali/Swiss_Deck_Photos/";
var LOG_PATH = "/Volumes/Genius Art/Antigravity/Bali Tours/scripts/logs/build_swiss_deck_log.txt";
var W = 1920, H = 1080;
var logLines = [];
function log(s) { logLines.push(s); }

function nb(s) {
    var w = "в|во|и|к|ко|с|со|у|о|об|а|я|на|по|до|за|из|от|не|но|для|без|при|про|над|под|В|Во|И|К|Ко|С|Со|У|О|Об|А|Я|На|По|До|За|Из|От|Не|Но|Для|Без|При|Про|Над|Под";
    var re = new RegExp("(^|[\\s«( ])(" + w + ") ", "g");
    s = s.replace(re, "$1$2 ");
    s = s.replace(re, "$1$2 ");
    s = s.replace(/(\d) (?=\S)/g, "$1 ");
    return s;
}

function main() {
    for (var i = app.documents.length - 1; i >= 0; i--) {
        var dn = app.documents[i].name;
        if (dn == DOC_NAME || OLD_DOCS.join("|").indexOf(dn) >= 0) app.documents[i].close(SaveOptions.NO);
    }
    var doc = app.documents.add(true);
    with (doc.documentPreferences) {
        intent = DocumentIntentOptions.WEB_INTENT;
        facingPages = false;
        pageWidth = W;
        pageHeight = H;
        pagesPerDocument = 6;
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
        kicker:   {f: M_BOLD, size: 15, lead: 20, track: 220, color: cGold},
        label:    {f: M_BOLD, size: 14, lead: 19, track: 200, color: cGold},
        labelInk: {f: M_BOLD, size: 14, lead: 19, track: 200, color: cInk},
        title:    {f: TENOR, size: 200, lead: 200, track: -10, color: cInk},
        subtitle: {f: TENOR, size: 40, lead: 50, track: 0, color: cInk},
        lead:     {f: M_REG, size: 21, lead: 34, track: 0, color: cChar},
        h1:       {f: TENOR, size: 62, lead: 70, track: -5, color: cInk},
        body:     {f: M_REG, size: 23, lead: 38, track: 0, color: cChar, after: 16},
        small:    {f: M_REG, size: 18.5, lead: 29, track: 0, color: cChar},
        dayTitle: {f: TENOR, size: 30, lead: 36, track: 0, color: cInk},
        name:     {f: TENOR, size: 30, lead: 36, track: 0, color: cInk},
        care:     {f: M_MED, size: 17, lead: 25, track: 0, color: cInk},
        quote:    {f: TENOR, size: 30, lead: 40, track: 0, color: cInk},
        cta:      {f: TENOR, size: 44, lead: 52, track: 0, color: cInk},
        ctaBody:  {f: M_REG, size: 19, lead: 30, track: 0, color: cChar},
        contact:  {f: M_MED, size: 22, lead: 28, track: 0, color: cInk},
        footer:   {f: M_MED, size: 12.5, lead: 16, track: 200, color: cChar}
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

    function bg(page) {
        var r = page.rectangles.add({geometricBounds: [0, 0, H, W], fillColor: cWhite, strokeWeight: 0, strokeColor: cNone});
        r.sendToBack();
        r.locked = true;
    }

    function footer(page, x1, x2) {
        tf(page, [1032, x1, 1050, x1 + 520], "БАЛИ · ЧАСТНОЕ ПУТЕШЕСТВИЕ", ST.footer);
        tf(page, [1032, x2 - 420, 1050, x2], "VALERYLATYPOV.COM", ST.footer, Justification.RIGHT_ALIGN);
    }

    function link(textObj, url, name) {
        var src = doc.hyperlinkTextSources.add(textObj);
        var dest = doc.hyperlinkURLDestinations.add(url, {name: name});
        var h = doc.hyperlinks.add(src, dest, {name: name});
        h.visible = false;
    }

    var p = doc.pages;
    for (var pi = 0; pi < p.length; pi++) {
        p[pi].marginPreferences.properties = {top: 0, left: 0, bottom: 0, right: 0};
        bg(p[pi]);
    }

    // PAGE 1 — cover
    var p1 = p[0];
    img(p1, [0, 700, H, W], "cover_ulun_danu_dawn.jpg", 0.3, 0.5);
    tf(p1, [150, 110, 172, 650], "ЧАСТНОЕ ПУТЕШЕСТВИЕ · 7 ДНЕЙ", ST.kicker);
    tf(p1, [210, 100, 440, 690], "Бали", ST.title);
    tf(p1, [455, 110, 610, 620], "Семь дней на острове, где каждое утро начинается с цветов", ST.subtitle);
    rule(p1, 655, 112, 172, cGold, 1.5);
    tf(p1, [690, 110, 890, 600], "Храмы и королевские сады на воде, горное озеро и океан, люди, к которым не водят туристов. Всё в спокойном ритме и с комфортом, о котором не нужно думать.", ST.lead);
    rule(p1, 945, 110, 600);
    tf(p1, [968, 110, 988, 650], "ВАЛЕРИЙ ЛАТЫПОВ · АВТОР И ПРОВОДНИК", ST.labelInk);

    // PAGE 2 — the island
    var p2 = p[1];
    img(p2, [0, 0, H, 780], "p2_woman_prayer_incense.jpg", 0.5, 0.45);
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
        tf(p2, [790, px, 810, px + 274], promises[k][0], ST.labelInk);
        tf(p2, [828, px, 1000, px + 274], promises[k][1], ST.small);
    }
    footer(p2, 880, 1780);

    // PAGE 3 — 7-day sample route
    var p3 = p[2];
    tf(p3, [95, 100, 117, 900], "МАРШРУТ", ST.label);
    tf(p3, [140, 100, 215, 1150], "Семь дней, семь разных Бали", ST.h1);
    tf(p3, [140, 1250, 240, 1820], "Это набросок. После нашего разговора я соберу маршрут под ваши желания: что-то уберём, что-то добавим.", ST.small, Justification.RIGHT_ALIGN);
    var days = [
        ["d1_ubud_jungle_pool.jpg", 0.5, 0.55, "Сады Убуда",
         "Встреча у трапа без очередей. Отель в джунглях над рекой, массаж после перелёта, тихий ужин."],
        ["d2_sebatu_shrine_valery.jpg", 0.5, 0.42, "Храм у источника",
         "Себату, храм Вишну в джунглях. Мой друг Манку благословит вас и покажет свои крисы. Вечером ужин с Лоуренсом Блэром."],
        ["d3_legong_dancers.jpg", 0.55, 0.4, "Искусство Убуда",
         "Музей Нека и чай в доме Брюса Карпентера. Вечером танец Легонг во дворце Убуда."],
        ["d4_ulun_danu_flowers.jpg", 0.42, 0.5, "Горы и озеро",
         "Ботанический сад Бедугула и храм Улун Дану, который будто плывёт по озеру. Обед с видом на воду."],
        ["d4_tirta_gangga_koi.jpg", 0.5, 0.5, "Водные дворцы",
         "Тирта Ганга и Таман Уджунг, королевские сады с фонтанами и золотыми карпами. Вечером отель у океана."],
        ["d5_sanur_sunrise_agung.jpg", 0.4, 0.5, "Океан",
         "Утро у тихой лагуны, спа с цветочной ванной. В золотой час снимаю вас в мягком свете заката."],
        ["spa_flower_bath.jpg", 0.5, 0.5, "Прощание",
         "Неспешный завтрак, подарки на память прямо у мастеров, проводы в аэропорту без очередей."]
    ];
    for (var d = 0; d < 7; d++) {
        var x = 100 + d * 249;
        img(p3, [255, x, 645, x + 225], days[d][0], days[d][1], days[d][2]);
        tf(p3, [676, x, 694, x + 225], "ДЕНЬ " + (d + 1), ST.label);
        tf(p3, [710, x, 778, x + 225], days[d][3], {f: TENOR, size: 26, lead: 32, track: 0, color: cInk});
        tf(p3, [794, x, 1005, x + 225], days[d][4], {f: M_REG, size: 16.5, lead: 25.5, track: 0, color: cChar});
    }
    footer(p3, 100, 1820);

    // PAGE 4 — places to add
    var p4 = p[3];
    tf(p4, [95, 100, 117, 900], "ПО ЖЕЛАНИЮ", ST.label);
    tf(p4, [140, 100, 215, 1150], "Что ещё можно добавить", ST.h1);
    tf(p4, [140, 1250, 240, 1820], "Всё это можно вплести в ваш маршрут. Выберем вместе, когда поговорим.", ST.small, Justification.RIGHT_ALIGN);
    var places = [
        ["w_zoo_orangutan.jpg", 0.5, 0.35, "Бали Зоо",
         "Двенадцать гектаров тропического парка недалеко от Убуда. Орангутаны, суматранские слоны и тигры, редкие птицы. Можно устроить завтрак рядом с орангутанами. Спокойный и радостный день."],
        ["w_bedugul_garden.jpg", 0.5, 0.5, "Храм Улун Дану и сад",
         "Храм построен в 1633 году и посвящён Деви Дану, богине вод. Он стоит на берегу озера Братан на высоте больше тысячи двухсот метров. Рядом ухоженный ботанический сад и прохладный горный воздух."],
        ["d4_taman_ujung.jpg", 0.5, 0.5, "Водные дворцы",
         "Тирта Ганга в 1940-х построил последний король Карангасема, это лабиринт из прудов, фонтанов и мостов. В Таман Уджунг есть двенадцатиярусный фонтан в форме лотоса. Многие сравнивают эти сады с Петергофом."],
        ["opt_uluwatu_temple.jpg", 0.5, 0.45, "Улувату и Кечак",
         "Храм на скале над океаном. На закате там танцуют Кечак, огненный танец по мотивам Рамаяны, который поют хором десятки мужчин. Самое известное представление острова, туристическое, но по-настоящему красивое."]
    ];
    for (var pl = 0; pl < 4; pl++) {
        var px4 = 100 + pl * 440;
        img(p4, [265, px4, 635, px4 + 400], places[pl][0], places[pl][1], places[pl][2]);
        tf(p4, [668, px4, 708, px4 + 400], places[pl][3], ST.name);
        rule(p4, 730, px4, px4 + 48, cGold, 1.5);
        tf(p4, [752, px4, 1005, px4 + 400], places[pl][4], ST.small);
    }
    footer(p4, 100, 1820);

    // PAGE 5 — people and care
    var p5 = p[4];
    img(p5, [0, 1240, H, W], "p4_elder_keris_valery.jpg", 0.5, 0.4);
    tf(p5, [90, 100, 112, 1150], "ЛЮДИ", ST.label);
    tf(p5, [135, 100, 205, 1160], "Двери, которые откроются для вас", ST.h1);
    var people = [
        ["Манку из Себату", "Хранитель храма и мой близкий друг, его семья давно стала мне родной. Проведёт мягкий обряд благословения, покажет свою коллекцию крисов, а если захотите, сделает традиционный массаж по точкам."],
        ["Брюс Карпентер", "Знаток балийского искусства. Примет нас у себя дома, среди старинных масок и крисов, и расскажет об острове то, чего нет в путеводителях."],
        ["Лоуренс Блэр", "Автор документального сериала Ring of Fire об Индонезии, который десятилетиями путешествует по её островам. С ним хорошо говорить за ужином."],
        ["Музей Нека", "Одно из лучших собраний балийской живописи и старинных крисов. В постоянной экспозиции есть и мои фотографии, по залам я проведу вас сам."]
    ];
    for (var q = 0; q < 4; q++) {
        var qx = 100 + (q % 2) * 550;
        var qy = 250 + Math.floor(q / 2) * 235;
        tf(p5, [qy, qx, qy + 38, qx + 500], people[q][0], ST.name);
        tf(p5, [qy + 55, qx, qy + 215, qx + 500], people[q][1], ST.small);
    }
    rule(p5, 770, 100, 1150);
    tf(p5, [795, 100, 815, 1150], "О ЧЁМ НЕ НУЖНО ДУМАТЬ", ST.label);
    var care = ["Визы, страховка и связь заранее", "Личный автомобиль с водителем", "Спа с цветочными ваннами",
                "Хиропрактик и массаж по желанию", "Я на связи днём и ночью", "Альбом ваших портретов в подарок"];
    for (var c = 0; c < 6; c++) {
        var cx = 100 + (c % 3) * 363;
        var cy = 850 + Math.floor(c / 3) * 62;
        rule(p5, cy - 8, cx, cx + 24, cGold, 1.5);
        tf(p5, [cy, cx, cy + 40, cx + 340], care[c], ST.care);
    }
    footer(p5, 100, 1150);

    // PAGE 6 — about + call
    var p6 = p[5];
    img(p6, [0, 0, H, 720], "p5_valery_portrait.jpg", 0.5, 0.3);
    tf(p6, [95, 820, 117, 1800], "КТО ВАС ВСТРЕТИТ", ST.label);
    tf(p6, [138, 820, 208, 1800], "Валерий Латыпов", ST.h1);
    tf(p6, [245, 820, 560, 1660],
        "Фотохудожник. Двадцать лет снимаю музыкантов, артистов и людей культуры. Был официальным фотографом фестиваля WOMAD Питера Гэбриэла, снимал премьеры Большого театра и «Кармину Бурану» в Dubai Opera. Мои работы хранятся в постоянной экспозиции музея Нека на Бали.\r" +
        "На острове я подолгу живу, говорю по-индонезийски и дружу с семьями, которые хранят храмы. Много лет учусь у мастеров разных традиций, среди них тибетский учитель Чёгьял Намкай Норбу, а в 2011 году получил благословение последнего короля Мустанга. Из этого в поездках остаются спокойствие, внимание и умение слушать. Ничего навязывать я не буду.",
        {f: M_REG, size: 19.5, lead: 31, track: 0, color: cChar, after: 12});
    tf(p6, [585, 820, 665, 1720], "Мне важно, чтобы вам было спокойно, красиво и интересно. Остальное я беру на себя.", ST.quote);
    rule(p6, 705, 820, 1800);
    tf(p6, [735, 820, 790, 1320], "Давайте поговорим", ST.cta);
    tf(p6, [815, 820, 980, 1330], "Двадцать минут по видеосвязи в удобное для вас время. Вы расскажете о своих желаниях, а я соберу маршрут под них и отвечу на вопросы о комфорте и безопасности.", ST.ctaBody);
    var contacts = [
        ["WHATSAPP", "+7 985 224-67-89", "https://wa.me/79852246789"],
        ["TELEGRAM", "@latypovvalery", "https://t.me/latypovvalery"],
        ["ПОЧТА", "photo@valerylatypov.com", "mailto:photo@valerylatypov.com"]
    ];
    for (var ci = 0; ci < 3; ci++) {
        var y = 740 + ci * 88;
        tf(p6, [y, 1420, y + 18, 1800], contacts[ci][0], ST.label);
        var v = tf(p6, [y + 30, 1420, y + 60, 1820], contacts[ci][1], ST.contact);
        link(v.texts[0], contacts[ci][2], "contact_" + ci);
    }
    footer(p6, 820, 1800);

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

    doc.save(new File(Folder.desktop.fsName + "/" + DOC_NAME));

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
