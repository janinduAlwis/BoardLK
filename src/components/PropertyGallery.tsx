import { getOptimizedImageUrl } from '@/lib/supabase';
import { Image } from 'expo-image';
import { useState } from 'react';
import { Dimensions, ScrollView, StyleSheet, Text, View } from 'react-native';

const screenWidth = Dimensions.get('window').width;

type PropertyGalleryProps = {
  images: string[];
};

export default function PropertyGallery({ images }: PropertyGalleryProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const visibleImages = images.filter(Boolean);

  return (
    <View style={styles.container}>
      <ScrollView
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onMomentumScrollEnd={(event) => {
          setActiveIndex(Math.round(event.nativeEvent.contentOffset.x / screenWidth));
        }}
      >
        {visibleImages.map((uri) => (
          <Image
            key={uri}
            source={{ uri: getOptimizedImageUrl(uri) }}
            style={styles.image}
            contentFit="cover"
            cachePolicy="memory-disk"
          />
        ))}
      </ScrollView>
      {visibleImages.length > 1 && (
        <View style={styles.counter}>
          <Text style={styles.counterText}>{activeIndex + 1} / {visibleImages.length}</Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'relative',
  },
  image: {
    width: screenWidth,
    height: 350,
  },
  counter: {
    position: 'absolute',
    right: 16,
    bottom: 16,
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 14,
    backgroundColor: 'rgba(0, 0, 0, 0.65)',
  },
  counterText: {
    color: '#FFF',
    fontSize: 12,
    fontWeight: '700',
  },
});
