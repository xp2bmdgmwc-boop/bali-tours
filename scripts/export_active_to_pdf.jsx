#target indesign
try {
    if (app.documents.length === 0) {
        alert("Нет открытых документов. Откройте файл в InDesign.");
        exit();
    }
    
    var doc = app.activeDocument;
    var baseName = doc.name.replace(/\.indd$/i, "");
    
    // Формируем путь на Рабочий стол
    var desktopPath = Folder.desktop.fsName;
    var pdfPath = desktopPath + "/" + baseName + "_Updated.pdf";
    var pdfFile = new File(pdfPath);
    
    // Пытаемся найти пресет High Quality Print, если нет - берем первый попавшийся
    var preset = app.pdfExportPresets.item("[High Quality Print]");
    if (!preset.isValid) {
        preset = app.pdfExportPresets.item("[Высококачественная печать]");
    }
    if (!preset.isValid) {
        preset = app.pdfExportPresets.firstItem();
    }
    
    doc.exportFile(ExportFormat.PDF_TYPE, pdfFile, false, preset);
    $.writeln("PDF успешно сгенерирован: " + pdfPath);
} catch (e) {
    $.writeln("Ошибка при генерации PDF: " + e.message);
}
