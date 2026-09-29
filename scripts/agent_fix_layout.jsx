#target indesign

try {
    var doc = app.activeDocument;
    var page = doc.pages[0];
    
    // 1. Находим текстовый фрейм и фреймы для фото
    var tf = page.textFrames[0];
    var photoFrames = [];
    var bgFrame = null;
    
    for (var i = 0; i < page.rectangles.length; i++) {
        var rect = page.rectangles[i];
        if (rect.fillColor.name == "DarkBg") {
            bgFrame = rect;
        } else {
            photoFrames.push(rect);
        }
    }
    
    // Сортируем фреймы по X-координате (слева направо)
    photoFrames.sort(function(a, b) {
        return a.geometricBounds[1] - b.geometricBounds[1];
    });
    
    // 2. Исправляем верстку (Visual QA correction)
    // Убираем текст с фотографий. Текст пойдет наверх, фото - вниз.
    // Текст: от y=100 до y=450, на всю ширину (от x=100 до x=1820).
    tf.geometricBounds = [100, 100, 420, 1820];
    
    // Выравниваем текст по центру
    for (var p = 0; p < tf.paragraphs.length; p++) {
        tf.paragraphs[p].justification = Justification.CENTER_ALIGN;
        // Можно добавить белый цвет, если фон темный
        try {
            tf.paragraphs[p].fillColor = doc.colors.itemByName("Paper");
        } catch(e){}
    }
    
    // Фотографии: от y=450 до y=980
    // Пересчитаем ширину и отступы
    var marginX = 100;
    var totalWidth = 1920 - (marginX * 2);
    var gap = 20;
    var rectWidth = (totalWidth - (gap * 4)) / 5; // (1720 - 80) / 5 = 328
    
    var startY = 480;
    var endY = 980;
    
    var imagesToPlace = [
        "/Volumes/Genius Art/Antigravity/Bali Tours/images/bali_temple.jpg",
        "/Volumes/Genius Art/Antigravity/Bali Tours/images/bali_water.jpg",
        "/Volumes/Genius Art/Antigravity/Bali Tours/images/bali_ritual.jpg",
        "/Volumes/Genius Art/Antigravity/Bali Tours/images/bali_landscape.jpg",
        "/Volumes/Genius Art/Antigravity/Bali Tours/images/bali_volcano.jpg"
    ];
    
    for (var i = 0; i < photoFrames.length; i++) {
        var rect = photoFrames[i];
        var x1 = marginX + i * (rectWidth + gap);
        var x2 = x1 + rectWidth;
        
        rect.geometricBounds = [startY, x1, endY, x2];
        
        // Вставляем картинку
        var imgFile = new File(imagesToPlace[i]);
        if (imgFile.exists) {
            rect.place(imgFile);
            rect.fit(FitOptions.FILL_PROPORTIONALLY);
            rect.fit(FitOptions.CENTER_CONTENT);
        }
    }
    
    // Экспортируем новый PDF для проверки
    var desktopPath = Folder.desktop.fsName;
    var pdfPath = desktopPath + "/" + doc.name.replace(/\.indd$/i, "") + "_AgentFixed.pdf";
    var preset = app.pdfExportPresets.item("[High Quality Print]");
    if (!preset.isValid) preset = app.pdfExportPresets.firstItem();
    doc.exportFile(ExportFormat.PDF_TYPE, new File(pdfPath), false, preset);
    
    $.writeln("Success");
} catch (e) {
    $.writeln("Error: " + e.message);
}
