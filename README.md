# CogStandards website

A plain static site: no build step, no framework. Open `index.html` in a browser to see it.

## Files

| File | What it is |
|---|---|
| `index.html` | All the page content. Edit text directly here. Each section is marked with a `<!-- ===== NAME ===== -->` comment. |
| `style.css` | Colours, fonts, spacing. Colours and fonts are variables at the top of the file. |
| `logo.png` | The black wordmark in the header (transparent background). Replace the file to change it. |
| `favicon.png`, `apple-touch-icon.png` | The browser-tab and phone home-screen icon: the "C" from the wordmark, white on black. |
| `script.js` | One line that keeps the footer year current. Scripts must live in files like this: the security policy in `index.html` blocks scripts written inside the page. |
| `og-image.png` | The preview image shown when the site is shared on LinkedIn and other social media (1200 x 630 px). |
| `fonts/` | The Inter and Source Serif 4 fonts, stored on the site so visitors' browsers never contact Google. Upload this folder too. |
| `robots.txt`, `sitemap.xml` | Tell search engines to index the site. |

## Common edits

- **Change wording:** open `index.html`, find the section comment, edit the text between the tags.
- **Add an area of work:** copy one `<li class="area">…</li>` block in the Areas section, give it a new `id`, change the heading and text. Add a matching link in the hero's "Areas of work" line if you want it there too.
- **Add a person:** copy one `<li class="person">…</li>` block.
- **Add a publication:** in the Publications section, uncomment the example `<li class="pub">` row, edit the date, type, title and link, and delete the "in preparation" line.
- **Change the contact link:** search `index.html` for `linkedin.com` (appears twice). There is deliberately no email address on the site.
- **Change colours:** edit the `--accent`, `--heading`, `--bg`, `--ink` values at the top of `style.css`.

## Before going live (search engines)

Search `index.html`, `robots.txt` and `sitemap.xml` for `cogstandards.org` and replace it with your real domain. Then:

1. After publishing, submit the sitemap at https://search.google.com/search-console.

## Publishing (free options)

- **GitHub Pages:** put these files in a GitHub repository, then Settings → Pages → deploy from the `main` branch. Live in about a minute.
- **Netlify:** drag this folder onto https://app.netlify.com/drop.
- **Cloudflare Pages:** connect the repository or upload the folder.

All three support a custom domain.

## Security

`index.html` has a Content-Security-Policy line near the top. It tells browsers to load only files from this site, so an added outside script, font, video embed or tracker will silently not work. That is intentional. If you ever want to add one, the policy line has to be changed to allow that one source.
