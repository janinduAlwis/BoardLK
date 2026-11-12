import { auth } from '@/lib/firebase';
import { createPropertyReview } from '@/services/marketplace';
import { useStore } from '@/store/useStore';
import { Feather, FontAwesome } from '@expo/vector-icons';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useState } from 'react';
import { Image, Keyboard, KeyboardAvoidingView, Platform, SafeAreaView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

export default function ReviewScreen() {
  const router = useRouter();
  const { id } = useLocalSearchParams();
  const properties = useStore(state => state.properties);
  
  const [rating, setRating] = useState(0);
  const [reviewText, setReviewText] = useState('');
  
  const property = properties.find(p => p.id === id) || properties[0];

  return (
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAvoidingView 
        style={styles.container} 
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <View style={styles.header}>
          <TouchableOpacity onPress={() => router.back()} style={styles.closeButton}>
            <Feather name="x" size={28} color="#000" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Write a Review</Text>
          <View style={styles.rightPlaceholder} />
        </View>

        <View style={styles.content}>
          <View style={styles.propertySnippet}>
            <Image source={{ uri: property.image }} style={styles.snippetImage} />
            <View style={styles.snippetInfo}>
              <Text style={styles.snippetTitle}>{property.title}</Text>
              <Text style={styles.snippetPrice}>Rs. {property.price.toLocaleString()}</Text>
            </View>
          </View>

          <Text style={styles.label}>Tap to Rate</Text>
          <View style={styles.ratingContainer}>
            {[1, 2, 3, 4, 5].map((star) => (
              <TouchableOpacity key={star} onPress={() => setRating(star)}>
                <FontAwesome 
                  name={star <= rating ? "star" : "star-o"} 
                  size={32} 
                  color={star <= rating ? "#000" : "#000"} 
                  style={styles.star}
                />
              </TouchableOpacity>
            ))}
          </View>

          <TextInput
            style={styles.reviewInput}
            placeholder="Share your experience living here..."
            placeholderTextColor="#8E8E93"
            multiline
            textAlignVertical="top"
            returnKeyType="done"
            blurOnSubmit
            onSubmitEditing={() => Keyboard.dismiss()}
            value={reviewText}
            onChangeText={setReviewText}
          />

          <TouchableOpacity
            style={styles.submitButton}
            onPress={async () => {
              if (!auth?.currentUser || rating === 0 || !reviewText.trim()) {
                alert('Please sign in, choose a rating, and write a review.');
                return;
              }
              try {
                await createPropertyReview({
                  propertyId: property.id,
                  authorId: auth.currentUser.uid,
                  authorName: auth.currentUser.displayName || auth.currentUser.email || 'BoardLK member',
                  rating,
                  text: reviewText.trim(),
                });
                router.back();
              } catch (error) {
                alert(error instanceof Error ? error.message : 'Unable to submit review.');
              }
            }}
          >
            <Text style={styles.submitButtonText}>Submit Review</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#fff',
  },
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 16,
  },
  closeButton: {
    padding: 4,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  rightPlaceholder: {
    width: 36,
  },
  content: {
    flex: 1,
    paddingHorizontal: 16,
  },
  propertySnippet: {
    flexDirection: 'row',
    padding: 12,
    borderWidth: 1,
    borderColor: '#EAEAEA',
    borderRadius: 12,
    alignItems: 'center',
    marginBottom: 32,
    marginTop: 16,
  },
  snippetImage: {
    width: 80,
    height: 50,
    borderRadius: 6,
    marginRight: 12,
  },
  snippetInfo: {
    flex: 1,
  },
  snippetTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  snippetPrice: {
    fontSize: 12,
    color: '#000',
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  ratingContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 32,
  },
  star: {
    marginHorizontal: 8,
  },
  reviewInput: {
    backgroundColor: '#F2F2F7',
    borderRadius: 16,
    padding: 16,
    height: 150,
    fontSize: 16,
    marginBottom: 24,
  },
  submitButton: {
    backgroundColor: '#0F0F0F',
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: 'center',
    marginTop: 'auto',
    marginBottom: 24,
  },
  submitButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
