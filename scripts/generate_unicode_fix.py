def to_unicode_escape(s):
    res = []
    for ch in s:
        if ord(ch) > 127:
            res.append(f"\\u{ord(ch):04X}")
        elif ch == '\n':
            res.append("\\r")
        elif ch == '"':
            res.append('\\"')
        elif ch == '\\':
            res.append('\\\\')
        else:
            res.append(ch)
    return "".join(res)

jsx = '''#target indesign
app.scriptPreferences.enableRedraw = false;
app.doScript(fixText, ScriptLanguage.JAVASCRIPT, [], UndoModes.FAST_ENTIRE_SCRIPT, "Fix Cyrillic Unicode Encoding");
app.scriptPreferences.enableRedraw = true;

function fixText() {
    var d = app.documents.itemByName("Bali_Sacred_Heritage_Deck.indd");
    if (!d || !d.isValid) return;

    var cGold = d.colors.itemByName("GoldAccent");
    var cWhite = d.colors.itemByName("PureWhite");
    var cInk = d.colors.itemByName("InkText");
    var cInkSoft = d.colors.itemByName("InkSoft");
    var cOlive = d.colors.itemByName("OliveDeep");

    function findTFByTop(pg, targetY) {
        for (var i = 0; i < pg.textFrames.length; i++) {
            if (Math.abs(pg.textFrames[i].geometricBounds[0] - targetY) < 25) {
                return pg.textFrames[i];
            }
        }
        return null;
    }

    // ==========================================
    // PAGE 1: COVER
    // ==========================================
    var p1 = d.pages[0];
    var tf1 = findTFByTop(p1, 300);
    if (tf1) {
        tf1.parentStory.contents = "__P1_TEXT__";
        try {
            var p = tf1.paragraphs;
            p[0].appliedFont = "Montserrat"; p[0].fontStyle = "Bold"; p[0].pointSize = 13; p[0].tracking = 240; p[0].fillColor = cGold; p[0].justification = Justification.CENTER_ALIGN;
            p[1].appliedFont = "Cormorant Garamond"; p[1].fontStyle = "Regular"; p[1].pointSize = 74; p[1].fillColor = cWhite; p[1].spaceAfter = 8; p[1].justification = Justification.CENTER_ALIGN;
            p[2].appliedFont = "Cormorant Garamond"; p[2].fontStyle = "Italic"; p[2].pointSize = 34; p[2].fillColor = cGold; p[2].spaceAfter = 32; p[2].justification = Justification.CENTER_ALIGN;
            p[3].appliedFont = "Montserrat"; p[3].fontStyle = "Light"; p[3].pointSize = 18; p[3].leading = 28; p[3].fillColor = cWhite; p[3].spaceAfter = 44; p[3].justification = Justification.CENTER_ALIGN;
            p[4].appliedFont = "Montserrat"; p[4].fontStyle = "Medium"; p[4].pointSize = 13; p[4].tracking = 200; p[4].fillColor = cGold; p[4].justification = Justification.CENTER_ALIGN;
        } catch(e){}
    }

    // ==========================================
    // PAGE 2: PHILOSOPHY
    // ==========================================
    var p2 = d.pages[1];
    var tf2_hdr = findTFByTop(p2, 45);
    if (tf2_hdr) {
        tf2_hdr.parentStory.contents = "__P2_HDR__";
        try {
            tf2_hdr.paragraphs[0].appliedFont = "Montserrat"; tf2_hdr.paragraphs[0].fontStyle = "Medium"; tf2_hdr.paragraphs[0].pointSize = 10; tf2_hdr.paragraphs[0].tracking = 180; tf2_hdr.paragraphs[0].fillColor = cOlive;
        } catch(e){}
    }

    var tf2_title = findTFByTop(p2, 130);
    if (tf2_title) {
        tf2_title.parentStory.contents = "__P2_TITLE__";
        try {
            tf2_title.paragraphs[0].appliedFont = "Cormorant Garamond"; tf2_title.paragraphs[0].fontStyle = "Bold"; tf2_title.paragraphs[0].pointSize = 42; tf2_title.paragraphs[0].fillColor = cInk; tf2_title.paragraphs[0].spaceAfter = 12;
            tf2_title.paragraphs[1].appliedFont = "Montserrat"; tf2_title.paragraphs[1].fontStyle = "Light"; tf2_title.paragraphs[1].pointSize = 15; tf2_title.paragraphs[1].leading = 24; tf2_title.paragraphs[1].fillColor = cInkSoft;
        } catch(e){}
    }

    var tf2_c1 = findTFByTop(p2, 310);
    if (tf2_c1) {
        tf2_c1.parentStory.contents = "__P2_C1__";
        styleCard(tf2_c1, cInk, cInkSoft);
    }
    var tf2_c2 = findTFByTop(p2, 530);
    if (tf2_c2) {
        tf2_c2.parentStory.contents = "__P2_C2__";
        styleCard(tf2_c2, cInk, cInkSoft);
    }
    var tf2_c3 = findTFByTop(p2, 750);
    if (tf2_c3) {
        tf2_c3.parentStory.contents = "__P2_C3__";
        styleCard(tf2_c3, cInk, cInkSoft);
    }

    // ==========================================
    // PAGE 3: CULTURE & WATER
    // ==========================================
    var p3 = d.pages[2];
    var tf3_hdr = findTFByTop(p3, 45);
    if (tf3_hdr) {
        tf3_hdr.parentStory.contents = "__P3_HDR__";
        try {
            tf3_hdr.paragraphs[0].appliedFont = "Montserrat"; tf3_hdr.paragraphs[0].fontStyle = "Medium"; tf3_hdr.paragraphs[0].pointSize = 10; tf3_hdr.paragraphs[0].tracking = 180; tf3_hdr.paragraphs[0].fillColor = cOlive;
        } catch(e){}
    }

    var tf3_title = findTFByTop(p3, 130);
    if (tf3_title) {
        tf3_title.parentStory.contents = "__P3_TITLE__";
        try {
            tf3_title.paragraphs[0].appliedFont = "Cormorant Garamond"; tf3_title.paragraphs[0].fontStyle = "Bold"; tf3_title.paragraphs[0].pointSize = 40; tf3_title.paragraphs[0].fillColor = cInk; tf3_title.paragraphs[0].spaceAfter = 12;
            tf3_title.paragraphs[1].appliedFont = "Montserrat"; tf3_title.paragraphs[1].fontStyle = "Light"; tf3_title.paragraphs[1].pointSize = 15; tf3_title.paragraphs[1].leading = 24; tf3_title.paragraphs[1].fillColor = cInkSoft;
        } catch(e){}
    }

    var tf3_c1 = findTFByTop(p3, 310);
    if (tf3_c1) {
        tf3_c1.parentStory.contents = "__P3_C1__";
        styleCard(tf3_c1, cInk, cInkSoft);
    }
    var tf3_c2 = findTFByTop(p3, 530);
    if (tf3_c2) {
        tf3_c2.parentStory.contents = "__P3_C2__";
        styleCard(tf3_c2, cInk, cInkSoft);
    }
    var tf3_c3 = findTFByTop(p3, 750);
    if (tf3_c3) {
        tf3_c3.parentStory.contents = "__P3_C3__";
        styleCard(tf3_c3, cInk, cInkSoft);
    }

    // ==========================================
    // PAGE 4: AESTHETICS
    // ==========================================
    var p4 = d.pages[3];
    var tf4_hdr = findTFByTop(p4, 45);
    if (tf4_hdr) {
        tf4_hdr.parentStory.contents = "__P4_HDR__";
        try {
            tf4_hdr.paragraphs[0].appliedFont = "Montserrat"; tf4_hdr.paragraphs[0].fontStyle = "Medium"; tf4_hdr.paragraphs[0].pointSize = 10; tf4_hdr.paragraphs[0].tracking = 180; tf4_hdr.paragraphs[0].fillColor = cOlive;
        } catch(e){}
    }

    var tf4_title = findTFByTop(p4, 130);
    if (tf4_title) {
        tf4_title.parentStory.contents = "__P4_TITLE__";
        try {
            tf4_title.paragraphs[0].appliedFont = "Cormorant Garamond"; tf4_title.paragraphs[0].fontStyle = "Bold"; tf4_title.paragraphs[0].pointSize = 42; tf4_title.paragraphs[0].fillColor = cInk; tf4_title.paragraphs[0].spaceAfter = 12;
            tf4_title.paragraphs[1].appliedFont = "Montserrat"; tf4_title.paragraphs[1].fontStyle = "Light"; tf4_title.paragraphs[1].pointSize = 15; tf4_title.paragraphs[1].leading = 24; tf4_title.paragraphs[1].fillColor = cInkSoft;
        } catch(e){}
    }

    var tf4_c1 = findTFByTop(p4, 310);
    if (tf4_c1) {
        tf4_c1.parentStory.contents = "__P4_C1__";
        styleCard(tf4_c1, cInk, cInkSoft);
    }
    var tf4_c2 = findTFByTop(p4, 530);
    if (tf4_c2) {
        tf4_c2.parentStory.contents = "__P4_C2__";
        styleCard(tf4_c2, cInk, cInkSoft);
    }
    var tf4_c3 = findTFByTop(p4, 750);
    if (tf4_c3) {
        tf4_c3.parentStory.contents = "__P4_C3__";
        styleCard(tf4_c3, cInk, cInkSoft);
    }

    // ==========================================
    // PAGE 5: PERSONAL FORMAT
    // ==========================================
    var p5 = d.pages[4];
    var tf5_hdr = findTFByTop(p5, 45);
    if (tf5_hdr) {
        tf5_hdr.parentStory.contents = "__P5_HDR__";
        try {
            tf5_hdr.paragraphs[0].appliedFont = "Montserrat"; tf5_hdr.paragraphs[0].fontStyle = "Medium"; tf5_hdr.paragraphs[0].pointSize = 10; tf5_hdr.paragraphs[0].tracking = 180; tf5_hdr.paragraphs[0].fillColor = cGold;
        } catch(e){}
    }

    var tf5_main = findTFByTop(p5, 200);
    if (tf5_main) {
        tf5_main.parentStory.contents = "__P5_MAIN__";
        try {
            var p5Arr = tf5_main.paragraphs;
            p5Arr[0].appliedFont = "Cormorant Garamond"; p5Arr[0].fontStyle = "Bold"; p5Arr[0].pointSize = 42; p5Arr[0].fillColor = cInk; p5Arr[0].justification = Justification.CENTER_ALIGN;
            p5Arr[1].appliedFont = "Montserrat"; p5Arr[1].fontStyle = "Regular"; p5Arr[1].pointSize = 15; p5Arr[1].leading = 24; p5Arr[1].fillColor = cInkSoft; p5Arr[1].justification = Justification.CENTER_ALIGN;
            p5Arr[2].appliedFont = "Montserrat"; p5Arr[2].fontStyle = "Bold"; p5Arr[2].pointSize = 12; p5Arr[2].tracking = 160; p5Arr[2].fillColor = cGold; p5Arr[2].justification = Justification.CENTER_ALIGN;
            p5Arr[3].appliedFont = "Montserrat"; p5Arr[3].fontStyle = "Medium"; p5Arr[3].pointSize = 14; p5Arr[3].fillColor = cOlive; p5Arr[3].justification = Justification.CENTER_ALIGN;
            p5Arr[4].appliedFont = "Montserrat"; p5Arr[4].fontStyle = "Medium"; p5Arr[4].pointSize = 14; p5Arr[4].fillColor = cOlive; p5Arr[4].justification = Justification.CENTER_ALIGN;
            p5Arr[5].appliedFont = "Montserrat"; p5Arr[5].fontStyle = "Regular"; p5Arr[5].pointSize = 16; p5Arr[5].leading = 26; p5Arr[5].fillColor = cInk; p5Arr[5].justification = Justification.CENTER_ALIGN;
            p5Arr[6].appliedFont = "Cormorant Garamond"; p5Arr[6].fontStyle = "Bold"; p5Arr[6].pointSize = 28; p5Arr[6].fillColor = cInk; p5Arr[6].justification = Justification.CENTER_ALIGN;
            p5Arr[7].appliedFont = "Montserrat"; p5Arr[7].fontStyle = "Medium"; p5Arr[7].pointSize = 14; p5Arr[7].tracking = 100; p5Arr[7].fillColor = cGold; p5Arr[7].justification = Justification.CENTER_ALIGN;
        } catch(e){}
    }

    d.save();
}

function styleCard(tf, cTitle, cDesc) {
    try {
        tf.paragraphs[0].appliedFont = "Cormorant Garamond";
        tf.paragraphs[0].fontStyle = "Bold";
        tf.paragraphs[0].pointSize = 21;
        tf.paragraphs[0].fillColor = cTitle;
        tf.paragraphs[0].spaceAfter = 8;
        tf.paragraphs[1].appliedFont = "Montserrat";
        tf.paragraphs[1].fontStyle = "Regular";
        tf.paragraphs[1].pointSize = 13.5;
        tf.paragraphs[1].leading = 21;
        tf.paragraphs[1].fillColor = cDesc;
    } catch(e){}
}
'''

