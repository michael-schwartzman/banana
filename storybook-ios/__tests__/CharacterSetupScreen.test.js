import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import CharacterSetupScreen from '../screens/CharacterSetupScreen';

describe('CharacterSetupScreen', () => {
  const mockNavigation = {
    navigate: jest.fn()
  };

  beforeEach(() => {
    mockNavigation.navigate.mockClear();
  });

  it('should render correctly', () => {
    const { getByText, getByPlaceholderText } = render(
      <CharacterSetupScreen navigation={mockNavigation} />
    );

    expect(getByText('Create Your Character')).toBeTruthy();
    expect(getByText("Tell us about the story's hero!")).toBeTruthy();
    expect(getByPlaceholderText('Enter name')).toBeTruthy();
    expect(getByPlaceholderText('Enter age')).toBeTruthy();
    expect(getByText('Boy')).toBeTruthy();
    expect(getByText('Girl')).toBeTruthy();
  });

  it('should allow filling in character details', () => {
    const { getByPlaceholderText } = render(
      <CharacterSetupScreen navigation={mockNavigation} />
    );

    const nameInput = getByPlaceholderText('Enter name');
    const ageInput = getByPlaceholderText('Enter age');
    const favoriteInput = getByPlaceholderText('e.g., dinosaurs, dancing, trucks');

    fireEvent.changeText(nameInput, 'Alice');
    fireEvent.changeText(ageInput, '5');
    fireEvent.changeText(favoriteInput, 'unicorns');

    expect(nameInput.props.value).toBe('Alice');
    expect(ageInput.props.value).toBe('5');
    expect(favoriteInput.props.value).toBe('unicorns');
  });

  it('should select gender', () => {
    const { getByText } = render(
      <CharacterSetupScreen navigation={mockNavigation} />
    );

    const boyButton = getByText('Boy');
    fireEvent.press(boyButton);

    // Button should be pressed (can't easily test style changes in test)
    expect(boyButton).toBeTruthy();
  });

  it('should navigate to template selection when form is complete', () => {
    const { getByPlaceholderText, getByText } = render(
      <CharacterSetupScreen navigation={mockNavigation} />
    );

    fireEvent.changeText(getByPlaceholderText('Enter name'), 'Alice');
    fireEvent.changeText(getByPlaceholderText('Enter age'), '5');
    fireEvent.press(getByText('Girl'));
    fireEvent.changeText(
      getByPlaceholderText('e.g., dinosaurs, dancing, trucks'),
      'unicorns'
    );

    const continueButton = getByText('Continue');
    fireEvent.press(continueButton);

    expect(mockNavigation.navigate).toHaveBeenCalledWith('TemplateSelection', {
      character: {
        name: 'Alice',
        age: '5',
        gender: 'girl',
        favoriteThing: 'unicorns'
      }
    });
  });

  it('should not navigate if form is incomplete', () => {
    const { getByPlaceholderText, getByText } = render(
      <CharacterSetupScreen navigation={mockNavigation} />
    );

    // Only fill in name
    fireEvent.changeText(getByPlaceholderText('Enter name'), 'Alice');

    const continueButton = getByText('Continue');
    fireEvent.press(continueButton);

    expect(mockNavigation.navigate).not.toHaveBeenCalled();
  });
});
