# Justin Hedge

A minimal, text-first blog built with Jekyll and GitHub Pages. Posts are plain Markdown files. There is no database or server to maintain.

Repository: [jchgh1/justinchedge](https://github.com/jchgh1/justinchedge)  
Site: [justinchedge.com](https://justinchedge.com)

## Publish it on GitHub Pages

1. In [the repository](https://github.com/jchgh1/justinchedge), open **Settings → Pages**.
2. Under **Build and deployment**, choose **Deploy from a branch**, select `main` and `/(root)`, then save.
3. Under **Custom domain**, enter `justinchedge.com` if it is not already shown. The included `CNAME` file also declares this domain.
4. Confirm that the domain's DNS points to GitHub Pages, and enable **Enforce HTTPS** when the option becomes available.
5. Wait for the Pages build to finish. The Pages settings page shows the published address and build status.

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

## Copy a post template

The `templates/` folder is excluded from the published site. Copy one of its files into `_posts/`, rename it to start with the date (`YYYY-MM-DD-short-title.md`), and edit the text:

- `templates/text-post.md` for a paragraph or short note
- `templates/blog-post.md` for a longer blog post
- `templates/article.md` for an article
- `templates/image-post.md` for a post with an image
- `templates/youtube-post.md` for a post with a YouTube embed

Put images in `assets/images/` and set `image` to a path such as `/assets/images/photo.jpg`. For YouTube embeds, replace `VIDEO_ID` in the iframe with the ID from the video URL.

## Make it yours

- Change `title` and `description` in `_config.yml`.
- The shared author avatar appears automatically beside every post. Set `author_avatar` in `_config.yml` to the image path you want to use.
- Change colors and typography in `assets/css/style.css`.
- The sample post is in `_posts`; edit it or remove it whenever you like.

The homepage is the full chronological feed. Its filters search post titles and narrow by year, month, and format. Add `format: article`, `format: blog`, or `format: note` to a post's front matter; posts without a format are treated as blog posts. The site includes an RSS feed at `/feed.xml` for readers who use feed apps.
