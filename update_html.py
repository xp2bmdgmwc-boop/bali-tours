import re

with open("timor.html", "r", encoding="utf-8") as f:
    content = f.read()

# We want to insert the disclaimer before <div id="tour-8-days" class="space-y-16">
disclaimer_html = """
      <!-- Global Disclaimer -->
      <div class="max-w-4xl mx-auto bg-slate-900/80 border-l-4 border-amber-500 rounded-2xl p-6 md:p-8 mb-16 shadow-2xl">
        <h4 class="text-amber-400 font-serif font-bold text-lg mb-2">Гибкий тайминг и практики по запросу</h4>
        <p class="text-slate-300 text-sm leading-relaxed mb-3">
          Мы не ставим жестких армейских рамок. График экспедиции гибок: мы даем вам выспаться (даже если это 11 утра) и строим ритм так, чтобы вы успели насладиться каждым днем без суеты.
        </p>
        <p class="text-slate-400 text-sm leading-relaxed">
          <strong class="text-white">Энергетическая работа:</strong> Глубокие медитации, телесные правки и контакты с Местами Силы интегрируются в путешествие <span class="text-amber-400 underline decoration-amber-500/30 underline-offset-4">исключительно по вашему желанию</span>. Вы сами выбираете, насколько глубоким будет погружение.
        </p>
      </div>

"""

