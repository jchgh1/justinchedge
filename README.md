# Your GitHub Pages blog

A small, text-first blog built with Jekyll and GitHub Pages. Posts are plain Markdown files. There is no database or server to maintain.

## Publish it on GitHub Pages

1. Create a GitHub repository. For a personal site, name it `YOUR-USERNAME.github.io`. A regular repository name works too.
2. Put these files in the repository and push them to the `main` branch.
3. In the repository, open **Settings → Pages**. Under **Build and deployment**, choose **Deploy from a branch**, select `main` and `/(root)`, then save.
4. For a regular repository, edit `_config.yml`: set `baseurl` to `"/YOUR-REPOSITORY"` (include the leading slash). For a personal `YOUR-USERNAME.github.io` repository, leave `baseurl` empty.
5. Wait for the Pages build to finish. The Pages settings page shows the published address.

GitHub Pages builds the site when you push changes. The included `github-pages` dependency is for previewing locally; you do not need a server or a paid service to publish.

## Write a post

Create a new file in `_posts` named with the post date and a short, lowercase title, for example:

```text
2026-12-03-learning-to-notice.md
```

Start it with this front matter, then write in Markdown:

```markdown
---
layout: post
title: Learning to notice
description: A short summary shown on the home page.
---

Start writing here. Use a blank line between paragraphs.

## A section heading

Use **bold**, *italics*, links, and lists as needed.
```

Commit the file to `main`. It will appear on the home page after GitHub Pages finishes building. To edit a post, edit its `.md` file in GitHub and commit the change.

## Make it yours

- Change `title` and `description` in `_config.yml`.
- Rewrite `about.md` in your own voice.
- Change colors and typography in `assets/css/style.css`.
- The sample post is in `_posts`; edit it or remove it whenever you like.

The site includes an RSS feed at `/feed.xml` for readers who use feed apps.
