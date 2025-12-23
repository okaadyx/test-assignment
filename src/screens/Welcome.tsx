import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { welcomeScreenStyles as styles } from '../styles/welcomeScreenStyles';

export function WelcomeScreen() {
  const navigation = useNavigation<any>();
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome 👋</Text>
      <Text style={styles.subtitle}>Discover amazing products with us</Text>

      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.replace('Tab')}
      >
        <Text style={styles.buttonText}>Getting Started</Text>
      </TouchableOpacity>
    </View>
  );
}
