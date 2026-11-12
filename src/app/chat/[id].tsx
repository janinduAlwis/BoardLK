import { useStore } from '@/store/useStore';
import { Feather } from '@expo/vector-icons';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useState } from 'react';
import { Image, KeyboardAvoidingView, Platform, SafeAreaView, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

export default function ChatScreen() {
  const router = useRouter();
  const { id } = useLocalSearchParams(); 
  const propertyId = Array.isArray(id) ? id[0] : (id || '1'); // fallback to '1'

  const [message, setMessage] = useState('');
  
  const properties = useStore(state => state.properties);
  const addMessage = useStore(state => state.addMessage);
  const messages = useStore(state => {
    const conv = state.chatMessages[propertyId];
    return conv ? conv.messages : [];
  });

  const property = properties.find(p => p.id === propertyId) || properties[0];

  const handleSend = () => {
    if (message.trim()) {
      addMessage(propertyId, message.trim());
      setMessage('');
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAvoidingView 
        style={styles.container} 
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <View style={styles.header}>
          <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
            <Feather name="chevron-left" size={28} color="#000" />
          </TouchableOpacity>
          <View style={styles.headerTitle}>
            <Image 
              source={{ uri: property.ownerAvatar }} 
              style={styles.avatar} 
            />
            <Text style={styles.ownerName}>{property.ownerName}</Text>
          </View>
          <View style={styles.rightPlaceholder} />
        </View>

        <View style={styles.propertySnippet}>
          <Image source={{ uri: property.image }} style={styles.snippetImage} />
          <View style={styles.snippetInfo}>
            <Text style={styles.snippetTitle}>{property.title}</Text>
            <Text style={styles.snippetPrice}>Rs. {property.price.toLocaleString()}</Text>
          </View>
        </View>

        <ScrollView style={styles.chatArea} contentContainerStyle={styles.chatContent} keyboardDismissMode="on-drag" keyboardShouldPersistTaps="handled">
          {messages.map((msg) => (
            <View key={msg.id} style={[styles.messageWrapper, msg.sender === 'user' ? styles.messageWrapperUser : styles.messageWrapperOwner]}>
              <View style={[styles.messageBubble, msg.sender === 'user' ? styles.messageBubbleUser : styles.messageBubbleOwner]}>
                <Text style={[styles.messageText, msg.sender === 'user' ? styles.messageTextUser : styles.messageTextOwner]}>{msg.text}</Text>
              </View>
            </View>
          ))}
        </ScrollView>

        <View style={styles.inputContainer}>
          <View style={styles.inputWrapper}>
            <TextInput
              style={styles.input}
              placeholder="Type a message..."
              placeholderTextColor="#8E8E93"
              value={message}
              onChangeText={setMessage}
              returnKeyType="send"
              onSubmitEditing={handleSend}
              blurOnSubmit
            />
            <TouchableOpacity style={styles.sendButton} onPress={handleSend}>
              <Feather name="send" size={20} color="#000" />
            </TouchableOpacity>
          </View>
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
    paddingVertical: 12,
  },
  backButton: {
    padding: 4,
  },
  headerTitle: {
    alignItems: 'center',
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginBottom: 4,
  },
  ownerName: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  rightPlaceholder: {
    width: 36,
  },
  propertySnippet: {
    flexDirection: 'row',
    marginHorizontal: 16,
    padding: 12,
    borderWidth: 1,
    borderColor: '#EAEAEA',
    borderRadius: 12,
    alignItems: 'center',
    marginBottom: 16,
  },
  snippetImage: {
    width: 60,
    height: 40,
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
  chatArea: {
    flex: 1,
  },
  chatContent: {
    paddingHorizontal: 16,
    paddingBottom: 20,
  },
  messageWrapper: {
    marginBottom: 16,
    flexDirection: 'row',
  },
  messageWrapperUser: {
    justifyContent: 'flex-end',
  },
  messageWrapperOwner: {
    justifyContent: 'flex-start',
  },
  messageBubble: {
    maxWidth: '80%',
    padding: 16,
    borderRadius: 20,
  },
  messageBubbleUser: {
    backgroundColor: '#1C1C1E',
  },
  messageBubbleOwner: {
    backgroundColor: '#E5E5EA',
  },
  messageText: {
    fontSize: 16,
    lineHeight: 22,
  },
  messageTextUser: {
    color: '#fff',
  },
  messageTextOwner: {
    color: '#000',
  },
  inputContainer: {
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: '#f0f0f0',
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#EAEAEA',
    borderRadius: 24,
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  input: {
    flex: 1,
    fontSize: 16,
    maxHeight: 100,
  },
  sendButton: {
    marginLeft: 12,
  }
});
