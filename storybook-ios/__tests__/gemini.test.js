import { GeminiService } from '../services/gemini';

// Mock fetch globally
global.fetch = jest.fn();

describe('GeminiService', () => {
  beforeEach(() => {
    fetch.mockClear();
  });

  describe('generateStoryText', () => {
    it('should generate story text successfully', async () => {
      const mockResponse = {
        candidates: [{
          content: {
            parts: [{
              text: 'Once upon a time, Alice loved unicorns.'
            }]
          }
        }]
      };

      fetch.mockResolvedValueOnce({
        ok: true,
        json: async () => mockResponse
      });

      const character = {
        name: 'Alice',
        age: '5',
        gender: 'girl',
        favoriteThing: 'unicorns'
      };

      const result = await GeminiService.generateStoryText(
        'a story about {name}',
        1,
        3,
        character,
        'en'
      );

      expect(result).toBe('Once upon a time, Alice loved unicorns.');
      expect(fetch).toHaveBeenCalledTimes(1);
    });

    it('should throw error on failed API call', async () => {
      fetch.mockResolvedValueOnce({
        ok: false,
        json: async () => ({ error: { message: 'API Error' } })
      });

      const character = {
        name: 'Alice',
        age: '5',
        gender: 'girl',
        favoriteThing: 'unicorns'
      };

      await expect(
        GeminiService.generateStoryText('test', 1, 3, character, 'en')
      ).rejects.toThrow('API Error');
    });

    it('should return empty string if no text in response', async () => {
      fetch.mockResolvedValueOnce({
        ok: true,
        json: async () => ({})
      });

      const character = {
        name: 'Alice',
        age: '5',
        gender: 'girl',
        favoriteThing: 'unicorns'
      };

      const result = await GeminiService.generateStoryText(
        'test',
        1,
        3,
        character,
        'en'
      );

      expect(result).toBe('');
    });
  });

  describe('generateStoryImage', () => {
    it('should generate image successfully', async () => {
      const mockImageData = 'base64encodedimagedata';
      const mockResponse = {
        generated_images: [{
          image: {
            image_bytes: mockImageData
          }
        }]
      };

      fetch.mockResolvedValueOnce({
        ok: true,
        json: async () => mockResponse
      });

      const character = {
        name: 'Alice',
        age: '5',
        gender: 'girl',
        favoriteThing: 'unicorns'
      };

      const result = await GeminiService.generateStoryImage(
        'Alice playing with unicorns',
        1,
        character,
        'en'
      );

      expect(result).toBe(`data:image/jpeg;base64,${mockImageData}`);
      expect(fetch).toHaveBeenCalledTimes(1);
    });

    it('should return null on failed API call', async () => {
      fetch.mockResolvedValueOnce({
        ok: false,
        json: async () => ({ error: { message: 'Image Error' } })
      });

      const character = {
        name: 'Alice',
        age: '5',
        gender: 'girl',
        favoriteThing: 'unicorns'
      };

      const result = await GeminiService.generateStoryImage(
        'test',
        1,
        character,
        'en'
      );

      expect(result).toBeNull();
    });

    it('should return null if no image data in response', async () => {
      fetch.mockResolvedValueOnce({
        ok: true,
        json: async () => ({})
      });

      const character = {
        name: 'Alice',
        age: '5',
        gender: 'girl',
        favoriteThing: 'unicorns'
      };

      const result = await GeminiService.generateStoryImage(
        'test',
        1,
        character,
        'en'
      );

      expect(result).toBeNull();
    });
  });

  describe('generateCompleteStory', () => {
    it('should generate a complete story with text and images', async () => {
      // Mock text generation responses
      const mockTextResponse = {
        candidates: [{
          content: {
            parts: [{
              text: 'Story text'
            }]
          }
        }]
      };

      // Mock image generation responses
      const mockImageResponse = {
        generated_images: [{
          image: {
            image_bytes: 'imagedata'
          }
        }]
      };

      // Mock both text and image API calls
      fetch
        .mockResolvedValueOnce({ ok: true, json: async () => mockTextResponse }) // Page 1 text
        .mockResolvedValueOnce({ ok: true, json: async () => mockTextResponse }) // Page 2 text
        .mockResolvedValueOnce({ ok: true, json: async () => mockTextResponse }) // Page 3 text
        .mockResolvedValueOnce({ ok: true, json: async () => mockImageResponse }) // Page 1 image
        .mockResolvedValueOnce({ ok: true, json: async () => mockImageResponse }) // Page 2 image
        .mockResolvedValueOnce({ ok: true, json: async () => mockImageResponse }); // Page 3 image

      const template = {
        prompt: 'a story about {name}'
      };

      const character = {
        name: 'Alice',
        age: '5',
        gender: 'girl',
        favoriteThing: 'unicorns'
      };

      const pages = await GeminiService.generateCompleteStory(
        template,
        character,
        3,
        'en'
      );

      expect(pages).toHaveLength(3);
      expect(pages[0]).toHaveProperty('text', 'Story text');
      expect(pages[0]).toHaveProperty('imageData', 'data:image/jpeg;base64,imagedata');
      expect(fetch).toHaveBeenCalledTimes(6); // 3 text + 3 image calls
    });
  });
});
