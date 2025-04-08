import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

import { ActionItem as ActionItemType } from '../../types';
import colors from '../../constants/colors';
import layout from '../../constants/layout';

interface ActionItemProps {
  item: ActionItemType;
  onToggleComplete: (id: string, isCompleted: boolean) => void;
  onDelete?: (id: string) => void;
}

const ActionItem: React.FC<ActionItemProps> = ({ 
  item, 
  onToggleComplete,
  onDelete
}) => {
  const handleToggle = () => {
    onToggleComplete(item.id, !item.isCompleted);
  };

  const handleDelete = () => {
    if (onDelete) {
      onDelete(item.id);
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity 
        style={styles.checkbox} 
        onPress={handleToggle}
      >
        {item.isCompleted ? (
          <MaterialIcons name="check-circle" size={24} color={colors.primary} />
        ) : (
          <MaterialIcons name="radio-button-unchecked" size={24} color={colors.textSecondary} />
        )}
      </TouchableOpacity>
      
      <Text style={[
        styles.text,
        item.isCompleted && styles.completedText
      ]}>
        {item.text}
      </Text>
      
      {onDelete && (
        <TouchableOpacity 
          style={styles.deleteButton} 
          onPress={handleDelete}
        >
          <MaterialIcons name="delete-outline" size={22} color={colors.textSecondary} />
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: layout.spacingMedium,
    backgroundColor: '#F9FAFB',
    borderRadius: layout.radiusSmall,
    marginBottom: layout.spacingSmall,
  },
  checkbox: {
    marginRight: 12,
  },
  text: {
    flex: 1,
    fontSize: 15,
    color: colors.textPrimary,
    lineHeight: 20,
  },
  completedText: {
    textDecorationLine: 'line-through',
    color: colors.textSecondary,
  },
  deleteButton: {
    padding: 4,
  },
});

export default ActionItem; 