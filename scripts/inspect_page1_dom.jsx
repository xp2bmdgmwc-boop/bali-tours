#target indesign

function inspectPage() {
    if (app.documents.length === 0) return "Нет открытых документов";
    var doc = app.activeDocument;
    var page = doc.pages[0]; // Первая страница
    
    var report = [];
    report.push("=== ОТЧЕТ ПО PAGE 1 ===");
    
    // Проверка линков (фотографий)
    var missingLinks = 0;
    for (var i = 0; i < doc.links.length; i++) {
        if (doc.links[i].status == LinkStatus.LINK_MISSING) {
            missingLinks++;
        }
    }
    report.push("Отсутствующих линков (фото): " + missingLinks);
    
    // Перебираем все Rectangle (фреймы для фото/фона)
    report.push("\n--- RECTANGLES (Фреймы) ---");
    for (var i = 0; i < page.rectangles.length; i++) {
        var rect = page.rectangles[i];
        var bounds = rect.geometricBounds;
        var bStr = "[y1: " + Math.round(bounds[0]) + ", x1: " + Math.round(bounds[1]) + 
                   ", y2: " + Math.round(bounds[2]) + ", x2: " + Math.round(bounds[3]) + "]";
        
        var hasImage = rect.allGraphics.length > 0;
        var fill = rect.fillColor.name;
        
        report.push("Frame " + i + ": " + bStr + " | Image: " + (hasImage ? "YES" : "NO") + " | Fill: " + fill);
    }
    
    // Перебираем TextFrames
    report.push("\n--- TEXT FRAMES ---");
    for (var i = 0; i < page.textFrames.length; i++) {
        var tf = page.textFrames[i];
        var bounds = tf.geometricBounds;
        var bStr = "[y1: " + Math.round(bounds[0]) + ", x1: " + Math.round(bounds[1]) + 
                   ", y2: " + Math.round(bounds[2]) + ", x2: " + Math.round(bounds[3]) + "]";
                   
        var content = tf.contents.toString().substring(0, 30).replace(/\r|\n/g, " ");
        var overset = tf.overflows ? "YES (ОШИБКА!)" : "NO";
        
        var font = "Mixed/Unknown";
        if (tf.paragraphs.length > 0 && tf.paragraphs[0].characters.length > 0) {
            try { font = tf.paragraphs[0].appliedFont.name; } catch(e){}
        }
        
        report.push("Text " + i + ": " + bStr + " | Overflows: " + overset + " | Font: " + font + " | Text: '" + content + "...'");
    }
    
    return report.join("\n");
}

var result = inspectPage();
var f = new File("~/Desktop/dom_report.txt");
f.open("w");
f.encoding = "UTF-8";
f.write(result);
f.close();
