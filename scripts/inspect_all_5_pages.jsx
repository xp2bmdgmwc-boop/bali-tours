#target indesign
function getFullDocStructure() {
    if (app.documents.length === 0) return "No doc";
    var doc = app.activeDocument;
    var out = [];
    out.push("Doc Name: " + doc.name + " | Pages: " + doc.pages.length);
    for (var p = 0; p < doc.pages.length; p++) {
        var page = doc.pages[p];
        out.push("--- PAGE " + (p+1) + " ---");
        out.push("Rectangles: " + page.rectangles.length);
        for (var r = 0; r < page.rectangles.length; r++) {
            var rect = page.rectangles[r];
            var imgCount = rect.allGraphics.length;
            var fill = rect.fillColor.name;
            var gb = rect.geometricBounds;
            out.push("  Rect " + r + ": [" + Math.round(gb[0]) + "," + Math.round(gb[1]) + "," + Math.round(gb[2]) + "," + Math.round(gb[3]) + "] Fill:" + fill + " Img:" + imgCount);
        }
        out.push("TextFrames: " + page.textFrames.length);
        for (var t = 0; t < page.textFrames.length; t++) {
            var tf = page.textFrames[t];
            var gbT = tf.geometricBounds;
            var txt = tf.contents.toString().substring(0, 35).replace(/[\r\n]/g, " ");
            out.push("  TF " + t + ": [" + Math.round(gbT[0]) + "," + Math.round(gbT[1]) + "," + Math.round(gbT[2]) + "," + Math.round(gbT[3]) + "] Overset:" + tf.overflows + " | '" + txt + "'");
        }
    }
    return out.join("\n");
}

var f = new File("~/Desktop/doc_structure_all.txt");
f.open("w");
f.encoding = "UTF-8";
f.write(getFullDocStructure());
f.close();
