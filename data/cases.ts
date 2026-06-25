export interface CaseStudy {
  slug: string;
  title: string;
  category: string;
  shortDescription: string;
  problem: string;
  solution: string;
  features: string[];
  stack: string[];
  integrations: string[];
  resultDescription: string;
  bannerPath: string;
  framePath?: string;
  accent: string;
  relatedServices: { title: string; href: string }[];
  seoTitle: string;
  seoDescription: string;
  liveUrl?: string;
}

export const CASES: CaseStudy[] = [
  {
    slug: "kronos-agency",
    title: "Kronos Agency",
    category: "Нерухомість · Бренд",
    shortDescription: "Преміальний лендінг для агентства елітної нерухомості з кінематографічною скрол-інтерактивністю та бездоганним UX.",
    problem: "Клієнту було необхідно створити презентаційну платформу для ексклюзивних об'єктів нерухомості преміум-сегменту. Основне завдання — викликати емоцію довіри та ексклюзивності за допомогою дизайну та нестандартної інтерактивної презентації, уникаючи шаблонів.",
    solution: "Реалізовано кінематографічний лендінг із технологією покадрового скрол-керування (scrubbing) та плавними переходами на базі GSAP. Розроблено адаптивну 3D-подібну взаємодію з планами поверхів та інтегровано швидкі форми зворотного зв'язку.",
    features: [
      "Кінематографічний скрол-контроль відео та зображень",
      "Унікальна інтерактивна галерея планувань",
      "Мінімалістична форма збору лідів з миттєвою відправкою",
      "Оптимізоване завантаження медіа-ресурсів для мобільних пристроїв"
    ],
    stack: ["HTML5", "CSS3", "JavaScript", "GSAP", "TailwindCSS"],
    integrations: ["Telegram Bot API", "Google Sheets API", "Email Notifications"],
    resultDescription: "Клієнт отримав унікальний інструмент презентації, який збільшив середній час перебування на сайті у 3 рази та підвищив конверсію у заявку на перегляд об'єктів до 4.8%.",
    bannerPath: "/agency.jpg",
    accent: "from-amber-600/40 via-yellow-500/20 to-transparent",
    relatedServices: [
      { title: "Розробка Landing Page", href: "/landing-page" },
      { title: "Створення сайтів у Києві", href: "/stvorennya-saitiv-kyiv" }
    ],
    seoTitle: "Кейс Kronos Agency | Преміальний лендінг для нерухомості",
    seoDescription: "Як ми створили кінематографічний скрол-лендінг для агентства елітної нерухомості Kronos Agency. Деталі розробки, технологічний стек та результати.",
    liveUrl: "https://gglutt.github.io/agency-vibe/"
  },
  {
    slug: "budle-startup",
    title: "Budle",
    category: "Стартап · Соціальна мережа",
    shortDescription: "Стартап нової соцмережі: стрічка, профілі, чати, real-time реакції та сучасний fullstack стек.",
    problem: "Створення MVP (мінімально життєздатного продукту) для нової соціальної мережі, орієнтованої на швидку взаємодію користувачів. Проєкт вимагав високої швидкості рендерингу сторінок, реального часу для реакцій та повідомлень, а також масштабованої структури бази даних.",
    solution: "Розроблено fullstack веб-застосунок на базі Next.js App Router та Node.js. Створено гнучку NoSQL архітектуру на MongoDB для зберігання профілів та постів, інтегровано WebSockets для чатів та real-time оновлень стрічки без перезавантаження сторінки.",
    features: [
      "Динамічна стрічка новин з підвантаженням контенту",
      "Real-time чати та миттєві реакції на пости",
      "Особисті кабінети користувачів з налаштуванням приватності",
      "Адаптивний мобільний інтерфейс у стилі native-додатків"
    ],
    stack: ["Next.js", "TypeScript", "Node.js", "MongoDB", "TailwindCSS"],
    integrations: ["Cloudinary API для фото", "Socket.io", "Telegram Logger"],
    resultDescription: "Продукт успішно запущено в бета-тестування. Завдяки Next.js SSR швидкість першого завантаження сайту складає менше 1.2 секунди, що забезпечило комфортний старт для перших 500+ тестувальників.",
    bannerPath: "/budle1.png",
    framePath: "/budle2.png",
    accent: "from-indigo-500/40 via-violet-500/20 to-transparent",
    relatedServices: [
      { title: "Розробка веб-застосунків", href: "/web-app-development" },
      { title: "Автоматизація n8n та AI", href: "/n8n-automation" }
    ],
    seoTitle: "Кейс Budle | Розробка MVP соціальної мережі",
    seoDescription: "Опис розробки стартапу Budle: fullstack веб-додаток на Next.js, TypeScript та MongoDB з real-time чатами. Деталі архітектури.",
    liveUrl: "https://github.com/GGLUTT/budle-startup"
  },
  {
    slug: "iphone-3d-landing",
    title: "iPhone 3D Landing",
    category: "Лендінг · 3D Анімація",
    shortDescription: "Кінематографічний концепт-лендінг нового iPhone з інтерактивною 3D-сценою та скрол-анімаціями.",
    problem: "Необхідно було продемонструвати можливості сучасного WebGL рендерингу для e-commerce сфери, показавши товар з усіх ракурсів за допомогою інтерактивної 3D моделі, яка синхронізується з поведінкою користувача при скролі.",
    solution: "Побудовано тривимірну сцену з використанням Three.js та React Three Fiber. Всі анімації обертання камери, зміни кольорів моделі та розбирання пристрою на деталі прив'язані до скролу сторінки за допомогою бібліотеки GSAP ScrollTrigger.",
    features: [
      "Інтерактивний 3D-огляд пристрою на 360 градусів",
      "Покрокове розбирання внутрішніх деталей телефону при прокрутці",
      "Динамічна зміна кольорів корпусу в реальному часі",
      "Оптимізація текстур та шейдерів для плавної роботи на смартфонах"
    ],
    stack: ["React", "Three.js", "React Three Fiber", "GSAP", "TailwindCSS"],
    integrations: ["WebGL Engine", "Vercel Analytics"],
    resultDescription: "Лендінг демонструє стабільні 60 FPS на більшості мобільних пристроїв. Такий рівень презентації товарів дозволяє підняти зацікавленість продуктом на 40% порівняно зі звичайними статичними фото.",
    bannerPath: "/iphone-project.png",
    accent: "from-slate-300/40 via-zinc-400/20 to-transparent",
    relatedServices: [
      { title: "Розробка Landing Page", href: "/landing-page" },
      { title: "Створення сайтів у Білій Церкві", href: "/stvorennya-saitiv-bila-tserkva" }
    ],
    seoTitle: "Кейс iPhone 3D Landing | Інтерактивна 3D розробка",
    seoDescription: "WebGL та 3D анімація у веб-розробці. Огляд створення промо-сторінки iPhone з використанням Three.js та GSAP.",
    liveUrl: "https://gglutt.github.io/phone3d/"
  },
  {
    slug: "3d-nexus",
    title: "3D Nexus",
    category: "Комерція · 3D / WebGL",
    shortDescription: "Сайт для комерційного комп'ютерного клубу з інтерактивними 3D-об'єктами та футуристичним інтерфейсом.",
    problem: "Клієнт (комп'ютерний клуб) хотів виділитися на ринку розваг та залучити геймерів яскравим, нестандартним сайтом, який би відображав атмосферу кіберспортивної арени та дозволяв забронювати ігрове місце онлайн.",
    solution: "Створено темно-футуристичний інтерфейс з інтегрованою 3D-моделлю ігрової зони. Реалізовано інтерактивну карту залу, де користувач може наочно обрати та забронювати конкретний комп'ютер.",
    features: [
      "3D-інтерактивна карта комп'ютерного залу клубу",
      "Система онлайн-перевірки зайнятості місць в реальному часі",
      "Яскраві неонові ефекти та кастомні шейдери WebGL",
      "Повна адаптивність під сенсорне керування на мобільних"
    ],
    stack: ["Three.js", "React", "WebGL", "GSAP", "TailwindCSS"],
    integrations: ["CRM для бронювання", "Telegram Bot Notification", "LiqPay для оплати"],
    resultDescription: "Клуб отримав іміджевий інструмент, який автоматизував процес бронювання. Понад 60% запитів на бронювання комп'ютерів тепер проходять через сайт без залучення адміністратора.",
    bannerPath: "/nexus.png",
    accent: "from-cyan-500/40 via-emerald-400/20 to-transparent",
    relatedServices: [
      { title: "Розробка веб-застосунків", href: "/web-app-development" },
      { title: "Автоматизація n8n та AI", href: "/n8n-automation" }
    ],
    seoTitle: "Кейс 3D Nexus | Сайт комп'ютерного клубу з 3D картою",
    seoDescription: "Розробка сайту для кіберспортивного клубу 3D Nexus. Інтерактивне бронювання місць, 3D WebGL карта залу та автоматизація CRM.",
    liveUrl: "https://gglutt.github.io/3d-nexus/"
  },
  {
    slug: "nts-soccer-academy",
    title: "NTS SOCCER ACADEMY",
    category: "Спорт · SaaS",
    shortDescription: "Платформа для дитячої футбольної академії зі статистикою в реальному часі, розкладом та кабінетами батьків.",
    problem: "Академія мала проблему з організацією тренувального процесу, обліком відвідуваності та інформуванням батьків. Дані велися в розрізнених Excel-файлах, що призводило до помилок та втрати часу.",
    solution: "Розроблено спеціалізовану SaaS-платформу. Створено кабінети для тренерів (внесення результатів, оцінка гравців) та кабінети для батьків (розклад, оплати, прогрес дитини). Інтегровано систему сповіщень у Telegram.",
    features: [
      "Кабінети батьків та тренерів з розмежуванням прав доступу",
      "Гнучкий інтерактивний календар тренувань та ігор",
      "Трекінг спортивних показників та відвідуваності дітей",
      "Автоматична генерація звітів про оплати за місяць"
    ],
    stack: ["Next.js", "TypeScript", "Node.js", "PostgreSQL", "TailwindCSS"],
    integrations: ["Monobank API для оплат", "Telegram Bot API", "SMS Club"],
    resultDescription: "Впровадження SaaS-платформи повністю замінило паперову рутину. Час на адміністрування процесів в академії скоротився на 70%, а рівень своєчасних оплат зріс на 35%.",
    bannerPath: "/football-baner.jpg",
    accent: "from-emerald-500/40 via-emerald-400/20 to-transparent",
    relatedServices: [
      { title: "Розробка веб-застосунків", href: "/web-app-development" },
      { title: "Створення сайтів у Києві", href: "/stvorennya-saitiv-kyiv" }
    ],
    seoTitle: "Кейс NTS Soccer Academy | Спортивна SaaS платформа",
    seoDescription: "Як автоматизувати процеси дитячої спортивної академії. Розробка SaaS платформи з особистими кабінетами та інтеграцією оплат.",
    liveUrl: "https://nts-academy.net/"
  },
  {
    slug: "nike-concept",
    title: "Nike Concept",
    category: "E-commerce · Бренд",
    shortDescription: "Концептуальний інтернет-магазин з динамічним 3D-конфігуратором кросівок та інтеграцією Stripe.",
    problem: "Показати можливість покращення клієнтського досвіду в сфері онлайн-продажів взуття шляхом створення інтерактивного конфігуратора, який дозволяє клієнту налаштувати дизайн взуття перед покупкою.",
    solution: "Створено швидкий e-commerce прототип на React. За допомогою Three.js реалізовано зміну матеріалів та кольорів на різних частинах 3D-моделі кросівка, інтегровано кошик та оплату через тестовий Stripe.",
    features: [
      "Детальний 3D-конфігуратор взуття з вибором кольорів та матеріалів",
      "Динамічний розрахунок вартості в залежності від обраних опцій",
      "Оптимізований Checkout процес з підказками",
      "Миттєве збереження дизайну користувача в сесії"
    ],
    stack: ["React", "Three.js", "Stripe API", "TailwindCSS"],
    integrations: ["Stripe Payment Gateway", "Local Storage Session Sync"],
    resultDescription: "Концепт демонструє можливість підвищення конверсії в інтернет-магазинах на 15-20% завдяки залученню клієнта в ігровий процес створення власного дизайну товару.",
    bannerPath: "/nike-banner.jpg",
    accent: "from-orange-500/40 via-rose-500/20 to-transparent",
    relatedServices: [
      { title: "Розробка Landing Page", href: "/landing-page" },
      { title: "Створення сайтів у Києві", href: "/stvorennya-saitiv-kyiv" }
    ],
    seoTitle: "Кейс Nike Concept | Інтернет-магазин з 3D конфігуратором",
    seoDescription: "Концепт e-commerce платформи з 3D конфігуратором кросівок на Three.js. Приклад інтеграції кошика та онлайн-оплат.",
    liveUrl: "https://gglutt.github.io/Nike_Landing1/"
  },
  {
    slug: "wine-hood",
    title: "Wine Hood",
    category: "Мобільний додаток · Лайфстайл",
    shortDescription: "Мобільний застосунок для гурманів вина з AI-рекомендаціями, дегустаційними нотатками та спільнотою.",
    problem: "Любителям вина часто важко обрати напій у магазині або зберегти історію своїх дегустацій. Існуючі додатки занадто складні або не мають персоналізованих рекомендацій на основі штучного інтелекту.",
    solution: "Розроблено мобільний додаток на React Native. Інтегровано AI-асистента, який аналізує попередні оцінки користувача та підбирає вино під його смаки або під обрану страву. Створено зручний сканер етикеток.",
    features: [
      "Персональний AI-сомельє для підбору вин за параметрами",
      "Дегустаційний щоденник з можливістю фотофіксації та оцінки",
      "Інтерактивна стрічка відгуків користувачів додатка",
      "Офлайн-режим для збереження нотаток без доступу до мережі"
    ],
    stack: ["React Native", "TypeScript", "Supabase", "OpenAI API"],
    integrations: ["OpenAI ChatGPT API", "Supabase Auth & Storage", "Expo Notification"],
    resultDescription: "Створено швидкий кросплатформовий додаток для iOS та Android. Штучний інтелект підбирає вино з точністю понад 85% на основі перших 5 оцінених користувачем пляшок.",
    bannerPath: "/wine-hood-banner.jpg",
    accent: "from-rose-500/40 via-amber-500/20 to-transparent",
    relatedServices: [
      { title: "Автоматизація n8n та AI", href: "/n8n-automation" },
      { title: "Розробка веб-застосунків", href: "/web-app-development" }
    ],
    seoTitle: "Кейс Wine Hood | Мобільний додаток з ШІ для вин",
    seoDescription: "Розробка мобільного додатка Wine Hood на React Native та Supabase. Інтеграція OpenAI для розумних рекомендацій користувачам.",
    liveUrl: "https://gglutt.github.io/WineHood/"
  },
  {
    slug: "d4ys-dance-studio",
    title: "D4YS Dance Studio",
    category: "Бренд · Айдентика",
    shortDescription: "Сайт для креативної студії танців з кінематографічними відео-переходами та сміливою типографікою.",
    problem: "Танцювальна студія потребувала іміджевого сайту, який би передавав динаміку руху, драйв команди та залучав нових учнів на пробні заняття, виділяючи студію на тлі конкурентів.",
    solution: "Розроблено сайт з акцентом на відео-контент та велику, стильну типографіку. Реалізовано анімовану сітку розкладу занять та швидку інтеграцію запису через месенджери.",
    features: [
      "Повноекранні фонові відео-тизери тренувань",
      "Динамічний інтерактивний розклад за напрямками та тренерами",
      "Форма запису на пробне заняття з автоматичним розрахунком знижки",
      "Стильні мікро-анімації елементів інтерфейсу"
    ],
    stack: ["React", "JavaScript", "Node.js", "Supabase", "TailwindCSS"],
    integrations: ["Telegram Bot API", "Google Calendar (синхронізація розкладу)"],
    resultDescription: "Завдяки емоційному візуалу та зручному розкладу, кількість онлайн-записів на пробні заняття збільшилася на 55% у перший місяць після запуску нової версії сайту.",
    bannerPath: "/d4ys-banner.png",
    accent: "from-violet-500/40 via-fuchsia-500/20 to-transparent",
    relatedServices: [
      { title: "Розробка Landing Page", href: "/landing-page" },
      { title: "Створення сайтів у Білій Церкві", href: "/stvorennya-saitiv-bila-tserkva" }
    ],
    seoTitle: "Кейс D4YS Dance Studio | Сайт танцювальної студії",
    seoDescription: "Створення сайту для сучасної танцювальної студії D4YS Dance Studio. Анімація інтерфейсу, відео-фон та онлайн-розклад занять.",
    liveUrl: "https://github.com/GGLUTT/d4ys-dance-studio"
  },
  {
    slug: "svitdtv",
    title: "SvitDTV",
    category: "Стрімінг · OTT",
    shortDescription: "Мультиплатформна OTT стрімінгова система з live-каналами, каталогом фільмів та системою підписок.",
    problem: "Розробка масштабованого прототипу стрімінгового сервісу, який здатний стабільно відтворювати HLS-потоки відео високої якості, підтримувати систему профілів користувачів та витримувати навантаження під час пікових трансляцій.",
    solution: "Реалізовано веб-платформу на Next.js. Для плеєра використано оптимізований Video.js з підтримкою адаптивного стрімінгу HLS. Для збереження сесій та кешування даних провайдера інтегровано Redis.",
    features: [
      "Підтримка HLS стрімінгу телеканалів з автоматичним вибором якості",
      "Медіа-бібліотека з пошуком та фільтрацією за жанрами",
      "Особисті кабінети з керуванням сімейними підписками",
      "Швидке кешування каталогів через Redis"
    ],
    stack: ["Next.js", "Node.js", "HLS Engine", "Redis", "TailwindCSS"],
    integrations: ["Payment System Gateway", "CDN Media Server API", "Telegram Notification"],
    resultDescription: "Створено швидкий та відмовостійкий прототип OTT сервісу. Завдяки серверному рендерингу (SSR) та Redis-кешуванню, час завантаження каталогу фільмів скоротився до 300мс.",
    bannerPath: "/svitdtv-banner.jpg",
    accent: "from-sky-500/40 via-cyan-500/20 to-transparent",
    relatedServices: [
      { title: "Розробка веб-застосунків", href: "/web-app-development" },
      { title: "Автоматизація n8n та AI", href: "/n8n-automation" }
    ],
    seoTitle: "Кейс SvitDTV | Стрімінгова OTT платформа на Next.js",
    seoDescription: "Розробка OTT стрімінгової платформи з підтримкою HLS трансляцій та Redis-кешування. Деталі технічної реалізації fullstack-проєкту.",
    liveUrl: "#"
  },
  {
    slug: "store-platform",
    title: "Store Platform",
    category: "E-commerce · Headless",
    shortDescription: "Headless комерційне рішення з миттєвим розумним пошуком, А/Б тестами та автоматизацією процесів.",
    problem: "Традиційні e-commerce CMS системи занадто повільні та важкі для SEO. Замовнику потрібен був супер-швидкий інтернет-магазин з високим показником Google PageSpeed та автоматичною синхронізацією замовлень у CRM.",
    solution: "Розроблено Headless-магазин на Next.js з повною статичною генерацією сторінок (SSG). Інтегровано надшвидкий пошук Algolia. Автоматизовано обробку нових замовлень та передачу лідів у CRM через n8n сценарії.",
    features: [
      "Блискавична генерація та завантаження сторінок (PageSpeed 98/100)",
      "Розумний пошук та автодоповнення товарів через Algolia",
      "Автоматична вивантаження замовлень у CRM та Telegram за 1 секунду",
      "Система гнучких промокодів та знижок"
    ],
    stack: ["Next.js", "Algolia Search", "n8n Automation", "PostgreSQL", "TailwindCSS"],
    integrations: ["CRM System API", "n8n Workflow Engine", "Nova Poshta API", "LiqPay API"],
    resultDescription: "Запуск Headless-платформи збільшив органічний SEO трафік на 35% за перші два місяці завдяки швидкості сайту. Автоматизація n8n звільнила менеджерів від ручного перенесення 100% замовлень.",
    bannerPath: "/store-banner.jpg",
    accent: "from-emerald-500/40 via-teal-500/20 to-transparent",
    relatedServices: [
      { title: "Автоматизація n8n та AI", href: "/n8n-automation" },
      { title: "Розробка Landing Page", href: "/landing-page" }
    ],
    seoTitle: "Кейс Store Platform | Headless E-commerce на Next.js",
    seoDescription: "Як створити швидкий інтернет-магазин з показником PageSpeed 98/100. Інтеграція Headless Next.js, пошуку Algolia та автоматизації n8n.",
    liveUrl: "https://svitdtv.shop/"
  }
];
