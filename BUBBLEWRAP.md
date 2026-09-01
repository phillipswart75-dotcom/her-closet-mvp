# Generate an Android TWA APK locally using Bubblewrap (unsigned)

This document shows how to create an Android Trusted Web Activity (TWA) and generate an unsigned APK locally using Bubblewrap. It assumes your PWA is available over HTTPS (a manifest URL is required). There are two quick ways to make the manifest available:

- Publish the repo to GitHub Pages (recommended) and use the Pages URL: https://<your-username>.github.io/her-closet-mvp/manifest.webmanifest
- Or run a local server and expose it over HTTPS with ngrok: https://<random>.ngrok.io/manifest.webmanifest

What this adds to the repo
- scripts/run-bubblewrap.sh — helper script to start Bubblewrap init with the manifest URL
- BUBBLEWRAP.md — step-by-step instructions to produce an unsigned APK locally

Prerequisites
- Node.js (16+ recommended)
- Java JDK 11+
- Android SDK / Android Studio (ensure sdkmanager, platform-tools and build-tools are installed)
- npx (comes with recent npm) or install Bubblewrap globally: npm i -g @bubblewrap/cli

Quick steps (summary)
1. Make your manifest reachable over HTTPS (publish to Pages or use ngrok).
2. Run the helper script with the manifest URL: scripts/run-bubblewrap.sh https://your-site/manifest.webmanifest
3. Follow the interactive prompts from Bubblewrap to configure the TWA. When asked about signing, choose "No" (we are creating an unsigned APK).
4. Run the build: npx @bubblewrap/cli build
5. The generated Android project and build outputs will be in the generated folder (usually `./android-project` or the folder name you supplied). Build outputs (APK) will be in the Android Gradle outputs:
   - Unsigned release APK: android-project/app/build/outputs/apk/release/app-release-unsigned.apk
   - Debug APK: android-project/app/build/outputs/apk/debug/app-debug.apk

Detailed instructions

1) Make the PWA available over HTTPS
- Option A: Publish to GitHub Pages (fast)
  - In this repo, go to Settings → Pages → Source → choose "main" branch and "/ (root)" then Save.
  - Wait a minute, then visit: https://<your-github-username>.github.io/her-closet-mvp/manifest.webmanifest

- Option B: Serve locally and use ngrok to create an HTTPS tunnel
  - Serve the repo: python -m http.server 8000
  - In another terminal: ngrok http 8000
  - Note the https URL printed by ngrok, e.g. https://abcd1234.ngrok.io
  - Manifest URL: https://abcd1234.ngrok.io/manifest.webmanifest

2) Run Bubblewrap init
- From the repository root, run:

  chmod +x scripts/run-bubblewrap.sh
  scripts/run-bubblewrap.sh https://your-site/manifest.webmanifest

- The script will invoke Bubblewrap's init via npx. Follow the interactive prompts:
  - Application id (reverse domain like com.example.hercloset)
  - App name
  - Short name
  - Launcher icon (you can accept generated icons or point to the placeholder icons in the repo)
  - When asked about signing, pick "No" to keep the build unsigned.

3) Build the TWA project
- After init finishes it will create a directory (by default `./android-project` or a name you provided). Change into it and run:

  cd <generated-android-folder>
  npx @bubblewrap/cli build

- Or, open the generated Android project in Android Studio and run a Gradle build.

4) Find the APK
- After a successful build, APKs will be at:
  - <generated-android-folder>/app/build/outputs/apk/debug/app-debug.apk
  - <generated-android-folder>/app/build/outputs/apk/release/app-release-unsigned.apk

Notes
- The unsigned APK cannot be uploaded to Play Store. For Play Store you must sign the APK/AAB with your keystore.
- If you prefer a fully automated workflow later, I can add a GitHub Actions job that runs Bubblewrap and produces an unsigned APK artifact on push.

If anything fails, paste the terminal output here and I’ll help debug the command errors.
