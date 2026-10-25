# Anurag Vedula | Portfolio

A static, no-build portfolio site. Plain HTML, CSS and JS, so it deploys to Vercel as-is.

## Files

- `index.html`  page structure
- `styles.css`  all the styling (Apple-style bento)
- `main.js`     renders the work tiles and runs the video lightbox
- `content.js`  **the only file you need to edit to update your work**

## Before you go live

Open `content.js` and replace:

1. `email`, `whatsapp` and `instagram` under `contact`
2. Check which short film actually has the 15K+ views and put `views: "15K+"` and `featured: true` on that one

## Adding new Owled Media work

In `content.js`, add a block inside `ads`:

```js
{ title: "Brand Name", category: "P2C Ad", roles: ["Director"], company: "Owled Media", youtubeId: "VIDEO_ID" }
```

or for Instagram:

```js
{ title: "Brand Name", category: "Skit Ad", roles: ["Director"], company: "Owled Media", instagram: { kind: "reel", id: "REEL_ID" } }
```

YouTube tiles become wide tiles, Instagram tiles become tall tiles. The grid rearranges itself.

## Sharper thumbnails (recommended)

YouTube only stores low-res stills for some videos, and Instagram doesn't share thumbnails at all. For crisp tiles:

1. Export one strong frame from your original footage as a JPG (1920x1080 for YouTube films, 1080x1920 for reels)
2. Put it in the `images/` folder, e.g. `images/until-next-time.jpg`
3. In `content.js`, add `poster: "images/until-next-time.jpg"` to that item

Without a poster, YouTube tiles use YouTube's best available still (black bars trimmed automatically) and Instagram tiles show a live preview.

## Deploy to Vercel

**Option A, drag and drop**
1. Go to vercel.com and sign in
2. Add New > Project, then drag this folder in
3. Click Deploy. Done.

**Option B, via GitHub (best for future updates)**
1. Push this folder to a new GitHub repo
2. In Vercel: Add New > Project > import the repo
3. Framework preset: **Other**. No build command, no output directory
4. Deploy. Every push to GitHub updates the live site automatically

Then add your own domain under Project > Settings > Domains.

## Preview locally

Just open `index.html` in a browser, or run `npx serve .` in this folder.
