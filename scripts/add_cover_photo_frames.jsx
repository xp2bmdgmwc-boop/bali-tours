#target indesign
app.scriptPreferences.enableRedraw = false;
app.doScript(setupCover, ScriptLanguage.JAVASCRIPT, [], UndoModes.FAST_ENTIRE_SCRIPT, "Setup Cover 5 Photo Frames");
app.scriptPreferences.enableRedraw = true;

function setupCover() {
    var d = app.documents.itemByName("Bali_Sacred_Heritage_Deck.indd");
    if (!d || !d.isValid) return;

    var p1 = d.pages[0];
    var cGold = d.colors.itemByName("GoldAccent");
    var cWhite = d.colors.itemByName("PureWhite");
    var cDark = d.colors.itemByName("DarkBg");

    // 1. Remove previously added PhotoFrame_* on page 1
    for (var i = p1.rectangles.length - 1; i >= 0; i--) {
        var r = p1.rectangles[i];
        if (r.label && r.label.indexOf("PhotoFrame_") === 0) {
            r.remove();
        }
    }

    // 2. Ensure Background rectangle is at back
    for (var b = 0; b < p1.rectangles.length; b++) {
        var bg = p1.rectangles[b];
        if (bg.geometricBounds[0] === 0 && bg.geometricBounds[1] === 0 && bg.geometricBounds[2] === 1080 && bg.geometricBounds[3] === 1920) {
            bg.sendToBack();
            break;
        }
    }

    // 3. Create 5 vertical graphic photo frames
    var top = 100;
    var bottom = 980;
    var startX = 100;
    var frameW = 328;
    var gap = 20;

    for (var j = 0; j < 5; j++) {
        var left = startX + j * (frameW + gap);
        var right = left + frameW;

        var f = p1.rectangles.add();
        f.label = "PhotoFrame_" + (j + 1);
        f.geometricBounds = [top, left, bottom, right];
        f.contentType = ContentType.GRAPHIC_TYPE;
        f.strokeWeight = 1;
        if (cGold && cGold.isValid) {
            f.strokeColor = cGold;
        }
        f.fillColor = d.swatches.itemByName("None");

        f.frameFittingOptions.autoFit = true;
        f.frameFittingOptions.fittingOnEmptyFrame = EmptyFrameFittingOptions.FILL_PROPORTIONALLY;
        f.frameFittingOptions.fittingAlignment = AnchorPoint.CENTER_ANCHOR;
    }

    // 4. Position and style the text frame cleanly on top
    var tf = (p1.textFrames.length > 0) ? p1.textFrames[0] : null;
    if (tf && tf.isValid) {
        // Bring text frame to front
        app.select(tf);
        app.cut();
        app.pasteInPlace();

        // Get newly pasted text frame reference
        var newTf = p1.textFrames[0];
        newTf.geometricBounds = [280, 240, 860, 1680];
        newTf.fillColor = d.swatches.itemByName("None");

        newTf.parentStory.contents = "EXCLUSIVE PRIVATE EXPEDITION\rBALI: SACRED HERITAGE\rBespoke Journey & Serenity\r\u041F\u0440\u0438\u0432\u0430\u0442\u043D\u0430\u044F \u044D\u043A\u0441\u043F\u0435\u0434\u0438\u0446\u0438\u044F \u0432 \u0441\u0435\u0440\u0434\u0446\u0435 \u043F\u0435\u0440\u0432\u043E\u0437\u0434\u0430\u043D\u043D\u043E\u0433\u043E \u043E\u0441\u0442\u0440\u043E\u0432\u0430 \u0434\u043B\u044F \u0446\u0435\u043D\u0438\u0442\u0435\u043B\u0435\u0439 \u0442\u0438\u0448\u0438\u043D\u044B, \u0438\u0441\u043A\u0443\u0441\u0441\u0442\u0432\u0430 \u0438 \u043F\u043E\u0434\u043B\u0438\u043D\u043D\u043E\u0439 \u043A\u0443\u043B\u044C\u0442\u0443\u0440\u044B.\rCURATED BY VALERY LATYPOV";

        try {
            var pars = newTf.paragraphs;
            pars[0].appliedFont = "Montserrat"; pars[0].fontStyle = "Bold"; pars[0].pointSize = 13; pars[0].tracking = 240; pars[0].fillColor = cGold; pars[0].spaceAfter = 18; pars[0].justification = Justification.CENTER_ALIGN;
            pars[1].appliedFont = "Cormorant Garamond"; pars[1].fontStyle = "Regular"; pars[1].pointSize = 74; pars[1].fillColor = cWhite; pars[1].spaceAfter = 8; pars[1].justification = Justification.CENTER_ALIGN;
            pars[2].appliedFont = "Cormorant Garamond"; pars[2].fontStyle = "Italic"; pars[2].pointSize = 34; pars[2].fillColor = cGold; pars[2].spaceAfter = 34; pars[2].justification = Justification.CENTER_ALIGN;
            pars[3].appliedFont = "Montserrat"; pars[3].fontStyle = "Light"; pars[3].pointSize = 18; pars[3].leading = 28; pars[3].fillColor = cWhite; pars[3].spaceAfter = 42; pars[3].justification = Justification.CENTER_ALIGN;
            pars[4].appliedFont = "Montserrat"; pars[4].fontStyle = "Medium"; pars[4].pointSize = 13; pars[4].tracking = 200; pars[4].fillColor = cGold; pars[4].justification = Justification.CENTER_ALIGN;
        } catch(e){}
    }

    app.select(NothingEnum.NOTHING);
    d.save();
}
