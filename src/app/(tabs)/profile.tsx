import { useStore } from '@/store/useStore';
import { Feather } from '@expo/vector-icons';
import { Stack, useRouter } from 'expo-router';
import { Image, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function ProfileScreen() {
  const router = useRouter();
  const profile = useStore((state) => state.profile);
  const logout = useStore((state) => state.logout);

  const handleLogout = () => {
    logout();
    router.replace('/login');
  };

  return (
    <SafeAreaView style={styles.container}>
      <Stack.Screen options={{ headerShown: false }} />

      <View style={styles.header}>
        <Image source={{ uri: profile.avatar }} style={styles.avatar} />
        <Text style={styles.name}>{profile.fullName}</Text>
        <Text style={styles.headline}>{profile.headline}</Text>
      </View>

      <View style={styles.menuContainer}>
        {/* Personal Information */}
        <TouchableOpacity
          style={styles.menuItem}
          activeOpacity={0.7}
          onPress={() => router.push('/edit-profile')}
        >
          <Feather name="user" size={24} color="#000" style={styles.icon} />
          <Text style={styles.menuText}>Personal Information</Text>
          <Feather name="chevron-right" size={22} color="#000" />
        </TouchableOpacity>

        {/* Saved Properties */}
        <TouchableOpacity
          style={styles.menuItem}
          activeOpacity={0.7}
          onPress={() => router.push('/(tabs)/favorites')}
        >
          <Feather name="heart" size={24} color="#000" style={styles.icon} />
          <Text style={styles.menuText}>Saved Properties</Text>
          <Feather name="chevron-right" size={22} color="#000" />
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.menuItem}
          activeOpacity={0.7}
          onPress={() => router.push('/(tabs)/sell')}
        >
          <Feather name="plus-square" size={24} color="#000" style={styles.icon} />
          <Text style={styles.menuText}>Sell Property</Text>
          <Feather name="chevron-right" size={22} color="#000" />
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.menuItem}
          activeOpacity={0.7}
          onPress={() => router.push('/my-listings')}
        >
          <Feather name="list" size={24} color="#000" style={styles.icon} />
          <Text style={styles.menuText}>My Listings</Text>
          <Feather name="chevron-right" size={22} color="#000" />
        </TouchableOpacity>

        {/* Log Out */}
        <TouchableOpacity
          style={styles.menuItem}
          activeOpacity={0.7}
          onPress={handleLogout}
        >
          <Feather name="log-out" size={24} color="#000" style={styles.icon} />
          <Text style={styles.menuText}>Log Out</Text>
          <Feather name="chevron-right" size={22} color="#000" />
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
    alignItems: 'center',
    paddingTop: 50,
    paddingBottom: 20,
  },
  avatar: {
    width: 124,
    height: 124,
    borderRadius: 62,
    backgroundColor: '#F2E2D2',
  },
  name: {
    fontSize: 24,
    fontWeight: '800',
    color: '#000',
    marginTop: 18,
    textAlign: 'center',
  },
  headline: {
    fontSize: 14,
    color: '#8E8E93',
    marginTop: 6,
    textAlign: 'center',
  },
  menuContainer: {
    marginTop: 30,
    paddingHorizontal: 28,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 18,
  },
  icon: {
    width: 32,
  },
  menuText: {
    flex: 1,
    fontSize: 16,
    fontWeight: '500',
    color: '#000',
    marginLeft: 8,
  },
});