p1_text = (
    "EXCLUSIVE PRIVATE EXPEDITION\n"
    "BALI: SACRED HERITAGE\n"
    "Bespoke Journey & Serenity\n\n"
    "Приватная экспедиция в сердце первозданного острова для ценителей тишины, искусства и подлинной культуры.\n\n"
    "CURATED BY VALERY LATYPOV"
)

p2_hdr = "BALI: SACRED HERITAGE  ·  BESPOKE JOURNEY & SERENITY\tСТРАНИЦА 02 / ФИЛОСОФИЯ"
p2_title = (
    "Остров в ритме вашего дыхания\n"
    "Мы исключили из путешествия любую суету, крутые подъёмы и туристические толпы. Бали открывается как закрытый сад — через тишину, ароматы лотосов и утренний свет."
)
p2_c1 = "✦ Приватные резиденции\nПроживание на лучших уединённых виллах острова в окружении природы. Просторные личные сады, прохладные бассейны, тишина и безупречный сервис."
p2_c2 = "✦ Мягкий темп и комфорт\nПерсональный комфортабельный автомобиль премиум-класса с водителем. Никакой спешки — каждый день строится вокруг вашего самочувствия, неспешных прогулок в тени и глубокого отдыха."
p2_c3 = "✦ Спа и восстановление\nЛучшие традиционные балийские массажи, ванны с лепестками цветов, ароматерапия и натуральные масла, возвращающие телу лёгкость, энергию и покой."

