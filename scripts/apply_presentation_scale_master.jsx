#target indesign

// =============================================================================
// LUXURY 16:9 WIDESCREEN PRESENTATION TYPOGRAPHY (SCALE REDESIGN)
// Solves "шрифта как кот наплакал": scales type from tiny A5 book size to
// bold, authoritative, readable 1920x1080 luxury presentation format.
// =============================================================================

function applyPresentationScale() {
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

    // Cyrillic Non-Breaking Preposition Binder
    function bindCyrillic(str) {
        var preps = ["в", "во", "на", "с", "со", "по", "из", "изо", "для", "от", "ото", "до", "без", "не", "ни", "но", "и", "а", "к", "ко", "у", "о", "об", "обо"];
        for (var i = 0; i < preps.length; i++) {
            var reg = new RegExp("(^|\\s)(" + preps[i] + ")\\s+", "gi");
            str = str.replace(reg, "$1$2\u00A0");
        }
        return str;
    }

    // Set Optical Margin on all stories
    for (var s = 0; s < doc.stories.length; s++) {
        var story = doc.stories[s];
        try {
            story.opticalMarginAlignment = true;
            story.opticalMarginSize = 18;
        } catch(e){}
    }

    // =========================================================================
    // PAGE 1: COVER PRESENTATION SCALE
    // =========================================================================
    var p1 = doc.pages[0];

    // Background
    for (var r = 0; r < p1.rectangles.length; r++) {
        var gb = p1.rectangles[r].geometricBounds;
        if (gb[0] <= 10 && gb[1] <= 10 && gb[2] >= 1000) {
            p1.rectangles[r].fillColor = cGalleryWhite;
        }
    }

    var tf1 = p1.textFrames[0];
    tf1.geometricBounds = [70, 100, 450, 1820];
    try {
        var p1Arr = tf1.paragraphs;
        if (p1Arr.length > 0) {
            // Eyebrow Kicker: 13pt Bold, tracking +220
            p1Arr[0].appliedFont = app.fonts.itemByName(fBody + "\tBold");
            p1Arr[0].pointSize = 13;
            p1Arr[0].leading = 18;
            p1Arr[0].tracking = 220;
            p1Arr[0].fillColor = cGoldAccent;
            p1Arr[0].spaceAfter = 14;
            p1Arr[0].justification = Justification.CENTER_ALIGN;
            try { p1Arr[0].kerningMethod = "Optical"; } catch(e){}
        }
        if (p1Arr.length > 1) {
            // Main Display H1: 64pt, leading 72pt
            p1Arr[1].appliedFont = app.fonts.itemByName(fHead + "\tRegular");
            p1Arr[1].pointSize = 64;
            p1Arr[1].leading = 72;
            p1Arr[1].tracking = 30;
            p1Arr[1].fillColor = cObsidian;
            p1Arr[1].spaceAfter = 10;
            p1Arr[1].justification = Justification.CENTER_ALIGN;
            try { p1Arr[1].kerningMethod = "Optical"; } catch(e){}
        }
        if (p1Arr.length > 2) {
            // Subtitle: 26pt, leading 34pt
            p1Arr[2].appliedFont = app.fonts.itemByName(fHead + "\tRegular");
            p1Arr[2].pointSize = 26;
            p1Arr[2].leading = 34;
            p1Arr[2].tracking = 30;
            p1Arr[2].fillColor = cGoldAccent;
            p1Arr[2].spaceAfter = 20;
            p1Arr[2].justification = Justification.CENTER_ALIGN;
            try { p1Arr[2].kerningMethod = "Optical"; } catch(e){}
        }
        if (p1Arr.length > 3) {
            // Lead statement: 18pt, leading 28pt
            p1Arr[3].appliedFont = app.fonts.itemByName(fBody + "\tRegular");
            p1Arr[3].pointSize = 18;
            p1Arr[3].leading = 28;
            p1Arr[3].tracking = 10;
            p1Arr[3].fillColor = cCharcoal;
            p1Arr[3].spaceAfter = 16;
            p1Arr[3].justification = Justification.CENTER_ALIGN;
            p1Arr[3].contents = bindCyrillic(p1Arr[3].contents);
            try { p1Arr[3].kerningMethod = "Optical"; } catch(e){}
        }
        if (p1Arr.length > 4) {
            // Curated signature: 13pt Medium, tracking +180
            p1Arr[4].appliedFont = app.fonts.itemByName(fBody + "\tMedium");
            p1Arr[4].pointSize = 13;
            p1Arr[4].leading = 18;
            p1Arr[4].tracking = 180;
            p1Arr[4].fillColor = cObsidian;
            p1Arr[4].justification = Justification.CENTER_ALIGN;
            try { p1Arr[4].kerningMethod = "Optical"; } catch(e){}
        }
    } catch(e){}

    // 5 Photos at bottom
    var p1Photos = [];
    for (var r = 0; r < p1.rectangles.length; r++) {
        if (p1.rectangles[r].allGraphics.length > 0) p1Photos.push(p1.rectangles[r]);
    }
    p1Photos.sort(function(a,b){ return a.geometricBounds[1] - b.geometricBounds[1]; });

    var covY1 = 480, covY2 = 990;
    var covMX = 100, covTotalW = 1920 - (covMX * 2); // 1720
    var covGap = 16;
    var covW = (covTotalW - (covGap * 4)) / 5; // 331.2

    for (var i = 0; i < p1Photos.length; i++) {
        var x1 = covMX + i * (covW + covGap);
        p1Photos[i].geometricBounds = [covY1, x1, covY2, x1 + covW];
        p1Photos[i].strokeWeight = 0;
        p1Photos[i].fit(FitOptions.FILL_PROPORTIONALLY);
        p1Photos[i].fit(FitOptions.CENTER_CONTENT);
    }

    // =========================================================================
    // PAGES 2, 3, 4: BOLD EDITORIAL SPREADS (LEGIBLE & RICH)
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

        // Layout Geometry: 1920 width
        // Left column width: 880 (rich, expanded typography area)
        // Gutter: 60
        // Right column width: 840 (commanding photograph)
        var mOuter = 90;
        var colTextW = 890;
        var colImgW  = 830;
        var gutter   = 60;

        var colTextX1 = cfg.isLeftText ? mOuter : (mOuter + colImgW + gutter);
        var colTextX2 = colTextX1 + colTextW;
        var colImgX1  = cfg.isLeftText ? (mOuter + colTextW + gutter) : mOuter;
        var colImgX2  = colImgX1 + colImgW;

        // Position Photo Frame: Y 80 to 1000 (height 920pt)
        for (var r = 0; r < page.rectangles.length; r++) {
            var rect = page.rectangles[r];
            if (rect.allGraphics.length > 0) {
                rect.geometricBounds = [80, colImgX1, 1000, colImgX2];
                rect.strokeWeight = 0;
                rect.fit(FitOptions.FILL_PROPORTIONALLY);
                rect.fit(FitOptions.CENTER_CONTENT);
                break;
            }
        }

        // Running Header (Discrete metadata at top)
        for (var t = 0; t < page.textFrames.length; t++) {
            var tf = page.textFrames[t];
            if (tf.geometricBounds[0] < 80) {
                tf.geometricBounds = [40, colTextX1, 70, colTextX2];
                try {
                    tf.paragraphs[0].appliedFont = app.fonts.itemByName(fBody + "\tMedium");
                    tf.paragraphs[0].pointSize = 11;
                    tf.paragraphs[0].leading = 16;
                    tf.paragraphs[0].tracking = 200;
                    tf.paragraphs[0].fillColor = cGoldAccent;
                } catch(e){}
            }
        }

        // Section Title & Lead (Bold Presentation Scale!)
        for (var t = 0; t < page.textFrames.length; t++) {
            var tf = page.textFrames[t];
            var gb = tf.geometricBounds;
            if (gb[0] >= 80 && gb[0] <= 200 && gb[2] - gb[0] > 100) {
                tf.geometricBounds = [90, colTextX1, 310, colTextX2];
                try {
                    if (tf.paragraphs.length > 0) {
                        var hPara = tf.paragraphs[0];
                        // Scaled from 34pt -> 48pt!
                        hPara.appliedFont = app.fonts.itemByName(fHead + "\tRegular");
                        hPara.pointSize = 48;
                        hPara.leading = 56;
                        hPara.tracking = 15;
                        hPara.fillColor = cObsidian;
                        hPara.spaceAfter = 14;
                        hPara.contents = bindCyrillic(hPara.contents);
                        try { hPara.kerningMethod = "Optical"; } catch(e){}
                    }
                    if (tf.paragraphs.length > 1) {
                        var lPara = tf.paragraphs[1];
                        // Scaled from 14.5pt -> 20pt!
                        lPara.appliedFont = app.fonts.itemByName(fBody + "\tRegular");
                        lPara.pointSize = 20;
                        lPara.leading = 30;
                        lPara.tracking = 5;
                        lPara.fillColor = cCharcoal;
                        lPara.contents = bindCyrillic(lPara.contents);
                        try { lPara.kerningMethod = "Optical"; } catch(e){}
                    }
                } catch(e){}
            }
        }

        // Clean existing graphic lines
        for (var gl = page.graphicLines.length - 1; gl >= 0; gl--) {
            try { page.graphicLines[gl].remove(); } catch(e){}
        }

        // The 3 Pillars (Scaled up from miniature text to rich readable blocks)
        var pillarsTFs = [];
        for (var t = 0; t < page.textFrames.length; t++) {
            var tf = page.textFrames[t];
            if (tf.geometricBounds[0] >= 280) pillarsTFs.push(tf);
        }
        pillarsTFs.sort(function(a,b){ return a.geometricBounds[0] - b.geometricBounds[0]; });

        // Vertical distribution: start at 330, end at 990 (total height = 660)
        // 3 items with height 195pt each, gap 35pt
        var startPillarsY = 330;
        var pHeight = 195;
        var pGapY = 35;

        for (var k = 0; k < pillarsTFs.length; k++) {
            var pTF = pillarsTFs[k];
            var curY = startPillarsY + k * (pHeight + pGapY);
            pTF.geometricBounds = [curY, colTextX1, curY + pHeight, colTextX2];

            // Hairline divider above item 2 and 3
            if (k > 0) {
                var line = page.graphicLines.add();
                line.geometricBounds = [curY - (pGapY / 2), colTextX1, curY - (pGapY / 2), colTextX2];
                line.strokeWeight = 0.5;
                line.strokeColor = cHairline;
            }

            try {
                if (pTF.paragraphs.length > 0) {
                    var pt = pTF.paragraphs[0];
                    // Scaled from 19pt -> 26pt!
                    pt.appliedFont = app.fonts.itemByName(fHead + "\tRegular");
                    pt.pointSize = 26;
                    pt.leading = 34;
                    pt.tracking = 15;
                    pt.fillColor = cObsidian;
                    pt.spaceAfter = 8;
                    pt.contents = bindCyrillic(pt.contents);
                    try { pt.kerningMethod = "Optical"; } catch(e){}
                }
                if (pTF.paragraphs.length > 1) {
                    var pd = pTF.paragraphs[1];
                    // Scaled from 13.5pt -> 18pt!
                    pd.appliedFont = app.fonts.itemByName(fBody + "\tRegular");
                    pd.pointSize = 18;
                    pd.leading = 27;
                    pd.tracking = 5;
                    pd.fillColor = cCharcoal;
                    pd.contents = bindCyrillic(pd.contents);
                    try { pd.kerningMethod = "Optical"; } catch(e){}
                }
            } catch(e){}
        }
    }

    // =========================================================================
    // PAGE 5: CLOSING SPREAD PRESENTATION SCALE
    // =========================================================================
    var p5 = doc.pages[4];

    for (var gl = p5.graphicLines.length - 1; gl >= 0; gl--) {
        try { p5.graphicLines[gl].remove(); } catch(e){}
    }

    for (var t = 0; t < p5.textFrames.length; t++) {
        var tf5 = p5.textFrames[t];
        var gb5 = tf5.geometricBounds;
        if (gb5[0] < 80) {
            // Running header
            tf5.geometricBounds = [40, 100, 70, 1820];
            try {
                tf5.paragraphs[0].appliedFont = app.fonts.itemByName(fBody + "\tMedium");
                tf5.paragraphs[0].pointSize = 11;
                tf5.paragraphs[0].leading = 16;
                tf5.paragraphs[0].tracking = 200;
                tf5.paragraphs[0].fillColor = cGoldAccent;
                tf5.paragraphs[0].justification = Justification.CENTER_ALIGN;
            } catch(e){}
        } else {
            // Main Closing Spread (Centered luxury architecture, fully readable)
            tf5.geometricBounds = [110, 260, 990, 1660];
            for (var p = 0; p < tf5.paragraphs.length; p++) {
                var para = tf5.paragraphs[p];
                para.justification = Justification.CENTER_ALIGN;
                var txt = para.contents.toString();
                try {
                    para.contents = bindCyrillic(txt);
                    try { para.kerningMethod = "Optical"; } catch(e){}

                    if (txt.indexOf("Путешествие") > -1) {
                        // Title: 48pt, leading 58pt
                        para.appliedFont = app.fonts.itemByName(fHead + "\tRegular");
                        para.pointSize = 48;
                        para.leading = 58;
                        para.tracking = 20;
                        para.fillColor = cObsidian;
                        para.spaceAfter = 20;
                    } else if (txt.indexOf("Экспедиция создаётся") > -1) {
                        // Lead: 22pt, leading 34pt
                        para.appliedFont = app.fonts.itemByName(fBody + "\tRegular");
                        para.pointSize = 22;
                        para.leading = 34;
                        para.fillColor = cCharcoal;
                        para.spaceAfter = 36;
                    } else if (txt.indexOf("ВИДЕО-ВПЕЧАТЛЕНИЯ") > -1) {
                        // Video Kicker: 14pt, tracking 220
                        para.appliedFont = app.fonts.itemByName(fBody + "\tBold");
                        para.pointSize = 14;
                        para.leading = 20;
                        para.tracking = 220;
                        para.fillColor = cGoldAccent;
                        para.spaceAfter = 14;
                    } else if (txt.indexOf("▶") > -1) {
                        // Video links: 19pt, leading 30pt
                        para.appliedFont = app.fonts.itemByName(fBody + "\tMedium");
                        para.pointSize = 19;
                        para.leading = 30;
                        para.fillColor = cObsidian;
                        para.spaceAfter = 10;
                    } else if (txt.indexOf("Давайте устроим") > -1) {
                        // Call to action: 21pt, leading 32pt
                        para.appliedFont = app.fonts.itemByName(fBody + "\tRegular");
                        para.pointSize = 21;
                        para.leading = 32;
                        para.fillColor = cCharcoal;
                        para.spaceAfter = 36;
                    } else if (txt.indexOf("ВАЛЕРИЙ ЛАТЫПОВ") > -1) {
                        // Author: 28pt, leading 36pt, tracking 100
                        para.appliedFont = app.fonts.itemByName(fHead + "\tRegular");
                        para.pointSize = 28;
                        para.leading = 36;
                        para.tracking = 100;
                        para.fillColor = cObsidian;
                        para.spaceAfter = 10;
                    } else if (txt.indexOf("Telegram") > -1) {
                        // Contacts: 18pt, leading 26pt, tracking 30
                        para.appliedFont = app.fonts.itemByName(fBody + "\tMedium");
                        para.pointSize = 18;
                        para.leading = 26;
                        para.tracking = 30;
                        para.fillColor = cGoldAccent;
                    }
                } catch(e){}
            }
        }
    }

    doc.save();

    // Export Master Polished PDF (Clean overwrite, Rule 24 compliant)
    var pdfPath = desktopPath + "/Bali_Sacred_Heritage_Master_Polished.pdf";
    var preset = app.pdfExportPresets.item("[High Quality Print]");
    if (!preset.isValid) preset = app.pdfExportPresets.item("[Высококачественная печать]");
    if (!preset.isValid) preset = app.pdfExportPresets.firstItem();
    doc.exportFile(ExportFormat.PDF_TYPE, new File(pdfPath), false, preset);

    return "PRESENTATION_SCALE_SUCCESS: " + pdfPath;
}

var res = applyPresentationScale();
$.writeln(res);
