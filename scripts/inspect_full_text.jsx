#target indesign
function getFullText() {
    if (app.documents.length === 0) return "No doc";
    var doc = app.activeDocument;
    var out = [];
    out.push("Doc Name: " + doc.name + " | Pages: " + doc.pages.length);
    for (var p = 0; p < doc.pages.length; p++) {
        var page = doc.pages[p];
        out.push("\n=== PAGE " + (p+1) + " ===");
        for (var t = 0; t < page.textFrames.length; t++) {
            var tf = page.textFrames[t];
            out.push("--- TF " + t + " (font: " + (tf.texts.length ? tf.texts[0].appliedFont.name : "?") + ", size: " + (tf.texts.length ? tf.texts[0].pointSize : "?") + "pt) ---");
            out.push(tf.contents.toString());
        }
    }
    return out.join("\n");
}
var f = new File("~/Desktop/doc_full_text.txt");
f.open("w");
f.encoding = "UTF-8";
f.write(getFullText());
f.close();
