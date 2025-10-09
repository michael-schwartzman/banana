# Development Guide

This guide covers development workflows, architecture decisions, and coding standards for the Storybook Generator iOS app.

## Table of Contents

1. [Development Setup](#development-setup)
2. [Project Architecture](#project-architecture)
3. [Component Design](#component-design)
4. [Testing Strategy](#testing-strategy)
5. [Code Style](#code-style)
6. [Common Tasks](#common-tasks)
7. [Debugging](#debugging)

---

## Development Setup

### Prerequisites

```bash
# Check Node.js version (18+ recommended)
node --version

# Install Expo CLI globally
npm install -g expo-cli

# Install dependencies
npm install
```

### Development Workflow

```bash
# Start development server
npm start

# Run on iOS simulator
npm run ios

# Run tests
npm test

# Run tests in watch mode
npm test -- --watch
```

### Environment Setup

Create a `.env` file (not committed to git):
```bash
GEMINI_API_KEY=your_api_key_here
```

---

## Project Architecture

### Navigation Flow

```
CharacterSetupScreen
        ↓
TemplateSelectionScreen
        ↓
StoryGenerationScreen
        ↓
StoryViewScreen
```

### Data Flow

1. User creates character → Character object
2. User selects template → Template object
3. App calls GeminiService → Story pages array
4. Story displayed in StoryViewScreen

### Screen Responsibilities

**CharacterSetupScreen**
- Collect character information
- Validate input
- Navigate to template selection

**TemplateSelectionScreen**
- Display templates in grid
- Handle language selection
- Handle page count selection
- Navigate to story generation

**StoryGenerationScreen**
- Show loading indicator
- Display progress
- Handle API calls
- Navigate to story view on completion

**StoryViewScreen**
- Display story pages
- Handle page navigation
- Allow creating new stories

---

## Component Design

### Screen Component Pattern

All screens follow this pattern:

```javascript
import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

export default function MyScreen({ route, navigation }) {
  // State management
  const [state, setState] = useState(initialState);

  // Event handlers
  const handleAction = () => {
    // Logic
    navigation.navigate('NextScreen', { data });
  };

  // Render
  return (
    <LinearGradient colors={['#667eea', '#764ba2']} style={styles.container}>
      {/* Content */}
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  // Styles
});
```

### Service Layer Pattern

Services are static classes with async methods:

```javascript
export class MyService {
  static async myMethod(params) {
    try {
      const response = await fetch(url, options);
      if (!response.ok) {
        throw new Error('Failed');
      }
      return await response.json();
    } catch (error) {
      // Handle error
    }
  }
}
```

---

## Testing Strategy

### Test Structure

```javascript
describe('ComponentName', () => {
  // Setup
  beforeEach(() => {
    // Reset mocks, clear state
  });

  // Tests
  it('should do something', () => {
    // Arrange
    // Act
    // Assert
  });
});
```

### Testing Components

Use React Native Testing Library:

```javascript
import { render, fireEvent } from '@testing-library/react-native';

const { getByText, getByPlaceholderText } = render(<Component />);
const button = getByText('Submit');
fireEvent.press(button);
expect(mockFunction).toHaveBeenCalled();
```

### Testing Services

Mock `fetch` globally:

```javascript
global.fetch = jest.fn();

beforeEach(() => {
  fetch.mockClear();
});

it('should fetch data', async () => {
  fetch.mockResolvedValueOnce({
    ok: true,
    json: async () => ({ data: 'value' })
  });

  const result = await MyService.getData();
  expect(result).toEqual({ data: 'value' });
});
```

### Test Coverage Goals

- Unit tests: 80%+
- Integration tests: Key user flows
- E2E tests: Critical paths

---

## Code Style

### Naming Conventions

- **Components**: PascalCase (`CharacterSetupScreen`)
- **Functions**: camelCase (`generateStory`)
- **Constants**: UPPER_SNAKE_CASE (`API_KEY`)
- **Files**: Match component name (`CharacterSetupScreen.js`)

### File Organization

```
ComponentName.js
├── Imports
├── Component function
├── Helper functions (if any)
└── StyleSheet
```

### Style Guidelines

**Component Structure:**
```javascript
export default function MyComponent() {
  // 1. Props destructuring
  // 2. State hooks
  // 3. Effect hooks
  // 4. Event handlers
  // 5. Helper functions
  // 6. Render
}
```

**Styles:**
```javascript
const styles = StyleSheet.create({
  container: {
    flex: 1,
    // Layout properties
    // Visual properties
  },
});
```

### Best Practices

1. **Keep components small**: < 300 lines
2. **Extract helpers**: Reusable logic → separate files
3. **Prop validation**: Use PropTypes or TypeScript
4. **Avoid inline styles**: Use StyleSheet
5. **Handle loading states**: Show feedback
6. **Handle errors**: Graceful degradation

---

## Common Tasks

### Adding a New Screen

1. Create screen file in `screens/`
2. Add to navigation in `App.js`
3. Create test file in `__tests__/`
4. Update documentation

**Example:**
```javascript
// screens/NewScreen.js
export default function NewScreen({ navigation }) {
  return <View><Text>New Screen</Text></View>;
}

// App.js
<Stack.Screen name="NewScreen" component={NewScreen} />
```

### Adding a New Template

1. Edit `services/templates.js`
2. Add template object to `STORY_TEMPLATES`
3. Include emoji, English, and Hebrew text

**Example:**
```javascript
{
  id: 'my-template',
  emoji: '🎨',
  en: {
    title: 'My Template',
    prompt: 'Write a story about {name}...'
  },
  he: {
    title: 'התבנית שלי',
    prompt: 'כתוב סיפור על {name}...'
  }
}
```

### Modifying API Calls

1. Update method in `services/gemini.js`
2. Update tests in `__tests__/gemini.test.js`
3. Run tests: `npm test`
4. Update API.md documentation

### Adding Dependencies

```bash
# Production dependency
npm install package-name

# Development dependency
npm install --save-dev package-name

# Always use --legacy-peer-deps for compatibility
npm install package-name --legacy-peer-deps
```

---

## Debugging

### React Native Debugger

**Chrome DevTools:**
1. Shake device/simulator
2. Select "Debug JS Remotely"
3. Open Chrome DevTools

**React DevTools:**
```bash
npm install -g react-devtools
react-devtools
```

### Common Issues

**Module not found:**
```bash
# Clear cache
npm start -- --clear

# Reinstall
rm -rf node_modules && npm install
```

**Tests failing:**
```bash
# Clear Jest cache
npm test -- --clearCache

# Run with verbose output
npm test -- --verbose
```

**iOS simulator issues:**
```bash
# Reset simulator
xcrun simctl erase all

# Clean and rebuild
cd ios && pod install && cd ..
```

### Logging

**Console logs:**
```javascript
console.log('Debug:', variable);
console.error('Error:', error);
console.warn('Warning:', warning);
```

**React Native Debugger:**
- Network tab: See API calls
- Console: View logs
- React tab: Inspect component tree

---

## Git Workflow

### Branch Strategy

- `master`: Production-ready code
- `develop`: Development branch
- `feature/*`: New features
- `bugfix/*`: Bug fixes

### Commit Messages

Follow conventional commits:

```
feat: add new story template
fix: resolve image loading issue
test: add tests for GeminiService
docs: update API documentation
refactor: simplify character validation
```

### Pull Request Checklist

- [ ] All tests pass
- [ ] Code follows style guidelines
- [ ] Documentation updated
- [ ] No console errors
- [ ] Tested on iOS simulator
- [ ] PR description is clear

---

## Performance Optimization

### Best Practices

1. **Lazy load images**: Use `Image` with proper sizing
2. **Memoize expensive computations**: Use `useMemo`
3. **Avoid unnecessary re-renders**: Use `React.memo`
4. **Optimize lists**: Use `FlatList` instead of `ScrollView`
5. **Cache API responses**: Store generated stories

### Monitoring

```javascript
// Measure render time
console.time('render');
// Component render
console.timeEnd('render');

// Track API calls
console.log('API call started');
await apiCall();
console.log('API call completed');
```

---

## Deployment

### Building for iOS

```bash
# Build standalone app
expo build:ios

# Test build locally
expo build:ios --type simulator
```

### Environment Variables

```javascript
// Use expo-constants for env vars
import Constants from 'expo-constants';

const apiKey = Constants.manifest.extra.geminiApiKey;
```

---

## Resources

- [React Native Docs](https://reactnative.dev)
- [Expo Docs](https://docs.expo.dev)
- [React Navigation](https://reactnavigation.org)
- [Jest Documentation](https://jestjs.io)
- [Google Gemini API](https://ai.google.dev)

---

## Getting Help

- Check the [README](../README.md)
- Review [API Documentation](./API.md)
- Open an issue on GitHub
- Ask in team chat

Happy coding! 🎉
