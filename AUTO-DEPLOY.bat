@echo off
echo 🚀 Water Pollution Reporter - Auto Deploy Script
echo.
echo This will deploy your app to GitHub and make it live!
echo.

REM Get GitHub username
set /p username="Enter your GitHub username: "

echo.
echo 📤 Pushing code to GitHub...
git remote add origin https://github.com/%username%/water-pollution-reporter.git
git branch -M main
git push -u origin main

echo.
echo ✅ Code pushed to: https://github.com/%username%/water-pollution-reporter
echo.
echo 🌐 Now deploying to Vercel...
echo Please run: npm i -g vercel && vercel --prod
echo.
echo 📱 Your app will be live at: https://water-pollution-reporter.vercel.app
echo.
pause