import React from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Image, SafeAreaView } from 'react-native';
import { useRouter, Stack } from 'expo-router';
import { useStore } from '@/store/useStore';

function formatTimeAgo(timestamp: number): string {
  const now = Date.now();
  const diff = now - timestamp;
  const minutes = Math.floor(diff / (1000 * 60));
  const hours = Math.floor(diff / (1000 * 60 * 60));
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));

  if (minutes < 1) return 'Just now';
  if (minutes < 60) return `${minutes}m ago`;
  if (hours < 24) return `${hours}h ago`;
  if (days < 7) {
    const dayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    return dayNames[new Date(timestamp).getDay()];
  }
  return new Date(timestamp).toLocaleDateString();
}

type ChatPreview = {
  propertyId: string;
  ownerName: string;
  ownerAvatar: string;
  lastMessage: string;
  timeLabel: string;
  lastActivity: number;
  propertyTitle: string;
};

export default function ChatListScreen() {
  const router = useRouter();
  const properties = useStore(state => state.properties);
  const chatMessages = useStore(state => state.chatMessages);

  const chats: ChatPreview[] = properties
    .filter(prop => chatMessages[prop.id] && chatMessages[prop.id].messages.length > 0)
    .map(prop => {
      const conv = chatMessages[prop.id];
      const lastMsg = conv.messages[conv.messages.length - 1];
      const preview = lastMsg.sender === 'owner'
        ? lastMsg.text
        : `Regarding: ${prop.title}`;

      return {
        propertyId: prop.id,
        ownerName: prop.ownerName,
        ownerAvatar: prop.ownerAvatar,
        lastMessage: preview,
        timeLabel: formatTimeAgo(conv.lastActivity),
        lastActivity: conv.lastActivity,
        propertyTitle: prop.title,
      };
    })
    .sort((a, b) => b.lastActivity - a.lastActivity);

  const renderItem = ({ item }: { item: ChatPreview }) => (
    <TouchableOpacity
      style={styles.chatRow}
      activeOpacity={0.7}
      onPress={() => router.push(`/chat/${item.propertyId}`)}
    >
      <Image source={{ uri: item.ownerAvatar }} style={styles.avatar} />
      <View style={styles.chatContent}>
        <View style={styles.topRow}>
          <Text style={styles.ownerName} numberOfLines={1}>{item.ownerName}</Text>
          <Text style={styles.timeText}>{item.timeLabel}</Text>
        </View>
        <Text style={styles.preview} numberOfLines={1}>{item.lastMessage}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <Stack.Screen options={{ headerShown: false }} />
      <Text style={styles.heading}>Messages</Text>
      <FlatList
        data={chats}
        keyExtractor={item => item.propertyId}
        renderItem={renderItem}
        contentContainerStyle={styles.list}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyIcon}>💬</Text>
            <Text style={styles.emptyText}>No messages yet</Text>
            <Text style={styles.emptySubText}>
              Start a conversation by contacting a property owner
            </Text>
          </View>
        }
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  heading: {
    fontSize: 28,
    fontWeight: '800',
    color: '#000',
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 16,
  },
  list: {
    paddingHorizontal: 20,
  },
  chatRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  avatar: {
    width: 52,
    height: 52,
    borderRadius: 26,
    marginRight: 14,
    backgroundColor: '#F0F0F0',
  },
  chatContent: {
    flex: 1,
  },
  topRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  ownerName: {
    fontSize: 16,
    fontWeight: '700',
    color: '#000',
    flex: 1,
    marginRight: 8,
  },
  timeText: {
    fontSize: 13,
    color: '#8E8E93',
  },
  preview: {
    fontSize: 14,
    color: '#8E8E93',
    lineHeight: 20,
  },
  emptyContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 120,
  },
  emptyIcon: {
    fontSize: 48,
    marginBottom: 16,
  },
  emptyText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#000',
    marginBottom: 8,
  },
  emptySubText: {
    fontSize: 14,
    color: '#8E8E93',
    textAlign: 'center',
    paddingHorizontal: 40,
  },
});
