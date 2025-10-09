import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  FlatList
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { STORY_TEMPLATES } from '../services/templates';

export default function TemplateSelectionScreen({ route, navigation }) {
  const { character } = route.params;
  const [selectedTemplate, setSelectedTemplate] = useState(null);
  const [pageCount, setPageCount] = useState(3);
  const [language, setLanguage] = useState('en');

  const handleTemplateSelect = (template) => {
    setSelectedTemplate(template);
  };

  const handleGenerate = () => {
    if (selectedTemplate) {
      navigation.navigate('StoryGeneration', {
        character,
        template: selectedTemplate,
        pageCount,
        language
      });
    }
  };

  const renderTemplate = ({ item }) => {
    const isSelected = selectedTemplate?.id === item.id;
    const templateData = item[language];

    return (
      <TouchableOpacity
        style={[styles.templateCard, isSelected && styles.templateCardSelected]}
        onPress={() => handleTemplateSelect(item)}
      >
        <Text style={styles.templateEmoji}>{item.emoji}</Text>
        <Text style={styles.templateTitle}>{templateData.title}</Text>
      </TouchableOpacity>
    );
  };

  return (
    <LinearGradient
      colors={['#667eea', '#764ba2']}
      style={styles.container}
    >
      <ScrollView contentContainerStyle={styles.scrollView}>
        <View style={styles.content}>
          <Text style={styles.title}>Choose a Story</Text>
          <Text style={styles.subtitle}>Select a template for {character.name}'s adventure!</Text>

          <View style={styles.languageSelector}>
            <TouchableOpacity
              style={[
                styles.langButton,
                language === 'en' && styles.langButtonActive
              ]}
              onPress={() => setLanguage('en')}
            >
              <Text style={[
                styles.langButtonText,
                language === 'en' && styles.langButtonTextActive
              ]}>English</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.langButton,
                language === 'he' && styles.langButtonActive
              ]}
              onPress={() => setLanguage('he')}
            >
              <Text style={[
                styles.langButtonText,
                language === 'he' && styles.langButtonTextActive
              ]}>עברית</Text>
            </TouchableOpacity>
          </View>

          <FlatList
            data={STORY_TEMPLATES}
            renderItem={renderTemplate}
            keyExtractor={item => item.id}
            numColumns={2}
            columnWrapperStyle={styles.row}
            scrollEnabled={false}
          />

          {selectedTemplate && (
            <View style={styles.optionsPanel}>
              <Text style={styles.optionLabel}>Number of Pages:</Text>
              <View style={styles.pageCountButtons}>
                {[3, 5, 10].map(count => (
                  <TouchableOpacity
                    key={count}
                    style={[
                      styles.pageCountButton,
                      pageCount === count && styles.pageCountButtonActive
                    ]}
                    onPress={() => setPageCount(count)}
                  >
                    <Text style={[
                      styles.pageCountButtonText,
                      pageCount === count && styles.pageCountButtonTextActive
                    ]}>{count} Pages</Text>
                  </TouchableOpacity>
                ))}
              </View>

              <TouchableOpacity
                style={styles.generateButton}
                onPress={handleGenerate}
              >
                <Text style={styles.generateButtonText}>Generate Story</Text>
              </TouchableOpacity>
            </View>
          )}
        </View>
      </ScrollView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollView: {
    flexGrow: 1,
  },
  content: {
    padding: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center',
    marginTop: 20,
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 18,
    color: 'rgba(255, 255, 255, 0.9)',
    textAlign: 'center',
    marginBottom: 20,
  },
  languageSelector: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 10,
    marginBottom: 20,
  },
  langButton: {
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
    borderWidth: 2,
    borderColor: 'transparent',
  },
  langButtonActive: {
    backgroundColor: 'white',
    borderColor: 'white',
  },
  langButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
  langButtonTextActive: {
    color: '#667eea',
  },
  row: {
    gap: 10,
    marginBottom: 10,
  },
  templateCard: {
    flex: 1,
    backgroundColor: 'white',
    borderRadius: 15,
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 120,
    borderWidth: 3,
    borderColor: 'transparent',
  },
  templateCardSelected: {
    borderColor: '#FFD700',
    backgroundColor: '#fffef0',
  },
  templateEmoji: {
    fontSize: 40,
    marginBottom: 10,
  },
  templateTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
    textAlign: 'center',
  },
  optionsPanel: {
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 20,
    marginTop: 20,
  },
  optionLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 10,
  },
  pageCountButtons: {
    flexDirection: 'row',
    gap: 10,
    marginBottom: 20,
  },
  pageCountButton: {
    flex: 1,
    backgroundColor: '#f8f9ff',
    borderWidth: 2,
    borderColor: '#e0e0e0',
    borderRadius: 10,
    padding: 12,
    alignItems: 'center',
  },
  pageCountButtonActive: {
    backgroundColor: '#667eea',
    borderColor: '#667eea',
  },
  pageCountButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
  pageCountButtonTextActive: {
    color: 'white',
  },
  generateButton: {
    backgroundColor: '#667eea',
    borderRadius: 10,
    padding: 16,
    alignItems: 'center',
  },
  generateButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