tour_8_html = """<div id="tour-8-days" class="space-y-16">
        
        <!-- Pricing 8 Days -->
        <div class="bg-amber-500/10 border border-amber-500/20 rounded-2xl p-6 text-center max-w-2xl mx-auto mb-10">
          <div class="text-amber-400 text-xl font-serif font-bold mb-2">Стоимость: от $10,000</div>
          <p class="text-slate-400 text-sm mb-4">Базовая стоимость экспедиции (без учета авиабилетов и страховки).</p>
          <p class="text-amber-500 text-sm font-semibold border-t border-amber-500/20 pt-4 mt-2">
            VIP-Опция: Возможность организации закрытой встречи с сыном Президента (при участии Патрика). Требует согласования, стоимость рассчитывается индивидуально.
          </p>
        </div>

        <ul class="card-list mb-24 max-w-3xl mx-auto">
          <li>8 дней 1-на-1 с Валерием Латыповым</li>
          <li>Премиальные внедорожники (Land Cruiser)</li>
          <li>Отели 4-5 звезд и лучшие эко-лоджи</li>
          <li>Завтраки в отелях включены</li>
          <li>Фрахт лодки к синим китам и на Атауро</li>
          <li>Полная конфиденциальность (NDA по запросу)</li>
        </ul>
        
        <!-- Day 1 -->
        <div class="story-block bg-brand-surface border border-white/10 rounded-3xl p-8 md:p-12 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center hover:border-amber-500/30 transition duration-500">
          <div class="lg:col-span-6 space-y-4">
            <span class="bg-amber-500/10 text-amber-400 text-xs font-mono px-3 py-1 rounded-full uppercase tracking-wider">ДЕНЬ 01</span>
            <h3 class="text-2xl md:text-3xl font-serif font-bold text-white">Столица, Кофе и Наследие</h3>
            <p class="text-slate-300 text-sm md:text-base leading-relaxed">
              Прилет в Дили, чек-ин в Novo Turismo Resort. Погружение начинается со столицы: португальская архитектура, покупка традиционного текстиля (Tais) и дегустация премиального горного кофе. 
              <br><br>Мы посетим фабрику масел Ascension Oil (Kukui nut oil), а также (по желанию) отправимся в горы к Обители Нагов для стартовой настройки.
            </p>
          </div>
          <div class="lg:col-span-6 grid grid-cols-2 gap-4 story-img-group">
            <img src="images/IMG_2163.jpg" alt="Дили" class="w-full aspect-[4/3] object-cover rounded-2xl border border-white/10 shadow-lg" />
            <img src="images/IMG_2288.jpg" alt="Архитектура" class="w-full aspect-[4/3] object-cover rounded-2xl border border-white/10 shadow-lg" />
          </div>
        </div>

        <!-- Day 2 -->
        <div class="story-block bg-brand-surface border border-white/10 rounded-3xl p-8 md:p-12 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center hover:border-amber-500/30 transition duration-500">
          <div class="lg:col-span-6 lg:order-2 space-y-4">
            <span class="bg-amber-500/10 text-amber-400 text-xs font-mono px-3 py-1 rounded-full uppercase tracking-wider">ДЕНЬ 02</span>
            <h3 class="text-2xl md:text-3xl font-serif font-bold text-white">Атауро: Синие Киты и Garden Reef</h3>
            <p class="text-slate-300 text-sm md:text-base leading-relaxed">
              Фрахт частной лодки и выход в пролив Омбай-Ветар. Это один из главных путей миграции огромных Синих Китов. Наблюдение за гигантами в океане.
              <br><br>Прибытие на остров Атауро. Снорклинг на знаменитом Garden Reef — рифе с высочайшим биоразнообразием в мире.
            </p>
          </div>
          <div class="lg:col-span-6 lg:order-1">
            <img src="images/IMG_3281.jpg" alt="Снорклинг и Океан" class="w-full aspect-video object-cover rounded-2xl border border-white/10 shadow-lg" />
          </div>
        </div>

        <!-- Day 3 -->
        <div class="story-block bg-brand-surface border border-white/10 rounded-3xl p-8 md:p-12 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center hover:border-amber-500/30 transition duration-500">
          <div class="lg:col-span-6 space-y-4">
            <span class="bg-amber-500/10 text-amber-400 text-xs font-mono px-3 py-1 rounded-full uppercase tracking-wider">ДЕНЬ 03</span>
            <h3 class="text-2xl md:text-3xl font-serif font-bold text-white">Горы, Маубиссе и Докомали</h3>
            <p class="text-slate-300 text-sm md:text-base leading-relaxed">
              Выезд на комфортном внедорожнике на юг, в горы. Посещение традиционных ферм (Maubisse Cultural and Farm Experience). 
              <br><br>Небольшой живописный треккинг через джунгли к гигантскому водопаду Dokomali (Bee Tudak Dokomali). Мощь падающей воды и первозданная природа.
            </p>
          </div>
          <div class="lg:col-span-6 grid grid-cols-2 gap-4 story-img-group">
            <img src="images/IMG_2244.jpg" alt="Горы Маубиссе" class="w-full aspect-[4/3] object-cover rounded-2xl border border-white/10 shadow-lg" />
            <img src="images/IMG_3301.jpg" alt="Джунгли" class="w-full aspect-[4/3] object-cover rounded-2xl border border-white/10 shadow-lg" />
          </div>
        </div>

        <!-- Day 4 -->
        <div class="story-block bg-brand-surface border border-white/10 rounded-3xl p-8 md:p-12 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center hover:border-amber-500/30 transition duration-500">
          <div class="lg:col-span-6 lg:order-2 space-y-4">
            <span class="bg-amber-500/10 text-amber-400 text-xs font-mono px-3 py-1 rounded-full uppercase tracking-wider">ДЕНЬ 04</span>
            <h3 class="text-2xl md:text-3xl font-serif font-bold text-white">Курс на Восток: Баукау</h3>
            <p class="text-slate-300 text-sm md:text-base leading-relaxed">
              Мы начинаем движение на восток острова. Чтобы не терпеть 9-часовую тряску за один день, мы прибываем в старинный колониальный город Баукау. 
              <br><br>Посещение исторической природной купели с лазурной водой в слоистых скалах (Дух Воды). Ночевка в атмосферной крепости <em>Pousada de Baucau</em>.
            </p>
          </div>
          <div class="lg:col-span-6 lg:order-1 grid grid-cols-2 gap-4 story-img-group">
            <img src="images/IMG_3122.jpg" alt="Купель в Баукау" class="w-full aspect-[4/3] object-cover rounded-2xl border border-white/10 shadow-lg" />
            <img src="images/IMG_3135.jpg" alt="Водопад Баукау" class="w-full aspect-[4/3] object-cover rounded-2xl border border-white/10 shadow-lg" />
          </div>
        </div>

        <!-- Day 5 -->
        <div class="story-block bg-brand-surface border border-white/10 rounded-3xl p-8 md:p-12 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center hover:border-amber-500/30 transition duration-500">
          <div class="lg:col-span-6 space-y-4">
            <span class="bg-amber-500/10 text-amber-400 text-xs font-mono px-3 py-1 rounded-full uppercase tracking-wider">ДЕНЬ 05</span>
            <h3 class="text-2xl md:text-3xl font-serif font-bold text-white">Край Света: Лоспалос и Тутуала</h3>
            <p class="text-slate-300 text-sm md:text-base leading-relaxed">
              Продолжение пути на крайний восток. Дорога становится более дикой, асфальт сменяется грунтовками — вот где Land Cruiser покажет себя. 
              <br><br>Прибытие в район Тутуала (Национальный парк Нино Конис Сантана). Заселение в лучший из доступных эко-лоджей у самого края земли.
            </p>
          </div>
          <div class="lg:col-span-6">
            <img src="images/IMG_2176.jpg" alt="Дорога на восток" class="w-full aspect-video object-cover rounded-2xl border border-white/10 shadow-lg" />
          </div>
        </div>

        <!-- Day 6 -->
        <div class="story-block bg-brand-surface border border-white/10 rounded-3xl p-8 md:p-12 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center hover:border-amber-500/30 transition duration-500">
          <div class="lg:col-span-6 lg:order-2 space-y-4">
            <span class="bg-amber-500/10 text-amber-400 text-xs font-mono px-3 py-1 rounded-full uppercase tracking-wider">ДЕНЬ 06</span>
            <h3 class="text-2xl md:text-3xl font-serif font-bold text-white">Необитаемый Жако</h3>
            <p class="text-slate-300 text-sm md:text-base leading-relaxed">
              Переправа на местных рыбацких лодках на священный (Lulik) необитаемый остров Жако. 
              <br><br>Белоснежный коралловый песок, бирюзовый океан и дикие олени, выходящие к воде. Тотальная изоляция и океаническая тишина. Свободное время, купание, медитация.
            </p>
          </div>
          <div class="lg:col-span-6 lg:order-1 grid grid-cols-2 gap-4 story-img-group">
            <img src="images/IMG_2518.jpg" alt="Жако Остров" class="w-full aspect-[4/3] object-cover rounded-2xl border border-white/10 shadow-lg" />
            <img src="images/IMG_2526.jpg" alt="Валерий Латыпов в Тутуале" class="w-full aspect-[4/3] object-cover rounded-2xl border border-white/10 shadow-lg" />
          </div>
        </div>

        <!-- Day 7 -->
        <div class="story-block bg-brand-surface border border-white/10 rounded-3xl p-8 md:p-12 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center hover:border-amber-500/30 transition duration-500">
          <div class="lg:col-span-6 space-y-4">
            <span class="bg-amber-500/10 text-amber-400 text-xs font-mono px-3 py-1 rounded-full uppercase tracking-wider">ДЕНЬ 07</span>
            <h3 class="text-2xl md:text-3xl font-serif font-bold text-white">Uma Lulik и Возвращение</h3>
            <p class="text-slate-300 text-sm md:text-base leading-relaxed">
              Посещение священных домов на сваях (Uma Lulik) племен Фаталуку. Знакомство с анимистическими верованиями аборигенов, передача традиционных подношений (ткани, бетель) старейшинам.
              <br><br>Начало неспешного обратного переезда в сторону Дили с ночевкой в комфортной точке маршрута.
            </p>
          </div>
          <div class="lg:col-span-6 grid grid-cols-2 gap-4 story-img-group">
            <img src="images/IMG_2563.jpg" alt="Фаталуку" class="w-full aspect-[4/3] object-cover rounded-2xl border border-white/10 shadow-lg" />
            <img src="images/IMG_2506.jpg" alt="Uma Lulik" class="w-full aspect-[4/3] object-cover rounded-2xl border border-white/10 shadow-lg" />
          </div>
        </div>

        <!-- Day 8 -->
        <div class="story-block bg-brand-surface border border-white/10 rounded-3xl p-8 md:p-12 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center hover:border-amber-500/30 transition duration-500">
          <div class="lg:col-span-6 lg:order-2 space-y-4">
            <span class="bg-amber-500/10 text-amber-400 text-xs font-mono px-3 py-1 rounded-full uppercase tracking-wider">ДЕНЬ 08</span>
            <h3 class="text-2xl md:text-3xl font-serif font-bold text-white">Интеграция и Вылет</h3>
            <p class="text-slate-300 text-sm md:text-base leading-relaxed">
              Возвращение в столицу. Утренняя интеграция впечатлений. Покупка лучшего премиального кофе с собой. Трансфер в аэропорт и вылет домой.
            </p>
          </div>
          <div class="lg:col-span-6 lg:order-1">
            <img src="images/IMG_2144.jpg" alt="Побережье Дили" class="w-full aspect-video object-cover rounded-2xl border border-white/10 shadow-lg" />
          </div>
        </div>

      </div> <!-- /tour-8-days -->
"""

