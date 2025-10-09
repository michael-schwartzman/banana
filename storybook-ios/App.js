import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import CharacterSetupScreen from './screens/CharacterSetupScreen';
import TemplateSelectionScreen from './screens/TemplateSelectionScreen';
import StoryGenerationScreen from './screens/StoryGenerationScreen';
import StoryViewScreen from './screens/StoryViewScreen';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="CharacterSetup"
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen
          name="CharacterSetup"
          component={CharacterSetupScreen}
        />
        <Stack.Screen
          name="TemplateSelection"
          component={TemplateSelectionScreen}
        />
        <Stack.Screen
          name="StoryGeneration"
          component={StoryGenerationScreen}
        />
        <Stack.Screen
          name="StoryView"
          component={StoryViewScreen}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
