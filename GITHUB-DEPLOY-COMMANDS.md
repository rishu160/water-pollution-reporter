# 🚀 GitHub Deploy Commands - Copy Paste करें

## Step 1: GitHub Repository Create करें
```bash
# GitHub CLI install करें (optional)
winget install GitHub.cli

# या manually GitHub.com पर जाकर new repository बनाएं
# Repository name: water-pollution-reporter
```

## Step 2: Code Push करें
```bash
# आपका GitHub username डालें
git remote add origin https://github.com/YOUR-USERNAME/water-pollution-reporter.git
git branch -M main
git push -u origin main
```

## Step 3: GitHub Pages Enable करें
```bash
# Repository Settings > Pages में जाएं
# Source: Deploy from a branch
# Branch: main
# Folder: / (root)
```

## Step 4: Live URL Access करें
```
https://YOUR-USERNAME.github.io/water-pollution-reporter
```

## Alternative: One Command Deploy
```bash
# GitHub CLI से instant deploy
gh repo create water-pollution-reporter --public --push
gh api repos/:owner/:repo/pages -X POST -f source.branch=main
```

## Vercel Deploy (Recommended)
```bash
npm i -g vercel
vercel --prod
# Follow prompts for instant live URL
```

## Success URLs:
- GitHub: https://YOUR-USERNAME.github.io/water-pollution-reporter
- Vercel: https://water-pollution-reporter.vercel.app