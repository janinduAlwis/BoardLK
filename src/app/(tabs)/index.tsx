import { Stack } from 'expo-router';
import { useMemo } from 'react';
import { FlatList, SafeAreaView, StyleSheet, Text, View } from 'react-native';

import FilterPills from '@/components/FilterPills';
import PropertyCard from '@/components/PropertyCard';
import SearchBar from '@/components/SearchBar';
import { CATEGORIES } from '@/constants/mockData';
import { useStore } from '@/store/useStore';
import { PROPERTY_TYPES } from '@/types/marketplace';
import { useRouter } from 'expo-router';

export default function HomeScreen() {
  const router = useRouter();
  const properties = useStore(state => state.properties);
  const filters = useStore(state => state.buyFilters);
  const setBuyFilters = useStore(state => state.setBuyFilters);
  const propertyCategories = ['All', ...PROPERTY_TYPES, ...CATEGORIES.filter((category) => !PROPERTY_TYPES.includes(category as (typeof PROPERTY_TYPES)[number]))];

  const filteredProperties = useMemo(() => {
    const results = properties.filter((property) => {
      const searchableText = `${property.title} ${property.location}`.toLowerCase();
      return (filters.propertyType === 'All' || property.type === filters.propertyType)
        && property.price >= filters.minPrice
        && property.price <= filters.maxPrice
        && searchableText.includes(filters.searchQuery.toLowerCase());
    });
    return results;
  }, [properties, filters]);

  return (
    <SafeAreaView style={styles.container}>
      <Stack.Screen options={{ headerShown: false }} />
      <View style={styles.header}>
        <SearchBar 
          placeholder="Search for boarding..." 
          value={filters.searchQuery}
          onChangeText={(searchQuery) => setBuyFilters({ searchQuery })}
          style={styles.searchBar}
          onSearchPress={() => router.push('/filters')}
        />
        <FilterPills 
          categories={propertyCategories}
          selectedCategory={filters.propertyType}
          onSelectCategory={(propertyType) => setBuyFilters({ propertyType })}
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
        ListEmptyComponent={<View style={styles.empty}><Text style={styles.emptyTitle}>No properties found</Text><Text style={styles.emptyText}>Try changing your search or filters.</Text></View>}
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
  },
  empty: {
    alignItems: 'center',
    padding: 40,
  },
  emptyTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#000',
  },
  emptyText: {
    marginTop: 6,
    color: '#8E8E93',
  },
});
