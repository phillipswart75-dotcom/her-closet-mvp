Her Closet — small web To-Do example with PWA support

This repository now includes a Progressive Web App (PWA) wrapper for the simple To-Do app.

What's included now:
- manifest.webmanifest — PWA manifest (name, icons, start_url, display: standalone)
- service-worker.js — a small service worker that caches the app shell for offline use
- icons/icon-192.svg and icons/icon-512.svg — simple placeholder icons
- index.html — updated to link the manifest and register the service worker

How to test the PWA locally:
1. Serve the files over HTTP(S). PWAs require a secure context (https) or localhost.
   - Python 3: python -m http.server 8000
   - Or use live-server: npx live-server
2. Open http://localhost:8000 in Chrome (desktop or Android).
3. Open DevTools > Application > Manifest to inspect the manifest.
4. On desktop Chrome, you'll see an "Install" button in the omnibox or in the App menu. On Android, open the site in Chrome > menu > "Add to Home screen".

Make an Android APK (optional):
- If you want a standalone Android APK from this PWA, use PWABuilder (https://www.pwabuilder.com/) or use Google's Bubblewrap (https://github.com/GoogleChromeLabs/bubblewrap) to generate an Android TWA (Trusted Web Activity) and build an APK.
- PWABuilder has a quick wizard: paste your site URL (you can use GitHub Pages if you publish the repo), it will generate an Android package and give build instructions.

Notes:
- Icons are SVG placeholders; for best compatibility with Android add PNG icons (192x192 and 512x512).
- The service worker uses a simple cache-first strategy for the app shell; you'll want to expand or replace this for production.

Next steps I can do for you:
- Generate PNG icons and add them to the manifest for better Android compatibility.
- Publish the repo to GitHub Pages (I can add a workflow) so you have a public HTTPS URL to paste into PWABuilder and generate an APK.
- Add an automated GitHub Action that runs Bubblewrap or PWABuilder to produce an APK artifact.

If you want me to publish to GitHub Pages now so you can generate an APK via PWABuilder, say "Publish to Pages" and I'll add the workflow and push the change.