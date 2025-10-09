import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  ActivityIndicator,
  StyleSheet
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { GeminiService } from '../services/gemini';
import { fillTemplate } from '../services/templates';

export default function StoryGenerationScreen({ route, navigation }) {
  const { character, template, pageCount, language } = route.params;
  const [progress, setProgress] = useState({ type: 'text', page: 0, total: pageCount });
  const [error, setError] = useState(null);

  useEffect(() => {
    generateStory();
  }, []);

  const generateStory = async () => {
    try {
      const filledPrompt = fillTemplate(template[language].prompt, character);
      const templateWithPrompt = { ...template, prompt: filledPrompt };

      const pages = await GeminiService.generateCompleteStory(
        templateWithPrompt,
        character,
        pageCount,
        language,
        (progressData) => {
          setProgress(progressData);
        }
      );

      navigation.replace('StoryView', {
        character,
        template,
        pages,
        language
      });
    } catch (err) {
      console.error('Error generating story:', err);
      setError(err.message);
    }
  };

  const getProgressText = () => {
    if (progress.type === 'text') {
      return `Generating story text ${progress.page}/${progress.total}...`;
    } else {
      return `Generating image ${progress.page}/${progress.total}...`;
    }
  };

  return (
    <LinearGradient
      colors={['#667eea', '#764ba2']}
      style={styles.container}
    >
      <View style={styles.content}>
        {error ? (
          <>
            <Text style={styles.errorEmoji}>😞</Text>
            <Text style={styles.errorText}>Oops! Something went wrong</Text>
            <Text style={styles.errorMessage}>{error}</Text>
          </>
        ) : (
          <>
            <Text style={styles.emoji}>✨</Text>
            <Text style={styles.title}>Creating Your Story</Text>
            <Text style={styles.subtitle}>{getProgressText()}</Text>
            <ActivityIndicator size="large" color="white" style={styles.spinner} />
            <View style={styles.progressBar}>
              <View
                style={[
                  styles.progressFill,
                  { width: `${(progress.page / progress.total) * 100}%` }
                ]}
              />
            </View>
          </>
        )}
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  emoji: {
    fontSize: 80,
    marginBottom: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 18,
    color: 'rgba(255, 255, 255, 0.9)',
    textAlign: 'center',
    marginBottom: 30,
  },
  spinner: {
    marginVertical: 20,
  },
  progressBar: {
    width: '80%',
    height: 8,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    borderRadius: 4,
    overflow: 'hidden',
    marginTop: 20,
  },
  progressFill: {
    height: '100%',
    backgroundColor: 'white',
    borderRadius: 4,
  },
  errorEmoji: {
    fontSize: 80,
    marginBottom: 20,
  },
  errorText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center',
    marginBottom: 10,
  },
  errorMessage: {
    fontSize: 16,
    color: 'rgba(255, 255, 255, 0.9)',
    textAlign: 'center',
    paddingHorizontal: 20,
  },
});
