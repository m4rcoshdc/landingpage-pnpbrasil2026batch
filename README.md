# Plug and Play São Paulo — Batch 2026

Static landing page for the Plug and Play São Paulo 2026 acceleration program.

## Structure

```
.
├── index.html                          # ← Main landing page (served by GitHub Pages)
├── Plug and Play Brazil 2026.html      # Working copy / editable source (identical to index.html)
├── Plug and Play São Paulo 2026.html   # Earlier draft, kept for reference
├── tweaks.jsx                          # Tweaks panel (dev-time only — safe to leave in production)
├── tweaks-panel.jsx                    # Tweaks panel framework (dev-time only)
├── assets/
│   ├── plug-and-play-sao-paulo-logo.png
│   └── fonts/                          # Protipo font family (.otf)
├── .nojekyll                           # Tells GitHub Pages to skip Jekyll processing
└── README.md
```

All asset paths inside the HTML are **relative**, so the site works from any sub-path (e.g. `username.github.io/repo-name/`) without changes.

## Deploy to GitHub Pages

1. Create a new GitHub repo and push this folder:
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin https://github.com/<your-username>/<repo-name>.git
   git push -u origin main
   ```

2. In the repo on github.com, go to **Settings → Pages**.
3. Under **Source**, pick **Deploy from a branch**.
4. Choose branch `main` and folder `/ (root)`. Save.
5. Wait ~30 seconds. Your site will be live at:
   `https://<your-username>.github.io/<repo-name>/`

GitHub Pages will serve `index.html` automatically.

### Custom domain (optional)

Add a `CNAME` file at the repo root containing only your domain (e.g. `plugandplaysp.com.br`), then configure DNS to point to GitHub's IPs. See [docs.github.com/pages](https://docs.github.com/pages/configuring-a-custom-domain-for-your-github-pages-site).

## Editing

The site is a single HTML file with inline CSS. To make a change:

- Edit `index.html` (or edit `Plug and Play Brazil 2026.html` and copy it over).
- Commit and push — GitHub Pages will redeploy within a minute.

## Notes

- The hero "Program teaser" video pulls from Google Drive. Make sure the Drive file is shared as **"Anyone with the link"** or the embedded player will show a sign-in screen.
- The Tweaks panel (`tweaks.jsx`) is a dev-time helper that loads on every page. It's harmless in production but you can remove the two `<script type="text/babel" src="tweaks*.jsx">` tags near the bottom of `index.html` if you want to ship a leaner page.
