import React from 'react';
import { 
  View, 
  StyleSheet, 
  ViewStyle, 
  TouchableOpacity, 
  StyleProp 
} from 'react-native';

import colors from '../../constants/colors';
import layout from '../../constants/layout';

interface CardProps {
  children: React.ReactNode;
  style?: StyleProp<ViewStyle>;
  onPress?: () => void;
  variant?: 'default' | 'elevated' | 'outline';
  radius?: number;
  padding?: number;
}

const Card: React.FC<CardProps> = ({
  children,
  style,
  onPress,
  variant = 'default',
  radius = layout.radiusXLarge,
  padding = layout.spacingLarge,
}) => {
  const Container = onPress ? TouchableOpacity : View;

  return (
    <Container
      style={[
        styles.card,
        styles[`${variant}Card`],
        {
          borderRadius: radius,
          padding: padding,
        },
        style,
      ]}
      activeOpacity={onPress ? 0.8 : 1}
      onPress={onPress}
    >
      {children}
    </Container>
  );
};

const styles = StyleSheet.create({
  card: {
    width: '100%',
    backgroundColor: colors.cardBackground,
  },
  defaultCard: {
    ...layout.shadow,
  },
  elevatedCard: {
    ...layout.shadow,
    shadowOpacity: 0.2,
    shadowRadius: 10,
    elevation: 8,
  },
  outlineCard: {
    borderWidth: 1,
    borderColor: colors.divider,
  },
});

export default Card; 