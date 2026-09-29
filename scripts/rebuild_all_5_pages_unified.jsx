#target indesign

function runFullRebuild() {
    var desktopPath = Folder.desktop.fsName;
    var log = [];

    var doc = null;
    if (app.documents.length > 0) {
        doc = app.activeDocument;
    } else {
        var docFile = new File(desktopPath + "/Bali_Sacred_Heritage_Deck.indd");
        if (docFile.exists) {
            doc = app.open(docFile);
        } else {
            return "File not found: " + docFile.fsName;
        }
    }

    log.push("Working on doc: " + doc.name + " (" + doc.pages.length + " pages)");

    // 1. Swatches Setup
    function getOrCreateColor(name, colorVal) {
        var c = doc.colors.itemByName(name);
        if (!c.isValid) {
            try {
                c = doc.colors.add({
                    name: name,
                    model: ColorModel.PROCESS,
                    space: ColorSpace.RGB,
                    colorValue: colorVal
                });
            } catch(e) {
                c = doc.colors.firstItem();
            }
        }
        return c;
    }

    var cPaper = getOrCreateColor("EditorialPaper", [250, 249, 246]);   // Warm editorial paper #FAF9F6
    var cCardWhite = getOrCreateColor("CardWhite", [255, 255, 255]);     // Pure white cards
    var cInk = getOrCreateColor("ObsidianInk", [18, 20, 19]);           // Obsidian ink #121413
    var cInkSoft = getOrCreateColor("InkSoftMuted", [92, 98, 95]);      // Secondary text
    var cGoldMuted = getOrCreateColor("WarmGoldMuted", [184, 150, 98]); // Subtle warm gold
    var cLineGrey = getOrCreateColor("HairlineGrey", [225, 222, 215]);   // Hairline divider

    // Fonts setup
    var fHeading = "Tenor Sans";
    var fBody = "Manrope";
    
    try {
        var testH = app.fonts.itemByName(fHeading + "\tRegular");
        if (!testH.isValid) fHeading = "Inter";
    } catch(e) { fHeading = "Inter"; }

    try {
        var testB = app.fonts.itemByName(fBody + "\tRegular");
        if (!testB.isValid) fBody = "Inter";
    } catch(e) { fBody = "Inter"; }

    log.push("Using fonts: Heading=" + fHeading + ", Body=" + fBody);

    // =========================================================================
    // LOOP OVER ALL PAGES
    // =========================================================================
    for (var p = 0; p < doc.pages.length; p++) {
        var page = doc.pages[p];
        var pNum = p + 1;
        log.push("Processing Page " + pNum);

        // A. Background: Every page gets unified Paper background
        for (var r = 0; r < page.rectangles.length; r++) {
            var rect = page.rectangles[r];
            var gb = rect.geometricBounds;
            if (gb[0] <= 10 && gb[1] <= 10 && gb[2] >= 1000 && gb[3] >= 1800) {
                rect.fillColor = cPaper;
                rect.strokeWeight = 0;
            }
        }

        // B. Page-specific restructuring
        if (pNum === 1) {
            // PAGE 1: COVER
            for (var t = 0; t < page.textFrames.length; t++) {
                var tf1 = page.textFrames[t];
                tf1.geometricBounds = [90, 100, 440, 1820];
                for (var para = 0; para < tf1.paragraphs.length; para++) {
                    var pObj = tf1.paragraphs[para];
                    pObj.fillColor = cInk;
                    pObj.justification = Justification.CENTER_ALIGN;
                    try {
                        if (para === 0) {
                            pObj.appliedFont = app.fonts.itemByName(fBody + "\tBold");
                            pObj.pointSize = 13;
                            pObj.tracking = 240;
                            pObj.fillColor = cGoldMuted;
                            pObj.spaceAfter = 16;
                        } else if (para === 1) {
                            pObj.appliedFont = app.fonts.itemByName(fHeading + "\tRegular");
                            pObj.pointSize = 54;
                            pObj.leading = 62;
                            pObj.tracking = 80;
                            pObj.spaceAfter = 12;
                        } else if (para === 2) {
                            pObj.appliedFont = app.fonts.itemByName(fHeading + "\tRegular");
                            pObj.pointSize = 22;
                            pObj.leading = 30;
                            pObj.tracking = 60;
                            pObj.fillColor = cGoldMuted;
                            pObj.spaceAfter = 24;
                        } else if (para === 3) {
                            pObj.appliedFont = app.fonts.itemByName(fBody + "\tRegular");
                            pObj.pointSize = 15;
                            pObj.leading = 24;
                            pObj.fillColor = cInkSoft;
                            pObj.spaceAfter = 20;
                        } else {
                            pObj.appliedFont = app.fonts.itemByName(fBody + "\tMedium");
                            pObj.pointSize = 12;
                            pObj.tracking = 180;
                            pObj.fillColor = cInk;
                        }
                    } catch(e){}
                }
            }
        } else if (pNum === 2 || pNum === 3 || pNum === 4) {
            // Running Header
            for (var t = 0; t < page.textFrames.length; t++) {
                var tfH = page.textFrames[t];
                if (tfH.geometricBounds[0] < 80) {
                    try {
                        tfH.paragraphs[0].appliedFont = app.fonts.itemByName(fBody + "\tMedium");
                        tfH.paragraphs[0].pointSize = 10;
                        tfH.paragraphs[0].tracking = 180;
                        tfH.paragraphs[0].fillColor = cGoldMuted;
                    } catch(e){}
                }
            }

            // Section Title
            for (var t = 0; t < page.textFrames.length; t++) {
                var tfMain = page.textFrames[t];
                var gbM = tfMain.geometricBounds;
                if (gbM[0] >= 100 && gbM[0] <= 180 && (gbM[2] - gbM[0]) > 100) {
                    tfMain.geometricBounds = [gbM[0], gbM[1], gbM[0] + 135, gbM[3]];
                    try {
                        if (tfMain.paragraphs.length > 0) {
                            tfMain.paragraphs[0].appliedFont = app.fonts.itemByName(fHeading + "\tRegular");
                            tfMain.paragraphs[0].pointSize = 34;
                            tfMain.paragraphs[0].leading = 42;
                            tfMain.paragraphs[0].tracking = 40;
                            tfMain.paragraphs[0].fillColor = cInk;
                            tfMain.paragraphs[0].spaceAfter = 12;
                        }
                        if (tfMain.paragraphs.length > 1) {
                            tfMain.paragraphs[1].appliedFont = app.fonts.itemByName(fBody + "\tRegular");
                            tfMain.paragraphs[1].pointSize = 14;
                            tfMain.paragraphs[1].leading = 23;
                            tfMain.paragraphs[1].fillColor = cInkSoft;
                        }
                    } catch(e){}
                }
            }

            // Cards: Rectangles
            for (var r = 0; r < page.rectangles.length; r++) {
                var rBox = page.rectangles[r];
                var rGb = rBox.geometricBounds;
                if (rBox.allGraphics.length === 0 && (rGb[2] - rGb[0]) < 300) {
                    rBox.fillColor = cCardWhite;
                    rBox.strokeWeight = 0.5;
                    rBox.strokeColor = cLineGrey;
                }
            }

            // Cards: Text
            for (var t = 0; t < page.textFrames.length; t++) {
                var tfC = page.textFrames[t];
                var gbC = tfC.geometricBounds;
                if (gbC[0] >= 280 && (gbC[2] - gbC[0]) < 220) {
                    try {
                        if (tfC.paragraphs.length > 0) {
                            tfC.paragraphs[0].appliedFont = app.fonts.itemByName(fHeading + "\tRegular");
                            tfC.paragraphs[0].pointSize = 18;
                            tfC.paragraphs[0].leading = 24;
                            tfC.paragraphs[0].tracking = 20;
                            tfC.paragraphs[0].fillColor = cInk;
                            tfC.paragraphs[0].spaceAfter = 6;
                        }
                        if (tfC.paragraphs.length > 1) {
                            tfC.paragraphs[1].appliedFont = app.fonts.itemByName(fBody + "\tRegular");
                            tfC.paragraphs[1].pointSize = 12.5;
                            tfC.paragraphs[1].leading = 19;
                            tfC.paragraphs[1].fillColor = cInkSoft;
                        }
                    } catch(e){}
                }
            }
        } else if (pNum === 5) {
            // PAGE 5: CLOSING SPREAD
            for (var r = 0; r < page.rectangles.length; r++) {
                var r5 = page.rectangles[r];
                var gb5 = r5.geometricBounds;
                if (gb5[0] > 50 && gb5[2] < 1050) {
                    r5.fillColor = cCardWhite;
                    r5.strokeWeight = 0.75;
                    r5.strokeColor = cGoldMuted;
                }
            }

            for (var t = 0; t < page.textFrames.length; t++) {
                var tf5 = page.textFrames[t];
                var gb5T = tf5.geometricBounds;
                if (gb5T[0] >= 150) {
                    for (var para = 0; para < tf5.paragraphs.length; para++) {
                        var p5 = tf5.paragraphs[para];
                        p5.justification = Justification.CENTER_ALIGN;
                        try {
                            var pText = p5.contents.toString();
                            if (pText.indexOf("Путешествие") > -1) {
                                p5.appliedFont = app.fonts.itemByName(fHeading + "\tRegular");
                                p5.pointSize = 34;
                                p5.leading = 42;
                                p5.fillColor = cInk;
                                p5.spaceAfter = 16;
                            } else if (pText.indexOf("Экспедиция создаётся") > -1) {
                                p5.appliedFont = app.fonts.itemByName(fBody + "\tRegular");
                                p5.pointSize = 14.5;
                                p5.leading = 24;
                                p5.fillColor = cInkSoft;
                                p5.spaceAfter = 24;
                            } else if (pText.indexOf("ВИДЕО-ВПЕЧАТЛЕНИЯ") > -1) {
                                p5.appliedFont = app.fonts.itemByName(fBody + "\tBold");
                                p5.pointSize = 11;
                                p5.tracking = 160;
                                p5.fillColor = cGoldMuted;
                                p5.spaceAfter = 10;
                            } else if (pText.indexOf("▶") > -1) {
                                p5.appliedFont = app.fonts.itemByName(fBody + "\tMedium");
                                p5.pointSize = 13.5;
                                p5.leading = 22;
                                p5.fillColor = cInk;
                                p5.spaceAfter = 6;
                            } else if (pText.indexOf("Давайте устроим") > -1) {
                                p5.appliedFont = app.fonts.itemByName(fBody + "\tRegular");
                                p5.pointSize = 14.5;
                                p5.leading = 24;
                                p5.fillColor = cInkSoft;
                                p5.spaceAfter = 24;
                            } else if (pText.indexOf("ВАЛЕРИЙ ЛАТЫПОВ") > -1) {
                                p5.appliedFont = app.fonts.itemByName(fHeading + "\tRegular");
                                p5.pointSize = 22;
                                p5.tracking = 100;
                                p5.fillColor = cInk;
                                p5.spaceAfter = 8;
                            } else if (pText.indexOf("Telegram") > -1) {
                                p5.appliedFont = app.fonts.itemByName(fBody + "\tMedium");
                                p5.pointSize = 13;
                                p5.tracking = 40;
                                p5.fillColor = cGoldMuted;
                            }
                        } catch(e){}
                    }
                }
            }
        }
    }

    // Save InDesign doc
    try { doc.save(); } catch(e){}

    // Export PDF directly
    var pdfPath = desktopPath + "/Bali_Sacred_Heritage_Deck_All5Pages.pdf";
    var preset = app.pdfExportPresets.item("[High Quality Print]");
    if (!preset.isValid) preset = app.pdfExportPresets.item("[Высококачественная печать]");
    if (!preset.isValid) preset = app.pdfExportPresets.firstItem();
    doc.exportFile(ExportFormat.PDF_TYPE, new File(pdfPath), false, preset);
    log.push("Exported successfully to: " + pdfPath);

    var f = new File(desktopPath + "/rebuild_all_5_log.txt");
    f.open("w"); f.encoding = "UTF-8"; f.write(log.join("\n")); f.close();
    return "SUCCESS: " + pdfPath;
}

try {
    var res = runFullRebuild();
    $.writeln(res);
} catch(e) {
    var fErr = new File(Folder.desktop.fsName + "/rebuild_fatal_error.txt");
    fErr.open("w"); fErr.write(e.message + " line: " + e.line); fErr.close();
}
