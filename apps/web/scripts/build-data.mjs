#!/usr/bin/env node
/**
 * Aggregates setups/<id>/SETUP.yaml manifests into:
 *  - <repo>/registry/registry.json   — lean public registry (committed for raw consumers)
 *  - <web>/public/registry.json      — same registry served by the storefront
 *  - <web>/data/catalog.json         — rich internal data for page rendering
 *
 * Runs automatically via the prebuild/predev npm hooks. Do not edit outputs by hand.
 */
import { readFileSync, writeFileSync, readdirSync, statSync, existsSync, mkdirSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import YAML from "yaml";

const here = path.dirname(fileURLToPath(import.meta.url));
const webRoot = path.resolve(here, "..");
const repoRoot = path.resolve(webRoot, "..", "..");
const setupsDir = path.join(repoRoot, "setups");
const REPO = process.env.REPO_SLUG || "pinkynail228/AISetup";

/** Recursively collect relative POSIX file paths, sorted. */
function walk(dir, base) {
  const out = [];
  for (const name of readdirSync(dir).sort()) {
    const full = path.join(dir, name);
    if (statSync(full).isDirectory()) {
      out.push(...walk(full, base));
    } else {
      out.push(path.relative(base, full).split(path.sep).join("/"));
    }
  }
  return out;
}

const leanEntries = [];
const richEntries = [];

for (const name of readdirSync(setupsDir).sort()) {
  const dir = path.join(setupsDir, name);
  if (!statSync(dir).isDirectory()) continue;
  const manifestPath = path.join(dir, "SETUP.yaml");
  if (!existsSync(manifestPath)) {
    console.warn(`! ${name}: no SETUP.yaml — skipped`);
    continue;
  }
  const m = YAML.parse(readFileSync(manifestPath, "utf8"));
  if (m.id !== name) {
    throw new Error(`setups/${name}: SETUP.yaml id "${m.id}" does not match folder name`);
  }
  const files = walk(dir, dir);
  const downloadUrl = (v) =>
    `https://github.com/${REPO}/releases/download/${m.id}@${v}/${m.id}-${v}.zip`;

  const versions = (m.changelog ?? []).map((e) => ({
    version: String(e.version),
    date: e.date ? String(e.date) : null,
    type: e.type ? String(e.type) : null,
    notes: e.notes ? String(e.notes).trim() : "",
    migration: e.migration ? String(e.migration).trim() : null,
    download_url: downloadUrl(e.version),
  }));

  const lean = {
    id: m.id,
    name: m.name,
    description: m.description ? String(m.description).trim() : "",
    version: String(m.version),
    released: m.released ? String(m.released) : null,
    updated: versions[0]?.date ?? (m.released ? String(m.released) : null),
    target_agent: m.target_agent ?? null,
    entrypoint: m.entrypoint ?? "AGENTS.md",
    phases: m.phases ?? null,
    gates: m.gates ?? null,
    tags: m.tags ?? [],
    stack: m.stack ?? [],
    files_count: files.length,
    download_url: downloadUrl(m.version),
    source_url: `https://github.com/${REPO}/tree/main/setups/${m.id}`,
    versions,
  };

  let readme = null;
  for (const cand of ["README.ru.md", "README.md"]) {
    const p = path.join(dir, cand);
    if (existsSync(p)) {
      readme = readFileSync(p, "utf8");
      break;
    }
  }

  leanEntries.push(lean);
  richEntries.push({
    ...lean,
    language: m.language ?? null,
    owned_paths: m.owned_paths ?? [],
    files,
    readme,
  });
}

if (leanEntries.length === 0) {
  throw new Error("No setups found — registry would be empty.");
}

const registry = {
  name: "Setups Hub",
  repo: `https://github.com/${REPO}`,
  generated_at: new Date().toISOString(),
  setups_count: leanEntries.length,
  setups: leanEntries,
};

mkdirSync(path.join(repoRoot, "registry"), { recursive: true });
writeFileSync(path.join(repoRoot, "registry", "registry.json"), JSON.stringify(registry, null, 2) + "\n");
mkdirSync(path.join(webRoot, "public"), { recursive: true }); // public/ holds only generated files and is absent in a fresh checkout
writeFileSync(path.join(webRoot, "public", "registry.json"), JSON.stringify(registry, null, 2) + "\n");
mkdirSync(path.join(webRoot, "data"), { recursive: true });
writeFileSync(path.join(webRoot, "data", "catalog.json"), JSON.stringify(richEntries, null, 2) + "\n");

console.log(`registry: ${leanEntries.length} setup(s) — ${leanEntries.map((e) => `${e.id}@${e.version}`).join(", ")}`);
