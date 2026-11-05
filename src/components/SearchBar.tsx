import React from 'react';
import { View, TextInput, StyleSheet, TouchableOpacity } from 'react-native';
import { Feather } from '@expo/vector-icons';

type SearchBarProps = {
  placeholder?: string;
  value?: string;
  onChangeText?: (text: string) => void;
  style?: object;
  onSearchPress?: () => void;
};

export default function SearchBar({ placeholder = 'Search...', value, onChangeText, style, onSearchPress }: SearchBarProps) {
  return (
    <View style={[styles.container, style]}>
      <TextInput
        style={styles.input}
        placeholder={placeholder}
        placeholderTextColor="#8E8E93"
        value={value}
        onChangeText={onChangeText}
      />
      {onSearchPress ? (
        <TouchableOpacity onPress={onSearchPress}>
          <Feather name="search" size={20} color="#000" style={styles.icon} />
        </TouchableOpacity>
      ) : (
        <Feather name="search" size={20} color="#000" style={styles.icon} />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F9F9F9',
    borderRadius: 24,
    paddingHorizontal: 16,
    height: 48,
    borderWidth: 1,
    borderColor: '#EAEAEA',
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: '#000',
  },
  icon: {
    marginLeft: 12,
  },
});
