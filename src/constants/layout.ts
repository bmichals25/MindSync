import { Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

export const layout = {
  window: {
    width,
    height,
  },
  
  // Screen margins
  screenMargin: 32,
  
  // Card dimensions
  cardWidth: width - 64, // Full width minus margins (32pt on each side)
  
  // Corner radii
  radiusSmall: 8,
  radiusMedium: 15,
  radiusLarge: 20,
  radiusXLarge: 24,
  radiusRound: 30,
  radiusCircular: 35,
  
  // Spacings
  spacingXSmall: 5,
  spacingSmall: 10,
  spacingMedium: 18,
  spacingLarge: 20,
  spacingXLarge: 30,
  
  // Typography sizes
  fontSizeSmall: 12,
  fontSizeMedium: 16,
  fontSizeLarge: 18,
  fontSizeXLarge: 20,
  fontSizeXXLarge: 22,
  fontSizeTitle: 24,
  fontSizeHeader: 38,
  
  // Element heights
  inputHeight: 44,
  buttonHeight: 50,
  buttonHeightSmall: 44,
  buttonHeightLarge: 70,
  bottomNavHeight: 94,
  
  // Header
  headerHeight: 60,
  
  // Screen specific
  moodCheckInCardHeight: 130,
  sessionCardHeight: 90,
  messageBubbleMaxWidth: 260,
  
  // Shadows
  shadow: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
};

export default layout; 