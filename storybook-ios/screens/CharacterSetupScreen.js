import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  ScrollView
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

export default function CharacterSetupScreen({ navigation }) {
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [gender, setGender] = useState('');
  const [favoriteThing, setFavoriteThing] = useState('');

  const handleContinue = () => {
    if (name && age && gender && favoriteThing) {
      navigation.navigate('TemplateSelection', {
        character: { name, age, gender, favoriteThing }
      });
    }
  };

  const isValid = name && age && gender && favoriteThing;

  return (
    <LinearGradient
      colors={['#667eea', '#764ba2']}
      style={styles.container}
    >
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardView}
      >
        <ScrollView contentContainerStyle={styles.scrollView}>
          <View style={styles.content}>
            <Text style={styles.title}>Create Your Character</Text>
            <Text style={styles.subtitle}>Tell us about the story's hero!</Text>

            <View style={styles.form}>
              <Text style={styles.label}>Child's Name</Text>
              <TextInput
                style={styles.input}
                value={name}
                onChangeText={setName}
                placeholder="Enter name"
                placeholderTextColor="#999"
              />

              <Text style={styles.label}>Age</Text>
              <TextInput
                style={styles.input}
                value={age}
                onChangeText={setAge}
                placeholder="Enter age"
                placeholderTextColor="#999"
                keyboardType="numeric"
              />

              <Text style={styles.label}>Gender</Text>
              <View style={styles.genderButtons}>
                <TouchableOpacity
                  style={[
                    styles.genderButton,
                    gender === 'boy' && styles.genderButtonActive
                  ]}
                  onPress={() => setGender('boy')}
                >
                  <Text style={[
                    styles.genderButtonText,
                    gender === 'boy' && styles.genderButtonTextActive
                  ]}>Boy</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[
                    styles.genderButton,
                    gender === 'girl' && styles.genderButtonActive
                  ]}
                  onPress={() => setGender('girl')}
                >
                  <Text style={[
                    styles.genderButtonText,
                    gender === 'girl' && styles.genderButtonTextActive
                  ]}>Girl</Text>
                </TouchableOpacity>
              </View>

              <Text style={styles.label}>Favorite Thing</Text>
              <TextInput
                style={styles.input}
                value={favoriteThing}
                onChangeText={setFavoriteThing}
                placeholder="e.g., dinosaurs, dancing, trucks"
                placeholderTextColor="#999"
              />

              <TouchableOpacity
                style={[styles.button, !isValid && styles.buttonDisabled]}
                onPress={handleContinue}
                disabled={!isValid}
              >
                <Text style={styles.buttonText}>Continue</Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  keyboardView: {
    flex: 1,
  },
  scrollView: {
    flexGrow: 1,
  },
  content: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
  },
  title: {
    fontSize: 32,
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
  form: {
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginTop: 15,
    marginBottom: 8,
  },
  input: {
    backgroundColor: '#f8f9ff',
    borderWidth: 2,
    borderColor: '#e0e0e0',
    borderRadius: 10,
    padding: 12,
    fontSize: 16,
    color: '#333',
  },
  genderButtons: {
    flexDirection: 'row',
    gap: 10,
  },
  genderButton: {
    flex: 1,
    backgroundColor: '#f8f9ff',
    borderWidth: 2,
    borderColor: '#e0e0e0',
    borderRadius: 10,
    padding: 12,
    alignItems: 'center',
  },
  genderButtonActive: {
    backgroundColor: '#667eea',
    borderColor: '#667eea',
  },
  genderButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
  genderButtonTextActive: {
    color: 'white',
  },
  button: {
    backgroundColor: '#667eea',
    borderRadius: 10,
    padding: 16,
    alignItems: 'center',
    marginTop: 30,
  },
  buttonDisabled: {
    opacity: 0.5,
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
