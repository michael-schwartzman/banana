# Quick Start Guide

Get the Storybook Generator iOS app running in 5 minutes!

## Prerequisites

- Node.js 18+ installed
- macOS with Xcode (for iOS Simulator)
- Expo CLI

## Installation

```bash
# 1. Install dependencies
cd storybook-ios
npm install

# 2. Start the development server
npm start

# 3. Run on iOS simulator (will open automatically)
npm run ios
```

## Running Tests

```bash
# Run all tests
npm test
```

**Expected output:**
```
Test Suites: 3 passed, 3 total
Tests:       18 passed, 18 total
```

## Using the App

### Step 1: Create a Character
- Enter child's name (e.g., "Alice")
- Enter age (e.g., "5")
- Select gender (Boy/Girl)
- Enter favorite thing (e.g., "unicorns")
- Tap "Continue"

### Step 2: Select a Story
- Choose language (English/Hebrew)
- Select a story template from the grid
- Choose number of pages (3, 5, or 10)
- Tap "Generate Story"

### Step 3: View Your Story
- Watch as the story generates
- Navigate through pages with Previous/Next buttons
- Tap "New Story" to create another

## Project Structure

```
storybook-ios/
├── App.js                 # Main app with navigation
├── screens/              # All screen components
│   ├── CharacterSetupScreen.js
│   ├── TemplateSelectionScreen.js
│   ├── StoryGenerationScreen.js
│   └── StoryViewScreen.js
├── services/             # API and utilities
│   ├── gemini.js        # Gemini API integration
│   └── templates.js     # Story templates
├── __tests__/           # Test files
├── docs/                # Documentation
└── README.md            # Full documentation
```

## Common Commands

```bash
# Development
npm start              # Start Expo server
npm run ios           # Run on iOS
npm run android       # Run on Android
npm run web           # Run on web

# Testing
npm test              # Run tests
npm test -- --watch   # Run tests in watch mode

# Troubleshooting
npm start -- --clear  # Clear cache and restart
```

## Troubleshooting

### "Module not found" error
```bash
rm -rf node_modules
npm install
```

### Tests fail to run
```bash
npm test -- --clearCache
npm test
```

### iOS Simulator won't open
```bash
# Make sure Xcode is installed
xcode-select --install
```

## Next Steps

- Read the [full README](README.md) for detailed information
- Check [API Documentation](docs/API.md) for API details
- See [Development Guide](docs/DEVELOPMENT.md) for contributing

## Features

✅ Personalized character creation
✅ 13 story templates
✅ Bilingual support (English/Hebrew)
✅ AI-generated text and images
✅ Multiple page counts (3, 5, 10)
✅ Beautiful UI with gradients
✅ Full test coverage

## Tech Stack

- React Native 0.81.4
- Expo ~54.0.12
- React Navigation 7.x
- Google Gemini API
- Jest & React Native Testing Library

## Support

Need help? Check the [README](README.md) or open an issue on GitHub.

---

**That's it! You're ready to create amazing storybooks! 🎉**
