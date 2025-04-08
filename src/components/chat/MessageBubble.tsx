import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { format } from 'date-fns';

import { Message, MessageRole } from '../../types';
import colors from '../../constants/colors';
import layout from '../../constants/layout';

interface MessageBubbleProps {
  message: Message;
}

const MessageBubble: React.FC<MessageBubbleProps> = ({ message }) => {
  const isUserMessage = message.role === MessageRole.USER;
  
  return (
    <View style={[
      styles.container,
      isUserMessage ? styles.userContainer : styles.aiContainer
    ]}>
      <View style={[
        styles.bubble,
        isUserMessage ? styles.userBubble : styles.aiBubble
      ]}>
        <Text style={[
          styles.text,
          isUserMessage ? styles.userText : styles.aiText
        ]}>
          {message.content}
        </Text>
      </View>
      <Text style={[
        styles.timestamp,
        isUserMessage ? styles.userTimestamp : styles.aiTimestamp
      ]}>
        {format(message.timestamp, 'h:mm a')}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    maxWidth: layout.messageBubbleMaxWidth,
    marginVertical: layout.spacingSmall,
  },
  userContainer: {
    alignSelf: 'flex-end',
    marginRight: layout.spacingLarge,
  },
  aiContainer: {
    alignSelf: 'flex-start',
    marginLeft: layout.spacingLarge,
  },
  bubble: {
    borderRadius: layout.radiusXLarge,
    padding: layout.spacingLarge,
  },
  userBubble: {
    backgroundColor: colors.primary,
  },
  aiBubble: {
    backgroundColor: colors.cardBackground,
    ...layout.shadow,
  },
  text: {
    fontSize: layout.fontSizeMedium,
    lineHeight: 24,
  },
  userText: {
    color: colors.textLight,
  },
  aiText: {
    color: colors.textPrimary,
  },
  timestamp: {
    fontSize: layout.fontSizeSmall,
    marginTop: 4,
    marginHorizontal: 8,
  },
  userTimestamp: {
    color: colors.textLight,
    opacity: 0.8,
    alignSelf: 'flex-end',
  },
  aiTimestamp: {
    color: colors.textSecondary,
    alignSelf: 'flex-start',
  },
});

export default MessageBubble; 