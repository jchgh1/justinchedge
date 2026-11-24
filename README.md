# Justin Chedge — personal blog

A small Jekyll site for GitHub Pages. Posts are Markdown files in `_posts`; the homepage builds its searchable feed from post front matter. `/templates/` provides copyable Markdown starters and stays out of the feed.

## Add the profile image

Copy `IMG_4732.jpg` from the repository into `assets/IMG_4732.jpg`. It is used automatically on every post page.

## Publish on GitHub Pages

1. Add these files to `github.com/jchgh1/justinchedge`.
2. In the repository settings, open **Pages** and choose **Deploy from a branch**, then select `main` and `/ (root)`.
3. The included `CNAME` maps the site to `justinchedge.com`. Configure the domain's DNS with the GitHub Pages records shown in the repository's Pages settings and enable HTTPS there.
4. Add posts as `_posts/YYYY-MM-DD-short-title.md`.

GitHub Pages supplies the Jekyll build and the `github-pages` gem dependencies through its standard build. No database, server, or paid service is needed.

## Post formats

Set `format` in the YAML front matter to `Text`, `Image`, `Article`, `Blog`, or `YouTube`. This controls the homepage filter and the label on the post. Copy a starter from `/templates/` and update its title, date, format, and body.
