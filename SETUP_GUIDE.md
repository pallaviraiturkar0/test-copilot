# Setup Guide - Nutrition App

This guide will help you set up the development environment for the Nutrition App.

## Prerequisites

Before you begin, ensure you have the following installed:

### Required Software

1. **Node.js** (v16 or later)
   - Download from [nodejs.org](https://nodejs.org/)
   - Verify: `node --version`

2. **npm** (comes with Node.js)
   - Verify: `npm --version`

3. **Git**
   - Download from [git-scm.com](https://git-scm.com/)
   - Verify: `git --version`

### For Mobile Development

#### iOS Development (Mac only)
- **Xcode** (latest version from Mac App Store)
- **Xcode Command Line Tools**: `xcode-select --install`
- **CocoaPods**: `sudo gem install cocoapods`

#### Android Development
- **Android Studio** with SDK
- **Android SDK Platform-Tools**
- **Android Virtual Device (AVD)** or physical device

## Installation Steps

### 1. Clone the Repository

```bash
git clone https://github.com/pallaviraiturkar0/test-copilot.git
cd test-copilot
```

### 2. Install Dependencies

```bash
npm install
```

This will install all required dependencies including:
- React Native
- Expo SDK
- Navigation libraries
- Secure storage
- Development tools

### 3. Verify Installation

```bash
# Check if Expo is installed
npx expo --version

# Should show Expo CLI version
```

## Running the App

### Development Server

Start the Metro bundler:

```bash
npm start
```

This will open Expo Developer Tools in your browser.

### Run on Different Platforms

#### iOS Simulator (Mac only)

```bash
npm run ios
```

Or press `i` in the terminal after running `npm start`

#### Android Emulator

```bash
npm run android
```

Or press `a` in the terminal after running `npm start`

#### Physical Device

1. Install **Expo Go** app on your device:
   - [iOS App Store](https://apps.apple.com/app/expo-go/id982107779)
   - [Google Play Store](https://play.google.com/store/apps/details?id=host.exp.exponent)

2. Run `npm start`

3. Scan the QR code with:
   - iOS: Camera app
   - Android: Expo Go app

#### Web Browser

```bash
npm run web
```

Or press `w` in the terminal after running `npm start`

## Testing

### Run Tests

```bash
# Run all tests
npm test

# Run tests in watch mode
npm test -- --watch

# Run with coverage
npm test -- --coverage
```

### Run Linting

```bash
npm run lint
```

## Project Structure

```
test-copilot/
├── src/                      # Source code
│   ├── components/           # Reusable components
│   │   ├── MultiSelectList.tsx
│   │   ├── ProgressIndicator.tsx
│   │   └── SingleSelectList.tsx
│   ├── screens/              # Screen components
│   │   ├── onboarding/       # Onboarding steps
│   │   ├── HomeScreen.tsx
│   │   ├── ProfileEditScreen.tsx
│   │   ├── PrivacyPolicyScreen.tsx
│   │   └── OnboardingContainer.tsx
│   ├── types/                # TypeScript types
│   │   └── UserProfile.ts
│   ├── utils/                # Utility functions
│   │   ├── validation.ts
│   │   └── secureStorage.ts
│   └── constants/            # App constants
│       └── options.ts
├── __tests__/                # Test files
├── assets/                   # Static assets (images, etc.)
├── App.tsx                   # Root component
├── index.js                  # Entry point
├── package.json              # Dependencies
├── app.json                  # Expo configuration
├── babel.config.js           # Babel configuration
├── tsconfig.json             # TypeScript configuration
├── jest.config.js            # Jest configuration
├── metro.config.js           # Metro bundler configuration
└── .gitignore                # Git ignore rules
```

## Development Workflow

### 1. Start Development Server

```bash
npm start
```

### 2. Make Changes

Edit files in the `src/` directory. The app will reload automatically.

### 3. Test Your Changes

```bash
npm test
```

### 4. Run Linting

```bash
npm run lint
```

### 5. Commit Changes

```bash
git add .
git commit -m "Description of changes"
git push
```

## Common Issues

### Issue: "Module not found"

**Solution**: Delete node_modules and reinstall

```bash
rm -rf node_modules
npm install
```

### Issue: Metro bundler cache issues

**Solution**: Clear the cache

```bash
npm start -- --clear
```

Or:

```bash
npx expo start -c
```

### Issue: iOS build fails

**Solution**: 
1. Clean build folder in Xcode
2. Reinstall pods:
   ```bash
   cd ios
   pod install
   cd ..
   ```

### Issue: Android build fails

**Solution**:
1. Clean build cache:
   ```bash
   cd android
   ./gradlew clean
   cd ..
   ```

### Issue: "Unable to resolve module"

**Solution**: Start with a clean cache

```bash
watchman watch-del-all
rm -rf node_modules
npm install
npm start -- --reset-cache
```

## Environment Configuration

### Optional: Create .env file

```bash
cp .env.example .env
```

Edit `.env` if you need custom configuration.

## Development Tips

### Hot Reloading

- Changes to code automatically reload the app
- Press `r` to manually reload
- Press `Shift+R` to reload and clear cache

### Developer Menu

- **iOS Simulator**: Cmd+D
- **Android Emulator**: Cmd+M (Mac) or Ctrl+M (Windows/Linux)
- **Physical Device**: Shake device

### Debugging

1. Open developer menu
2. Select "Debug Remote JS"
3. Chrome DevTools will open
4. Use console, breakpoints, etc.

### React Native Debugger

For better debugging experience:

1. Install [React Native Debugger](https://github.com/jhen0409/react-native-debugger)
2. Set port to 19000 (Expo default)
3. Run app and enable debugging

## TypeScript Support

The project uses TypeScript for type safety:

- Types are defined in `src/types/`
- Use strict mode for better type checking
- Define interfaces for all props
- Export types that are used in multiple files

## Additional Resources

### Documentation
- [React Native Docs](https://reactnative.dev/)
- [Expo Docs](https://docs.expo.dev/)
- [React Navigation](https://reactnavigation.org/)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)

### Learning Resources
- [React Native Tutorial](https://reactnative.dev/docs/tutorial)
- [Expo Tutorial](https://docs.expo.dev/tutorial/introduction/)
- [TypeScript Basics](https://www.typescriptlang.org/docs/handbook/typescript-in-5-minutes.html)

### Community
- [React Native Community](https://github.com/react-native-community)
- [Expo Forums](https://forums.expo.dev/)
- [Stack Overflow](https://stackoverflow.com/questions/tagged/react-native)

## Next Steps

After setup:

1. Explore the codebase
2. Read [ARCHITECTURE.md](ARCHITECTURE.md)
3. Check [CONTRIBUTING.md](CONTRIBUTING.md)
4. Run the app and test features
5. Make your first contribution!

## Need Help?

If you encounter issues:
1. Check this guide again
2. Search existing issues on GitHub
3. Ask in GitHub Discussions
4. Create a new issue with details

Happy coding! 🚀
