import Link from "next/link";
import { notFound } from "next/navigation";
import { marked } from "marked";
import catalog from "@/data/catalog.json";
import { Chip, TypeBadge, VersionBadge } from "@/components/ui";

export const dynamicParams = false;

export function generateStaticParams() {
  return catalog.map((s) => ({ slug: s.id }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const setup = catalog.find((s) => s.id === slug);
  return { title: setup?.name ?? "Setup", description: setup?.description };
}

export default async function SetupPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const setup = catalog.find((s) => s.id === slug);
  if (!setup) notFound();

  const readmeHtml = setup.readme ? (marked.parse(setup.readme) as string) : null;
  const ownedPaths = setup.owned_paths ?? [];

  return (
    <>
      <nav className="font-mono text-sm text-faint">
        <Link href="/" className="hover:text-primary">
          каталог
        </Link>{" "}
        / {setup.id}
      </nav>

      <header className="mt-4 flex flex-wrap items-start justify-between gap-4">
        <div className="max-w-2xl">
          <div className="flex items-center gap-3">
            <h1 className="text-2xl font-bold tracking-tight">{setup.name}</h1>
            <VersionBadge version={setup.version} />
          </div>
          <p className="mt-2 text-sm leading-relaxed text-muted">{setup.description}</p>
          <div className="mt-3 flex flex-wrap gap-1.5">
            {setup.tags.map((t) => (
              <Chip key={t}>{t}</Chip>
            ))}
          </div>
        </div>
        <div className="flex flex-col items-stretch gap-2">
          <a
            href={setup.download_url}
            className="rounded-md bg-primary px-4 py-2 text-center text-sm font-medium text-surface transition-colors hover:bg-primary-hover"
          >
            Скачать v{setup.version} (.zip)
          </a>
          <a
            href={setup.source_url}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-md border border-border px-4 py-2 text-center text-sm text-muted transition-colors hover:border-primary/60 hover:text-text"
          >
            Исходники на GitHub
          </a>
        </div>
      </header>

      <dl className="mt-8 grid grid-cols-2 gap-4 rounded-lg border border-border bg-surface-muted p-5 font-mono text-sm sm:grid-cols-4">
        <div>
          <dt className="text-xs text-faint">target agent</dt>
          <dd className="mt-1">{setup.target_agent}</dd>
        </div>
        <div>
          <dt className="text-xs text-faint">pipeline</dt>
          <dd className="mt-1">
            {setup.phases} phases · {setup.gates} gates
          </dd>
        </div>
        <div>
          <dt className="text-xs text-faint">files</dt>
          <dd className="mt-1">{setup.files_count}</dd>
        </div>
        <div>
          <dt className="text-xs text-faint">updated</dt>
          <dd className="mt-1">{setup.updated}</dd>
        </div>
        <div className="col-span-2 sm:col-span-4">
          <dt className="text-xs text-faint">stack</dt>
          <dd className="mt-1">{setup.stack.join(" · ")}</dd>
        </div>
      </dl>

      <section className="mt-10">
        <h2 className="text-lg font-semibold">Как использовать</h2>
        <ol className="mt-3 list-decimal space-y-2 pl-5 text-sm leading-relaxed text-muted">
          <li>Скачайте архив и распакуйте в корень нового репозитория.</li>
          <li>
            Заполните <code className="rounded bg-surface-muted px-1.5 py-0.5 font-mono text-xs">site/BRIEF.md</code>{" "}
            — можно на русском, можно частично.
          </li>
          <li>
            Запустите агента в репозитории и отправьте:{" "}
            <code className="rounded bg-surface-muted px-1.5 py-0.5 font-mono text-xs">
              Read AGENTS.md and STATE.md, then start Phase 1.
            </code>
          </li>
        </ol>
      </section>

      <section className="mt-10">
        <h2 className="text-lg font-semibold">Changelog</h2>
        <div className="mt-4 space-y-5">
          {setup.versions.map((v) => (
            <div key={v.version} className="border-l-2 border-border pl-4">
              <div className="flex flex-wrap items-center gap-2">
                <span className="font-mono text-sm font-semibold">v{v.version}</span>
                <TypeBadge type={v.type} />
                <span className="font-mono text-xs text-faint">{v.date}</span>
                <a href={v.download_url} className="font-mono text-xs text-primary hover:text-primary-hover">
                  .zip
                </a>
              </div>
              {v.notes ? <p className="mt-1.5 text-sm leading-relaxed text-muted">{v.notes}</p> : null}
              {v.migration ? (
                <p className="mt-2 rounded-md bg-warn-subtle px-3 py-2 text-sm text-warn">
                  Миграция: {v.migration}
                </p>
              ) : null}
            </div>
          ))}
        </div>
      </section>

      <section className="mt-10">
        <h2 className="text-lg font-semibold">Состав ({setup.files_count} файлов)</h2>
        {ownedPaths.length > 0 ? (
          <p className="mt-2 text-sm text-muted">
            Принадлежат сетапу и заменяются при обновлении:{" "}
            {ownedPaths.map((p) => (
              <code key={p} className="mr-1.5 rounded bg-surface-muted px-1.5 py-0.5 font-mono text-xs">
                {p}
              </code>
            ))}
            — остальное принадлежит вашему проекту.
          </p>
        ) : null}
        <pre className="mt-3 max-h-80 overflow-auto rounded-lg border border-border bg-surface-muted p-4 font-mono text-xs leading-relaxed text-muted">
          {setup.files.join("\n")}
        </pre>
      </section>

      {readmeHtml ? (
        <section className="mt-10">
          <h2 className="text-lg font-semibold">README</h2>
          <div
            className="prose prose-sm mt-4 max-w-none rounded-lg border border-border p-6 prose-headings:font-semibold prose-a:text-primary prose-code:rounded prose-code:bg-surface-muted prose-code:px-1 prose-code:py-0.5 prose-code:font-mono prose-code:text-xs prose-code:before:content-none prose-code:after:content-none"
            dangerouslySetInnerHTML={{ __html: readmeHtml }}
          />
        </section>
      ) : null}

      <section className="mt-10 rounded-lg border border-border bg-surface-muted p-5">
        <h2 className="font-mono text-sm font-semibold">Для агентов</h2>
        <p className="mt-2 text-sm text-muted">
          Машиночитаемый реестр всех сетапов с актуальными версиями и ссылками на архивы:{" "}
          <a
            href={`${process.env.NEXT_PUBLIC_BASE_PATH ?? ""}/registry.json`}
            className="font-mono text-primary hover:text-primary-hover"
          >
            registry.json
          </a>
        </p>
      </section>
    </>
  );
}
