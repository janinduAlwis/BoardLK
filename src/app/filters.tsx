import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Switch, SafeAreaView, ScrollView } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import SearchBar from '@/components/SearchBar';
import RangeSlider from '@/components/RangeSlider';

export default function FiltersScreen() {
  const router = useRouter();
  const [attachedBathroom, setAttachedBathroom] = useState(true);
  const [girlsOnly, setGirlsOnly] = useState(false);
  const [boysOnly, setBoysOnly] = useState(false);
  const [propertyType, setPropertyType] = useState('Rooms');
  const [minPrice, setMinPrice] = useState(10000);
  const [maxPrice, setMaxPrice] = useState(40000);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.closeBtn}>
          <Feather name="x" size={28} color="#000" />
        </TouchableOpacity>
        <Text style={styles.title}>Filters</Text>
        <View style={{ width: 28 }} />
      </View>

      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <SearchBar placeholder="Search for boarding..." style={styles.searchBar} />

        <Text style={styles.sectionTitle}>Price Range</Text>
        <RangeSlider 
          min={5000} 
          max={100000} 
          initialLow={10000} 
          initialHigh={40000} 
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
          {['Rooms', 'Annexes', 'Apartments'].map(type => (
            <TouchableOpacity 
              key={type}
              style={[styles.pill, propertyType === type && styles.pillActive]}
              onPress={() => setPropertyType(type)}
            >
              <Text style={[styles.pillText, propertyType === type && styles.pillTextActive]}>{type}</Text>
            </TouchableOpacity>
          ))}
        </View>

        <Text style={styles.sectionTitle}>Preferences</Text>
        <View style={styles.preferenceRow}>
          <Text style={styles.preferenceText}>Attached Bathroom</Text>
          <Switch 
            value={attachedBathroom} 
            onValueChange={setAttachedBathroom} 
            trackColor={{ false: '#EAEAEA', true: '#1E1E1E' }}
            thumbColor={'#FFF'}
          />
        </View>
        <View style={styles.preferenceRow}>
          <Text style={styles.preferenceText}>Girls Only</Text>
          <Switch 
            value={girlsOnly} 
            onValueChange={setGirlsOnly} 
            trackColor={{ false: '#EAEAEA', true: '#1E1E1E' }}
            thumbColor={'#FFF'}
          />
        </View>
        <View style={styles.preferenceRow}>
          <Text style={styles.preferenceText}>Boys Only</Text>
          <Switch 
            value={boysOnly} 
            onValueChange={setBoysOnly} 
            trackColor={{ false: '#EAEAEA', true: '#1E1E1E' }}
            thumbColor={'#FFF'}
          />
        </View>
      </ScrollView>

      <View style={styles.footer}>
        <TouchableOpacity style={styles.applyBtn} onPress={() => router.back()}>
          <Text style={styles.applyBtnText}>Show 12 Results</Text>
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
  preferenceRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 24,
  },
  preferenceText: {
    fontSize: 16,
    color: '#1E1E1E',
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
