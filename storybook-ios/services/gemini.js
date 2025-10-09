const GEMINI_API_KEY = 'AIzaSyA1Yvp1gRpDEF38lEK5E0bBdjXOXK2IxSs';
const GEMINI_API_URL = 'https://generativelanguage.googleapis.com/v1beta/models';

export class GeminiService {
  static async generateStoryText(prompt, pageNum, totalPages, character, language = 'en') {
    const textPrompt = `Write ONLY page ${pageNum} of a ${totalPages}-page children's story about: ${prompt}\n\nThe main character is ${character.name}, a ${character.age}-year-old ${character.gender} who loves ${character.favoriteThing}.\n\nWrite exactly 2-3 engaging sentences for page ${pageNum} that flows as part of the complete story${language === 'he' ? ' IN HEBREW' : ''}. Do not include ANY options, explanations, English text, or meta-commentary. ONLY return the story text itself. Do not reference or describe any images.`;

    const response = await fetch(`${GEMINI_API_URL}/gemini-2.0-flash:generateContent`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-goog-api-key': GEMINI_API_KEY
      },
      body: JSON.stringify({
        contents: [{
          parts: [{
            text: textPrompt
          }]
        }]
      })
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error?.message || 'Failed to generate story text');
    }

    const data = await response.json();
    return data.candidates?.[0]?.content?.parts?.[0]?.text || '';
  }

  static async generateStoryImage(text, pageNum, character, language = 'en') {
    const imagePrompt = `Create a warm, colorful, child-friendly illustration for a children's storybook. The main character is ${character.name}, a ${character.age}-year-old ${character.gender} who loves ${character.favoriteThing}. The scene should depict: ${text}. Style: Soft, vibrant colors, simple shapes, friendly and inviting atmosphere suitable for young children. Focus on the main character and their emotions.`;

    const response = await fetch(`${GEMINI_API_URL}/gemini-2.0-flash-exp-imagen-01-08:generateImages`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-goog-api-key': GEMINI_API_KEY
      },
      body: JSON.stringify({
        prompt: imagePrompt,
        number_of_images: 1,
        aspect_ratio: '1:1',
        safety_filter_level: 'block_only_high',
        person_generation: 'allow_all'
      })
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error(`Image generation failed for page ${pageNum}:`, errorData);
      return null;
    }

    const data = await response.json();
    const imageData = data.generated_images?.[0]?.image?.image_bytes;

    if (imageData) {
      return `data:image/jpeg;base64,${imageData}`;
    }

    return null;
  }

  static async generateCompleteStory(template, character, pageCount = 3, language = 'en', onProgress) {
    const pages = [];

    for (let i = 1; i <= pageCount; i++) {
      if (onProgress) {
        onProgress({ type: 'text', page: i, total: pageCount });
      }

      const text = await this.generateStoryText(
        template.prompt,
        i,
        pageCount,
        character,
        language
      );

      pages.push({ text, imageData: null });
    }

    for (let i = 0; i < pageCount; i++) {
      if (onProgress) {
        onProgress({ type: 'image', page: i + 1, total: pageCount });
      }

      const imageData = await this.generateStoryImage(
        pages[i].text,
        i + 1,
        character,
        language
      );

      pages[i].imageData = imageData;
    }

    return pages;
  }
}