p3_hdr = "BALI: SACRED HERITAGE  ·  BESPOKE JOURNEY & SERENITY\tСТРАНИЦА 03 / КУЛЬТУРА И ВОДА"
p3_title = (
    "Величие королей и сакральные источники\n"
    "Прикосновение к древней культуре острова без религиозного фанатизма — через гармонию архитектуры, воду и тысячелетние традиции."
)
p3_c1 = "✦ Водные дворцы Карангасема (Тирта Ганга и Таман Уджунг)\nУтренняя прогулка по каменным дорожкам среди фонтанов и священных карпов в часы, когда дворцы открыты только для вас."
p3_c2 = "✦ Храмы в тени древних баньянов\nКамерные, спрятанные от посторонних глаз святилища Восточного Бали, хранящие дух и эстетику старого королевства."
p3_c3 = "✦ Тёплое благословение старейшины\nПриватная встреча с балийским брахманом. Красивый и мягкий традиционный ритуал с цветами и благовониями на мир в душе, здоровье и гармонию семьи."

p4_hdr = "BALI: SACRED HERITAGE  ·  BESPOKE JOURNEY & SERENITY\tСТРАНИЦА 04 / ЭСТЕТИКА И ИСКУССТВО"
p4_title = (
    "Эстетика каждого мгновения\n"
    "Бали — это остров ремесленников высочайшего класса, тихих закатов и первозданной природы."
)
p4_c1 = "✦ Чайные церемонии и частные галереи\nЗнакомство с потомственными резчиками по дереву, ткачами батика и мастерами ювелирного искусства в их закрытых мастерских."
p4_c2 = "✦ Закаты над океаном\nУжины со свежими морепродуктами и авторской кухней на открытых террасах с панорамным видом на Индийский океан."
p4_c3 = "✦ Авторская фотолетопись\nЯ деликатно и ненавязчиво сопровождаю вас на маршруте, создавая коллекцию кинематографичных портретов на память об этой поездке — в естественной красоте момента, без утомительного позирования."

