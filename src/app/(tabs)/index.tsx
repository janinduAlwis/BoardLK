import React, { useState } from 'react';
import { View, StyleSheet, FlatList, SafeAreaView } from 'react-native';
import { Stack } from 'expo-router';

import SearchBar from '@/components/SearchBar';
import FilterPills from '@/components/FilterPills';
import PropertyCard from '@/components/PropertyCard';
import { CATEGORIES } from '@/constants/mockData';
import { useStore } from '@/store/useStore';
import { useRouter } from 'expo-router';

export default function HomeScreen() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState(CATEGORIES[1]); // 'Annexes' default selected in design
  const properties = useStore(state => state.properties);

  const filteredProperties = properties.filter(p => 
    (selectedCategory === 'All' || p.type === selectedCategory) &&
    p.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <SafeAreaView style={styles.container}>
      <Stack.Screen options={{ headerShown: false }} />
      <View style={styles.header}>
        <SearchBar 
          placeholder="Search for boarding..." 
          value={searchQuery}
          onChangeText={setSearchQuery}
          style={styles.searchBar}
          onSearchPress={() => router.push('/filters')}
        />
        <FilterPills 
          categories={['All', ...CATEGORIES]} 
          selectedCategory={selectedCategory}
          onSelectCategory={setSelectedCategory}
        />
      </View>
      
      <FlatList
        data={filteredProperties}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <PropertyCard 
            property={item} 
            onPress={() => router.push(`/property/${item.id}`)}
            onContactPress={() => router.push(`/chat/${item.id}`)}
          />
        )}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  header: {
    paddingTop: 16,
  },
  searchBar: {
    marginHorizontal: 16,
    marginBottom: 16,
  },
  listContent: {
    padding: 16,
  }
});
