#!/usr/bin/env bash
set -e

if [ -z "$1" ]; then
  echo "Usage: $0 <manifest_url>"
  echo "Example: $0 https://phillipswart75-dotcom.github.io/her-closet-mvp/manifest.webmanifest"
  exit 1
fi

MANIFEST_URL="$1"

# Ensure npx is available
if ! command -v npx >/dev/null 2>&1; then
  echo "npx is required but was not found. Install Node.js/npm first: https://nodejs.org/"
  exit 2
fi

echo "Running Bubblewrap init with manifest: $MANIFEST_URL"

# Use npx to run Bubblewrap init. This will be interactive.
# The user should answer the prompts; choose NO when asked about signing to keep the APK unsigned.
npx -y @bubblewrap/cli init --manifest="$MANIFEST_URL"

echo "Initialization finished. To build the TWA, run:"
echo "  npx @bubblewrap/cli build"
echo "Or open the generated Android project in Android Studio and build there."
