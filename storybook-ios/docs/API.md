# API Documentation

## Gemini Service API

The `GeminiService` class provides methods to interact with Google's Gemini API for generating story text and images.

### Configuration

```javascript
const GEMINI_API_KEY = 'AIzaSyA1Yvp1gRpDEF38lEK5E0bBdjXOXK2IxSs';
const GEMINI_API_URL = 'https://generativelanguage.googleapis.com/v1beta/models';
```

**Note**: For production, move the API key to environment variables.

---

## Methods

### `generateStoryText(prompt, pageNum, totalPages, character, language)`

Generates story text for a single page.

**Parameters:**
- `prompt` (string): The story template prompt with placeholders
- `pageNum` (number): Current page number (1-indexed)
- `totalPages` (number): Total number of pages in the story
- `character` (object): Character details
  - `name` (string)
  - `age` (string)
  - `gender` (string)
  - `favoriteThing` (string)
- `language` (string): Language code ('en' or 'he')

**Returns:** `Promise<string>` - The generated story text

**Example:**
```javascript
const text = await GeminiService.generateStoryText(
  'Write a story about {name}...',
  1,
  3,
  { name: 'Alice', age: '5', gender: 'girl', favoriteThing: 'unicorns' },
  'en'
);
```

**API Endpoint:**
- `POST` `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent`

**Request Body:**
```json
{
  "contents": [{
    "parts": [{
      "text": "Write ONLY page 1 of a 3-page children's story..."
    }]
  }]
}
```

**Response:**
```json
{
  "candidates": [{
    "content": {
      "parts": [{
        "text": "Once upon a time..."
      }]
    }
  }]
}
```

---

### `generateStoryImage(text, pageNum, character, language)`

Generates an AI image for a story page.

**Parameters:**
- `text` (string): The story text for this page
- `pageNum` (number): Current page number (1-indexed)
- `character` (object): Character details
- `language` (string): Language code ('en' or 'he')

**Returns:** `Promise<string|null>` - Base64-encoded image data URI or null on failure

**Example:**
```javascript
const imageData = await GeminiService.generateStoryImage(
  'Alice discovers a magical unicorn...',
  1,
  { name: 'Alice', age: '5', gender: 'girl', favoriteThing: 'unicorns' },
  'en'
);
// Returns: "data:image/jpeg;base64,/9j/4AAQSkZJRg..."
```

**API Endpoint:**
- `POST` `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash-exp-imagen-01-08:generateImages`

**Request Body:**
```json
{
  "prompt": "Create a warm, colorful, child-friendly illustration...",
  "number_of_images": 1,
  "aspect_ratio": "1:1",
  "safety_filter_level": "block_only_high",
  "person_generation": "allow_all"
}
```

**Response:**
```json
{
  "generated_images": [{
    "image": {
      "image_bytes": "base64encodedimagedata..."
    }
  }]
}
```

---

### `generateCompleteStory(template, character, pageCount, language, onProgress)`

Generates a complete story with text and images for all pages.

**Parameters:**
- `template` (object): Story template with prompt
  - `prompt` (string): Story template text
- `character` (object): Character details
- `pageCount` (number): Number of pages (3, 5, or 10)
- `language` (string): Language code ('en' or 'he')
- `onProgress` (function): Optional progress callback
  - Called with: `{ type, page, total }`
  - `type`: 'text' | 'image'
  - `page`: Current page number
  - `total`: Total pages

**Returns:** `Promise<Array>` - Array of page objects

**Example:**
```javascript
const pages = await GeminiService.generateCompleteStory(
  { prompt: 'Write a story about {name}...' },
  { name: 'Alice', age: '5', gender: 'girl', favoriteThing: 'unicorns' },
  3,
  'en',
  (progress) => {
    console.log(`${progress.type}: ${progress.page}/${progress.total}`);
  }
);

// Returns:
// [
//   { text: "Once upon a time...", imageData: "data:image/jpeg;base64,..." },
//   { text: "Alice discovered...", imageData: "data:image/jpeg;base64,..." },
//   { text: "The end.", imageData: "data:image/jpeg;base64,..." }
// ]
```

