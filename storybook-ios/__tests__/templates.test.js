import { STORY_TEMPLATES, fillTemplate } from '../services/templates';

describe('Templates Service', () => {
  describe('STORY_TEMPLATES', () => {
    it('should have an array of templates', () => {
      expect(Array.isArray(STORY_TEMPLATES)).toBe(true);
      expect(STORY_TEMPLATES.length).toBeGreaterThan(0);
    });

    it('should have valid template structure', () => {
      STORY_TEMPLATES.forEach(template => {
        expect(template).toHaveProperty('id');
        expect(template).toHaveProperty('emoji');
        expect(template).toHaveProperty('en');
        expect(template).toHaveProperty('he');
        expect(template.en).toHaveProperty('title');
        expect(template.en).toHaveProperty('prompt');
        expect(template.he).toHaveProperty('title');
        expect(template.he).toHaveProperty('prompt');
      });
    });

    it('should have unique template IDs', () => {
      const ids = STORY_TEMPLATES.map(t => t.id);
      const uniqueIds = new Set(ids);
      expect(uniqueIds.size).toBe(ids.length);
    });
  });

  describe('fillTemplate', () => {
    const character = {
      name: 'Alice',
      age: '5',
      gender: 'girl',
      favoriteThing: 'unicorns'
    };

    it('should replace character placeholders', () => {
      const template = 'Hello {name}, you are {age} years old!';
      const result = fillTemplate(template, character);
      expect(result).toBe('Hello Alice, you are 5 years old!');
    });

    it('should replace all placeholder types', () => {
      const template = '{name} is a {gender} who loves {favoriteThing}';
      const result = fillTemplate(template, character);
      expect(result).toBe('Alice is a girl who loves unicorns');
    });

    it('should handle multiple occurrences of same placeholder', () => {
      const template = '{name} and {name} again';
      const result = fillTemplate(template, character);
      expect(result).toBe('Alice and Alice again');
    });
  });
});
