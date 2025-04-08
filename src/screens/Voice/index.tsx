import React, { useState, useEffect } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TouchableOpacity, 
  SafeAreaView,
  Animated, 
  Easing
} from 'react-native';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

import { RootStackParamList } from '../../types';
import colors from '../../constants/colors';
import layout from '../../constants/layout';

// Mock timer function - in a real app, this would track session duration
const formatTime = (seconds: number): string => {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins < 10 ? '0' : ''}${mins}:${secs < 10 ? '0' : ''}${secs}`;
};

type VoiceScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Voice'>;
type VoiceScreenRouteProp = RouteProp<RootStackParamList, 'Voice'>;

const VoiceScreen: React.FC = () => {
  const navigation = useNavigation<VoiceScreenNavigationProp>();
  const route = useRoute<VoiceScreenRouteProp>();
  
  const [isListening, setIsListening] = useState(true);
  const [sessionTime, setSessionTime] = useState(0);
  
  // Animation values
  const pulseAnimation = new Animated.Value(1);
  const waveAnimation = new Animated.Value(0);
  
  // Start the timer when the component mounts
  useEffect(() => {
    let interval: NodeJS.Timeout;
    
    if (isListening) {
      interval = setInterval(() => {
        setSessionTime(prev => prev + 1);
      }, 1000);
    }
    
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isListening]);
  
  // Pulse animation
  useEffect(() => {
    const pulse = Animated.loop(
      Animated.sequence([
        Animated.timing(pulseAnimation, {
          toValue: 1.2,
          duration: 800,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
        Animated.timing(pulseAnimation, {
          toValue: 1,
          duration: 800,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
      ])
    );
    
    // Wave animation
    const wave = Animated.loop(
      Animated.timing(waveAnimation, {
        toValue: 1,
        duration: 1500,
        easing: Easing.linear,
        useNativeDriver: true,
      })
    );
    
    if (isListening) {
      pulse.start();
      wave.start();
    } else {
      pulse.stop();
      wave.stop();
    }
    
    return () => {
      pulse.stop();
      wave.stop();
    };
  }, [isListening]);
  
  const handleBack = () => {
    navigation.goBack();
  };
  
  const toggleListening = () => {
    setIsListening(!isListening);
  };
  
  const jumpBack15 = () => {
    // In a real app, this would control audio playback
    console.log('Jump back 15 seconds');
  };
  
  const jumpForward15 = () => {
    // In a real app, this would control audio playback
    console.log('Jump forward 15 seconds');
  };
  
  const endSession = () => {
    // In a real app, this would save the session and navigate to the recap
    navigation.navigate('SessionRecap', { sessionId: 'new-session-id' });
  };
  
  return (
    <LinearGradient
      colors={['#1A1A2E', '#16213E', '#0F3460']}
      style={styles.gradient}
    >
      <SafeAreaView style={styles.safeArea}>
        {/* Status Area */}
        <View style={styles.statusArea}>
          <TouchableOpacity style={styles.backButton} onPress={handleBack}>
            <Ionicons name="chevron-back" size={24} color={colors.textLight} />
          </TouchableOpacity>
          
          <View style={styles.statusPill}>
            <Text style={styles.statusText}>
              {isListening ? 'LISTENING' : 'PAUSED'}
            </Text>
          </View>
          
          <Text style={styles.timerText}>{formatTime(sessionTime)}</Text>
        </View>

        {/* Visualization Area */}
        <View style={styles.visualizationContainer}>
          <Animated.View 
            style={[
              styles.outerCircle,
              {
                transform: [{ scale: pulseAnimation }],
                opacity: waveAnimation.interpolate({
                  inputRange: [0, 0.5, 1],
                  outputRange: [0.2, 0.4, 0.2],
                }),
              },
            ]}
          />
          
          <Animated.View 
            style={[
              styles.middleCircle,
              {
                transform: [{ scale: pulseAnimation }],
                opacity: waveAnimation.interpolate({
                  inputRange: [0, 0.5, 1],
                  outputRange: [0.3, 0.6, 0.3],
                }),
              },
            ]}
          />
          
          <Animated.View 
            style={[
              styles.innerCircle,
              {
                transform: [{ scale: pulseAnimation }],
                opacity: waveAnimation.interpolate({
                  inputRange: [0, 0.5, 1],
                  outputRange: [0.4, 0.8, 0.4],
                }),
              },
            ]}
          />
          
          <View style={styles.centerCircle}>
            <Ionicons 
              name={isListening ? 'mic' : 'mic-off'} 
              size={32} 
              color={colors.textLight} 
            />
          </View>
        </View>

        {/* Control Buttons */}
        <View style={styles.controlsContainer}>
          <View style={styles.controlButtons}>
            <TouchableOpacity style={styles.smallButton} onPress={jumpBack15}>
              <MaterialIcons name="replay-15" size={28} color={colors.textLight} />
              <Text style={styles.buttonLabel}>-15 Sec</Text>
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.largeButton} onPress={toggleListening}>
              <Ionicons 
                name={isListening ? 'pause' : 'play'} 
                size={36} 
                color={colors.textLight} 
              />
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.smallButton} onPress={jumpForward15}>
              <MaterialIcons name="forward-15" size={28} color={colors.textLight} />
              <Text style={styles.buttonLabel}>+15 Sec</Text>
            </TouchableOpacity>
          </View>
          
          <TouchableOpacity style={styles.endButton} onPress={endSession}>
            <Text style={styles.endButtonText}>End Session</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  gradient: {
    flex: 1,
  },
  safeArea: {
    flex: 1,
    justifyContent: 'space-between',
  },
  statusArea: {
    paddingTop: 20,
    paddingHorizontal: 24,
    alignItems: 'center',
    height: 120,
  },
  backButton: {
    position: 'absolute',
    left: 24,
    top: 20,
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  statusPill: {
    paddingHorizontal: 20,
    paddingVertical: 8,
    borderRadius: 18,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    marginBottom: 8,
  },
  statusText: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.textLight,
    letterSpacing: 1.2,
  },
  timerText: {
    fontSize: 16,
    fontWeight: '500',
    color: 'rgba(255, 255, 255, 0.7)',
  },
  visualizationContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  outerCircle: {
    width: 280,
    height: 280,
    borderRadius: 140,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    position: 'absolute',
  },
  middleCircle: {
    width: 220,
    height: 220,
    borderRadius: 110,
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
    position: 'absolute',
  },
  innerCircle: {
    width: 160,
    height: 160,
    borderRadius: 80,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    position: 'absolute',
  },
  centerCircle: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: colors.primary,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.5,
    shadowRadius: 10,
    elevation: 10,
  },
  controlsContainer: {
    paddingBottom: 60,
    alignItems: 'center',
  },
  controlButtons: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 40,
  },
  smallButton: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  largeButton: {
    width: 92,
    height: 92,
    borderRadius: 46,
    backgroundColor: 'rgba(155, 129, 248, 0.6)',
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 24,
  },
  buttonLabel: {
    marginTop: 4,
    fontSize: 13,
    color: colors.textLight,
    opacity: 0.8,
  },
  endButton: {
    paddingHorizontal: 28,
    paddingVertical: 12,
    borderRadius: 22,
    backgroundColor: 'rgba(244, 67, 54, 0.5)',
  },
  endButtonText: {
    fontSize: 15,
    fontWeight: '600',
    color: colors.textLight,
  },
});

export default VoiceScreen; 