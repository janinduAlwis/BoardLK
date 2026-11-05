import React from 'react';
import { View, StyleSheet, Text, SafeAreaView } from 'react-native';
import { Stack } from 'expo-router';
import { Feather } from '@expo/vector-icons';

import SearchBar from '@/components/SearchBar';

export default function MapScreenWeb() {
  return (
    <SafeAreaView style={styles.container}>
      <Stack.Screen options={{ headerShown: false }} />
      
      <View style={styles.header}>
        <SearchBar placeholder="Search for boarding..." />
      </View>

      <View style={styles.content}>
        <Feather name="map" size={64} color="#EAEAEA" />
        <Text style={styles.title}>Map View Not Supported on Web</Text>
        <Text style={styles.subtitle}>
          The interactive map is available on the iOS and Android versions of the app. Please use the Expo Go app to view it.
        </Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    padding: 16,
    paddingTop: 60, // Adjust for safe area / header space
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 32,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 16,
    marginBottom: 8,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 14,
    color: '#8E8E93',
    textAlign: 'center',
    lineHeight: 20,
  }
});
