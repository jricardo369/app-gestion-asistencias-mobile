#!/bin/bash
set -e

echo "=== XCODE CLOUD BUILD ==="

# 1. Instalar dependencias
npm ci

# 2. Build Ionic
ionic cordova build ios --prod --release

# 3. ✅ PASO CRÍTICO: Instalar CocoaPods
cd platforms/ios
gem install cocoapods --user-install
pod install --repo-update
cd ../..

echo "✅ XCODE CLOUD READY"