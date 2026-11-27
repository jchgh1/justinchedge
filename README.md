# Justin Hedge

This is a small static website built with GitHub Pages and Jekyll. Markdown files in the writing and quote collections become pages and appear in their section lists automatically.

## Pages

- `index.html` is the welcome page.
- `where/index.html` is the “Where is Justin?” page.
- `writings/index.html`, `quotes/index.html`, `photography/index.html`, and `about/index.html` are the other section pages.

Clicking “Justin Hedge” or “Home” returns to the welcome page.

## Add a writing

Create a `.md` file inside `_writings/`, such as `_writings/a-long-walk.md`:

```markdown
---
title: A Long Walk
date: 2026-11-27
---

Write the post here using Markdown.
```

## Add a quote

Create a `.md` file inside `_quotes/`, such as `_quotes/a-quote.md`:

```markdown
---
title: A Quote
---

> The quotation goes here.
```

The title and date at the top are front matter. The rest of each file is regular Markdown.

## Markdown formatting

Use these patterns inside a writing or quote file. Markdown headings render bold on the site.

```markdown
## A section heading

> A quotation set apart from the paragraph.
>
> — Attribution

**Bold text**

- First bullet
- Second bullet

1. First numbered item
2. Second numbered item
```

Use `>` for a quotation, `##` for a section heading, `** **` around bold text, `-` for bullet points, and numbers followed by a period for numbered lists.

## Publish

Push changes to GitHub. GitHub Pages should deploy from the `main` branch and the repository root. The `CNAME` file is set to `Justinchedge.com`.
