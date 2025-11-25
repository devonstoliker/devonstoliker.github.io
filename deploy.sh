#!/bin/bash

# Navigate to the project folder (update the path if needed)
cd ~/Documents/devonstoliker.github.io || {
  echo "Directory not found!"
  exit 1
}

# Add all changes, commit with timestamp, and push
git add .
git commit -m "Site update: $(date '+%Y-%m-%d %H:%M:%S')"
git push origin main

echo "✅ Site pushed to GitHub. Check https://devonstoliker.github.io"

