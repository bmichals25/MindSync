import React from 'react';
import { 
  TouchableOpacity, 
  Text, 
  StyleSheet, 
  ViewStyle, 
  TextStyle,
  ActivityIndicator 
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

import colors from '../../constants/colors';
import layout from '../../constants/layout';

interface ButtonProps {
  title: string;
  onPress: () => void;
  variant?: 'primary' | 'secondary' | 'outline';
  size?: 'small' | 'medium' | 'large';
  disabled?: boolean;
  loading?: boolean;
  style?: ViewStyle;
  textStyle?: TextStyle;
  icon?: React.ReactNode;
}

const Button: React.FC<ButtonProps> = ({
  title,
  onPress,
  variant = 'primary',
  size = 'medium',
  disabled = false,
  loading = false,
  style,
  textStyle,
  icon
}) => {
  const getButtonHeight = (): number => {
    switch (size) {
      case 'small':
        return layout.buttonHeightSmall;
      case 'large':
        return layout.buttonHeightLarge;
      case 'medium':
      default:
        return layout.buttonHeight;
    }
  };

  const getButtonRadius = (): number => {
    switch (size) {
      case 'small':
        return layout.radiusMedium;
      case 'large':
        return layout.radiusCircular;
      case 'medium':
      default:
        return layout.radiusLarge;
    }
  };

  const renderButtonContent = () => {
    if (loading) {
      return <ActivityIndicator color={variant === 'outline' ? colors.primary : colors.textLight} />;
    }

    return (
      <>
        {icon && icon}
        <Text 
          style={[
            styles.text, 
            styles[`${variant}Text`],
            styles[`${size}Text`],
            disabled && styles.disabledText,
            textStyle
          ]}
        >
          {title}
        </Text>
      </>
    );
  };

  if (variant === 'primary') {
    return (
      <TouchableOpacity
        style={[
          styles.button,
          { height: getButtonHeight(), borderRadius: getButtonRadius() },
          disabled && styles.disabledButton,
          style
        ]}
        onPress={onPress}
        disabled={disabled || loading}
        activeOpacity={0.8}
      >
        <LinearGradient
          colors={[colors.buttonGradientStart, colors.buttonGradientEnd]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={[
            styles.gradient,
            { borderRadius: getButtonRadius() }
          ]}
        >
          {renderButtonContent()}
        </LinearGradient>
      </TouchableOpacity>
    );
  }

  return (
    <TouchableOpacity
      style={[
        styles.button,
        styles[`${variant}Button`],
        { height: getButtonHeight(), borderRadius: getButtonRadius() },
        disabled && styles.disabledButton,
        style
      ]}
      onPress={onPress}
      disabled={disabled || loading}
      activeOpacity={0.8}
    >
      {renderButtonContent()}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: layout.spacingLarge,
    width: '100%',
  },
  gradient: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: '100%',
  },
  secondaryButton: {
    backgroundColor: colors.cardBackground,
    borderWidth: 1,
    borderColor: colors.divider,
  },
  outlineButton: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: colors.primary,
  },
  disabledButton: {
    opacity: 0.5,
  },
  text: {
    fontWeight: '600',
    textAlign: 'center',
  },
  primaryText: {
    color: colors.textLight,
  },
  secondaryText: {
    color: colors.textPrimary,
  },
  outlineText: {
    color: colors.primary,
  },
  smallText: {
    fontSize: 14,
  },
  mediumText: {
    fontSize: layout.fontSizeMedium,
  },
  largeText: {
    fontSize: layout.fontSizeXLarge,
  },
  disabledText: {
    opacity: 0.7,
  },
});

export default Button; 