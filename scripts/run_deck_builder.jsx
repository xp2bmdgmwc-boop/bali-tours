#target indesign

var logFile = new File("/Volumes/Genius Art/Antigravity/Bali Tours/scripts/run_log.txt");
logFile.open("w");

try {
    app.scriptPreferences.enableRedraw = false;
    
    var desktopPath = Folder.desktop.fsName;
    var imagesFolder = "/Volumes/Genius Art/Antigravity/Bali Tours/images/";

    // Check if Bali_Sacred_Heritage_Deck.indd is open, close if so
    try {
        var old = app.documents.itemByName("Bali_Sacred_Heritage_Deck.indd");
        if (old.isValid) old.close(SaveOptions.NO);
    } catch(e){}

    // 1. Create New Document
    var doc = app.documents.add(true);
    doc.viewPreferences.horizontalMeasurementUnits = MeasurementUnits.POINTS;
    doc.viewPreferences.verticalMeasurementUnits = MeasurementUnits.POINTS;
    doc.documentPreferences.facingPages = false;
    doc.documentPreferences.pageWidth = 1920;
    doc.documentPreferences.pageHeight = 1080;
    
    while (doc.pages.length < 5) {
        doc.pages.add();
    }
    logFile.writeln("Pages created: " + doc.pages.length);

    // 2. Swatches
    function getOrCreateColor(name, colorVal) {
        var c = doc.colors.itemByName(name);
        if (!c.isValid) {
            c = doc.colors.add({
                name: name,
                model: ColorModel.PROCESS,
                space: ColorSpace.RGB,
                colorValue: colorVal
            });
        }
        return c;
    }

    var cCream = getOrCreateColor("CreamBg", [248, 246, 242]);
    var cSand = getOrCreateColor("SandBg", [239, 236, 230]);
    var cDark = getOrCreateColor("DarkBg", [18, 20, 19]);
    var cWhite = getOrCreateColor("PureWhite", [255, 255, 255]);
    var cInk = getOrCreateColor("InkText", [27, 30, 29]);
    var cInkSoft = getOrCreateColor("InkSoft", [74, 80, 77]);
    var cGold = getOrCreateColor("GoldAccent", [197, 160, 89]);
    var cOlive = getOrCreateColor("OliveDeep", [61, 74, 65]);

    var mLeft = 100;
    var mRight = 100;

    function addBackground(page, color) {
        var rect = page.rectangles.add();
        rect.geometricBounds = [0, 0, 1080, 1920];
        rect.strokeWeight = 0;
        rect.fillColor = color;
        rect.sendToBack();
        return rect;
    }

    function addHeader(page, pageNumStr, isDark) {
        var tf = page.textFrames.add();
        tf.geometricBounds = [45, mLeft, 75, 1920 - mRight];
        tf.contents = "BALI: SACRED HERITAGE  ·  BESPOKE JOURNEY & SERENITY\t" + pageNumStr;
        try {
            tf.paragraphs[0].appliedFont = "Montserrat";
            tf.paragraphs[0].fontStyle = "Medium";
            tf.paragraphs[0].pointSize = 10;
            tf.paragraphs[0].tracking = 180;
            tf.paragraphs[0].fillColor = isDark ? cGold : cOlive;
        } catch(e){}
    }

    // --- PAGE 1: COVER ---
    var p1 = doc.pages[0];
    addBackground(p1, cDark);

    var imgP1 = p1.rectangles.add();
    imgP1.geometricBounds = [0, 0, 1080, 1920];
    imgP1.strokeWeight = 0;
    var fP1 = new File(imagesFolder + "bali_hero.jpg");
    if (fP1.exists) {
        imgP1.place(fP1);
        imgP1.fit(FitOptions.FILL_PROPORTIONALLY);
        imgP1.fit(FitOptions.CENTER_CONTENT);
    }
    
    var overlayP1 = p1.rectangles.add();
    overlayP1.geometricBounds = [0, 0, 1080, 1920];
    overlayP1.strokeWeight = 0;
    overlayP1.fillColor = cDark;
    overlayP1.transparencySettings.blendingSettings.opacity = 65;

    var tfP1 = p1.textFrames.add();
    tfP1.geometricBounds = [300, 240, 840, 1680];
    tfP1.contents = "EXCLUSIVE PRIVATE EXPEDITION\r" +
                    "BALI: SACRED HERITAGE\r" +
                    "Bespoke Journey & Serenity\r\r" +
                    "Приватная экспедиция в сердце первозданного острова для ценителей тишины, искусства и подлинной культуры.\r\r" +
                    "CURATED BY VALERY LATYPOV";

    try {
        var p = tfP1.paragraphs;
        p[0].appliedFont = "Montserrat"; p[0].fontStyle = "Bold"; p[0].pointSize = 13; p[0].tracking = 240; p[0].fillColor = cGold; p[0].justification = Justification.CENTER_ALIGN;
        p[1].appliedFont = "Cormorant Garamond"; p[1].fontStyle = "Regular"; p[1].pointSize = 74; p[1].fillColor = cWhite; p[1].spaceAfter = 8; p[1].justification = Justification.CENTER_ALIGN;
        p[2].appliedFont = "Cormorant Garamond"; p[2].fontStyle = "Italic"; p[2].pointSize = 34; p[2].fillColor = cGold; p[2].spaceAfter = 32; p[2].justification = Justification.CENTER_ALIGN;
        p[3].appliedFont = "Montserrat"; p[3].fontStyle = "Light"; p[3].pointSize = 18; p[3].leading = 28; p[3].fillColor = cWhite; p[3].spaceAfter = 44; p[3].justification = Justification.CENTER_ALIGN;
        p[4].appliedFont = "Montserrat"; p[4].fontStyle = "Medium"; p[4].pointSize = 13; p[4].tracking = 200; p[4].fillColor = cGold; p[4].justification = Justification.CENTER_ALIGN;
    } catch(e){}
    logFile.writeln("Page 1 complete");

    // --- PAGE 2: PHILOSOPHY ---
    var p2 = doc.pages[1];
    addBackground(p2, cCream);
    addHeader(p2, "СТРАНИЦА 02 / ФИЛОСОФИЯ", false);

    var tfP2_title = p2.textFrames.add();
    tfP2_title.geometricBounds = [130, mLeft, 260, 960];
    tfP2_title.contents = "Остров в ритме вашего дыхания\r" +
        "Мы исключили из путешествия любую суету, крутые подъёмы и туристические толпы. Бали открывается как закрытый сад — через тишину, ароматы лотосов и утренний свет.";
    try {
        tfP2_title.paragraphs[0].appliedFont = "Cormorant Garamond"; tfP2_title.paragraphs[0].fontStyle = "Bold"; tfP2_title.paragraphs[0].pointSize = 42; tfP2_title.paragraphs[0].fillColor = cInk; tfP2_title.paragraphs[0].spaceAfter = 12;
        tfP2_title.paragraphs[1].appliedFont = "Montserrat"; tfP2_title.paragraphs[1].fontStyle = "Light"; tfP2_title.paragraphs[1].pointSize = 15; tfP2_title.paragraphs[1].leading = 24; tfP2_title.paragraphs[1].fillColor = cInkSoft;
    } catch(e){}

    var pillars2 = [
        { title: "✦ Приватные резиденции", desc: "Проживание на лучших уединённых виллах острова в окружении природы. Просторные личные сады, прохладные бассейны, тишина и безупречный сервис." },
        { title: "✦ Мягкий темп и комфорт", desc: "Персональный комфортабельный автомобиль премиум-класса с водителем. Никакой спешки — каждый день строится вокруг вашего самочувствия, неспешных прогулок в тени и глубокого отдыха." },
        { title: "✦ Спа и восстановление", desc: "Лучшие традиционные балийские массажи, ванны с лепестками цветов, ароматерапия и натуральные масла, возвращающие телу лёгкость, энергию и покой." }
    ];

    for (var i = 0; i < 3; i++) {
        var yCard = 290 + (i * 220);
        var cBox = p2.rectangles.add();
        cBox.geometricBounds = [yCard, mLeft, yCard + 195, 960];
        cBox.fillColor = cWhite;
        cBox.strokeColor = cGold;
        cBox.strokeWeight = 1;

        var tfCard = p2.textFrames.add();
        tfCard.geometricBounds = [yCard + 20, mLeft + 30, yCard + 175, 930];
        tfCard.contents = pillars2[i].title + "\r" + pillars2[i].desc;
        try {
            tfCard.paragraphs[0].appliedFont = "Cormorant Garamond"; tfCard.paragraphs[0].fontStyle = "Bold"; tfCard.paragraphs[0].pointSize = 22; tfCard.paragraphs[0].fillColor = cInk; tfCard.paragraphs[0].spaceAfter = 8;
            tfCard.paragraphs[1].appliedFont = "Montserrat"; tfCard.paragraphs[1].fontStyle = "Regular"; tfCard.paragraphs[1].pointSize = 13.5; tfCard.paragraphs[1].leading = 21; tfCard.paragraphs[1].fillColor = cInkSoft;
        } catch(e){}
    }

    var imgP2 = p2.rectangles.add();
    imgP2.geometricBounds = [130, 1020, 960, 1920 - mRight];
    imgP2.strokeWeight = 0;
    var fP2 = new File(imagesFolder + "bali_nature.jpg");
    if (fP2.exists) {
        imgP2.place(fP2);
        imgP2.fit(FitOptions.FILL_PROPORTIONALLY);
        imgP2.fit(FitOptions.CENTER_CONTENT);
    }
    logFile.writeln("Page 2 complete");

    // --- PAGE 3: CULTURE & WATER ---
    var p3 = doc.pages[2];
    addBackground(p3, cSand);
    addHeader(p3, "СТРАНИЦА 03 / КУЛЬТУРА И ВОДА", false);

    var imgP3 = p3.rectangles.add();
    imgP3.geometricBounds = [130, mLeft, 960, 960];
    imgP3.strokeWeight = 0;
    var fP3 = new File(imagesFolder + "bali_water.jpg");
    if (fP3.exists) {
        imgP3.place(fP3);
        imgP3.fit(FitOptions.FILL_PROPORTIONALLY);
        imgP3.fit(FitOptions.CENTER_CONTENT);
    }

    var tfP3_title = p3.textFrames.add();
    tfP3_title.geometricBounds = [130, 1020, 260, 1920 - mRight];
    tfP3_title.contents = "Величие королей и сакральные источники\r" +
        "Прикосновение к древней культуре острова без религиозного фанатизма — через гармонию архитектуры, воду и тысячелетние традиции.";
    try {
        tfP3_title.paragraphs[0].appliedFont = "Cormorant Garamond"; tfP3_title.paragraphs[0].fontStyle = "Bold"; tfP3_title.paragraphs[0].pointSize = 40; tfP3_title.paragraphs[0].fillColor = cInk; tfP3_title.paragraphs[0].spaceAfter = 12;
        tfP3_title.paragraphs[1].appliedFont = "Montserrat"; tfP3_title.paragraphs[1].fontStyle = "Light"; tfP3_title.paragraphs[1].pointSize = 15; tfP3_title.paragraphs[1].leading = 24; tfP3_title.paragraphs[1].fillColor = cInkSoft;
    } catch(e){}

    var pillars3 = [
        { title: "✦ Водные дворцы Карангасема (Тирта Ганга и Таман Уджунг)", desc: "Утренняя прогулка по каменным дорожкам среди фонтанов и священных карпов в часы, когда дворцы открыты только для вас." },
        { title: "✦ Храмы в тени древних баньянов", desc: "Камерные, спрятанные от посторонних глаз святилища Восточного Бали, хранящие дух и эстетику старого королевства." },
        { title: "✦ Тёплое благословение старейшины", desc: "Приватная встреча с балийским брахманом. Красивый и мягкий традиционный ритуал с цветами и благовониями на мир в душе, здоровье и гармонию семьи." }
    ];

    for (var j = 0; j < 3; j++) {
        var yCard3 = 290 + (j * 220);
        var cBox3 = p3.rectangles.add();
        cBox3.geometricBounds = [yCard3, 1020, yCard3 + 195, 1920 - mRight];
        cBox3.fillColor = cWhite;
        cBox3.strokeColor = cGold;
        cBox3.strokeWeight = 1;

        var tfCard3 = p3.textFrames.add();
        tfCard3.geometricBounds = [yCard3 + 20, 1050, yCard3 + 175, 1920 - mRight - 30];
        tfCard3.contents = pillars3[j].title + "\r" + pillars3[j].desc;
        try {
            tfCard3.paragraphs[0].appliedFont = "Cormorant Garamond"; tfCard3.paragraphs[0].fontStyle = "Bold"; tfCard3.paragraphs[0].pointSize = 20; tfCard3.paragraphs[0].fillColor = cInk; tfCard3.paragraphs[0].spaceAfter = 8;
            tfCard3.paragraphs[1].appliedFont = "Montserrat"; tfCard3.paragraphs[1].fontStyle = "Regular"; tfCard3.paragraphs[1].pointSize = 13.5; tfCard3.paragraphs[1].leading = 21; tfCard3.paragraphs[1].fillColor = cInkSoft;
        } catch(e){}
    }
    logFile.writeln("Page 3 complete");

    // --- PAGE 4: AESTHETICS ---
    var p4 = doc.pages[3];
    addBackground(p4, cCream);
    addHeader(p4, "СТРАНИЦА 04 / ЭСТЕТИКА И ИСКУССТВО", false);

    var tfP4_title = p4.textFrames.add();
    tfP4_title.geometricBounds = [130, mLeft, 260, 960];
    tfP4_title.contents = "Эстетика каждого мгновения\r" +
        "Бали — это остров ремесленников высочайшего класса, тихих закатов и первозданной природы.";
    try {
        tfP4_title.paragraphs[0].appliedFont = "Cormorant Garamond"; tfP4_title.paragraphs[0].fontStyle = "Bold"; tfP4_title.paragraphs[0].pointSize = 42; tfP4_title.paragraphs[0].fillColor = cInk; tfP4_title.paragraphs[0].spaceAfter = 12;
        tfP4_title.paragraphs[1].appliedFont = "Montserrat"; tfP4_title.paragraphs[1].fontStyle = "Light"; tfP4_title.paragraphs[1].pointSize = 15; tfP4_title.paragraphs[1].leading = 24; tfP4_title.paragraphs[1].fillColor = cInkSoft;
    } catch(e){}

    var pillars4 = [
        { title: "✦ Чайные церемонии и частные галереи", desc: "Знакомство с потомственными резчиками по дереву, ткачами батика и мастерами ювелирного искусства в их закрытых мастерских." },
        { title: "✦ Закаты над океаном", desc: "Ужины со свежими морепродуктами и авторской кухней на открытых террасах с панорамным видом на Индийский океан." },
        { title: "✦ Авторская фотолетопись", desc: "Я деликатно и ненавязчиво сопровождаю вас на маршруте, создавая коллекцию кинематографичных портретов на память об этой поездке — в естественной красоте момента, без утомительного позирования." }
    ];

    for (var k = 0; k < 3; k++) {
        var yCard4 = 290 + (k * 220);
        var cBox4 = p4.rectangles.add();
        cBox4.geometricBounds = [yCard4, mLeft, yCard4 + 195, 960];
        cBox4.fillColor = cWhite;
        cBox4.strokeColor = cGold;
        cBox4.strokeWeight = 1;

        var tfCard4 = p4.textFrames.add();
        tfCard4.geometricBounds = [yCard4 + 20, mLeft + 30, yCard4 + 175, 930];
        tfCard4.contents = pillars4[k].title + "\r" + pillars4[k].desc;
        try {
            tfCard4.paragraphs[0].appliedFont = "Cormorant Garamond"; tfCard4.paragraphs[0].fontStyle = "Bold"; tfCard4.paragraphs[0].pointSize = 21; tfCard4.paragraphs[0].fillColor = cInk; tfCard4.paragraphs[0].spaceAfter = 8;
            tfCard4.paragraphs[1].appliedFont = "Montserrat"; tfCard4.paragraphs[1].fontStyle = "Regular"; tfCard4.paragraphs[1].pointSize = 13.5; tfCard4.paragraphs[1].leading = 21; tfCard4.paragraphs[1].fillColor = cInkSoft;
        } catch(e){}
    }

    var imgP4 = p4.rectangles.add();
    imgP4.geometricBounds = [130, 1020, 960, 1920 - mRight];
    imgP4.strokeWeight = 0;
    var fP4 = new File(imagesFolder + "bali_scene2.jpg");
    if (fP4.exists) {
        imgP4.place(fP4);
        imgP4.fit(FitOptions.FILL_PROPORTIONALLY);
        imgP4.fit(FitOptions.CENTER_CONTENT);
    }
    logFile.writeln("Page 4 complete");

    // --- PAGE 5: PERSONAL FORMAT ---
    var p5 = doc.pages[4];
    addBackground(p5, cDark);
    addHeader(p5, "СТРАНИЦА 05 / ПЕРСОНАЛЬНЫЙ ФОРМАТ", true);

    var card5 = p5.rectangles.add();
    card5.geometricBounds = [140, 360, 980, 1560];
    card5.fillColor = cCream;
    card5.strokeWeight = 1;
    card5.strokeColor = cGold;

    var tf5 = p5.textFrames.add();
    tf5.geometricBounds = [200, 420, 920, 1500];
    tf5.contents = "Путешествие, созданное исключительно для вас\r\r" +
        "Экспедиция создаётся в единственном экземпляре для двух гостей. Мы согласовываем удобные для вас даты, длительность и локации так, чтобы поездка стала абсолютно безопасным, красивым и наполняющим отдыхом.\r\r" +
        "ВИДЕО-ВПЕЧАТЛЕНИЯ ОБ ОСТРОВЕ:\r" +
        "▶  Погрузиться в атмосферу утреннего Бали\r" +
        "▶  Водные дворцы и сакральные места\r\r" +
        "Давайте устроим короткий видеозвонок или чашку чая онлайн: я отвечу на любые вопросы о комфорте и безопасности, и мы начнём собирать ваш персональный маршрут.\r\r" +
        "ВАЛЕРИЙ ЛАТЫПОВ\r" +
        "Telegram / WhatsApp: +7 (985) 224-67-89  ·  @latypov_valery";

    try {
        var p5Arr = tf5.paragraphs;
        p5Arr[0].appliedFont = "Cormorant Garamond"; p5Arr[0].fontStyle = "Bold"; p5Arr[0].pointSize = 42; p5Arr[0].fillColor = cInk; p5Arr[0].justification = Justification.CENTER_ALIGN;
        p5Arr[1].appliedFont = "Montserrat"; p5Arr[1].fontStyle = "Regular"; p5Arr[1].pointSize = 15; p5Arr[1].leading = 24; p5Arr[1].fillColor = cInkSoft; p5Arr[1].justification = Justification.CENTER_ALIGN;
        p5Arr[2].appliedFont = "Montserrat"; p5Arr[2].fontStyle = "Bold"; p5Arr[2].pointSize = 12; p5Arr[2].tracking = 160; p5Arr[2].fillColor = cGold; p5Arr[2].justification = Justification.CENTER_ALIGN;
        p5Arr[3].appliedFont = "Montserrat"; p5Arr[3].fontStyle = "Medium"; p5Arr[3].pointSize = 14; p5Arr[3].fillColor = cOlive; p5Arr[3].justification = Justification.CENTER_ALIGN;
        p5Arr[4].appliedFont = "Montserrat"; p5Arr[4].fontStyle = "Medium"; p5Arr[4].pointSize = 14; p5Arr[4].fillColor = cOlive; p5Arr[4].justification = Justification.CENTER_ALIGN;
        p5Arr[5].appliedFont = "Montserrat"; p5Arr[5].fontStyle = "Regular"; p5Arr[5].pointSize = 16; p5Arr[5].leading = 26; p5Arr[5].fillColor = cInk; p5Arr[5].justification = Justification.CENTER_ALIGN;
        p5Arr[6].appliedFont = "Cormorant Garamond"; p5Arr[6].fontStyle = "Bold"; p5Arr[6].pointSize = 28; p5Arr[6].fillColor = cInk; p5Arr[6].justification = Justification.CENTER_ALIGN;
        p5Arr[7].appliedFont = "Montserrat"; p5Arr[7].fontStyle = "Medium"; p5Arr[7].pointSize = 14; p5Arr[7].tracking = 100; p5Arr[7].fillColor = cGold; p5Arr[7].justification = Justification.CENTER_ALIGN;
    } catch(e){}
    logFile.writeln("Page 5 complete");

    var saveFile = new File(desktopPath + "/Bali_Sacred_Heritage_Deck.indd");
    doc.save(saveFile);
    logFile.writeln("File saved: " + saveFile.fsName);

    app.scriptPreferences.enableRedraw = true;
} catch(e) {
    logFile.writeln("FATAL ERROR: " + e.message + " line: " + e.line);
}
logFile.close();
