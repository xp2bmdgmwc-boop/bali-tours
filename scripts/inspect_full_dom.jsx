#target indesign
function deepInspect() {
    if (app.documents.length === 0) return "Нет открытого документа.";
    var doc = app.activeDocument;
    var report = [];
    
    for (var p = 0; p < doc.pages.length; p++) {
        var page = doc.pages[p];
        report.push("=== СТРАНИЦА " + (p+1) + " ===");
        
        // Анализ цвета фонов (прямоугольников)
        for (var i = 0; i < page.rectangles.length; i++) {
            var rect = page.rectangles[i];
            var fill = rect.fillColor.name;
            var bounds = rect.geometricBounds;
            var isImage = rect.allGraphics.length > 0;
            if (!isImage && fill !== "None") {
                report.push("Блок фона: [" + Math.round(bounds[0]) + "," + Math.round(bounds[1]) + "," + Math.round(bounds[2]) + "," + Math.round(bounds[3]) + "] Цвет: " + fill);
            }
        }
        
        // Анализ типографики
        for (var t = 0; t < page.textFrames.length; t++) {
            var tf = page.textFrames[t];
            var bounds = tf.geometricBounds;
            if (tf.paragraphs.length > 0) {
                var firstPara = tf.paragraphs[0];
                var fontName = "Unknown";
                try { fontName = firstPara.appliedFont.name; } catch(e){}
                var fontSize = "Unknown";
                try { fontSize = firstPara.pointSize; } catch(e){}
                var fontColor = "Unknown";
                try { fontColor = firstPara.fillColor.name; } catch(e){}
                var content = tf.contents.toString().substring(0, 40).replace(/\n|\r/g, " ");
                
                report.push("Текст: '" + content + "...' | Шрифт: " + fontName + " " + fontSize + "pt | Цвет: " + fontColor);
            }
        }
        report.push("");
    }
    return report.join("\n");
}

var f = new File("~/Desktop/dom_deep_report.txt");
f.open("w");
f.encoding = "UTF-8";
f.write(deepInspect());
f.close();
