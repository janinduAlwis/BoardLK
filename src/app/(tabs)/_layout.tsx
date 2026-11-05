import { Tabs } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

export default function TabLayout() {
  return (
    <Tabs screenOptions={{ 
      headerShown: false,
      tabBarShowLabel: false,
      tabBarActiveTintColor: '#000000',
      tabBarInactiveTintColor: '#000000',
      tabBarStyle: {
        borderTopWidth: 1,
        borderTopColor: '#E5E5EA',
        height: 60,
      }
    }}>
      <Tabs.Screen
        name="index"
        options={{
          tabBarIcon: ({ focused, color }) => <Ionicons name={focused ? "home" : "home-outline"} size={26} color={color} />,
        }}
      />
      <Tabs.Screen
        name="favorites"
        options={{
          tabBarIcon: ({ focused, color }) => <Ionicons name={focused ? "heart" : "heart-outline"} size={26} color={color} />,
        }}
      />
      <Tabs.Screen
        name="map"
        options={{
          tabBarIcon: ({ focused, color }) => <Ionicons name={focused ? "map" : "map-outline"} size={26} color={color} />,
        }}
      />
      <Tabs.Screen
        name="chat"
        options={{
          tabBarIcon: ({ focused, color }) => <Ionicons name={focused ? "chatbubble-ellipses" : "chatbubble-ellipses-outline"} size={26} color={color} />,
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          tabBarIcon: ({ focused, color }) => <Ionicons name={focused ? "person" : "person-outline"} size={26} color={color} />,
        }}
      />
    </Tabs>
  );
}
