#target indesign
var d = app.documents.itemByName("Bali_Sacred_Heritage_Deck.indd");
var f = new File("/Volumes/Genius Art/Antigravity/Bali Tours/scripts/deck_tfs_info.txt");
f.encoding = "UTF-8";
f.open("w");

f.writeln("Doc: " + d.name + " pages: " + d.pages.length);
for (var p = 0; p < d.pages.length; p++) {
    var pg = d.pages[p];
    f.writeln("=== PAGE " + (p+1) + " ===");
    for (var i = 0; i < pg.textFrames.length; i++) {
        var tf = pg.textFrames[i];
        f.writeln("  TF " + i + " [" + tf.geometricBounds.join(",") + "] len=" + tf.contents.length);
    }
}
f.close();
