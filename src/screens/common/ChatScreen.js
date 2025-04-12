import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, TextInput, TouchableOpacity } from 'react-native';
import { COLORS, SIZES } from '../../constants/theme';

const ChatScreen = ({ route }) => {
  const { chatName = 'Chat' } = route.params || {};
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([
    { id: '1', text: 'Hello, I need help with my car', sender: 'user', time: '10:30 AM' },
    { id: '2', text: 'Hi there! What seems to be the problem?', sender: 'other', time: '10:31 AM' },
    { id: '3', text: 'My engine is making a strange noise', sender: 'user', time: '10:32 AM' },
    { id: '4', text: 'Can you describe the noise? Is it more like a clicking or a grinding sound?', sender: 'other', time: '10:33 AM' },
  ]);

  const sendMessage = () => {
    if (message.trim().length > 0) {
      const newMessage = {
        id: Date.now().toString(),
        text: message,
        sender: 'user',
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages([...messages, newMessage]);
      setMessage('');
    }
  };

  const renderMessage = ({ item }) => {
    const isUser = item.sender === 'user';
    return (
      <View style={[
        styles.messageBubble,
        isUser ? styles.userBubble : styles.otherBubble
      ]}>
        <Text style={[
          styles.messageText,
          isUser ? styles.userText : styles.otherText
        ]}>{item.text}</Text>
        <Text style={styles.timeText}>{item.time}</Text>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={messages}
        renderItem={renderMessage}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.messageList}
      />
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          value={message}
          onChangeText={setMessage}
          placeholder="Type a message..."
          multiline
        />
        <TouchableOpacity style={styles.sendButton} onPress={sendMessage}>
          <Text style={styles.sendButtonText}>Send</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  messageList: {
    padding: SIZES.padding,
  },
  messageBubble: {
    borderRadius: 20,
    padding: 15,
    marginBottom: 10,
    maxWidth: '80%',
    alignSelf: 'flex-start',
  },
  userBubble: {
    backgroundColor: COLORS.primary,
    alignSelf: 'flex-end',
  },
  otherBubble: {
    backgroundColor: COLORS.white,
  },
  messageText: {
    fontSize: 16,
  },
  userText: {
    color: COLORS.white,
  },
  otherText: {
    color: COLORS.black,
  },
  timeText: {
    fontSize: 10,
    marginTop: 5,
    color: '#CCCCCC',
    alignSelf: 'flex-end',
  },
  inputContainer: {
    flexDirection: 'row',
    padding: 10,
    backgroundColor: COLORS.white,
  },
  input: {
    flex: 1,
    backgroundColor: '#F0F0F0',
    borderRadius: 20,
    paddingHorizontal: 15,
    paddingVertical: 10,
    marginRight: 10,
  },
  sendButton: {
    backgroundColor: COLORS.primary,
    borderRadius: 20,
    paddingHorizontal: 20,
    justifyContent: 'center',
  },
  sendButtonText: {
    color: COLORS.white,
    fontWeight: 'bold',
  },
});

export default ChatScreen;