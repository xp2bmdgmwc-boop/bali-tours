#target indesign
try {
    var doc = app.documents.add(false);
    doc.viewPreferences.horizontalMeasurementUnits = MeasurementUnits.POINTS;
    doc.viewPreferences.verticalMeasurementUnits = MeasurementUnits.POINTS;
    doc.documentPreferences.pageWidth = "1920pt";
    doc.documentPreferences.pageHeight = "1080pt";
    doc.documentPreferences.facingPages = false;
    while (doc.pages.length < 5) {
        doc.pages.add();
    }
    doc.close(SaveOptions.NO);
} catch(e) {
    var f = new File("/Volumes/Genius Art/Antigravity/Bali Tours/scripts/doc_pref_err.txt");
    f.open("w");
    f.write("ERROR: " + e.message + " line: " + e.line);
    f.close();
}
