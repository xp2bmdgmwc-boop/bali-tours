#target indesign
var doc = app.documents.length > 0 ? app.activeDocument : app.open(File("~/Desktop/Bali_Sacred_Heritage_Deck.indd"));
var pdfPath = Folder.desktop.fsName + "/Bali_Sacred_Heritage_Master_Polished.pdf";
var preset = app.pdfExportPresets.item("[High Quality Print]");
if (!preset.isValid) preset = app.pdfExportPresets.firstItem();
doc.exportFile(ExportFormat.PDF_TYPE, new File(pdfPath), false, preset);
$.writeln("Exported: " + pdfPath);
