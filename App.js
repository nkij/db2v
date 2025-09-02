import React, { useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import * as SplashScreen from 'expo-splash-screen';

// Keep the splash screen visible while we fetch resources
SplashScreen.preventAutoHideAsync();

// Set the animation options
SplashScreen.setOptions({
  duration: 1000,
  fade: true,
});

export default function App() {
  useEffect(() => {
    // Hide the splash screen after a short delay to show the app content
    const hideSplash = async () => {
      await new Promise(resolve => setTimeout(resolve, 1500)); // 1.5 second delay
      await SplashScreen.hideAsync();
    };
    
    hideSplash();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>dB ⇄ Voltage Converter</Text>
      <Text style={styles.subtitle}>Open in browser for full functionality</Text>
      <Text style={styles.url}>http://localhost:8000</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9fafb',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1f2937',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    color: '#6b7280',
    textAlign: 'center',
    marginBottom: 20,
  },
  url: {
    fontSize: 14,
    color: '#3b82f6',
    textAlign: 'center',
  },
});
