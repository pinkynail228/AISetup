export function Chip({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center rounded-full border border-border bg-surface-muted px-2.5 py-0.5 text-xs text-muted">
      {children}
    </span>
  );
}

export function VersionBadge({ version }: { version: string }) {
  return (
    <span className="shrink-0 rounded bg-primary-subtle px-2 py-1 font-mono text-xs font-semibold text-primary">
      v{version}
    </span>
  );
}

const TYPE_STYLES: Record<string, string> = {
  initial: "bg-ok-subtle text-ok",
  major: "bg-danger-subtle text-danger",
  minor: "bg-primary-subtle text-primary",
  patch: "bg-surface-muted text-muted",
};

export function TypeBadge({ type }: { type: string | null }) {
  if (!type) return null;
  return (
    <span
      className={`rounded px-1.5 py-0.5 font-mono text-[11px] font-medium ${TYPE_STYLES[type] ?? "bg-surface-muted text-muted"}`}
    >
      {type}
    </span>
  );
}
