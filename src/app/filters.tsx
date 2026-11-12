import RangeSlider from '@/components/RangeSlider';
import SearchBar from '@/components/SearchBar';
import { CATEGORIES } from '@/constants/mockData';
import { useStore } from '@/store/useStore';
import { PROPERTY_TYPES } from '@/types/marketplace';
import { Feather } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import { SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function FiltersScreen() {
  const router = useRouter();
  const filters = useStore(state => state.buyFilters);
  const setBuyFilters = useStore(state => state.setBuyFilters);
  const resetBuyFilters = useStore(state => state.resetBuyFilters);
  const [searchQuery, setSearchQuery] = useState(filters.searchQuery);
  const [propertyType, setPropertyType] = useState(filters.propertyType);
  const [minPrice, setMinPrice] = useState(filters.minPrice);
  const [maxPrice, setMaxPrice] = useState(filters.maxPrice);
  const propertyTypes = ['All', ...PROPERTY_TYPES, ...CATEGORIES.filter((category) => !PROPERTY_TYPES.includes(category as (typeof PROPERTY_TYPES)[number]))];

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.closeBtn}>
          <Feather name="x" size={28} color="#000" />
        </TouchableOpacity>
        <Text style={styles.title}>Filters</Text>
        <View style={{ width: 28 }} />
      </View>

      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false} keyboardDismissMode="on-drag" keyboardShouldPersistTaps="handled">
        <SearchBar placeholder="Search title or location..." value={searchQuery} onChangeText={setSearchQuery} style={styles.searchBar} />

        <Text style={styles.sectionTitle}>Price Range</Text>
        <RangeSlider 
          min={0}
          max={50000000}
          initialLow={minPrice}
          initialHigh={maxPrice}
          onValueChanged={(low, high) => {
            setMinPrice(low);
            setMaxPrice(high);
          }} 
        />
        <View style={styles.priceLabels}>
          <Text style={styles.priceText}>Rs. {minPrice.toLocaleString()}</Text>
          <Text style={styles.priceText}>Rs. {maxPrice.toLocaleString()}</Text>
        </View>

        <Text style={styles.sectionTitle}>Property Type</Text>
        <View style={styles.pillsContainer}>
          {propertyTypes.map(type => (
            <TouchableOpacity 
              key={type}
              style={[styles.pill, propertyType === type && styles.pillActive]}
              onPress={() => setPropertyType(type)}
            >
              <Text style={[styles.pillText, propertyType === type && styles.pillTextActive]}>{type}</Text>
            </TouchableOpacity>
          ))}
        </View>

      </ScrollView>

      <View style={styles.footer}>
        <TouchableOpacity style={styles.resetBtn} onPress={() => { resetBuyFilters(); setSearchQuery(''); setPropertyType('All'); setMinPrice(0); setMaxPrice(50000000); }}>
          <Text style={styles.resetBtnText}>Reset</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.applyBtn} onPress={() => { setBuyFilters({ searchQuery, propertyType, minPrice, maxPrice, listingPurpose: 'All' }); router.back(); }}>
          <Text style={styles.applyBtnText}>Apply filters</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 16,
  },
  closeBtn: {
    padding: 4,
    marginLeft: -4,
  },
  title: {
    fontSize: 20,
    fontWeight: '700',
    color: '#000',
  },
  content: {
    paddingHorizontal: 20,
    paddingBottom: 40,
  },
  searchBar: {
    marginBottom: 32,
    marginTop: 10,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#000',
    marginBottom: 16,
  },
  priceLabels: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 40,
  },
  priceText: {
    fontSize: 14,
    color: '#A0A0A0',
  },
  pillsContainer: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 40,
  },
  pill: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 24,
    borderWidth: 1,
    borderColor: '#EAEAEA',
    backgroundColor: '#FFF',
  },
  pillActive: {
    backgroundColor: '#1E1E1E',
    borderColor: '#1E1E1E',
  },
  pillText: {
    fontSize: 14,
    color: '#1E1E1E',
  },
  pillTextActive: {
    color: '#FFF',
  },
  resetBtn: {
    alignItems: 'center',
    paddingVertical: 12,
    marginBottom: 4,
  },
  resetBtnText: {
    color: '#8E8E93',
    fontWeight: '700',
  },
  footer: {
    padding: 20,
    paddingBottom: 34,
    borderTopWidth: 1,
    borderTopColor: '#F0F0F0',
  },
  applyBtn: {
    backgroundColor: '#161616',
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: 'center',
  },
  applyBtnText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: '700',
  },
});
