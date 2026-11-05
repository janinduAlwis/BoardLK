import React, { useState, useRef } from 'react';
import { View, StyleSheet, Dimensions, Text, TouchableOpacity, Animated, Image } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { Stack, useRouter } from 'expo-router';
import { FontAwesome, Feather } from '@expo/vector-icons';

import SearchBar from '@/components/SearchBar';
import { useStore } from '@/store/useStore';

const { width, height } = Dimensions.get('window');

export default function MapScreen() {
  const router = useRouter();
  const properties = useStore(state => state.properties);
  const [selectedProperty, setSelectedProperty] = useState<typeof properties[0] | null>(null);
  const cardAnim = useRef(new Animated.Value(-400)).current;

  const showCard = (prop: typeof properties[0]) => {
    setSelectedProperty(prop);
    Animated.spring(cardAnim, {
      toValue: 0,
      useNativeDriver: true,
      tension: 80,
      friction: 12,
    }).start();
  };

  const hideCard = () => {
    Animated.timing(cardAnim, {
      toValue: -400,
      duration: 250,
      useNativeDriver: true,
    }).start(() => setSelectedProperty(null));
  };

  return (
    <View style={styles.container}>
      <Stack.Screen options={{ headerShown: false }} />

      <MapView
        style={styles.map}
        initialRegion={{
          latitude: 6.8649,
          longitude: 79.8997,
          latitudeDelta: 0.04,
          longitudeDelta: 0.02,
        }}
        onPress={hideCard}
      >
        {properties.map((prop) => (
          <Marker
            key={prop.id}
            coordinate={{ latitude: prop.lat, longitude: prop.lng }}
            onPress={() => showCard(prop)}
            tracksViewChanges={false}
          >
            <View style={styles.markerContainer}>
              <View style={[
                styles.markerBubble,
                selectedProperty?.id === prop.id && styles.markerBubbleSelected
              ]}>
                <Text style={[
                  styles.markerText,
                  selectedProperty?.id === prop.id && styles.markerTextSelected
                ]}>
                  Rs. {prop.price}
                </Text>
              </View>
              <View style={[
                styles.markerArrow,
                selectedProperty?.id === prop.id && styles.markerArrowSelected
              ]} />
              <View style={[
                styles.markerDot,
                selectedProperty?.id === prop.id && styles.markerDotSelected
              ]} />
            </View>
          </Marker>
        ))}
      </MapView>

      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <SearchBar
          placeholder="Search for boarding..."
          onSearchPress={() => router.push('/filters')}
        />
      </View>

      {/* Property Card slides in from top */}
      {selectedProperty && (
        <Animated.View style={[styles.cardContainer, { transform: [{ translateY: cardAnim }] }]}>
          <TouchableOpacity
            activeOpacity={0.97}
            style={styles.card}
            onPress={() => router.push(`/property/${selectedProperty.id}`)}
          >
            {/* Close button */}
            <TouchableOpacity style={styles.closeBtn} onPress={hideCard}>
              <Feather name="x" size={18} color="#000" />
            </TouchableOpacity>

            <Image source={{ uri: selectedProperty.image }} style={styles.cardImage} />

            <View style={styles.cardContent}>
              <Text style={styles.cardTitle}>{selectedProperty.title}</Text>

              <View style={styles.ratingRow}>
                {[1, 2, 3, 4, 5].map((star) => (
                  <FontAwesome
                    key={star}
                    name={star <= Math.round(selectedProperty.rating) ? 'star' : 'star-o'}
                    size={14}
                    color="#F5A623"
                  />
                ))}
                <Text style={styles.ratingText}>{selectedProperty.rating.toFixed(1)}</Text>
              </View>

              <Text style={styles.locationText}>Location: {selectedProperty.location}</Text>

              <View style={styles.cardFooter}>
                <Text style={styles.priceText}>
                  Rs. {selectedProperty.price.toLocaleString()} / month
                </Text>
                <TouchableOpacity
                  style={styles.contactBtn}
                  onPress={() => router.push(`/chat/${selectedProperty.id}`)}
                >
                  <Text style={styles.contactBtnText}>Show contacts</Text>
                </TouchableOpacity>
              </View>
            </View>
          </TouchableOpacity>
        </Animated.View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    width,
    height,
  },
  searchContainer: {
    position: 'absolute',
    top: 56,
    left: 16,
    right: 16,
    zIndex: 10,
  },
  cardContainer: {
    position: 'absolute',
    top: 120,
    left: 16,
    right: 16,
    zIndex: 20,
  },
  card: {
    backgroundColor: '#FFF',
    borderRadius: 20,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.18,
    shadowRadius: 16,
    elevation: 8,
  },
  closeBtn: {
    position: 'absolute',
    top: 12,
    right: 12,
    zIndex: 10,
    backgroundColor: '#FFF',
    borderRadius: 16,
    width: 32,
    height: 32,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  cardImage: {
    width: '100%',
    height: 200,
    resizeMode: 'cover',
  },
  cardContent: {
    padding: 16,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 8,
  },
  ratingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 2,
    marginBottom: 6,
  },
  ratingText: {
    marginLeft: 6,
    fontSize: 14,
    fontWeight: 'bold',
    color: '#000',
  },
  locationText: {
    fontSize: 13,
    color: '#8E8E93',
    marginBottom: 16,
  },
  cardFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  priceText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000',
  },
  contactBtn: {
    backgroundColor: '#0F0F0F',
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 20,
  },
  contactBtnText: {
    color: '#FFF',
    fontWeight: 'bold',
    fontSize: 14,
  },
  // Markers
  markerContainer: {
    alignItems: 'center',
  },
  markerBubble: {
    backgroundColor: '#FFF',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 4,
  },
  markerBubbleSelected: {
    backgroundColor: '#0F0F0F',
  },
  markerText: {
    fontWeight: 'bold',
    fontSize: 12,
    color: '#000',
  },
  markerTextSelected: {
    color: '#FFF',
  },
  markerArrow: {
    width: 0,
    height: 0,
    borderStyle: 'solid',
    borderLeftWidth: 6,
    borderRightWidth: 6,
    borderTopWidth: 6,
    borderLeftColor: 'transparent',
    borderRightColor: 'transparent',
    borderTopColor: '#FFF',
  },
  markerArrowSelected: {
    borderTopColor: '#0F0F0F',
  },
  markerDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#8E8E93',
    marginTop: 2,
  },
  markerDotSelected: {
    backgroundColor: '#0F0F0F',
  },
});
