import React, { useState } from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Dimensions
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

const { width } = Dimensions.get('window');

export default function StoryViewScreen({ route, navigation }) {
  const { character, template, pages, language } = route.params;
  const [currentPage, setCurrentPage] = useState(0);

  const handlePrevPage = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < pages.length - 1) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handleNewStory = () => {
    navigation.navigate('TemplateSelection', { character });
  };

  const currentPageData = pages[currentPage];

  return (
    <LinearGradient
      colors={['#667eea', '#764ba2']}
      style={styles.container}
    >
      <View style={styles.header}>
        <Text style={styles.headerTitle}>{character.name}'s Story</Text>
        <Text style={styles.pageNumber}>Page {currentPage + 1} of {pages.length}</Text>
      </View>

      <ScrollView contentContainerStyle={styles.scrollView}>
        <View style={styles.pageContainer}>
          {currentPageData.imageData ? (
            <Image
              source={{ uri: currentPageData.imageData }}
              style={styles.image}
              resizeMode="cover"
            />
          ) : (
            <View style={styles.imagePlaceholder}>
              <Text style={styles.placeholderText}>🎨</Text>
              <Text style={styles.placeholderSubtext}>Image not available</Text>
            </View>
          )}

          <View style={styles.textContainer}>
            <Text style={[
              styles.storyText,
              language === 'he' && styles.storyTextHebrew
            ]}>
              {currentPageData.text}
            </Text>
          </View>
        </View>
      </ScrollView>

      <View style={styles.navigation}>
        <TouchableOpacity
          style={[styles.navButton, currentPage === 0 && styles.navButtonDisabled]}
          onPress={handlePrevPage}
          disabled={currentPage === 0}
        >
          <Text style={styles.navButtonText}>← Previous</Text>
        </TouchableOpacity>

        {currentPage === pages.length - 1 ? (
          <TouchableOpacity
            style={styles.newStoryButton}
            onPress={handleNewStory}
          >
            <Text style={styles.newStoryButtonText}>New Story</Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            style={styles.navButton}
            onPress={handleNextPage}
          >
            <Text style={styles.navButtonText}>Next →</Text>
          </TouchableOpacity>
        )}
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    padding: 20,
    paddingTop: 60,
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 5,
  },
  pageNumber: {
    fontSize: 16,
    color: 'rgba(255, 255, 255, 0.9)',
  },
  scrollView: {
    flexGrow: 1,
  },
  pageContainer: {
    flex: 1,
    padding: 20,
  },
  image: {
    width: width - 40,
    height: width - 40,
    borderRadius: 20,
    marginBottom: 20,
  },
  imagePlaceholder: {
    width: width - 40,
    height: width - 40,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    borderRadius: 20,
    marginBottom: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  placeholderText: {
    fontSize: 60,
    marginBottom: 10,
  },
  placeholderSubtext: {
    fontSize: 16,
    color: 'white',
  },
  textContainer: {
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 20,
    minHeight: 100,
  },
  storyText: {
    fontSize: 18,
    lineHeight: 28,
    color: '#333',
  },
  storyTextHebrew: {
    textAlign: 'right',
    writingDirection: 'rtl',
  },
  navigation: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 20,
    paddingBottom: 40,
  },
  navButton: {
    backgroundColor: 'white',
    paddingHorizontal: 30,
    paddingVertical: 15,
    borderRadius: 25,
    minWidth: 120,
    alignItems: 'center',
  },
  navButtonDisabled: {
    opacity: 0.3,
  },
  navButtonText: {
    color: '#667eea',
    fontSize: 16,
    fontWeight: 'bold',
  },
  newStoryButton: {
    backgroundColor: '#FFD700',
    paddingHorizontal: 30,
    paddingVertical: 15,
    borderRadius: 25,
    minWidth: 120,
    alignItems: 'center',
  },
  newStoryButtonText: {
    color: '#333',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
