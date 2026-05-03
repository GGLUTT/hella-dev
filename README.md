# Hella — Portfolio (Yevgeniy / Євгеній Лютий)

Преміальне портфоліо Fullstack-розробника. Next.js 14 (App Router) + Tailwind CSS + Framer Motion. UI українською.

## Стек

- Next.js 14, React 18, TypeScript
- Tailwind CSS 3
- Framer Motion 11
- Lucide Icons

## Запуск

```bash
npm install
npm run dev
```

Відкрити http://localhost:3000

## Збірка

```bash
npm run build
npm start
```

## Структура

- `app/` — App Router (`layout.tsx`, `page.tsx`, `globals.css`)
- `components/` — `Nav`, `Hero`, `About`, `Projects`, `Services`, `Footer`, `Reveal`
- `public/` — `hero-bg.mp4`, `hero-foreground.png`

## Hero parallax

Реалізація 3D-параллаксу — `components/Hero.tsx`:

- Контейнер `h-[200vh]`, внутрішній `sticky top-0 h-screen overflow-hidden`.
- `useScroll({ target, offset: ["start start", "end start"] })`.
- Відео-фон: `scale 1 → 1.25`, `origin-bottom`, `z-0`.
- Передній план: `scale 1 → 1.05`, `origin-bottom`, `z-10`.
- Текст: `translateY` вниз + `opacity → 0`, `z-20`.
- Нижній градієнт для плавного переходу.
