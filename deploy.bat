@echo off

echo 🚀 Deploying Qatar Payroll System to Firebase...

:: Check if Firebase CLI is installed
firebase --version >nul 2>&1
if %errorlevel% neq 0 (
    echo ❌ Firebase CLI not found. Please install it first:
    echo npm install -g firebase-tools
    exit /b 1
)

:: Install dependencies
echo 📦 Installing dependencies...
call npm install
if %errorlevel% neq 0 (
    echo ❌ Failed to install dependencies.
    exit /b 1
)

:: Build the project
echo 🏗️ Building project...
call npm run build
if %errorlevel% neq 0 (
    echo ❌ Build failed. Deployment cancelled.
    exit /b 1
)

:: Deploy to Firebase
echo 🚀 Deploying to Firebase...
call firebase deploy
if %errorlevel% equ 0 (
    echo ✅ Deployment successful!
    echo 🌐 Your app is now live at: https://qatar-payroll-system.web.app
) else (
    echo ❌ Deployment failed.
    exit /b 1
)
