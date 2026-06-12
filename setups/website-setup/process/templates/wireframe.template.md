# Wireframe — <slug>

<!-- One wireframe per page. This is a structural skeleton, not a visual design.
     NO colors. NO font names. NO hex values. NO pixel or rem values. NO shadows.
     NO gradients. NO visual styling of any kind.
     If you are tempted to write a color or a font name — stop. That belongs in Phase 5.
     The wireframe's only job: specify the order and type of content slots in mobile-first sequence,
     and link each slot to the copy section(s) it will render. -->

---

## Header

| Field | Value |
|---|---|
| **Slug** | <!-- Must match the page brief and copy file --> |
| **Copy file reference** | <!-- Path: site/copy/<slug>.md --> |
| **Brief reference** | <!-- Path: site/page-briefs/<slug>.md --> |
| **Status** | <!-- draft | reviewed | approved --> |

---

## Mobile-first layout note

<!-- Confirm the reading order below is the intended single-column mobile order.
     Responsive layout changes (e.g., two columns at ≥ md breakpoint) are captured
     per-slot in the "Layout hint" field. They describe a structural change only —
     never a visual/styling change.
     Example layout hints: "2-col ≥ md", "sticky ≥ lg", "hidden < sm", "full-bleed". -->

---

## Section slots

<!-- List every slot in the order it appears on mobile (top to bottom).
     Use one block per slot. Slot ids must be unique within this page.
     The copy section id(s) field must reference ids that exist in the copy file —
     never reference copy that has not been written.

     Content types: text | media | form | cards | list | table | nav | embed | icon-grid | other
     Use the most specific type that fits. If a slot mixes types, list them: "text + media".

     Do NOT describe appearance — describe structure and content type only.

     Example slot:
       ### Slot: pricing-hero
       Copy section id(s): pricing-hero
       Content type: text
       Layout hint: — (single column at all breakpoints)
       Notes: Contains H1, one paragraph of body copy, and the primary CTA button + sub-label.

       ### Slot: pricing-social-proof
       Copy section id(s): pricing-social-proof
       Content type: cards
       Layout hint: 1-col < sm | 3-col ≥ md
       Notes: Three customer quote cards. Each card: quote text, customer name, company.
-->

---

### Slot: <slot-id>

<!-- Replace <slot-id> with a slug-format identifier, e.g., homepage-hero -->

**Copy section id(s):**
<!-- List one or more section ids from the copy file that this slot renders.
     Example: homepage-hero
     If a slot combines content from multiple copy sections, list them all. -->

**Content type:**
<!-- One of: text | media | form | cards | list | table | nav | embed | icon-grid | text + media | other
     Example: text -->

**Layout hint:**
<!-- Optional. Describe structural layout changes at specific breakpoints only.
     Use token breakpoint names (sm, md, lg, xl) if defined in design/tokens.json.
     Example: "2-col ≥ md" or "sticky ≥ lg" or leave blank for single-column.
     REMINDER: No colors, no fonts, no visual values here. -->

**Notes:**
<!-- Any structural note that helps Phase 7 assembly understand the slot's composition.
     Example: "Slot contains the H1, one subheading, and the primary CTA — no body paragraphs."
     Do NOT describe appearance. Do NOT invent copy here. -->

---

<!-- Add more slot blocks above this line — one block per section from the page brief. -->

---

## Global page elements

<!-- Elements that appear on every page (rendered by layout, not this page's own component).
     List any that have page-specific copy (e.g., a page-specific nav CTA label).
     If all global elements use their defaults, write "All global elements use layout defaults." -->

**Header/nav:**
**Footer:**
**Page-level metadata note:**
<!-- Confirm the <title> and meta description for this page are set in the page brief.
     Example: "Title and meta description taken verbatim from site/page-briefs/<slug>.md SEO intent section." -->
