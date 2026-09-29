#target indesign

function fixPage5() {
    var doc = app.activeDocument;
    var page = doc.pages[4]; // 5th page
    
    var fHeading = app.fonts.itemByName("Tenor Sans\tRegular");
    var fBodyReg = app.fonts.itemByName("Manrope\tRegular");
    var fBodyMed = app.fonts.itemByName("Manrope\tMedium");
    var fBodyBold = app.fonts.itemByName("Manrope\tBold");

    var cInk = doc.colors.itemByName("ObsidianInk");
    var cInkSoft = doc.colors.itemByName("InkSoftMuted");
    var cGold = doc.colors.itemByName("WarmGoldMuted");

    for (var t = 0; t < page.textFrames.length; t++) {
        var tf = page.textFrames[t];
        var gb = tf.geometricBounds;
        
        // Running header
        if (gb[0] < 80) {
            try {
                tf.paragraphs[0].appliedFont = fBodyMed;
                tf.paragraphs[0].pointSize = 10;
                tf.paragraphs[0].tracking = 180;
                tf.paragraphs[0].fillColor = cGold;
            } catch(e){}
            continue;
        }

        // Main text box
        for (var p = 0; p < tf.paragraphs.length; p++) {
            var para = tf.paragraphs[p];
            para.justification = Justification.CENTER_ALIGN;
            var txt = para.contents.toString();

            try {
                if (txt.indexOf("Путешествие") > -1) {
                    para.appliedFont = fHeading;
                    para.pointSize = 34;
                    para.leading = 42;
                    para.fillColor = cInk;
                    para.spaceAfter = 14;
                } else if (txt.indexOf("ВИДЕО-ВПЕЧАТЛЕНИЯ") > -1) {
                    para.appliedFont = fBodyBold;
                    para.pointSize = 11;
                    para.tracking = 160;
                    para.fillColor = cGold;
                    para.spaceAfter = 8;
                } else if (txt.indexOf("ВАЛЕРИЙ ЛАТЫПОВ") > -1) {
                    para.appliedFont = fHeading;
                    para.pointSize = 22;
                    para.tracking = 80;
                    para.fillColor = cInk;
                    para.spaceAfter = 6;
                } else if (txt.indexOf("Telegram") > -1) {
                    para.appliedFont = fBodyMed;
                    para.pointSize = 12.5;
                    para.tracking = 30;
                    para.fillColor = cGold;
                } else if (txt.indexOf("▶") > -1) {
                    para.appliedFont = fBodyMed;
                    para.pointSize = 13.5;
                    para.leading = 22;
                    para.fillColor = cInk;
                    para.spaceAfter = 6;
                } else if (txt.replace(/\s+/g, "").length > 0) {
                    para.appliedFont = fBodyReg;
                    para.pointSize = 14;
                    para.leading = 23;
                    para.fillColor = cInkSoft;
                    para.spaceAfter = 16;
                }
            } catch(e){}
        }
    }

    doc.save();

    // Re-export PDF
    var pdfPath = Folder.desktop.fsName + "/Bali_Sacred_Heritage_Deck_All5Pages.pdf";
    var preset = app.pdfExportPresets.item("[High Quality Print]");
    if (!preset.isValid) preset = app.pdfExportPresets.item("[Высококачественная печать]");
    if (!preset.isValid) preset = app.pdfExportPresets.firstItem();
    doc.exportFile(ExportFormat.PDF_TYPE, new File(pdfPath), false, preset);
    return "Page 5 fixed and PDF re-exported";
}

fixPage5();
