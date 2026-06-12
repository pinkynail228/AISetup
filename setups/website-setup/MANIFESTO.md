# MANIFESTO — what "good" means here

When two options conflict, this file decides. Every phase references these principles; checklists verify them.

**1. Content before chrome.**
Real copy defines structure; structure never dictates copy. No design decision is made before the words it serves are approved. No lorem ipsum, ever.

**2. Decisions are deliverables.**
A decision that is not written into an artifact does not exist. Every phase produces reviewable, versioned files. Chat is for questions; files are for truth.

**3. Spec before code.**
`process/PIPELINE.md` and approved artifacts are the only valid inputs for building. Code that cannot be traced to an approved artifact is guessing — remove it.

**4. Tokens are infrastructure, not decoration.**
Every visual value originates from a named token. Components reference semantic tokens (`--color-primary`), never raw values (`#3b82f6`) and never primitive tokens directly. Rebranding must be a token edit, not a refactor.

**5. Accessibility is the floor, not a feature.**
Semantic HTML, WCAG 2.2 AA contrast, full keyboard navigation, visible focus. Built in at every phase — heading hierarchy at the copy stage, roles and states at the primitives stage, audits at QA. Never bolted on at the end.

**6. Mobile-first, performance-budgeted.**
Smallest breakpoint first. The Core Web Vitals targets set in `site/strategy.md` are acceptance criteria, not aspirations.

**7. Gates are hard stops.**
The agent never self-approves. Silence is not approval. Iteration at a gate is success, not failure — the gate exists to make rework cheap.

**8. State lives in files, not in session memory.**
Any session must be fully resumable from `STATE.md` plus artifacts alone. Never rely on conversation memory for a decision that matters.

**9. SEO is structure.**
URL slugs, heading hierarchy, titles and meta descriptions are designed together with IA and copy — for humans and machines at once. Never stuffed in afterwards.

**10. Launch is a checklist, not a button.**
Deployment is the last verified step of the process, not an event. Every item checked, every check recorded in `reports/launch-checklist.md`.