---

## Templates Service API

### `STORY_TEMPLATES`

Array of available story templates.

**Structure:**
```javascript
{
  id: string,
  emoji: string,
  en: {
    title: string,
    prompt: string
  },
  he: {
    title: string,
    prompt: string
  }
}
```

**Available Templates:**
1. `birthday` - My Birthday Party
2. `bedtime` - Bedtime Adventure
3. `first-day` - First Day at School
4. `pet` - My New Pet
5. `superhero` - I Am a Superhero
6. `ocean` - Under the Sea
7. `space` - Space Explorer
8. `forest` - Forest Adventure
9. `dinosaur` - Dinosaur Friends
10. `cooking` - Little Chef
11. `sibling` - New Baby Brother/Sister
12. `shoes` - My First Shoes
13. `potty-training` - Using the Potty

---

### `fillTemplate(template, character)`

Fills template placeholders with character details.

**Parameters:**
- `template` (string): Template text with placeholders
- `character` (object): Character details

**Placeholders:**
- `{name}` - Character's name
- `{age}` - Character's age
- `{gender}` - Character's gender
- `{favoriteThing}` - Character's favorite thing

**Returns:** `string` - Template with filled placeholders

**Example:**
```javascript
const filled = fillTemplate(
  '{name} is a {age}-year-old {gender} who loves {favoriteThing}',
  { name: 'Alice', age: '5', gender: 'girl', favoriteThing: 'unicorns' }
);
// Returns: "Alice is a 5-year-old girl who loves unicorns"
```

---

## Error Handling

All API methods handle errors gracefully:

### Text Generation Errors
```javascript
try {
  const text = await GeminiService.generateStoryText(...);
} catch (error) {
  // Error message from API or "Failed to generate story text"
  console.error(error.message);
}
```

### Image Generation Errors
```javascript
const imageData = await GeminiService.generateStoryImage(...);
if (!imageData) {
  // Image generation failed, but doesn't throw
  console.log('Image failed to generate');
}
```

### Common Error Codes

- `400` - Invalid request (bad parameters)
- `401` - Authentication failed (invalid API key)
- `403` - Permission denied (API key restrictions)
- `429` - Rate limit exceeded
- `500` - Internal server error

---

## Rate Limits

Google Gemini API has rate limits:
- **Free tier**: 15 requests per minute
- **Paid tier**: Higher limits based on plan

**Recommendations:**
- Implement request queuing for large stories
- Add retry logic with exponential backoff
- Cache generated stories when possible

---

## Best Practices

1. **Error Handling**: Always wrap API calls in try-catch blocks
2. **Progress Feedback**: Use the `onProgress` callback for user feedback
3. **Retry Logic**: Implement retries for failed image generations
4. **Caching**: Cache generated stories to reduce API calls
5. **API Key Security**: Never commit API keys to version control
6. **Rate Limiting**: Respect API rate limits to avoid errors

---

## Example: Complete Story Generation Flow

```javascript
import { GeminiService } from './services/gemini';
import { STORY_TEMPLATES, fillTemplate } from './services/templates';

async function generateStory() {
  // 1. Select template
  const template = STORY_TEMPLATES.find(t => t.id === 'birthday');

  // 2. Define character
  const character = {
    name: 'Alice',
    age: '5',
    gender: 'girl',
    favoriteThing: 'unicorns'
  };

  // 3. Fill template
  const filledPrompt = fillTemplate(template.en.prompt, character);

  // 4. Generate complete story
  const pages = await GeminiService.generateCompleteStory(
    { prompt: filledPrompt },
    character,
    3,
    'en',
    (progress) => {
      console.log(`Progress: ${progress.type} ${progress.page}/${progress.total}`);
    }
  );

  // 5. Display story
  console.log('Story generated:', pages);
}
```

---

For more information, see the [main README](../README.md).
