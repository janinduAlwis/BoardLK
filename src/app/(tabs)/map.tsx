import React, { useState, useRef, useCallback } from 'react';
import { View, StyleSheet, Dimensions, Text, TouchableOpacity, Animated, Image } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { Stack, useRouter } from 'expo-router';
import { FontAwesome } from '@expo/vector-icons';

import SearchBar from '@/components/SearchBar';
import { useStore } from '@/store/useStore';

const { width, height } = Dimensions.get('window');

export default function MapScreen() {
  const router = useRouter();
  const mapRef = useRef<MapView>(null);
  const properties = useStore(state => state.properties);
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const fadeAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(0.96)).current;

  const selectedProperty = properties.find(p => p.id === selectedId) || null;

  const showCard = useCallback((prop: typeof properties[0]) => {
    setSelectedId(prop.id);

    // Smoothly pan map so the selected price label sits right below the card
    mapRef.current?.animateToRegion({
      latitude: prop.lat + 0.0055,
      longitude: prop.lng,
      latitudeDelta: 0.035,
      longitudeDelta: 0.02,
    }, 350);

    fadeAnim.stopAnimation();
    scaleAnim.stopAnimation();
    fadeAnim.setValue(0);
    scaleAnim.setValue(0.96);

    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 220,
        useNativeDriver: true,
      }),
      Animated.spring(scaleAnim, {
        toValue: 1,
        tension: 100,
        friction: 14,
        useNativeDriver: true,
      }),
    ]).start();
  }, [fadeAnim, scaleAnim]);

  const hideCard = useCallback(() => {
    fadeAnim.stopAnimation();
    scaleAnim.stopAnimation();

    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 180,
        useNativeDriver: true,
      }),
      Animated.timing(scaleAnim, {
        toValue: 0.96,
        duration: 180,
        useNativeDriver: true,
      }),
    ]).start(() => {
      setSelectedId(null);
    });
  }, [fadeAnim, scaleAnim]);

  const handleMapPress = useCallback(() => {
    if (selectedId) {
      hideCard();
    }
  }, [selectedId, hideCard]);

  return (
    <View style={styles.container}>
      <Stack.Screen options={{ headerShown: false }} />

      <MapView
        ref={mapRef}
        style={styles.map}
        initialRegion={{
          latitude: 6.8649,
          longitude: 79.8997,
          latitudeDelta: 0.04,
          longitudeDelta: 0.02,
        }}
        onPress={handleMapPress}
        onPanDrag={handleMapPress}
      >
        {properties.map((prop) => (
          <Marker
            key={prop.id}
            coordinate={{ latitude: prop.lat, longitude: prop.lng }}
            onPress={(e) => {
              e.stopPropagation();
              showCard(prop);
            }}
            tracksViewChanges={true}
            stopPropagation={true}
          >
            <View style={styles.markerContainer}>
              <View style={[
                styles.markerBubble,
                selectedId === prop.id && styles.markerBubbleSelected
              ]}>
                <Text style={[
                  styles.markerText,
                  selectedId === prop.id && styles.markerTextSelected
                ]}>
                  Rs. {prop.price}
                </Text>
              </View>
              <View style={[
                styles.markerArrow,
                selectedId === prop.id && styles.markerArrowSelected
              ]} />
              <View style={styles.markerDot} />
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

      {/* Only ONE single property card appears close above the selected price label */}
      {selectedProperty && (
        <Animated.View
          style={[
            styles.cardContainer,
            {
              opacity: fadeAnim,
              transform: [{ scale: scaleAnim }],
            },
          ]}
        >
          <TouchableOpacity
            activeOpacity={0.97}
            style={styles.card}
            onPress={() => router.push(`/property/${selectedProperty.id}`)}
          >
            <Image source={{ uri: selectedProperty.image }} style={styles.cardImage} />

            <View style={styles.cardContent}>
              <Text style={styles.cardTitle}>{selectedProperty.title}</Text>

              <View style={styles.ratingRow}>
                {[1, 2, 3, 4, 5].map((star) => (
                  <FontAwesome
                    key={star}
                    name={star <= Math.round(selectedProperty.rating) ? 'star' : 'star-o'}
                    size={15}
                    color={star <= Math.round(selectedProperty.rating) ? '#F5A623' : '#D1D1D6'}
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
    top: 114,
    left: 16,
    right: 16,
    zIndex: 20,
    backgroundColor: '#FFFFFF',
    borderRadius: 24,
    padding: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.15,
    shadowRadius: 18,
    elevation: 8,
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 18,
    overflow: 'hidden',
  },
  cardImage: {
    width: '100%',
    height: 190,
    borderRadius: 16,
    resizeMode: 'cover',
  },
  cardContent: {
    paddingHorizontal: 4,
    paddingTop: 12,
    paddingBottom: 4,
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
    gap: 3,
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
    paddingHorizontal: 18,
    borderRadius: 24,
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
    paddingHorizontal: 14,
    paddingVertical: 7,
    borderRadius: 18,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.18,
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
    backgroundColor: '#000',
    marginTop: 2,
  },
});
