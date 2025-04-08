import React, { useState, useRef, useEffect } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TextInput, 
  TouchableOpacity, 
  SafeAreaView,
  KeyboardAvoidingView,
  Platform,
  FlatList
} from 'react-native';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { Ionicons } from '@expo/vector-icons';
import { v4 as uuidv4 } from 'uuid';

import { RootStackParamList, Message, MessageRole } from '../../types';
import MessageBubble from '../../components/chat/MessageBubble';
import colors from '../../constants/colors';
import layout from '../../constants/layout';

// Mock service to simulate AI responses
const getMockAIResponse = async (message: string): Promise<string> => {
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 1500));
  
  if (message.toLowerCase().includes('hello') || message.toLowerCase().includes('hi')) {
    return "Hello! I'm your AI therapist. How are you feeling today?";
  } else if (message.toLowerCase().includes('stress') || message.toLowerCase().includes('anxious')) {
    return "I understand that you're feeling stressed. Let's explore what might be contributing to these feelings and some coping strategies that might help.";
  } else if (message.toLowerCase().includes('sad') || message.toLowerCase().includes('depressed')) {
    return "I'm sorry to hear you're feeling down. Would you like to talk more about what's been happening that might be contributing to these feelings?";
  } else {
    return "Thank you for sharing that with me. Could you tell me more about how this has been affecting you?";
  }
};

type ChatScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Chat'>;
type ChatScreenRouteProp = RouteProp<RootStackParamList, 'Chat'>;

const ChatScreen: React.FC = () => {
  const navigation = useNavigation<ChatScreenNavigationProp>();
  const route = useRoute<ChatScreenRouteProp>();
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const flatListRef = useRef<FlatList>(null);

  // Initialize with a greeting message
  useEffect(() => {
    if (messages.length === 0) {
      const initialMessage: Message = {
        id: uuidv4(),
        role: MessageRole.AI,
        content: "Hi there! I'm your AI therapist. How are you feeling today?",
        timestamp: new Date()
      };
      setMessages([initialMessage]);
    }
  }, []);

  const handleSend = async () => {
    if (!inputText.trim()) return;

    // Add user message
    const userMessage: Message = {
      id: uuidv4(),
      role: MessageRole.USER,
      content: inputText,
      timestamp: new Date()
    };
    
    setMessages(prev => [...prev, userMessage]);
    setInputText('');
    setIsTyping(true);

    // Scroll to bottom
    setTimeout(() => {
      flatListRef.current?.scrollToEnd({ animated: true });
    }, 100);

    try {
      // Get AI response
      const response = await getMockAIResponse(inputText);
      
      // Add AI message
      const aiMessage: Message = {
        id: uuidv4(),
        role: MessageRole.AI,
        content: response,
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, aiMessage]);
    } catch (error) {
      console.error('Error getting AI response:', error);
    } finally {
      setIsTyping(false);
      
      // Scroll to bottom again after AI response
      setTimeout(() => {
        flatListRef.current?.scrollToEnd({ animated: true });
      }, 100);
    }
  };

  const handleBack = () => {
    navigation.goBack();
  };

  // Simulate a typing indicator
  const renderTypingIndicator = () => {
    if (!isTyping) return null;

    return (
      <View style={styles.typingIndicator}>
        <View style={styles.typingDot} />
        <View style={[styles.typingDot, { marginHorizontal: 4 }]} />
        <View style={styles.typingDot} />
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 100 : 0}
      >
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity style={styles.backButton} onPress={handleBack}>
            <Ionicons name="chevron-back" size={24} color={colors.textPrimary} />
          </TouchableOpacity>
          
          <View style={styles.headerTitle}>
            <View style={styles.avatarCircle}>
              <Text style={styles.avatarText}>AI</Text>
            </View>
            <Text style={styles.headerText}>MindSync</Text>
          </View>
          
          <View style={styles.modeToggle}>
            <TouchableOpacity style={styles.modeButton}>
              <Text style={styles.modeButtonText}>Voice</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Messages */}
        <FlatList
          ref={flatListRef}
          data={messages}
          keyExtractor={item => item.id}
          renderItem={({ item }) => <MessageBubble message={item} />}
          contentContainerStyle={styles.messagesContainer}
          showsVerticalScrollIndicator={false}
          ListFooterComponent={renderTypingIndicator}
        />

        {/* Input Area */}
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Type a message..."
            value={inputText}
            onChangeText={setInputText}
            multiline
            maxLength={500}
            placeholderTextColor={colors.textSecondary}
          />
          <TouchableOpacity 
            style={styles.sendButton}
            onPress={handleSend}
            disabled={!inputText.trim() || isTyping}
          >
            <Ionicons 
              name="send" 
              size={20} 
              color={!inputText.trim() || isTyping ? colors.textSecondary : colors.textLight} 
            />
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.background,
  },
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    height: 60,
    borderBottomWidth: 1,
    borderBottomColor: colors.divider,
    backgroundColor: colors.cardBackground,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerTitle: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatarCircle: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 8,
  },
  avatarText: {
    color: colors.textLight,
    fontWeight: '600',
    fontSize: 14,
  },
  headerText: {
    fontSize: 17,
    fontWeight: '600',
    color: colors.textPrimary,
  },
  modeToggle: {
    width: 100,
    height: 30,
    borderRadius: 15,
    backgroundColor: colors.backgroundEnd,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modeButton: {
    paddingHorizontal: 12,
    paddingVertical: 4,
  },
  modeButtonText: {
    fontSize: 14,
    fontWeight: '500',
    color: colors.primary,
  },
  messagesContainer: {
    flexGrow: 1,
    paddingVertical: 16,
    paddingHorizontal: 8,
  },
  typingIndicator: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.cardBackground,
    alignSelf: 'flex-start',
    borderRadius: 22,
    paddingHorizontal: 16,
    paddingVertical: 12,
    marginLeft: 24,
    marginVertical: 8,
    ...layout.shadow,
  },
  typingDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: colors.textSecondary,
    opacity: 0.7,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingVertical: 16,
    borderTopWidth: 1,
    borderTopColor: colors.divider,
    backgroundColor: colors.cardBackground,
  },
  input: {
    flex: 1,
    height: 44,
    backgroundColor: colors.inputBackground,
    borderRadius: 22,
    paddingHorizontal: 16,
    paddingVertical: 10,
    fontSize: 16,
    color: colors.textPrimary,
    marginRight: 12,
  },
  sendButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: inputText => (!inputText.trim() ? colors.divider : colors.primary),
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default ChatScreen; 