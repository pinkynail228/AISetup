import Link from "next/link";
import catalog from "@/data/catalog.json";
import { Chip, VersionBadge } from "@/components/ui";

export default function Home() {
  return (
    <>
      <section className="max-w-3xl">
        <h1 className="text-3xl font-bold tracking-tight">Сетапы для ИИ-агентов</h1>
        <p className="mt-3 text-base leading-relaxed text-muted">
          Версионируемые наборы инструкций под разные типы проектов: процесс с ревью-гейтами,
          скилы, чек-листы и манифесты. Скачиваешь архив в пустой репозиторий — и агент (Codex
          или любой, понимающий AGENTS.md) ведёт проект по выстроенному процессу.
        </p>
        <p className="mt-2 font-mono text-sm text-faint">
          {catalog.length} setup{catalog.length === 1 ? "" : "s"} · machine-readable:{" "}
          <a
            href={`${process.env.NEXT_PUBLIC_BASE_PATH ?? ""}/registry.json`}
            className="text-primary hover:text-primary-hover"
          >
            registry.json
          </a>
        </p>
      </section>

      <section className="mt-10 grid gap-5 sm:grid-cols-2">
        {catalog.map((s) => (
          <article
            key={s.id}
            className="flex flex-col gap-3 rounded-lg border border-border p-5 transition-colors hover:border-primary/60"
          >
            <div className="flex items-start justify-between gap-3">
              <h2 className="text-lg font-semibold leading-snug">
                <Link href={`/setups/${s.id}/`} className="hover:text-primary">
                  {s.name}
                </Link>
              </h2>
              <VersionBadge version={s.version} />
            </div>
            <p className="line-clamp-3 text-sm leading-relaxed text-muted">{s.description}</p>
            <div className="flex flex-wrap gap-1.5">
              {s.tags.slice(0, 5).map((t) => (
                <Chip key={t}>{t}</Chip>
              ))}
            </div>
            <p className="font-mono text-xs text-faint">
              {s.target_agent} · {s.phases} phases / {s.gates} gates · upd {s.updated}
            </p>
            <div className="mt-auto flex items-center gap-4 pt-1 text-sm font-medium">
              <Link href={`/setups/${s.id}/`} className="text-text hover:text-primary">
                Подробнее →
              </Link>
              <a
                href={s.download_url}
                className="rounded-md bg-primary px-3 py-1.5 text-surface transition-colors hover:bg-primary-hover"
              >
                Скачать .zip
              </a>
            </div>
          </article>
        ))}
      </section>
    </>
  );
}
