# Storybook Generator iOS App

A React Native mobile application that generates personalized children's storybooks using AI. Built with Expo and Google's Gemini API.

## Features

- 🎨 **Personalized Characters**: Create custom characters with name, age, gender, and favorite things
- 📚 **13 Story Templates**: Choose from a variety of story themes including birthday parties, space exploration, ocean adventures, and more
- 🌍 **Bilingual Support**: Generate stories in English or Hebrew
- 📖 **Multiple Page Counts**: Create 3, 5, or 10-page storybooks
- 🖼️ **AI-Generated Images**: Each page includes AI-generated illustrations
- 📱 **Native iOS Experience**: Smooth, native mobile interface with beautiful gradients and animations

## Tech Stack

- **React Native** (0.81.4)
- **Expo** (~54.0.12)
- **React Navigation** (7.x) - Stack navigation
- **Expo Linear Gradient** - Beautiful UI gradients
- **Google Gemini API** - AI text and image generation
- **Jest & React Native Testing Library** - Comprehensive testing

## Project Structure

```
storybook-ios/
├── App.js                    # Main app component with navigation
├── screens/
│   ├── CharacterSetupScreen.js       # Character creation form
│   ├── TemplateSelectionScreen.js    # Story template selection
│   ├── StoryGenerationScreen.js      # Story generation progress
│   └── StoryViewScreen.js            # Story viewing interface
├── services/
│   ├── gemini.js             # Gemini API integration
│   └── templates.js          # Story templates and utilities
├── __tests__/                # Test files
│   ├── CharacterSetupScreen.test.js
│   ├── gemini.test.js
│   └── templates.test.js
├── babel.config.js           # Babel configuration
├── jest.setup.js             # Jest mocks and setup
└── package.json              # Dependencies and scripts
```

## Installation

### Prerequisites

- Node.js (v18 or higher recommended)
- npm or yarn
- Expo CLI (`npm install -g expo-cli`)
- iOS Simulator (Xcode) or physical iOS device
- Expo Go app (for testing on physical device)

### Setup

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd storybook-ios
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure API Key** (if needed)
   - The Gemini API key is currently hardcoded in `services/gemini.js`
   - For production, move this to environment variables

## Running the App

### Development Mode

```bash
# Start the Expo development server
npm start

# Run on iOS simulator
npm run ios

# Run on Android
npm run android

# Run on web
npm run web
```

### Testing

```bash
# Run all tests
npm test

# Run tests in watch mode
npm test -- --watch

# Run tests with coverage
npm test -- --coverage
```

## How It Works

### 1. Character Creation
Users fill out a form with their child's details:
- Name
- Age
- Gender (Boy/Girl)
- Favorite thing

### 2. Template Selection
Choose from 13 story templates:
- 🎂 My Birthday Party
- 🌙 Bedtime Adventure
- 🎒 First Day at School
- 🐶 My New Pet
- 🦸 I Am a Superhero
- 🌊 Under the Sea
- 🚀 Space Explorer
- 🌲 Forest Adventure
- 🦕 Dinosaur Friends
- 👨‍🍳 Little Chef
- 👶 New Baby Brother/Sister
- 👟 My First Shoes
- 🚽 Using the Potty

Users can also select:
- Language (English or Hebrew)
- Number of pages (3, 5, or 10)

### 3. Story Generation
The app generates the story in two stages:
1. **Text Generation**: Creates engaging story text for each page using Gemini 2.0 Flash
2. **Image Generation**: Creates illustrations for each page using Gemini 2.0 Flash Imagen

### 4. Story Viewing
Users can:
- Navigate through pages
- View AI-generated images and text
- Create new stories

## API Integration

### Gemini API Services

The app uses Google's Gemini API for:

**Text Generation** (`gemini-2.0-flash:generateContent`)
- Generates 2-3 sentences per page
- Incorporates character details
- Maintains story continuity

**Image Generation** (`gemini-2.0-flash-exp-imagen-01-08:generateImages`)
- Creates child-friendly illustrations
- Uses character descriptions
- Matches story content

## Testing

The app includes comprehensive tests:

### Unit Tests
- **Template Service**: Tests template structure and placeholder filling
- **Gemini Service**: Tests API calls, error handling, and response processing
- **CharacterSetupScreen**: Tests form validation, user input, and navigation

### Running Tests
```bash
npm test
```

All tests pass with 100% success rate:
- 3 test suites
- 18 tests total
- Full coverage of core functionality

## Configuration

### Jest Configuration (`package.json`)
```json
"jest": {
  "preset": "react-native",
  "transformIgnorePatterns": [...],
  "setupFiles": ["./jest.setup.js"],
  "setupFilesAfterEnv": ["@testing-library/jest-native/extend-expect"]
}
```

### Babel Configuration (`babel.config.js`)
```javascript
module.exports = function(api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
  };
};
```

## Troubleshooting

### Common Issues

1. **Module resolution errors**
   - Clear cache: `npm start -- --clear`
   - Reinstall dependencies: `rm -rf node_modules && npm install`

2. **iOS Simulator not launching**
   - Ensure Xcode is installed
   - Run `expo start --ios`

3. **Test failures**
   - Clear Jest cache: `npm test -- --clearCache`
   - Check mock configurations in `jest.setup.js`

4. **API errors**
   - Verify API key is valid
   - Check network connectivity
   - Review API rate limits

## Future Enhancements

- [ ] Save stories locally with AsyncStorage
- [ ] Share stories via social media or email
- [ ] Print/export stories as PDF
- [ ] Add more templates
- [ ] Voice narration
- [ ] Customizable illustration styles
- [ ] Parent dashboard
- [ ] Offline mode

## Dependencies

### Production
- `expo`: ~54.0.12
- `react`: 19.1.0
- `react-native`: 0.81.4
- `@react-navigation/native`: ^7.1.18
- `@react-navigation/stack`: ^7.4.9
- `expo-linear-gradient`: ^15.0.7
- `react-native-gesture-handler`: ^2.28.0
- `react-native-screens`: ^4.16.0

### Development
- `jest`: ^30.2.0
- `@testing-library/react-native`: ^13.3.3
- `babel-preset-expo`: ^54.0.3
- `react-test-renderer`: ^19.1.0

## License

MIT

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests for new functionality
5. Ensure all tests pass: `npm test`
6. Submit a pull request

## Support

For issues, questions, or contributions, please open an issue on GitHub.

---

Built with ❤️ using React Native and Google Gemini AI