tour_3_html = """      <!-- 3 DAYS TOUR CONTENT -->
      <div id="tour-3-days" class="space-y-16 hidden">
        <!-- Pricing 3 Days -->
        <div class="bg-amber-500/10 border border-amber-500/20 rounded-2xl p-6 text-center max-w-2xl mx-auto mb-10">
          <div class="text-amber-400 text-xl font-serif font-bold mb-2">Стоимость: $4,000</div>
          <p class="text-slate-400 text-sm">Без учета авиабилетов и страховки (приобретаются самостоятельно).</p>
        </div>

        <!-- Day 1 -->
        <div class="story-block bg-brand-surface border border-white/10 rounded-3xl p-8 md:p-12 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div class="lg:col-span-6 space-y-4">
            <span class="bg-amber-500/10 text-amber-400 text-xs font-mono px-3 py-1 rounded-full uppercase tracking-wider">ДЕНЬ 01</span>
            <h3 class="text-2xl md:text-3xl font-serif font-bold text-white">Столица и Наследие (Дили)</h3>
            <p class="text-slate-300 text-sm md:text-base leading-relaxed">
              Заезд в отель Novo Turismo, замедление. Исследование колониальной архитектуры, визит на рынок традиционных тканей (Tais). Дегустация премиального горного кофе и визит на производство масел Ascension Oil. Опциональная вечерняя энергетическая настройка.
            </p>
          </div>
          <div class="lg:col-span-6 grid grid-cols-2 gap-4">
            <img src="images/IMG_2163.jpg" alt="Дили" class="w-full aspect-[4/3] object-cover rounded-2xl border border-white/10 shadow-lg" />
            <img src="images/IMG_2288.jpg" alt="Архитектура" class="w-full aspect-[4/3] object-cover rounded-2xl border border-white/10 shadow-lg" />
          </div>
        </div>

        <!-- Day 2 -->
        <div class="story-block bg-brand-surface border border-white/10 rounded-3xl p-8 md:p-12 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div class="lg:col-span-6 lg:order-2 space-y-4">
            <span class="bg-amber-500/10 text-amber-400 text-xs font-mono px-3 py-1 rounded-full uppercase tracking-wider">ДЕНЬ 02</span>
            <h3 class="text-2xl md:text-3xl font-serif font-bold text-white">Океан (Атауро и Киты)</h3>
            <p class="text-slate-300 text-sm md:text-base leading-relaxed">
              Выход в пролив на лодке для наблюдения за синими китами в их естественной среде обитания. Высадка на остров Атауро, снорклинг на знаменитом Garden Reef с идеальной прозрачностью воды.
            </p>
          </div>
          <div class="lg:col-span-6 lg:order-1">
            <img src="images/IMG_3281.jpg" alt="Океан" class="w-full aspect-video object-cover rounded-2xl border border-white/10 shadow-lg" />
          </div>
        </div>

        <!-- Day 3 -->
        <div class="story-block bg-brand-surface border border-white/10 rounded-3xl p-8 md:p-12 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div class="lg:col-span-6 space-y-4">
            <span class="bg-amber-500/10 text-amber-400 text-xs font-mono px-3 py-1 rounded-full uppercase tracking-wider">ДЕНЬ 03</span>
            <h3 class="text-2xl md:text-3xl font-serif font-bold text-white">Маубиссе или Баукау (На выбор)</h3>
            <p class="text-slate-300 text-sm md:text-base leading-relaxed">
              В зависимости от ваших предпочтений: поездка в горы к гигантскому водопаду Докомали и на кофейные фермы Маубиссе, ЛИБО комфортный выезд на восток к исторической природной Купели Баукау. Вечером — трансфер в аэропорт.
            </p>
          </div>
          <div class="lg:col-span-6 grid grid-cols-2 gap-4">
            <img src="images/IMG_2244.jpg" alt="Маубиссе" class="w-full aspect-[4/3] object-cover rounded-2xl border border-white/10 shadow-lg" />
            <img src="images/IMG_3122.jpg" alt="Баукау" class="w-full aspect-[4/3] object-cover rounded-2xl border border-white/10 shadow-lg" />
          </div>
        </div>

      </div> <!-- /tour-3-days -->"""


# Find the section to replace: from <div id="tour-8-days" class="space-y-16">
# up to <!-- 6. PHOTO GALLERY GRID -->
start_idx = content.find('<div id="tour-8-days"')
end_idx = content.find('<!-- 6. PHOTO GALLERY GRID -->')

if start_idx != -1 and end_idx != -1:
    # also remove up to the end of the container div that wraps tour-3-days
    # The container ends exactly before </section> which is right before 6. PHOTO GALLERY
    end_tag = content.rfind('</section>', 0, end_idx)
    inner_end = content.rfind('</div>', 0, end_tag)
    
    new_content = content[:start_idx] + disclaimer_html + tour_8_html + "\n\n" + tour_3_html + "\n    </div>\n  </section>\n\n  " + content[end_idx:]
    
    with open("timor.html", "w", encoding="utf-8") as f:
        f.write(new_content)
    print("Successfully replaced.")
else:
    print("Could not find markers.")
