#!/bin/bash

echo "🌟 Qatar Payroll System - Quick Start Guide"
echo "============================================="

# Check if node_modules exists
if [ ! -d "node_modules" ]; then
    echo "📦 Installing dependencies..."
    npm install
fi

# Check if .env file exists
if [ ! -f ".env" ]; then
    echo "⚙️ Creating environment file..."
    cp .env.example .env
    echo "❗ Please update the .env file with your Firebase configuration"
    echo "   You can find the configuration in your Firebase project settings"
fi

echo ""
echo "🚀 Starting development server..."
echo "   The app will open at http://localhost:3000"
echo ""
echo "📋 Default login credentials:"
echo "   Email: admin@qatarpayroll.com"
echo "   Password: admin123"
echo ""
echo "🔧 Next steps:"
echo "   1. Set up Firebase project (see SETUP.md)"
echo "   2. Update .env file with your Firebase config"
echo "   3. Configure Firebase Auth and Firestore"
echo "   4. Deploy security rules"
echo ""

npm start