p5_hdr = "BALI: SACRED HERITAGE  ·  BESPOKE JOURNEY & SERENITY\tСТРАНИЦА 05 / ПЕРСОНАЛЬНЫЙ ФОРМАТ"
p5_main = (
    "Путешествие, созданное исключительно для вас\n\n"
    "Экспедиция создаётся в единственном экземпляре для двух гостей. Мы согласовываем удобные для вас даты, длительность и локации так, чтобы поездка стала абсолютно безопасным, красивым и наполняющим отдыхом.\n\n"
    "ВИДЕО-ВПЕЧАТЛЕНИЯ ОБ ОСТРОВЕ:\n"
    "▶  Погрузиться в атмосферу утреннего Бали\n"
    "▶  Водные дворцы и сакральные места\n\n"
    "Давайте устроим короткий видеозвонок или чашку чая онлайн: я отвечу на любые вопросы о комфорте и безопасности, и мы начнём собирать ваш персональный маршрут.\n\n"
    "ВАЛЕРИЙ ЛАТЫПОВ\n"
    "Telegram / WhatsApp: +7 (985) 224-67-89  ·  @latypov_valery"
)

jsx = jsx.replace("__P1_TEXT__", to_unicode_escape(p1_text))
jsx = jsx.replace("__P2_HDR__", to_unicode_escape(p2_hdr))
jsx = jsx.replace("__P2_TITLE__", to_unicode_escape(p2_title))
jsx = jsx.replace("__P2_C1__", to_unicode_escape(p2_c1))
jsx = jsx.replace("__P2_C2__", to_unicode_escape(p2_c2))
jsx = jsx.replace("__P2_C3__", to_unicode_escape(p2_c3))

