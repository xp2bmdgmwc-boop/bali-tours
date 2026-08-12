import re

html_content = """<!DOCTYPE html>
<html lang="ru" class="scroll-smooth">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Валерий Латыпов · Авторские Экспедиции: Тимор-Лесте & Бали</title>
  <meta name="description" content="Эксклюзивные авторские экспедиции на край Земли — Восточный Тимор и нетуристический Бали. Первозданная природа, 4x4 внедорожники, мамерные VIP-группы." />
  
  <!-- Tailwind CSS CDN -->
  <script src="https://cdn.tailwindcss.com"></script>
  <script>
    tailwind.config = {
      theme: {
        extend: {
          colors: {
            brand: {
              bg: '#FAF9F6',
              surface: '#FFFFFF',
              card: '#F4F2EC',
              accent: '#C96E16',
              accentHover: '#A3560F',
              dark: '#1C1917',
              muted: '#78716C'
            }
          },
          fontFamily: {
            serif: ['PT Serif', 'Georgia', 'serif'],
            sans: ['Manrope', 'sans-serif']
          }
        }
      }
    }
  </script>
  
  <link rel="stylesheet" href="style.css" />
  <!-- GSAP & ScrollTrigger -->
  <script src="https://cdn.jsdelivr.net/npm/gsap@3.12.5/dist/gsap.min.js"></script>
  <script src="https://cdn.jsdelivr.net/npm/gsap@3.12.5/dist/ScrollTrigger.min.js"></script>
</head>
<body class="bg-brand-bg text-stone-900 font-sans selection:bg-amber-200 selection:text-stone-950 overflow-x-hidden antialiased">

  <!-- 1. NAVIGATION -->
  <nav class="fixed top-4 left-1/2 -translate-x-1/2 z-50 w-[94%] max-w-6xl bg-white/90 backdrop-blur-md border border-stone-200/80 rounded-2xl px-6 py-4 flex items-center justify-between shadow-sm">
    <a href="#" class="font-serif text-lg tracking-tight text-stone-900 font-bold hover:text-amber-700 transition">
      ВАЛЕРИЙ ЛАТЫПОВ <span class="text-xs font-sans font-normal text-stone-500 ml-2 uppercase tracking-widest hidden sm:inline">· Экспедиции</span>
    </a>
    <div class="hidden md:flex items-center space-x-8 text-sm font-medium text-stone-700">
      <a href="#map" class="hover:text-amber-700 transition">Карта</a>
      <a href="#selector" class="hover:text-amber-700 transition">Программы</a>
      <a href="#guide" class="hover:text-amber-700 transition">Проводник</a>
    </div>
    <a href="#contact" class="bg-stone-900 hover:bg-stone-800 text-white font-medium px-5 py-2.5 rounded-xl text-sm transition shadow-sm">
      Запросить участие
    </a>
  </nav>

  <!-- 2. HERO SECTION -->
  <section class="pt-32 pb-16 bg-white border-b border-stone-200">
    <div class="container mx-auto px-6 max-w-5xl text-center">
      <span class="inline-block bg-amber-100/70 border border-amber-300 text-amber-900 font-mono text-xs uppercase tracking-widest px-4 py-1.5 rounded-full mb-6">
        Авторские Путешествия · Час от Бали
      </span>
      <h1 class="text-4xl md:text-6xl lg:text-7xl font-serif font-bold text-stone-950 tracking-tight leading-tight mb-6">
        Путешествие на Край Земли
      </h1>
      <p class="text-lg md:text-2xl text-stone-600 font-light max-w-3xl mx-auto leading-relaxed mb-8">
        Камерные экспедиции в <span class="text-stone-950 font-normal">Тимор-Лесте</span> и на <span class="text-stone-950 font-normal">Бали</span>. Первозданная природа, дикий океан и глубокое погружение в культуры без туристических толп.
      </p>
      
      <div class="flex flex-wrap items-center justify-center gap-4 text-sm font-medium text-stone-600">
        <div class="bg-stone-100 px-4 py-2 rounded-xl border border-stone-200">◈ Формат: Камерные группы (до 6 чел.)</div>
        <div class="bg-stone-100 px-4 py-2 rounded-xl border border-stone-200">◈ Внедорожники 4x4 Toyota Land Cruiser</div>
        <div class="bg-stone-100 px-4 py-2 rounded-xl border border-stone-200">◈ Персональный трансфер из аэропорта Дили</div>
      </div>
    </div>
  </section>

  <!-- 3. MAP & EXPAT STATS SECTION -->
  <section class="py-16 bg-brand-bg" id="map">
    <div class="container mx-auto px-6 max-w-6xl">
      <div class="text-center max-w-3xl mx-auto mb-10">
        <span class="text-amber-800 font-mono text-xs uppercase tracking-widest">География & Факты</span>
        <h2 class="text-3xl md:text-5xl font-serif font-bold text-stone-950 mt-2">
          Карта Маршрута и Абсолютная Изоляция
        </h2>
      </div>

      <!-- Stats Grid -->
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        <div class="bg-white p-6 rounded-2xl border border-stone-200 shadow-sm text-center">
          <div class="text-3xl md:text-4xl font-serif font-bold text-amber-700 mb-2">&lt; 50</div>
          <p class="text-stone-600 text-sm leading-relaxed">Туристов во всей стране одновременно. Тимор-Лесте входит в топ-3 наименее посещаемых стран мира по данным UNWTO.</p>
        </div>
        <div class="bg-white p-6 rounded-2xl border border-stone-200 shadow-sm text-center">
          <div class="text-3xl md:text-4xl font-serif font-bold text-amber-700 mb-2">~100</div>
          <p class="text-stone-600 text-sm leading-relaxed">Европейцев-контрактников проживают в столице Дили. Вы попадаете в мир без привычной массовки.</p>
        </div>
        <div class="bg-white p-6 rounded-2xl border border-stone-200 shadow-sm text-center">
          <div class="text-3xl md:text-4xl font-serif font-bold text-amber-700 mb-2">VIP 4x4</div>
          <p class="text-stone-600 text-sm leading-relaxed">Никаких городских такси. Встреча с рейса прямо у трапа на подготовленном внедорожнике Toyota Land Cruiser.</p>
        </div>
      </div>

      <!-- Map Display -->
      <div class="bg-white p-4 rounded-3xl border border-stone-200 shadow-sm overflow-hidden">
        <img src="images/timor_loop_map.jpg" alt="Карта маршрута по Тимору" class="w-full h-auto object-cover rounded-2xl filter grayscale opacity-90 contrast-125" />
      </div>
    </div>
  </section>

  <!-- 4. FOR WHOM & WHAT YOU GET -->
  <section class="py-16 bg-white border-y border-stone-200">
    <div class="container mx-auto px-6 max-w-6xl">
      <div class="grid grid-cols-1 md:grid-cols-2 gap-12">
        <!-- Для кого -->
        <div class="bg-stone-50 p-8 rounded-3xl border border-stone-200/80 space-y-4">
          <span class="text-amber-800 font-mono text-xs uppercase tracking-widest">Профиль Участников</span>
          <h3 class="text-2xl md:text-3xl font-serif font-bold text-stone-950">Для кого этот опыт?</h3>
          <ul class="space-y-3 text-stone-700 text-sm md:text-base">
            <li class="flex items-start"><span class="text-amber-700 mr-3">◈</span> Для предпринимателей и лидеров, которым требуется качественная перезагрузка и сброс операционной нагрузки.</li>
            <li class="flex items-start"><span class="text-amber-700 mr-3">◈</span> Для искателей редкого аутентичного опыта вне привычных курортных стандартов.</li>
            <li class="flex items-start"><span class="text-amber-700 mr-3">◈</span> Для тех, кто ценит общество равных по духу и статусных единомышленников.</li>
          </ul>
        </div>

        <!-- Что вы получите -->
        <div class="bg-stone-50 p-8 rounded-3xl border border-stone-200/80 space-y-4">
          <span class="text-amber-800 font-mono text-xs uppercase tracking-widest">Результаты</span>
          <h3 class="text-2xl md:text-3xl font-serif font-bold text-stone-950">Что вы получите?</h3>
          <ul class="space-y-3 text-stone-700 text-sm md:text-base">
            <li class="flex items-start"><span class="text-amber-700 mr-3">◈</span> <strong>Ощущение первооткрывателя:</strong> Соприкосновение с диким океаном, синими китами и древними деревнями.</li>
            <li class="flex items-start"><span class="text-amber-700 mr-3">◈</span> <strong>Максимальный доступ:</strong> Прямой разговор с местными старейшинами и уникальными проектами без посредников.</li>
            <li class="flex items-start"><span class="text-amber-700 mr-3">◈</span> <strong>Комфорт в диких условиях:</strong> Отели 4-5★, внедорожники, приватные катеры и гибкий график под ваш ритм.</li>
          </ul>
        </div>
      </div>
    </div>
  </section>

  <!-- 5. DYNAMIC ITINERARY SELECTOR -->
  <section class="py-20 bg-brand-bg" id="selector">
    <div class="container mx-auto px-6 max-w-6xl">
      <div class="text-center max-w-3xl mx-auto mb-10">
        <span class="text-amber-800 font-mono text-xs uppercase tracking-widest">Программы и Варианты</span>
        <h2 class="text-3xl md:text-5xl font-serif font-bold text-stone-950 mt-2">
          Выберите Маршрут
        </h2>
        <p class="text-stone-600 mt-2 text-sm md:text-base">Вы можете выбрать отдельную экспедицию по Тимору, путешествие по Бали или комбинированный 12-дневный тур.</p>
      </div>

      <!-- Tabs Switcher Buttons -->
      <div class="flex flex-wrap justify-center gap-2 mb-12">
        <button onclick="switchTab('timor-8')" id="tab-timor-8" class="px-5 py-3 rounded-xl font-medium text-sm transition-all duration-300 bg-stone-900 text-white shadow-sm">
          Тимор-Лесте: 8 Дней ($10,000)
        </button>
        <button onclick="switchTab('timor-3')" id="tab-timor-3" class="px-5 py-3 rounded-xl font-medium text-sm transition-all duration-300 bg-white text-stone-700 hover:bg-stone-100 border border-stone-200">
          Тимор-Лесте: 3 Дня ($4,000)
        </button>
        <button onclick="switchTab('bali-7')" id="tab-bali-7" class="px-5 py-3 rounded-xl font-medium text-sm transition-all duration-300 bg-white text-stone-700 hover:bg-stone-100 border border-stone-200">
          Бали: 7 Дней (От $6,000)
        </button>
        <button onclick="switchTab('combo-12')" id="tab-combo-12" class="px-5 py-3 rounded-xl font-medium text-sm transition-all duration-300 bg-white text-stone-700 hover:bg-stone-100 border border-stone-200">
          ✨ Комбо: Бали + Тимор (12 Дней)
        </button>
      </div>

      <!-- PROGRAM 1: TIMOR 8 DAYS -->
      <div id="prog-timor-8" class="prog-content space-y-8">
        <div class="bg-amber-50 border border-amber-200 p-6 rounded-2xl text-stone-800 text-sm flex flex-col md:flex-row justify-between items-center gap-4">
          <div>
            <strong class="text-amber-900 font-serif text-lg block">Тимор-Лесте: Полная Экспедиция (8 Дней)</strong>
            <span>Все завтраки включены. Проживание в Novo Turismo 4* (Дили) и Pousada de Baucau. Трансферы на 4x4 Land Cruiser.</span>
          </div>
          <span class="text-amber-900 font-bold font-serif text-2xl whitespace-nowrap">$10,000</span>
        </div>

        <div class="space-y-6">
          <div class="bg-white p-6 md:p-8 rounded-3xl border border-stone-200 grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
            <div class="lg:col-span-6 space-y-2">
              <span class="text-amber-800 font-mono text-xs font-bold uppercase tracking-widest">ДЕНЬ 01</span>
              <h3 class="text-xl md:text-2xl font-serif font-bold text-stone-950">Столица, Кофе и Персональный Трансфер</h3>
              <p class="text-stone-600 text-sm leading-relaxed">
                Прилет в Дили. Персональный трансфер из аэропорта на внедорожнике Toyota Land Cruiser (без местных такси). Чек-ин в Novo Turismo Resort 4*. Знакомство со столицей, визит на фабрику масел Ascension Oil и дегустация премиального горного кофе.
              </p>
            </div>
            <div class="lg:col-span-6 grid grid-cols-2 gap-3">
              <img src="images/IMG_2163.jpg" alt="Дили" class="w-full aspect-[4/3] object-cover rounded-xl border border-stone-200" />
              <img src="images/IMG_2288.jpg" alt="Колониальный Дили" class="w-full aspect-[4/3] object-cover rounded-xl border border-stone-200" />
            </div>
          </div>

          <div class="bg-white p-6 md:p-8 rounded-3xl border border-stone-200 grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
            <div class="lg:col-span-6 space-y-2">
              <span class="text-amber-800 font-mono text-xs font-bold uppercase tracking-widest">ДЕНЬ 02</span>
              <h3 class="text-xl md:text-2xl font-serif font-bold text-stone-950">Океан: Остров Атауро & Наблюдение за Китами</h3>
              <p class="text-stone-600 text-sm leading-relaxed">
                Ранний выход на частном катере в пролив Омбай-Ветар для наблюдения за синими китами в их естественной среде. Высадка на остров Атауро, снорклинг на легендарном коралловом рифе Garden Reef с идеальной прозрачностью.
              </p>
            </div>
            <div class="lg:col-span-6">
              <img src="images/IMG_3281.jpg" alt="Океан и Киты" class="w-full aspect-video object-cover rounded-xl border border-stone-200" />
            </div>
          </div>

          <div class="bg-white p-6 md:p-8 rounded-3xl border border-stone-200 grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
            <div class="lg:col-span-6 space-y-2">
              <span class="text-amber-800 font-mono text-xs font-bold uppercase tracking-widest">ДЕНЬ 03</span>
              <h3 class="text-xl md:text-2xl font-serif font-bold text-stone-950">Горы: Seloi Kraik, Маубиссе и Водопад Докомали</h3>
              <p class="text-stone-600 text-sm leading-relaxed">
                Выезд на 4x4 на юг. Остановка в горной деревне Seloi Kraik (округ Айлеу) с сочными рисовыми террасами и озером. Визит на кофейные плантации Маубиссе и треккинг к мощному гигантскому водопаду Dokomali (Bee Tudak).
              </p>
            </div>
            <div class="lg:col-span-6 grid grid-cols-2 gap-3">
              <img src="images/IMG_2244.jpg" alt="Маубиссе" class="w-full aspect-[4/3] object-cover rounded-xl border border-stone-200" />
              <img src="images/IMG_3120.jpg" alt="Водопад Докомали" class="w-full aspect-[4/3] object-cover rounded-xl border border-stone-200" />
            </div>
          </div>

          <div class="bg-white p-6 md:p-8 rounded-3xl border border-stone-200 grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
            <div class="lg:col-span-6 space-y-2">
              <span class="text-amber-800 font-mono text-xs font-bold uppercase tracking-widest">ДЕНЬ 04-05</span>
              <h3 class="text-xl md:text-2xl font-serif font-bold text-stone-950">Курс на Восток: Колониальный Баукау</h3>
              <p class="text-stone-600 text-sm leading-relaxed">
                Комфортный переезд на восток вдоль океана. Остановка и ночевка в исторической португальской крепости Pousada de Baucau. Купание в природной минеральной купели Баукау в слоистых известняковых скалах.
              </p>
            </div>
            <div class="lg:col-span-6 grid grid-cols-2 gap-3">
              <img src="images/IMG_3122.jpg" alt="Баукау" class="w-full aspect-[4/3] object-cover rounded-xl border border-stone-200" />
              <img src="images/IMG_3135.jpg" alt="Купель Баукау" class="w-full aspect-[4/3] object-cover rounded-xl border border-stone-200" />
            </div>
          </div>

          <div class="bg-white p-6 md:p-8 rounded-3xl border border-stone-200 grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
            <div class="lg:col-span-6 space-y-2">
              <span class="text-amber-800 font-mono text-xs font-bold uppercase tracking-widest">ДЕНЬ 06-07</span>
              <h3 class="text-xl md:text-2xl font-serif font-bold text-stone-950">Священный Остров Жако и Дома на Сваях Uma Lulik</h3>
              <p class="text-stone-600 text-sm leading-relaxed">
                Переправа на лодках на абсолютно необитаемый священный остров Жако. Белоснежный песок, дикие олени, выходящие к воде. Знакомство с традиционными трапециевидными домами на сваях Uma Lulik и культурой народа Фаталуку.
              </p>
            </div>
            <div class="lg:col-span-6 grid grid-cols-2 gap-3">
              <img src="images/IMG_2563.jpg" alt="Фаталуку" class="w-full aspect-[4/3] object-cover rounded-xl border border-stone-200" />
              <img src="images/IMG_2506.jpg" alt="Uma Lulik" class="w-full aspect-[4/3] object-cover rounded-xl border border-stone-200" />
            </div>
          </div>

          <div class="bg-white p-6 md:p-8 rounded-3xl border border-stone-200 grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
            <div class="lg:col-span-6 space-y-2">
              <span class="text-amber-800 font-mono text-xs font-bold uppercase tracking-widest">ДЕНЬ 08</span>
              <h3 class="text-xl md:text-2xl font-serif font-bold text-stone-950">Завершение & Вылет</h3>
              <p class="text-stone-600 text-sm leading-relaxed">
                Возвращение в столицу. Покупка лучшего премиального зернового кофе и текстиля Tais в подарок. Комфортный трансфер в аэропорт Дили на 4x4.
              </p>
            </div>
            <div class="lg:col-span-6">
              <img src="images/IMG_2144.jpg" alt="Побережье Дили" class="w-full aspect-video object-cover rounded-xl border border-stone-200" />
            </div>
          </div>
        </div>
      </div>

      <!-- PROGRAM 2: TIMOR 3 DAYS -->
      <div id="prog-timor-3" class="prog-content space-y-8 hidden">
        <div class="bg-amber-50 border border-amber-200 p-6 rounded-2xl text-stone-800 text-sm flex flex-col md:flex-row justify-between items-center gap-4">
          <div>
            <strong class="text-amber-900 font-serif text-lg block">Тимор-Лесте: Экспресс-Экспедиция (3 Дня)</strong>
            <span>Короткий насыщенный маршрут: Киты, Остров Атауро, Горная деревня Seloi Kraik и Водопад Докомали.</span>
          </div>
          <span class="text-amber-900 font-bold font-serif text-2xl whitespace-nowrap">$4,000</span>
        </div>

        <div class="space-y-6">
          <div class="bg-white p-6 md:p-8 rounded-3xl border border-stone-200 grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
            <div class="lg:col-span-6 space-y-2">
              <span class="text-amber-800 font-mono text-xs font-bold uppercase tracking-widest">ДЕНЬ 01</span>
              <h3 class="text-xl md:text-2xl font-serif font-bold text-stone-950">Дили: Кофе и Трансфер на 4x4</h3>
              <p class="text-stone-600 text-sm leading-relaxed">
                Встреча у трапа самолета в Дили персональным внедорожником Toyota Land Cruiser. Заезд в Novo Turismo Resort, исследование колониального города, дегустация кофе и посещение производства Ascension Oil.
              </p>
            </div>
            <div class="lg:col-span-6 grid grid-cols-2 gap-3">
              <img src="images/IMG_2163.jpg" alt="Дили" class="w-full aspect-[4/3] object-cover rounded-xl border border-stone-200" />
              <img src="images/IMG_2288.jpg" alt="Архитектура" class="w-full aspect-[4/3] object-cover rounded-xl border border-stone-200" />
            </div>
          </div>

          <div class="bg-white p-6 md:p-8 rounded-3xl border border-stone-200 grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
            <div class="lg:col-span-6 space-y-2">
              <span class="text-amber-800 font-mono text-xs font-bold uppercase tracking-widest">ДЕНЬ 02</span>
              <h3 class="text-xl md:text-2xl font-serif font-bold text-stone-950">Океан: Синие Киты & Риф Атауро</h3>
              <p class="text-stone-600 text-sm leading-relaxed">
                Катерная прогулка в пролив для наблюдения за синими китами. Снорклинг на нетронутых коралловых садах острова Атауро (Garden Reef).
              </p>
            </div>
            <div class="lg:col-span-6">
              <img src="images/IMG_3281.jpg" alt="Океан" class="w-full aspect-video object-cover rounded-xl border border-stone-200" />
            </div>
          </div>

          <div class="bg-white p-6 md:p-8 rounded-3xl border border-stone-200 grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
            <div class="lg:col-span-6 space-y-2">
              <span class="text-amber-800 font-mono text-xs font-bold uppercase tracking-widest">ДЕНЬ 03</span>
              <h3 class="text-xl md:text-2xl font-serif font-bold text-stone-950">Горный выезд: Seloi Kraik, Маубиссе и Докомали</h3>
              <p class="text-stone-600 text-sm leading-relaxed">
                Выезд на внедорожниках в горную деревню Seloi Kraik к рисовым террасам, посещение плантаций Маубиссе и треккинг к водопаду Докомали. Трансфер в аэропорт к вечернему рейсу.
              </p>
            </div>
            <div class="lg:col-span-6 grid grid-cols-2 gap-3">
              <img src="images/IMG_2244.jpg" alt="Маубиссе" class="w-full aspect-[4/3] object-cover rounded-xl border border-stone-200" />
              <img src="images/IMG_3122.jpg" alt="Баукау" class="w-full aspect-[4/3] object-cover rounded-xl border border-stone-200" />
            </div>
          </div>
        </div>
      </div>

      <!-- PROGRAM 3: BALI 7 DAYS -->
      <div id="prog-bali-7" class="prog-content space-y-8 hidden">
        <div class="bg-stone-900 text-white p-6 rounded-2xl text-sm flex flex-col md:flex-row justify-between items-center gap-4">
          <div>
            <strong class="text-amber-400 font-serif text-lg block">Аутентичный Бали (7 Дней)</strong>
            <span>Сакральная культура Бали без туристической суеты. Закрытый доступ к хранителям традиций.</span>
          </div>
          <span class="text-amber-400 font-bold font-serif text-2xl whitespace-nowrap">От $6,000</span>
        </div>

        <div class="space-y-6">
          <div class="bg-white p-6 md:p-8 rounded-3xl border border-stone-200 grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
            <div class="lg:col-span-6 space-y-2">
              <span class="text-amber-800 font-mono text-xs font-bold uppercase tracking-widest">ДЕНЬ 01-02</span>
              <h3 class="text-xl md:text-2xl font-serif font-bold text-stone-950">Погружение в культуру Убуда</h3>
              <p class="text-stone-600 text-sm leading-relaxed">
                Размещение в премиальном бутик-отеле в Убуде. Частный визит в музей **Neka Art Museum**, где выставлены работы Валерия Латыпова. Знакомство с искусством и эстетикой острова.
              </p>
            </div>
            <div class="lg:col-span-6 grid grid-cols-2 gap-3">
              <img src="images/bali_hero.jpg" alt="Бали Убуд" class="w-full aspect-[4/3] object-cover rounded-xl border border-stone-200" />
              <img src="images/bali_temple.jpg" alt="Храм Бали" class="w-full aspect-[4/3] object-cover rounded-xl border border-stone-200" />
            </div>
          </div>

          <div class="bg-white p-6 md:p-8 rounded-3xl border border-stone-200 grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
            <div class="lg:col-span-6 space-y-2">
              <span class="text-amber-800 font-mono text-xs font-bold uppercase tracking-widest">ДЕНЬ 03-05</span>
              <h3 class="text-xl md:text-2xl font-serif font-bold text-stone-950">Дикие святилища и Общение со Старейшинами</h3>
              <p class="text-stone-600 text-sm leading-relaxed">
                Общение с балийскими хранителями древних традиций, не говорящими по-английски. Валерий свободно владеет индонезийским языком (BIPA-2) и проводит прямые беседы без посторонних переводчиков. Посещение скрытых водопадов и храмов.
              </p>
            </div>
            <div class="lg:col-span-6 grid grid-cols-2 gap-3">
              <img src="images/bali_water.jpg" alt="Водопад Бали" class="w-full aspect-[4/3] object-cover rounded-xl border border-stone-200" />
              <img src="images/bali_ritual.jpg" alt="Традиции Бали" class="w-full aspect-[4/3] object-cover rounded-xl border border-stone-200" />
            </div>
          </div>

          <div class="bg-white p-6 md:p-8 rounded-3xl border border-stone-200 grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
            <div class="lg:col-span-6 space-y-2">
              <span class="text-amber-800 font-mono text-xs font-bold uppercase tracking-widest">ДЕНЬ 06-07</span>
              <h3 class="text-xl md:text-2xl font-serif font-bold text-stone-950">Тихий океан и Отдых</h3>
              <p class="text-stone-600 text-sm leading-relaxed">
                Переезд на нетуристическое побережье Бали. Замедление, отдыхать на вилле у океана, интеграция полученного опыта перед вылетом домой.
              </p>
            </div>
            <div class="lg:col-span-6">
              <img src="images/bali_nature.jpg" alt="Природа Бали" class="w-full aspect-video object-cover rounded-xl border border-stone-200" />
            </div>
          </div>
        </div>
      </div>

      <!-- PROGRAM 4: COMBO 12 DAYS -->
      <div id="prog-combo-12" class="prog-content space-y-8 hidden">
        <div class="bg-amber-100 border border-amber-300 p-6 rounded-2xl text-stone-900 text-sm flex flex-col md:flex-row justify-between items-center gap-4">
          <div>
            <strong class="text-amber-950 font-serif text-xl block">✨ Комбо-Экспедиция: Бали (7 дней) + Тимор-Лесте (5 дней)</strong>
            <span>Сначала эстетика и культура Бали, затем перелет на 1 час и погружение в дикий нетронутый Тимор.</span>
          </div>
          <span class="text-amber-900 font-bold font-serif text-xl whitespace-nowrap">Цена по запросу</span>
        </div>

        <div class="bg-white p-8 rounded-3xl border border-stone-200 space-y-6">
          <h3 class="text-2xl font-serif font-bold text-stone-950">Идеальный Баланс Комфорта и Первозданности</h3>
          <p class="text-stone-600 leading-relaxed">
            Этот двойной маршрут создан для тех, кто хочет максимального размаха: 7 дней мягкого погружения в традиции и культуру Бали (с проживанием в премиальных виллах и общением со старейшинами), а затем 5 дней настоящей приключенческой автоэкспедиции на внедорожниках 4x4 по Тимору.
          </p>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
            <div class="bg-stone-50 p-6 rounded-2xl border border-stone-200">
              <h4 class="font-serif font-bold text-stone-900 mb-2">Этап 1: Бали (7 Дней)</h4>
              <p class="text-stone-600 text-sm">Убуд, музей Neka, закрытые локации, беседы с хранителями традиций на индонезийском языке, пляжный отдых.</p>
            </div>
            <div class="bg-stone-50 p-6 rounded-2xl border border-stone-200">
              <h4 class="font-serif font-bold text-stone-900 mb-2">Этап 2: Тимор-Лесте (5 Дней)</h4>
              <p class="text-stone-600 text-sm">Перелет 1 час. Дили, внедорожники 4x4, синие киты, риф Атауро, водопад Докомали и исторический Баукау.</p>
            </div>
          </div>
        </div>
      </div>

    </div>
  </section>

  <!-- 6. AUTHOR & GUIDE SECTION -->
  <section class="py-20 bg-white border-t border-stone-200" id="guide">
    <div class="container mx-auto px-6 max-w-5xl">
      <div class="grid grid-cols-1 md:grid-cols-12 gap-12 items-center">
        <div class="md:col-span-7 space-y-5">
          <span class="text-amber-800 font-mono text-xs uppercase tracking-widest">Автор и Проводник</span>
          <h2 class="text-4xl font-serif font-bold text-stone-950">Валерий Латыпов</h2>
          <p class="font-serif italic text-xl text-stone-700 leading-relaxed border-l-2 border-amber-600 pl-4">
            «Главное ценность сегодня — это настоящий, неискаженный опыт и чистая тишина, которую уже невозможно найти на массовых курортах.»
          </p>
          <div class="space-y-3 text-stone-600 text-sm md:text-base leading-relaxed">
            <p>
              <strong>Прямой разговор без посредников:</strong> Валерий свободно владеет индонезийским языком (сертифицированный уровень BIPA-2). Это открывает возможность прямого общения с местными старейшинами, хранителемя традиций и жителями удаленных деревень без английских переводчиков.
            </p>
            <p>
              <strong>Признание в искусстве:</strong> Живописные работы Валерия находятся в коллекции знаменитого национального музея <strong>Neka Art Museum</strong> в Убуде.
            </p>
            <p>
              <strong>Опыт & Логистика:</strong> Многолетний опыт экспедиций в редкие регионы, прямые связи с локальными лидерами и безупречный уровень организации на месте.
            </p>
          </div>
        </div>
        <div class="md:col-span-5">
          <img src="images/author_portrait.jpg" alt="Валерий Латыпов" class="w-full aspect-[3/4] object-cover rounded-3xl border border-stone-200 shadow-md" />
        </div>
      </div>
    </div>
  </section>

  <!-- 7. CONTACT / CTA SECTION -->
  <section class="py-24 bg-stone-900 text-white relative" id="contact">
    <div class="container mx-auto px-6 max-w-3xl text-center">
      <span class="text-amber-400 font-mono text-xs uppercase tracking-widest mb-3 inline-block">Индивидуальный Формат</span>
      <h2 class="text-3xl md:text-5xl font-serif font-bold mb-4">Обсудить Экспедицию</h2>
      <p class="text-stone-400 text-base md:text-lg mb-8 max-w-xl mx-auto leading-relaxed">
        Все программы адаптируются под ваши даты и пожелания. Мы формируем небольшие группы единомышленников или организуем закрытые выезды.
      </p>
      
      <a href="https://t.me/valerylatypov" target="_blank" class="inline-block bg-amber-600 hover:bg-amber-500 text-stone-950 font-bold px-10 py-5 rounded-2xl text-lg transition shadow-xl transform hover:-translate-y-0.5">
        Написать Валерию в Telegram
      </a>
    </div>
  </section>

  <!-- 8. FOOTER -->
  <footer class="py-10 bg-stone-950 text-xs text-stone-500 border-t border-stone-800">
    <div class="container mx-auto px-6 max-w-6xl flex flex-col md:flex-row justify-between items-center gap-4">
      <div>
        <span class="font-serif font-bold text-stone-300">ВАЛЕРИЙ ЛАТЫПОВ</span> · Авторские Экспедиции © 2026
      </div>
      <div class="flex space-x-6 text-stone-400">
        <a href="#selector" class="hover:text-white transition">Тимор-Лесте</a>
        <a href="#selector" class="hover:text-white transition">Бали</a>
        <a href="#selector" class="hover:text-white transition">Комбо-тур</a>
      </div>
    </div>
  </footer>

  <script>
    function switchTab(tabKey) {
      const tabs = ['timor-8', 'timor-3', 'bali-7', 'combo-12'];
      
      tabs.forEach(key => {
        const btn = document.getElementById('tab-' + key);
        const prog = document.getElementById('prog-' + key);
        
        if (key === tabKey) {
          btn.className = "px-5 py-3 rounded-xl font-medium text-sm transition-all duration-300 bg-stone-900 text-white shadow-sm";
          if (prog) prog.classList.remove('hidden');
        } else {
          btn.className = "px-5 py-3 rounded-xl font-medium text-sm transition-all duration-300 bg-white text-stone-700 hover:bg-stone-100 border border-stone-200";
          if (prog) prog.classList.add('hidden');
        }
      });
    }
  </script>

</body>
</html>
"""

with open('/Volumes/Genius Art/Antigravity/Bali Tours/timor.html', 'w', encoding='utf-8') as f:
    f.write(html_content)

with open('/Volumes/Genius Art/Antigravity/Bali Tours/index.html', 'w', encoding='utf-8') as f:
    f.write(html_content)

print("Updated both timor.html and index.html successfully!")
