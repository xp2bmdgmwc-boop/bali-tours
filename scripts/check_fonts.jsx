#target indesign
function checkFonts() {
    var doc = app.activeDocument;
    var out = [];
    for (var p = 0; p < doc.pages.length; p++) {
        var page = doc.pages[p];
        out.push("Page " + (p+1) + ":");
        for (var t = 0; t < page.textFrames.length; t++) {
            var tf = page.textFrames[t];
            var fName = tf.paragraphs.length > 0 ? tf.paragraphs[0].appliedFont.name : "none";
            var size = tf.paragraphs.length > 0 ? tf.paragraphs[0].pointSize : 0;
            var fill = tf.paragraphs.length > 0 ? tf.paragraphs[0].fillColor.name : "none";
            out.push("  TF " + t + ": " + fName + " | " + size + "pt | " + fill);
        }
    }
    return out.join("\n");
}
var f = new File("~/Desktop/fonts_check.txt");
f.open("w"); f.encoding = "UTF-8"; f.write(checkFonts()); f.close();