jsx = jsx.replace("__P3_HDR__", to_unicode_escape(p3_hdr))
jsx = jsx.replace("__P3_TITLE__", to_unicode_escape(p3_title))
jsx = jsx.replace("__P3_C1__", to_unicode_escape(p3_c1))
jsx = jsx.replace("__P3_C2__", to_unicode_escape(p3_c2))
jsx = jsx.replace("__P3_C3__", to_unicode_escape(p3_c3))

jsx = jsx.replace("__P4_HDR__", to_unicode_escape(p4_hdr))
jsx = jsx.replace("__P4_TITLE__", to_unicode_escape(p4_title))
jsx = jsx.replace("__P4_C1__", to_unicode_escape(p4_c1))
jsx = jsx.replace("__P4_C2__", to_unicode_escape(p4_c2))
jsx = jsx.replace("__P4_C3__", to_unicode_escape(p4_c3))

jsx = jsx.replace("__P5_HDR__", to_unicode_escape(p5_hdr))
jsx = jsx.replace("__P5_MAIN__", to_unicode_escape(p5_main))

with open("/Volumes/Genius Art/Antigravity/Bali Tours/scripts/apply_clean_cyrillic.jsx", "w", encoding="ascii") as f:
    f.write(jsx)

print("SUCCESS: 100% Pure ASCII Unicode JSX file generated.")
