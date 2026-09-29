#target indesign
try {
    var doc = app.activeDocument;
    
    // Получаем или создаем нужные цвета и шрифты
    var colorPaper = doc.colors.itemByName("Paper");
    var colorInk = null;
    try { colorInk = doc.colors.itemByName("InkText"); } catch(e){}
    if (!colorInk || !colorInk.isValid) {
        colorInk = doc.colors.itemByName("Black");
    }
    
    // Пробуем найти шрифты
    var fontHeading = app.fonts.itemByName("Tenor Sans\tRegular");
    if (!fontHeading.isValid) fontHeading = app.fonts.itemByName("Inter\tRegular");
    
    var fontBody = app.fonts.itemByName("Manrope\tRegular");
    if (!fontBody.isValid) fontBody = app.fonts.itemByName("Inter\tLight");

    // Унифицируем все страницы
    for (var p = 0; p < doc.pages.length; p++) {
        var page = doc.pages[p];
        
        // 1. Фоны: делаем все фоны белыми/кремовыми (убираем DarkBg и черные блоки)
        // Чтобы дизайн был НЕ разный
        for (var i = 0; i < page.rectangles.length; i++) {
            var rect = page.rectangles[i];
            var fillName = rect.fillColor.name;
            // Если это фон на всю страницу
            if (rect.geometricBounds[0] == 0 && rect.geometricBounds[1] == 0 && rect.geometricBounds[2] >= 1000) {
                rect.fillColor = colorPaper; 
            }
            // Если это текстовые плашки (PureWhite) - убираем их, чтобы текст был прямо на фоне (Cresco style)
            if (fillName == "PureWhite" || fillName == "CreamBg") {
                rect.fillColor = doc.colors.itemByName("None");
                // Добавляем тонкую линию (разделитель) снизу вместо плашки
                rect.strokeColor = colorInk;
                rect.strokeWeight = 0.35; // микро-разделитель Cresco
                rect.strokeAlignment = StrokeAlignment.INSIDE_ALIGN;
                // Оставляем только нижнюю границу (в InDesign скриптом проще просто рамку сделать тонкой и прозрачной)
                rect.strokeTint = 20; // 20% серого
            }
        }
        
        // 2. Исправляем шрифты и размеры
        for (var t = 0; t < page.textFrames.length; t++) {
            var tf = page.textFrames[t];
            for (var para = 0; para < tf.paragraphs.length; para++) {
                var pObj = tf.paragraphs[para];
                
                // Цвет текста - чернила
                pObj.fillColor = colorInk;
                
                // Проверяем размер
                var size = pObj.pointSize;
                
                if (size > 30) {
                    // Заголовки
                    if (fontHeading.isValid) pObj.appliedFont = fontHeading;
                    pObj.pointSize = 36;
                    pObj.leading = 42; // Журнальный интерлиньяж
                    pObj.tracking = 50;
                } else if (size > 15) {
                    // Подзаголовки
                    if (fontHeading.isValid) pObj.appliedFont = fontHeading;
                    pObj.pointSize = 18;
                    pObj.leading = 26;
                } else {
                    // Наборный текст (body)
                    if (fontBody.isValid) pObj.appliedFont = fontBody;
                    // Исправляем 13pt на обложке, если это Hero
                    if (p === 0 && size < 15) {
                        if (fontHeading.isValid) pObj.appliedFont = fontHeading;
                        pObj.pointSize = 24; 
                        pObj.leading = 30;
                    } else {
                        pObj.pointSize = 12;
                        pObj.leading = 18;
                    }
                }
            }
        }
    }
    
    // Экспортируем
    var desktopPath = Folder.desktop.fsName;
    var pdfPath = desktopPath + "/" + doc.name.replace(/\.indd$/i, "") + "_AgentFixed_V2.pdf";
    var preset = app.pdfExportPresets.item("[High Quality Print]");
    if (!preset.isValid) preset = app.pdfExportPresets.firstItem();
    doc.exportFile(ExportFormat.PDF_TYPE, new File(pdfPath), false, preset);
    
    $.writeln("Успешно применено!");
} catch(e) {
    $.writeln("Ошибка: " + e.message);
}
