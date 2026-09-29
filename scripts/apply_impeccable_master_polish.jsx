#target indesign

// =============================================================================
// IMPECCABLE MASTER POLISH & LAYOUT PASS (CRESCO / UHNW MONOGRAPH)
// Applies optical kerning, optical margin alignment, non-breaking spaces,
// golden-ratio layout geometry, and flawless micro-typography across all 5 pages.
// =============================================================================

function applyMasterPolish() {
    var desktopPath = Folder.desktop.fsName;
    var doc = null;

    if (app.documents.length > 0) {
        doc = app.activeDocument;
    } else {
        var docFile = new File(desktopPath + "/Bali_Sacred_Heritage_Deck.indd");
        if (docFile.exists) doc = app.open(docFile);
        else return "Doc not found";
    }

    // Palette Tokens
    function getColor(name, rgb) {
        var c = doc.colors.itemByName(name);
        if (!c.isValid) {
            c = doc.colors.add({
                name: name,
                model: ColorModel.PROCESS,
                space: ColorSpace.RGB,
                colorValue: rgb
            });
        }
        return c;
    }

    var cGalleryWhite = getColor("GalleryWhite", [252, 252, 250]); // #FCFCFA
    var cObsidian     = getColor("ObsidianInk", [14, 16, 15]);      // #0E100F
    var cCharcoal     = getColor("CharcoalSoft", [68, 74, 71]);    // #444A47
    var cGoldAccent   = getColor("MutedGold", [180, 145, 95]);     // #B4915F
    var cHairline     = getColor("HairlineRule", [220, 218, 212]); // #DCDAD4

    var fHead = "Tenor Sans";
    var fBody = "Manrope";

    try {
        if (!app.fonts.itemByName(fHead + "\tRegular").isValid) fHead = "Inter";
    } catch(e) { fHead = "Inter"; }

    try {
        if (!app.fonts.itemByName(fBody + "\tRegular").isValid) fBody = "Inter";
    } catch(e) { fBody = "Inter"; }

    // Helper: Russian typographic non-breaking spaces for prepositions
    function bindRussianPrepositions(str) {
        var preps = ["в", "во", "на", "с", "со", "по", "из", "изо", "для", "от", "ото", "до", "без", "не", "ни", "но", "и", "а", "к", "ко", "у", "о", "об", "обо"];
        for (var i = 0; i < preps.length; i++) {
            var p = preps[i];
            // Case-insensitive match at start or after space
            var reg = new RegExp("(^|\\s)(" + p + ")\\s+", "gi");
            str = str.replace(reg, "$1$2\u00A0");
        }
        return str;
    }

    // 1. Process Stories: Optical Margin Alignment & Optical Kerning
    for (var s = 0; s < doc.stories.length; s++) {
        var story = doc.stories[s];
        try {
            story.opticalMarginAlignment = true;
            story.opticalMarginSize = 14;
        } catch(e){}
    }

    // =========================================================================
    // PAGE 1: COVER POLISH
    // =========================================================================
    var p1 = doc.pages[0];
    
    // Background
    for (var r = 0; r < p1.rectangles.length; r++) {
        var gb = p1.rectangles[r].geometricBounds;
        if (gb[0] <= 10 && gb[1] <= 10 && gb[2] >= 1000) {
            p1.rectangles[r].fillColor = cGalleryWhite;
        }
    }

    // Cover Typography Frame
    var tf1 = p1.textFrames[0];
    tf1.geometricBounds = [85, 120, 440, 1800];
    try {
        var p1Arr = tf1.paragraphs;
        if (p1Arr.length > 0) {
            // Kicker
            p1Arr[0].appliedFont = app.fonts.itemByName(fBody + "\tBold");
            p1Arr[0].pointSize = 11;
            p1Arr[0].tracking = 240;
            p1Arr[0].fillColor = cGoldAccent;
            p1Arr[0].spaceAfter = 14;
            p1Arr[0].justification = Justification.CENTER_ALIGN;
            try { p1Arr[0].kerningMethod = "Optical"; } catch(e){}
        }
        if (p1Arr.length > 1) {
            // Title
            p1Arr[1].appliedFont = app.fonts.itemByName(fHead + "\tRegular");
            p1Arr[1].pointSize = 54;
            p1Arr[1].leading = 62;
            p1Arr[1].tracking = 50;
            p1Arr[1].fillColor = cObsidian;
            p1Arr[1].spaceAfter = 10;
            p1Arr[1].justification = Justification.CENTER_ALIGN;
            try { p1Arr[1].kerningMethod = "Optical"; } catch(e){}
        }
        if (p1Arr.length > 2) {
            // Subtitle
            p1Arr[2].appliedFont = app.fonts.itemByName(fHead + "\tRegular");
            p1Arr[2].pointSize = 20;
            p1Arr[2].leading = 28;
            p1Arr[2].tracking = 40;
            p1Arr[2].fillColor = cGoldAccent;
            p1Arr[2].spaceAfter = 22;
            p1Arr[2].justification = Justification.CENTER_ALIGN;
            try { p1Arr[2].kerningMethod = "Optical"; } catch(e){}
        }
        if (p1Arr.length > 3) {
            // Lead
            p1Arr[3].appliedFont = app.fonts.itemByName(fBody + "\tRegular");
            p1Arr[3].pointSize = 14.5;
            p1Arr[3].leading = 23;
            p1Arr[3].fillColor = cCharcoal;
            p1Arr[3].spaceAfter = 18;
            p1Arr[3].justification = Justification.CENTER_ALIGN;
            p1Arr[3].contents = bindRussianPrepositions(p1Arr[3].contents);
            try { p1Arr[3].kerningMethod = "Optical"; } catch(e){}
        }
        if (p1Arr.length > 4) {
            // Author
            p1Arr[4].appliedFont = app.fonts.itemByName(fBody + "\tMedium");
            p1Arr[4].pointSize = 11.5;
            p1Arr[4].tracking = 180;
            p1Arr[4].fillColor = cObsidian;
            p1Arr[4].justification = Justification.CENTER_ALIGN;
            try { p1Arr[4].kerningMethod = "Optical"; } catch(e){}
        }
    } catch(e){}

    // 5 Photos at bottom: micro-aligned with 18pt margins & gutters
    var p1Photos = [];
    for (var r = 0; r < p1.rectangles.length; r++) {
        if (p1.rectangles[r].allGraphics.length > 0) p1Photos.push(p1.rectangles[r]);
    }
    p1Photos.sort(function(a,b){ return a.geometricBounds[1] - b.geometricBounds[1]; });

    var covY1 = 475, covY2 = 985;
    var covMX = 120, covTotalW = 1920 - (covMX * 2); // 1680
    var covGap = 18;
    var covW = (covTotalW - (covGap * 4)) / 5; // 321.6

    for (var i = 0; i < p1Photos.length; i++) {
        var x1 = covMX + i * (covW + covGap);
        p1Photos[i].geometricBounds = [covY1, x1, covY2, x1 + covW];
        p1Photos[i].strokeWeight = 0;
        p1Photos[i].fit(FitOptions.FILL_PROPORTIONALLY);
        p1Photos[i].fit(FitOptions.CENTER_CONTENT);
    }

    // =========================================================================
    // PAGES 2, 3, 4: SPREADS POLISH (TYPOGRAPHIC RYTHM & HAIRLINE DIVIDERS)
    // =========================================================================
    var pageConfigs = [
        { pIdx: 1, isLeftText: true },
        { pIdx: 2, isLeftText: false },
        { pIdx: 3, isLeftText: true }
    ];

    for (var c = 0; c < pageConfigs.length; c++) {
        var cfg = pageConfigs[c];
        var page = doc.pages[cfg.pIdx];

        // Background
        for (var r = 0; r < page.rectangles.length; r++) {
            var gb = page.rectangles[r].geometricBounds;
            if (gb[0] <= 10 && gb[1] <= 10 && gb[2] >= 1000) {
                page.rectangles[r].fillColor = cGalleryWhite;
            }
        }

        // Layout Geometry
        var mOuter = 120;
        var colW = 800;
        var gutter = 80;

        var colTextX1 = cfg.isLeftText ? mOuter : (mOuter + colW + gutter);
        var colTextX2 = colTextX1 + colW;
        var colImgX1  = cfg.isLeftText ? (mOuter + colW + gutter) : mOuter;
        var colImgX2  = colImgX1 + colW;

        // Position Photo Frame
        for (var r = 0; r < page.rectangles.length; r++) {
            var rect = page.rectangles[r];
            if (rect.allGraphics.length > 0) {
                rect.geometricBounds = [90, colImgX1, 990, colImgX2];
                rect.strokeWeight = 0;
                rect.fit(FitOptions.FILL_PROPORTIONALLY);
                rect.fit(FitOptions.CENTER_CONTENT);
                break;
            }
        }

        // Running Header (Discrete Metadata)
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

        // Section Title & Lead
        for (var t = 0; t < page.textFrames.length; t++) {
            var tf = page.textFrames[t];
            var gb = tf.geometricBounds;
            if (gb[0] >= 100 && gb[0] <= 200 && gb[2] - gb[0] > 100) {
                tf.geometricBounds = [105, colTextX1, 280, colTextX2];
                try {
                    if (tf.paragraphs.length > 0) {
                        var hPara = tf.paragraphs[0];
                        hPara.appliedFont = app.fonts.itemByName(fHead + "\tRegular");
                        hPara.pointSize = 34;
                        hPara.leading = 42;
                        hPara.tracking = 20;
                        hPara.fillColor = cObsidian;
                        hPara.spaceAfter = 14;
                        hPara.contents = bindRussianPrepositions(hPara.contents);
                        try { hPara.kerningMethod = "Optical"; } catch(e){}
                    }
                    if (tf.paragraphs.length > 1) {
                        var lPara = tf.paragraphs[1];
                        lPara.appliedFont = app.fonts.itemByName(fBody + "\tRegular");
                        lPara.pointSize = 14.5;
                        lPara.leading = 23;
                        lPara.fillColor = cCharcoal;
                        lPara.contents = bindRussianPrepositions(lPara.contents);
                        try { lPara.kerningMethod = "Optical"; } catch(e){}
                    }
                } catch(e){}
            }
        }

        // Clean existing graphic lines before re-adding
        for (var gl = page.graphicLines.length - 1; gl >= 0; gl--) {
            try { page.graphicLines[gl].remove(); } catch(e){}
        }

        // The 3 Pillars (Structured layout with 0.35pt hairlines)
        var pillarsTFs = [];
        for (var t = 0; t < page.textFrames.length; t++) {
            var tf = page.textFrames[t];
            if (tf.geometricBounds[0] >= 280) pillarsTFs.push(tf);
        }
        pillarsTFs.sort(function(a,b){ return a.geometricBounds[0] - b.geometricBounds[0]; });

        var startPillarsY = 320;
        var pHeight = 185;
        var pGapY = 35;

        for (var k = 0; k < pillarsTFs.length; k++) {
            var pTF = pillarsTFs[k];
            var curY = startPillarsY + k * (pHeight + pGapY);
            pTF.geometricBounds = [curY, colTextX1, curY + pHeight, colTextX2];

            // Hairline divider above item 2 and 3
            if (k > 0) {
                var line = page.graphicLines.add();
                line.geometricBounds = [curY - (pGapY / 2), colTextX1, curY - (pGapY / 2), colTextX2];
                line.strokeWeight = 0.35;
                line.strokeColor = cHairline;
            }

            try {
                if (pTF.paragraphs.length > 0) {
                    var pt = pTF.paragraphs[0];
                    pt.appliedFont = app.fonts.itemByName(fHead + "\tRegular");
                    pt.pointSize = 19;
                    pt.leading = 25;
                    pt.tracking = 15;
                    pt.fillColor = cObsidian;
                    pt.spaceAfter = 8;
                    pt.contents = bindRussianPrepositions(pt.contents);
                    try { pt.kerningMethod = "Optical"; } catch(e){}
                }
                if (pTF.paragraphs.length > 1) {
                    var pd = pTF.paragraphs[1];
                    pd.appliedFont = app.fonts.itemByName(fBody + "\tRegular");
                    pd.pointSize = 13.5;
                    pd.leading = 21;
                    pd.fillColor = cCharcoal;
                    pd.contents = bindRussianPrepositions(pd.contents);
                    try { pd.kerningMethod = "Optical"; } catch(e){}
                }
            } catch(e){}
        }
    }

    // =========================================================================
    // PAGE 5: CLOSING SPREAD POLISH
    // =========================================================================
    var p5 = doc.pages[4];

    // Clean existing graphic lines on p5
    for (var gl = p5.graphicLines.length - 1; gl >= 0; gl--) {
        try { p5.graphicLines[gl].remove(); } catch(e){}
    }

    for (var t = 0; t < p5.textFrames.length; t++) {
        var tf5 = p5.textFrames[t];
        var gb5 = tf5.geometricBounds;
        if (gb5[0] < 80) {
            // Running header
            tf5.geometricBounds = [45, 120, 75, 1800];
            try {
                tf5.paragraphs[0].appliedFont = app.fonts.itemByName(fBody + "\tMedium");
                tf5.paragraphs[0].pointSize = 9.5;
                tf5.paragraphs[0].tracking = 200;
                tf5.paragraphs[0].fillColor = cGoldAccent;
                tf5.paragraphs[0].justification = Justification.CENTER_ALIGN;
            } catch(e){}
        } else {
            // Master Closing Content
            tf5.geometricBounds = [160, 360, 960, 1560];
            for (var p = 0; p < tf5.paragraphs.length; p++) {
                var para = tf5.paragraphs[p];
                para.justification = Justification.CENTER_ALIGN;
                var txt = para.contents.toString();
                try {
                    para.contents = bindRussianPrepositions(txt);
                    try { para.kerningMethod = "Optical"; } catch(e){}

                    if (txt.indexOf("Путешествие") > -1) {
                        para.appliedFont = app.fonts.itemByName(fHead + "\tRegular");
                        para.pointSize = 36;
                        para.leading = 44;
                        para.tracking = 25;
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

    // Export Master Polished PDF
    var pdfPath = desktopPath + "/Bali_Sacred_Heritage_Master_Polished.pdf";
    var preset = app.pdfExportPresets.item("[High Quality Print]");
    if (!preset.isValid) preset = app.pdfExportPresets.item("[Высококачественная печать]");
    if (!preset.isValid) preset = app.pdfExportPresets.firstItem();
    doc.exportFile(ExportFormat.PDF_TYPE, new File(pdfPath), false, preset);

    return "MASTER_POLISH_SUCCESS: " + pdfPath;
}

var res = applyMasterPolish();
$.writeln(res);
