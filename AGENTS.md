# AGENTS.md — Setups Hub monorepo

## What this repository is

A registry of versioned, downloadable "setups" — instruction packages that turn an AI coding agent into a disciplined executor of a specific project type (see `setups/website-setup` for the reference example). The repo also contains the storefront that publishes the catalog.

- `setups/<id>/` — one setup per folder; `SETUP.yaml` is its manifest (id, version, tags, owned_paths, changelog)
- `registry/registry.json` — generated aggregate of all manifests; never edit by hand
- `apps/web/` — Next.js storefront (static export, deployed to GitHub Pages by CI)
- `.github/workflows/` — `deploy-pages.yml` (storefront) and `release-setup.yml` (zip + GitHub Release per setup version)

## How a setup gets updated (the meta-pipeline)

1. **Branch + draft PR.** Never commit setup changes directly to `main`.
2. **Edit the setup files.** Follow the setup's own conventions (instructions in English, README in Russian).
3. **Bump the version** in `SETUP.yaml` and add a changelog entry: `version`, `date`, `type` (`major` | `minor` | `patch`), `notes`, and `migration` notes when a running project must do something manually. A setup change without a version bump and changelog entry is invalid.
4. **Validate.** Cross-check file references inside the setup (paths, checklist names, gate markers). Run a dry-run review: read the setup as a fresh agent would and hunt for contradictions and dead ends before requesting review.
5. **Human review gate.** The repo owner reviews the PR. Do not merge without explicit approval.
6. **Merge to `main`.** CI does the rest: `release-setup.yml` publishes `<id>@<version>` (tag + zip + GitHub Release) for any version without a release, and `deploy-pages.yml` rebuilds the storefront with the fresh registry.

## Versioning policy

- **MAJOR** — pipeline/phase structure changes; incompatible with projects mid-flight.
- **MINOR** — new skills, checklists, improved instructions; safe to swap into running projects via `owned_paths`.
- **PATCH** — wording fixes, bug fixes.

`owned_paths` in `SETUP.yaml` lists what belongs to the setup (replaced on update in a user's project). Everything else belongs to the user's project and must never be listed there.

## Adding a new setup

Create `setups/<id>/` with at minimum: `SETUP.yaml` (matching `id` = folder name), `AGENTS.md` entrypoint, a process definition with hard review gates, and `README.ru.md`. Mirror the structure of `website-setup` unless there is a documented reason not to. Then follow the meta-pipeline above.

## Storefront work

- `cd apps/web && pnpm install && pnpm dev` — local dev (registry data regenerates automatically via the `predev`/`prebuild` hooks).
- `pnpm build` — static export to `out/`; must pass before merging storefront changes.
- The storefront reads only generated data (`data/catalog.json`, `public/registry.json`). To change what it shows, change the manifests or `scripts/build-data.mjs` — not the JSON outputs.

## Hard rules

- Never edit `registry/registry.json`, `apps/web/data/`, or `apps/web/public/registry.json` by hand.
- Never change a released version's files without a new version bump.
- Never weaken a setup's review gates "for convenience".
- Keep setup instructions in English; hub and setup READMEs in Russian.
