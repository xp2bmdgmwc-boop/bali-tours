#target indesign

// =============================================================================
// IMPECCABLE DESIGN SYSTEM: BALI SACRED HERITAGE (UHNW MONOGRAPH)
// Elevates the deck from generic card-boxes to world-class editorial craft
// =============================================================================

function applyImpeccable() {
    var desktopPath = Folder.desktop.fsName;
    var imagesFolder = "/Volumes/Genius Art/Antigravity/Bali Tours/images/";
    var doc = null;

    if (app.documents.length > 0) {
        doc = app.activeDocument;
    } else {
        var docFile = new File(desktopPath + "/Bali_Sacred_Heritage_Deck.indd");
        if (docFile.exists) doc = app.open(docFile);
        else return "Document not found";
    }

    // 1. Palette: Precise Architectural Neutrals (No AI Beige, No Slop)
    function getColor(name, rgb) {
        var c = doc.colors.itemByName(name);
        if (!c.isValid) {
            c = doc.colors.add({
                name: name,
                model: ColorModel.PROCESS,
                space: ColorSpace.RGB,
                colorValue: rgb
            });
        } else {
            try { c.colorValue = rgb; } catch(e){}
        }
        return c;
    }

    var cGalleryWhite = getColor("GalleryWhite", [252, 252, 250]); // Pure architectural white #FCFCFA
    var cObsidian = getColor("ObsidianInk", [14, 16, 15]);          // Deepest obsidian black #0E100F
    var cCharcoal = getColor("CharcoalSoft", [68, 74, 71]);        // High-contrast legible body text #444A47 (contrast > 8:1)
    var cGoldAccent = getColor("MutedGold", [180, 145, 95]);       // Restrained warm metallic #B4915F
    var cHairline = getColor("HairlineRule", [220, 218, 212]);     // 0.35pt architectural divider #DCDAD4

    var fHead = "Tenor Sans";
    var fBody = "Manrope";

    try {
        if (!app.fonts.itemByName(fHead + "\tRegular").isValid) fHead = "Inter";
    } catch(e) { fHead = "Inter"; }

    try {
        if (!app.fonts.itemByName(fBody + "\tRegular").isValid) fBody = "Inter";
    } catch(e) { fBody = "Inter"; }

    // =========================================================================
    // PAGE 1: THE MONOGRAPH COVER
    // =========================================================================
    var p1 = doc.pages[0];
    
    // Background
    for (var r = 0; r < p1.rectangles.length; r++) {
        var gb = p1.rectangles[r].geometricBounds;
        if (gb[0] <= 10 && gb[1] <= 10 && gb[2] >= 1000) {
            p1.rectangles[r].fillColor = cGalleryWhite;
            p1.rectangles[r].strokeWeight = 0;
        }
    }

    // Cover Typography (Impeccable proportions, no shouting)
    var tf1 = p1.textFrames[0];
    tf1.geometricBounds = [80, 140, 440, 1780];
    for (var p = 0; p < tf1.paragraphs.length; p++) {
        var para = tf1.paragraphs[p];
        para.justification = Justification.CENTER_ALIGN;
        try {
            if (p === 0) {
                para.appliedFont = app.fonts.itemByName(fBody + "\tBold");
                para.pointSize = 11;
                para.tracking = 260;
                para.fillColor = cGoldAccent;
                para.spaceAfter = 14;
            } else if (p === 1) {
                para.appliedFont = app.fonts.itemByName(fHead + "\tRegular");
                para.pointSize = 52;
                para.leading = 60;
                para.tracking = 60;
                para.fillColor = cObsidian;
                para.spaceAfter = 10;
            } else if (p === 2) {
                para.appliedFont = app.fonts.itemByName(fHead + "\tRegular");
                para.pointSize = 20;
                para.leading = 28;
                para.tracking = 40;
                para.fillColor = cGoldAccent;
                para.spaceAfter = 20;
            } else if (p === 3) {
                para.appliedFont = app.fonts.itemByName(fBody + "\tRegular");
                para.pointSize = 14.5;
                para.leading = 23;
                para.fillColor = cCharcoal;
                para.spaceAfter = 18;
            } else {
                para.appliedFont = app.fonts.itemByName(fBody + "\tMedium");
                para.pointSize = 11.5;
                para.tracking = 160;
                para.fillColor = cObsidian;
            }
        } catch(e){}
    }

    // 5 Photos at bottom: crisp geometric rhythm
    var p1Photos = [];
    for (var r = 0; r < p1.rectangles.length; r++) {
        var rect = p1.rectangles[r];
        if (rect.allGraphics.length > 0) p1Photos.push(rect);
    }
    p1Photos.sort(function(a,b){ return a.geometricBounds[1] - b.geometricBounds[1]; });

    var pY1 = 470, pY2 = 990;
    var mX = 140, totalW = 1920 - (mX * 2); // 1640
    var pGap = 20;
    var pW = (totalW - (pGap * 4)) / 5; // 312

    for (var i = 0; i < p1Photos.length; i++) {
        var x1 = mX + i * (pW + pGap);
        p1Photos[i].geometricBounds = [pY1, x1, pY2, x1 + pW];
        p1Photos[i].strokeWeight = 0;
        p1Photos[i].fit(FitOptions.FILL_PROPORTIONALLY);
        p1Photos[i].fit(FitOptions.CENTER_CONTENT);
    }

    // =========================================================================
    // PAGES 2, 3, 4: EDITORIAL MONOGRAPH SPREADS (NO BOX CARDS!)
    // =========================================================================
    var spreadsData = [
        {
            pageNum: 1, // Page 2
            isLeftText: true,
            title: "Остров в ритме вашего дыхания",
            lead: "Мы исключили любую суету, крутые подъёмы и туристические толпы. Бали открывается как закрытый сад — через тишину, ароматы лотосов и утренний свет.",
            items: [
                { t: "Приватные резиденции", d: "Проживание на лучших уединённых виллах острова в окружении природы. Просторные личные сады, прохладные бассейны, тишина и безупречный сервис." },
                { t: "Мягкий темп и забота", d: "Персональный премиальный автомобиль с водителем. Никакой спешки: каждый день строится вокруг вашего самочувствия, неспешных прогулок в тени и глубокого отдыха." },
                { t: "Спа и восстановление", d: "Традиционные балийские массажи, ванны с лепестками цветов, ароматерапия и натуральные масла, возвращающие телу лёгкость, энергию и покой." }
            ],
            imageFile: "bali_nature.jpg"
        },
        {
            pageNum: 2, // Page 3
            isLeftText: false, // Image on Left, Text on Right
            title: "Величие королей и сакральные источники",
            lead: "Прикосновение к древней культуре острова без религиозного фанатизма — через гармонию архитектуры, воду и тысячелетние традиции.",
            items: [
                { t: "Водные дворцы Карангасема", d: "Утренняя прогулка по каменным дорожкам среди фонтанов и священных карпов в часы, когда дворцы открыты только для вас." },
                { t: "Храмы в тени древних баньянов", d: "Камерные, спрятанные от посторонних глаз святилища Восточного Бали, хранящие дух и эстетику старого королевства." },
                { t: "Тёплое благословение старейшины", d: "Приватная встреча с балийским брахманом. Мягкий традиционный ритуал с цветами и благовониями на мир в душе, здоровье и гармонию семьи." }
            ],
            imageFile: "bali_water.jpg"
        },
        {
            pageNum: 3, // Page 4
            isLeftText: true,
            title: "Эстетика каждого мгновения",
            lead: "Бали — это остров ремесленников высочайшего класса, тихих океанских закатов и первозданной природы.",
            items: [
                { t: "Чайные церемонии и частные галереи", d: "Знакомство с потомственными резчиками по дереву, ткачами батика и мастерами ювелирного искусства в их закрытых мастерских." },
                { t: "Закаты над океаном", d: "Ужины со свежими морепродуктами и авторской кухней на открытых террасах с панорамным видом на Индийский океан." },
                { t: "Авторская фотолетопись", d: "Деликатное сопровождение на маршруте и коллекция кинематографичных портретов на память — в естественной красоте момента, без утомительного позирования." }
            ],
            imageFile: "bali_scene2.jpg"
        }
    ];

    for (var s = 0; s < spreadsData.length; s++) {
        var sData = spreadsData[s];
        var page = doc.pages[sData.pageNum];

        // 1. Clean up background
        for (var r = 0; r < page.rectangles.length; r++) {
            var gb = page.rectangles[r].geometricBounds;
            if (gb[0] <= 10 && gb[1] <= 10 && gb[2] >= 1000) {
                page.rectangles[r].fillColor = cGalleryWhite;
                page.rectangles[r].strokeWeight = 0;
            }
        }

        // Layout columns: 1920 width, 140 margin
        // Left column: 140 to 930 (width 790)
        // Gutter: 60
        // Right column: 990 to 1780 (width 790)
        var colTextX1 = sData.isLeftText ? 140 : 990;
        var colTextX2 = sData.isLeftText ? 930 : 1780;
        var colImgX1  = sData.isLeftText ? 990 : 140;
        var colImgX2  = sData.isLeftText ? 1780 : 930;

        // 2. Position Hero Image
        var pageImg = null;
        for (var r = 0; r < page.rectangles.length; r++) {
            if (page.rectangles[r].allGraphics.length > 0) {
                pageImg = page.rectangles[r];
                break;
            }
        }
        if (pageImg) {
            pageImg.geometricBounds = [100, colImgX1, 980, colImgX2];
            pageImg.strokeWeight = 0;
            pageImg.fit(FitOptions.FILL_PROPORTIONALLY);
            pageImg.fit(FitOptions.CENTER_CONTENT);
        }

        // 3. Remove old card rectangles completely (ANTI-CARD ARCHITECTURE)
        for (var r = page.rectangles.length - 1; r >= 0; r--) {
            var rItem = page.rectangles[r];
            var rGb = rItem.geometricBounds;
            // If it's not the full page background and not an image -> delete it
            if (rItem.allGraphics.length === 0 && !(rGb[0] <= 10 && rGb[1] <= 10 && rGb[2] >= 1000)) {
                try { rItem.remove(); } catch(e){}
            }
        }

        // 4. Running Header (Discreet luxury metadata)
        for (var t = 0; t < page.textFrames.length; t++) {
            var tf = page.textFrames[t];
            if (tf.geometricBounds[0] < 80) {
                tf.geometricBounds = [45, colTextX1, 75, colTextX2];
                try {
                    tf.paragraphs[0].appliedFont = app.fonts.itemByName(fBody + "\tMedium");
                    tf.paragraphs[0].pointSize = 9.5;
                    tf.paragraphs[0].tracking = 200;
                    tf.paragraphs[0].fillColor = cGoldAccent;
                } catch(e){}
            }
        }

        // 5. Section Header & Lead
        for (var t = 0; t < page.textFrames.length; t++) {
            var tf = page.textFrames[t];
            var gb = tf.geometricBounds;
            if (gb[0] >= 100 && gb[0] <= 200 && gb[2] - gb[0] > 100) {
                tf.geometricBounds = [110, colTextX1, 280, colTextX2];
                try {
                    if (tf.paragraphs.length > 0) {
                        tf.paragraphs[0].appliedFont = app.fonts.itemByName(fHead + "\tRegular");
                        tf.paragraphs[0].pointSize = 34;
                        tf.paragraphs[0].leading = 42;
                        tf.paragraphs[0].tracking = 30;
                        tf.paragraphs[0].fillColor = cObsidian;
                        tf.paragraphs[0].spaceAfter = 14;
                    }
                    if (tf.paragraphs.length > 1) {
                        tf.paragraphs[1].appliedFont = app.fonts.itemByName(fBody + "\tRegular");
                        tf.paragraphs[1].pointSize = 15;
                        tf.paragraphs[1].leading = 24;
                        tf.paragraphs[1].fillColor = cCharcoal;
                    }
                } catch(e){}
            }
        }

        // 6. The 3 Editorial Pillars (No cards, pure typographic rhythm with subtle hairline dividers)
        var cardTFs = [];
        for (var t = 0; t < page.textFrames.length; t++) {
            var tf = page.textFrames[t];
            var gb = tf.geometricBounds;
            if (gb[0] >= 280) cardTFs.push(tf);
        }
        cardTFs.sort(function(a,b){ return a.geometricBounds[0] - b.geometricBounds[0]; });

        var startItemY = 320;
        var itemHeight = 190;
        var itemGap = 28;

        for (var k = 0; k < cardTFs.length; k++) {
            var tfItem = cardTFs[k];
            var curY = startItemY + k * (itemHeight + itemGap);
            tfItem.geometricBounds = [curY, colTextX1, curY + itemHeight, colTextX2];

            // Add architectural 0.35pt hairline divider line above items 2 and 3
            if (k > 0) {
                var ruleLine = page.graphicLines.add();
                ruleLine.geometricBounds = [curY - (itemGap / 2), colTextX1, curY - (itemGap / 2), colTextX2];
                ruleLine.strokeWeight = 0.35;
                ruleLine.strokeColor = cHairline;
            }

            try {
                if (tfItem.paragraphs.length > 0) {
                    var titleP = tfItem.paragraphs[0];
                    titleP.appliedFont = app.fonts.itemByName(fHead + "\tRegular");
                    titleP.pointSize = 20;
                    titleP.leading = 26;
                    titleP.tracking = 20;
                    titleP.fillColor = cObsidian;
                    titleP.spaceAfter = 8;
                }
                if (tfItem.paragraphs.length > 1) {
                    var descP = tfItem.paragraphs[1];
                    descP.appliedFont = app.fonts.itemByName(fBody + "\tRegular");
                    descP.pointSize = 13.5;
                    descP.leading = 21;
                    descP.fillColor = cCharcoal;
                }
            } catch(e){}
        }
    }

    // =========================================================================
    // PAGE 5: THE MASTER CLOSING SPREAD (ARCHITECTURAL LUXURY)
    // =========================================================================
    var p5 = doc.pages[4];

    // Background
    for (var r = 0; r < p5.rectangles.length; r++) {
        var gb = p5.rectangles[r].geometricBounds;
        if (gb[0] <= 10 && gb[1] <= 10 && gb[2] >= 1000) {
            p5.rectangles[r].fillColor = cGalleryWhite;
            p5.rectangles[r].strokeWeight = 0;
        }
    }

    // Remove the tacky inner box rectangle
    for (var r = p5.rectangles.length - 1; r >= 0; r--) {
        var rItem = p5.rectangles[r];
        var rGb = rItem.geometricBounds;
        if (rItem.allGraphics.length === 0 && !(rGb[0] <= 10 && rGb[1] <= 10 && rGb[2] >= 1000)) {
            try { rItem.remove(); } catch(e){}
        }
    }

    // Editorial closing container: centered, generous 360px margins
    for (var t = 0; t < p5.textFrames.length; t++) {
        var tf5 = p5.textFrames[t];
        var gb5 = tf5.geometricBounds;
        if (gb5[0] < 80) {
            // Running header
            tf5.geometricBounds = [45, 140, 75, 1780];
            try {
                tf5.paragraphs[0].appliedFont = app.fonts.itemByName(fBody + "\tMedium");
                tf5.paragraphs[0].pointSize = 9.5;
                tf5.paragraphs[0].tracking = 200;
                tf5.paragraphs[0].fillColor = cGoldAccent;
                tf5.paragraphs[0].justification = Justification.CENTER_ALIGN;
            } catch(e){}
        } else {
            // Main closing spread text
            tf5.geometricBounds = [160, 380, 960, 1540];
            for (var p = 0; p < tf5.paragraphs.length; p++) {
                var para = tf5.paragraphs[p];
                para.justification = Justification.CENTER_ALIGN;
                var txt = para.contents.toString();
                try {
                    if (txt.indexOf("Путешествие") > -1) {
                        para.appliedFont = app.fonts.itemByName(fHead + "\tRegular");
                        para.pointSize = 38;
                        para.leading = 46;
                        para.tracking = 30;
                        para.fillColor = cObsidian;
                        para.spaceAfter = 20;
                    } else if (txt.indexOf("Экспедиция создаётся") > -1) {
                        para.appliedFont = app.fonts.itemByName(fBody + "\tRegular");
                        para.pointSize = 15;
                        para.leading = 25;
                        para.fillColor = cCharcoal;
                        para.spaceAfter = 34;
                    } else if (txt.indexOf("ВИДЕО-ВПЕЧАТЛЕНИЯ") > -1) {
                        para.appliedFont = app.fonts.itemByName(fBody + "\tBold");
                        para.pointSize = 11;
                        para.tracking = 200;
                        para.fillColor = cGoldAccent;
                        para.spaceAfter = 12;
                    } else if (txt.indexOf("▶") > -1) {
                        para.appliedFont = app.fonts.itemByName(fBody + "\tMedium");
                        para.pointSize = 14;
                        para.leading = 24;
                        para.fillColor = cObsidian;
                        para.spaceAfter = 8;
                    } else if (txt.indexOf("Давайте устроим") > -1) {
                        para.appliedFont = app.fonts.itemByName(fBody + "\tRegular");
                        para.pointSize = 15;
                        para.leading = 25;
                        para.fillColor = cCharcoal;
                        para.spaceAfter = 32;
                    } else if (txt.indexOf("ВАЛЕРИЙ ЛАТЫПОВ") > -1) {
                        para.appliedFont = app.fonts.itemByName(fHead + "\tRegular");
                        para.pointSize = 22;
                        para.tracking = 100;
                        para.fillColor = cObsidian;
                        para.spaceAfter = 8;
                    } else if (txt.indexOf("Telegram") > -1) {
                        para.appliedFont = app.fonts.itemByName(fBody + "\tMedium");
                        para.pointSize = 13.5;
                        para.tracking = 30;
                        para.fillColor = cGoldAccent;
                    }
                } catch(e){}
            }
        }
    }

    doc.save();

    // Export final Impeccable PDF
    var pdfPath = desktopPath + "/Bali_Sacred_Heritage_Impeccable.pdf";
    var preset = app.pdfExportPresets.item("[High Quality Print]");
    if (!preset.isValid) preset = app.pdfExportPresets.item("[Высококачественная печать]");
    if (!preset.isValid) preset = app.pdfExportPresets.firstItem();
    doc.exportFile(ExportFormat.PDF_TYPE, new File(pdfPath), false, preset);

    return "IMPECCABLE_EXPORTED: " + pdfPath;
}

var res = applyImpeccable();
$.writeln(res);
