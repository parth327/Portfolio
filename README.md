# Parth Patel — Portfolio

A single-page developer portfolio built with plain HTML, CSS, and JS —
no build step, no framework, so it's ready to publish as-is. AI-first
hero, scroll-triggered reveals, a live-typing "Claude Code" terminal demo,
downloadable certificates, and a dedicated AI/agentic-tools skill section
placed first among your skills.

## What's in here

```
portfolio/
├── index.html      the whole site
├── styles.css       all styling
├── script.js        mobile nav, scroll reveals, terminal typing effect
├── assets/
│   ├── resume.pdf                        powers the "See My Resume" button
│   ├── certificate-be10x-ai-tools.pdf    downloadable from the AI section
│   └── certificate-outskill-claude101.pdf downloadable from the AI section
└── README.md
```

## Before you publish

Everything's wired up — GitHub and LinkedIn both link to your real profiles,
and there's nothing left to fill in. Just one thing to keep current:

1. Swap `assets/resume.pdf` for a newer version whenever your résumé changes
   — the filename can stay the same so the button keeps working.

## Publish it with GitHub Pages (free hosting)

1. Create a new repository on GitHub (e.g. `parthpatel.github.io` for a
   root-level URL, or any name for a project-page URL).
2. From this `portfolio` folder, run:
   ```bash
   git init
   git add .
   git commit -m "Portfolio site"
   git branch -M main
   git remote add origin https://github.com/<your-username>/<repo-name>.git
   git push -u origin main
   ```
3. On GitHub: **Settings → Pages → Build and deployment → Source**, choose
   **Deploy from a branch**, pick `main` and `/ (root)`, then **Save**.
4. Your site goes live at:
   - `https://<your-username>.github.io/` (if the repo is named `<your-username>.github.io`), or
   - `https://<your-username>.github.io/<repo-name>/` (any other repo name)

It can take a minute or two for the first deploy to finish.

## Making changes later

Everything is editable directly in `index.html` / `styles.css` — there's no
build process to run. Edit, commit, push, and GitHub Pages redeploys
automatically.
