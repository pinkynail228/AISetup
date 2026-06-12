import type { Metadata } from "next";
import Link from "next/link";
import "./globals.css";

const base = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

export const metadata: Metadata = {
  title: { default: "Setups Hub", template: "%s — Setups Hub" },
  description:
    "Реестр версионируемых сетапов для работы с ИИ-агентами: процессы, скилы, чек-листы и манифесты. Скачал архив — агент знает, что делать.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ru">
      <body className="flex min-h-screen flex-col bg-surface font-sans text-text antialiased">
        <header className="sticky top-0 z-10 border-b border-border bg-surface/90 backdrop-blur">
          <div className="mx-auto flex w-full max-w-5xl items-center justify-between gap-4 px-6 py-4">
            <Link href="/" className="font-mono text-lg font-bold tracking-tight">
              setups<span className="text-primary">.hub</span>
            </Link>
            <nav className="flex items-center gap-5 text-sm text-muted">
              <a href={`${base}/registry.json`} className="font-mono hover:text-text">
                registry.json
              </a>
              <a
                href="https://github.com/pinkynail228/AISetup"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-text"
              >
                GitHub →
              </a>
            </nav>
          </div>
        </header>
        <main className="mx-auto w-full max-w-5xl flex-1 px-6 py-10">{children}</main>
        <footer className="border-t border-border">
          <div className="mx-auto flex w-full max-w-5xl flex-wrap justify-between gap-2 px-6 py-6 text-sm text-faint">
            <span>Setups Hub — версионируемые сетапы для ИИ-агентов</span>
            <span className="font-mono">MVP v0.1</span>
          </div>
        </footer>
      </body>
    </html>
  );
}
