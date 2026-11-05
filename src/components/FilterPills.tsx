import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

type FilterPillsProps = {
  categories: string[];
  selectedCategory: string;
  onSelectCategory: (category: string) => void;
  style?: object;
};

export default function FilterPills({ categories, selectedCategory, onSelectCategory, style }: FilterPillsProps) {
  return (
    <View style={[styles.container, style]}>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        {categories.map((category) => (
          <TouchableOpacity
            key={category}
            style={[
              styles.pill,
              selectedCategory === category && styles.pillSelected
            ]}
            onPress={() => onSelectCategory(category)}
          >
            <Text
              style={[
                styles.pillText,
                selectedCategory === category && styles.pillTextSelected
              ]}
            >
              {category}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
  },
  scrollContent: {
    paddingHorizontal: 10,
    gap: 0,
  },
  pill: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#EAEAEA',
    marginRight: 12,
  },
  pillSelected: {
    backgroundColor: '#0F0F0F',
    borderColor: '#0F0F0F',
  },
  pillText: {
    fontSize: 14,
    color: '#000',
  },
  pillTextSelected: {
    color: '#fff',
    fontWeight: '500',
  },
});
