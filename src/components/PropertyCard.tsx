import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { Feather, FontAwesome } from '@expo/vector-icons';

type PropertyCardProps = {
  property: {
    id: string;
    title: string;
    price: number;
    location: string;
    rating: number;
    image: string;
    type: string;
  };
  onPress?: () => void;
  onContactPress?: () => void;
  style?: object;
};

export default function PropertyCard({ property, onPress, onContactPress, style }: PropertyCardProps) {
  return (
    <TouchableOpacity activeOpacity={0.95} onPress={onPress} style={[styles.card, style]}>
      <Image source={{ uri: property.image }} style={styles.image} />
      <View style={styles.content}>
        <Text style={styles.title} numberOfLines={1}>{property.title}</Text>
        
        <View style={styles.ratingContainer}>
          {[1, 2, 3, 4, 5].map((star) => (
            <FontAwesome 
              key={star} 
              name={star <= property.rating ? "star" : (star - 0.5 <= property.rating ? "star-half-empty" : "star-o")} 
              size={14} 
              color="#F5A623" 
              style={styles.star}
            />
          ))}
          <Text style={styles.ratingText}>{property.rating.toFixed(1)}</Text>
        </View>

        <Text style={styles.location}>Location: {property.location}</Text>
        
        <View style={styles.footer}>
          <Text style={styles.price}>Rs. {property.price.toLocaleString()} / month</Text>
          <TouchableOpacity style={styles.button} onPress={onContactPress}>
            <Text style={styles.buttonText}>Show contacts</Text>
          </TouchableOpacity>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#EFEFEF',
    overflow: 'hidden',
    marginBottom: 20,
  },
  image: {
    width: '100%',
    height: 200,
    resizeMode: 'cover',
  },
  content: {
    padding: 16,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#000',
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  star: {
    marginRight: 2,
  },
  ratingText: {
    marginLeft: 8,
    fontSize: 14,
    fontWeight: 'bold',
    color: '#000',
  },
  location: {
    fontSize: 14,
    color: '#8E8E93',
    marginBottom: 16,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  price: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000',
  },
  button: {
    backgroundColor: '#0F0F0F',
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 20,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 14,
  },
});
