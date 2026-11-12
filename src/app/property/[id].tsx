import PropertyGallery from '@/components/PropertyGallery';
import { listPropertyReviews } from '@/services/marketplace';
import { useStore } from '@/store/useStore';
import type { PropertyReview } from '@/types/marketplace';
import { Feather, FontAwesome, Ionicons } from '@expo/vector-icons';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function PropertyDetails() {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const properties = useStore(state => state.properties);
  const savedPropertyIds = useStore(state => state.savedPropertyIds);
  const toggleSaved = useStore(state => state.toggleSaved);

  const property = properties.find(p => p.id === id);

  if (!property) {
    return (
      <View style={styles.container}>
        <Text>Property not found</Text>
      </View>
    );
  }

  const isFavorite = savedPropertyIds.includes(property.id);
  const propertyImages = (property as typeof property & { images?: string[] }).images || [property.image];
  const [reviews, setReviews] = useState<PropertyReview[]>([]);
  const sampleReviews = [
    { name: 'Kavindu S.', rating: 5, date: '2 weeks ago', text: 'Great location and a clean, comfortable place. The owner was helpful throughout.' },
    { name: 'Madhavi R.', rating: 4, date: '1 month ago', text: 'Quiet neighborhood with easy access to shops and campus.' },
  ];

  useEffect(() => {
    void listPropertyReviews(property.id).then(setReviews).catch(() => setReviews([]));
  }, [property.id]);

  const visibleReviews = reviews.length > 0 ? reviews : sampleReviews;

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        <View style={styles.imageContainer}>
          <PropertyGallery images={propertyImages} />
          
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => router.back()}
            activeOpacity={0.8}
          >
            <Feather name="chevron-left" size={24} color="#000" />
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.favoriteButton}
            onPress={() => toggleSaved(property.id)}
            activeOpacity={0.8}
          >
            <Ionicons
              name={isFavorite ? "heart" : "heart-outline"}
              size={22}
              color={isFavorite ? "#FF3B30" : "#000"}
            />
          </TouchableOpacity>
        </View>

        <View style={styles.detailsContainer}>
          <Text style={styles.title}>{property.title}</Text>
          
          <View style={styles.ratingRow}>
            {[1, 2, 3, 4, 5].map((star) => (
              <FontAwesome 
                key={star} 
                name={star <= Math.round(property.rating) ? "star" : "star-o"} 
                size={16} 
                color="#FFB020" 
              />
            ))}
            <Text style={styles.ratingText}>{property.rating} (120 reviews)</Text>
          </View>

          <Text style={styles.locationText}>Location: {property.location}</Text>

          <View style={styles.pillsRow}>
            <View style={styles.pill}><Text style={styles.pillText}>1 Bed</Text></View>
            <View style={styles.pill}><Text style={styles.pillText}>1 Bath</Text></View>
            <View style={styles.pill}><Text style={styles.pillText}>Free Wi-Fi</Text></View>
          </View>

          <Text style={styles.description}>
            Located centrally close to all university amenities, this secure annex is ideal for a student...
          </Text>

          <View style={styles.reviewsHeader}>
            <Text style={styles.reviewsTitle}>Reviews</Text>
            <Text style={styles.reviewsCount}>{reviews.length || visibleReviews.length} reviews</Text>
          </View>

          <View style={styles.reviewSummary}>
            <Text style={styles.reviewScore}>{property.rating.toFixed(1)}</Text>
            <View>
              <View style={styles.reviewStars}>
                {[1, 2, 3, 4, 5].map((star) => (
                  <FontAwesome key={star} name={star <= Math.round(property.rating) ? 'star' : 'star-o'} size={15} color="#FFB020" />
                ))}
              </View>
              <Text style={styles.reviewSummaryText}>Overall rating</Text>
            </View>
          </View>

          {visibleReviews.map((review) => (
            <View key={'id' in review ? review.id : review.name} style={styles.reviewCard}>
              <View style={styles.reviewCardHeader}>
                <Text style={styles.reviewerName}>{'authorName' in review ? review.authorName : review.name}</Text>
                <Text style={styles.reviewDate}>{'authorName' in review ? 'Recent' : review.date}</Text>
              </View>
              <View style={styles.reviewStars}>
                {[1, 2, 3, 4, 5].map((star) => (
                  <FontAwesome key={star} name={star <= review.rating ? 'star' : 'star-o'} size={13} color="#FFB020" />
                ))}
              </View>
              <Text style={styles.reviewText}>{review.text}</Text>
            </View>
          ))}

          <TouchableOpacity style={styles.reviewButton} onPress={() => router.push(`/review?id=${property.id}`)}>
            <Text style={styles.reviewButtonText}>Write a Review</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

      <View style={styles.bottomBar}>
        <Text style={styles.priceText}>Rs. {property.price.toLocaleString()} / mo</Text>
        <TouchableOpacity style={styles.contactButton} onPress={() => router.push(`/chat/${property.id}`)}>
          <Text style={styles.contactButtonText}>Contact Owner</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
  },
  scrollContent: {
    paddingBottom: 100,
  },
  imageContainer: {
    position: 'relative',
  },
  image: {
    width: '100%',
    height: 350,
    borderBottomLeftRadius: 32,
    borderBottomRightRadius: 32,
  },
  backButton: {
    position: 'absolute',
    top: 50,
    left: 16,
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#FFF',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 6,
    elevation: 4,
  },
  favoriteButton: {
    position: 'absolute',
    top: 50,
    right: 16,
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#FFF',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 6,
    elevation: 4,
  },
  detailsContainer: {
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    color: '#000',
    marginBottom: 8,
  },
  ratingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
    gap: 4,
  },
  ratingText: {
    marginLeft: 4,
    fontSize: 14,
    color: '#8E8E93',
    fontWeight: '500',
  },
  locationText: {
    fontSize: 14,
    color: '#8E8E93',
    marginBottom: 24,
  },
  pillsRow: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 32,
  },
  pill: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 20,
    backgroundColor: '#F9F9F9',
    borderWidth: 1,
    borderColor: '#EAEAEA',
  },
  pillText: {
    fontSize: 14,
    color: '#1E1E1E',
  },
  description: {
    fontSize: 15,
    lineHeight: 24,
    color: '#1E1E1E',
    marginBottom: 32,
  },
  reviewsHeader: {
    flexDirection: 'row',
    alignItems: 'baseline',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  reviewsTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#000',
  },
  reviewsCount: {
    fontSize: 13,
    color: '#8E8E93',
  },
  reviewSummary: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
    padding: 16,
    borderRadius: 14,
    backgroundColor: '#F9F9F9',
    marginBottom: 16,
  },
  reviewScore: {
    fontSize: 30,
    fontWeight: '800',
    color: '#000',
  },
  reviewStars: {
    flexDirection: 'row',
    gap: 3,
  },
  reviewSummaryText: {
    marginTop: 4,
    fontSize: 12,
    color: '#8E8E93',
  },
  reviewCard: {
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#EAEAEA',
  },
  reviewCardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 7,
  },
  reviewerName: {
    fontSize: 15,
    fontWeight: '700',
    color: '#000',
  },
  reviewDate: {
    fontSize: 12,
    color: '#8E8E93',
  },
  reviewText: {
    fontSize: 14,
    lineHeight: 21,
    color: '#1E1E1E',
    marginTop: 8,
  },
  reviewButton: {
    width: '100%',
    paddingVertical: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#000',
    alignItems: 'center',
  },
  reviewButtonText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#000',
  },
  bottomBar: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 20,
    paddingBottom: 34,
    backgroundColor: '#FFF',
    borderTopWidth: 1,
    borderTopColor: '#F0F0F0',
  },
  priceText: {
    fontSize: 18,
    fontWeight: '700',
    color: '#000',
  },
  contactButton: {
    backgroundColor: '#0F0F0F',
    paddingHorizontal: 24,
    paddingVertical: 16,
    borderRadius: 24,
  },
  contactButtonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: '700',
  },
});
