import Link from "next/link";

export default function NotFound() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center px-6 text-center">
      <span className="font-mono text-sm tracking-[0.3em] text-white/30 uppercase">
        Error 404
      </span>
      <h1 className="mt-4 text-5xl font-bold tracking-tight text-white sm:text-7xl">
        Сторінку не знайдено
      </h1>
      <p className="mt-4 max-w-md text-base text-white/50">
        Цієї сторінки більше немає або вона ніколи не існувала.
      </p>
      <Link
        href="/"
        className="mt-8 rounded-full border border-white/20 bg-white px-6 py-3 text-sm font-medium text-black transition hover:bg-white/90"
      >
        На головну
      </Link>
    </main>
  );
}
