import React from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  ScrollView, 
  TouchableOpacity, 
  SafeAreaView,
  Image 
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';

import { RootStackParamList, Session } from '../../types';
import Card from '../../components/common/Card';
import Button from '../../components/common/Button';
import colors from '../../constants/colors';
import layout from '../../constants/layout';

// Temporary mock data
const mockSessions: Session[] = [
  {
    id: '1',
    title: 'Managing Work Stress',
    date: new Date(Date.now() - 24 * 60 * 60 * 1000),
    duration: 15,
    messages: [],
    actionItems: [],
    mode: 'chat'
  },
  {
    id: '2',
    title: 'Dealing with Anxiety',
    date: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
    duration: 25,
    messages: [],
    actionItems: [],
    mode: 'voice'
  }
];

// Type for the navigation prop
type HomeScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Home'>;

const HomeScreen: React.FC = () => {
  const navigation = useNavigation<HomeScreenNavigationProp>();

  const navigateToTherapy = () => {
    navigation.navigate('Voice');
  };

  const navigateToSessionRecap = (sessionId: string) => {
    navigation.navigate('SessionRecap', { sessionId });
  };

  // Placeholder for username
  const username = 'Alex';

  return (
    <LinearGradient
      colors={[colors.background, colors.backgroundEnd]}
      style={styles.gradient}
    >
      <SafeAreaView style={styles.safeArea}>
        <ScrollView 
          style={styles.scrollView}
          contentContainerStyle={styles.container}
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.greetingSection}>
            <Text style={styles.greeting}>
              How are you feeling, {username}?
            </Text>
          </View>

          <Card 
            style={styles.moodCheckInCard}
            onPress={() => {}}
          >
            <View style={styles.moodCheckInContent}>
              {/* Sun icon placeholder, we'll replace with a proper SVG later */}
              <View style={styles.sunIconPlaceholder}>
                <Ionicons name="sunny" size={48} color={colors.warning} />
              </View>
              <Text style={styles.moodCheckInText}>Mood Check-In</Text>
            </View>
          </Card>

          <Button
            title="Talk to Therapist"
            onPress={navigateToTherapy}
            size="large"
            style={styles.talkButton}
          />

          <View style={styles.recentSessionsSection}>
            <Text style={styles.sectionTitle}>Recent Sessions</Text>
            
            {mockSessions.map(session => (
              <Card 
                key={session.id}
                style={styles.sessionCard}
                onPress={() => navigateToSessionRecap(session.id)}
                padding={layout.spacingMedium}
              >
                <View style={styles.sessionCardContent}>
                  <View style={styles.sessionCardInfo}>
                    <Text style={styles.sessionCardTitle}>{session.title}</Text>
                    <Text style={styles.sessionCardDate}>
                      {session.date.toLocaleDateString()} • {session.duration} min
                    </Text>
                  </View>
                  <View style={styles.sessionCardIcon}>
                    {session.mode === 'voice' ? (
                      <Ionicons name="mic" size={20} color={colors.primary} />
                    ) : (
                      <Ionicons name="chatbubble" size={20} color={colors.primary} />
                    )}
                  </View>
                </View>
              </Card>
            ))}
          </View>
        </ScrollView>
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
  },
  scrollView: {
    flex: 1,
  },
  container: {
    paddingHorizontal: layout.screenMargin,
    paddingBottom: 100, // Extra padding at the bottom to account for tab bar
  },
  greetingSection: {
    marginTop: 60,
    marginBottom: 40,
  },
  greeting: {
    fontSize: layout.fontSizeHeader,
    fontWeight: '800',
    color: colors.textPrimary,
    letterSpacing: -0.5,
    lineHeight: layout.fontSizeHeader * 1.2,
  },
  moodCheckInCard: {
    height: layout.moodCheckInCardHeight,
    marginBottom: 20,
  },
  moodCheckInContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  sunIconPlaceholder: {
    marginBottom: 10,
  },
  moodCheckInText: {
    fontSize: layout.fontSizeTitle,
    fontWeight: '600',
    color: colors.textPrimary,
  },
  talkButton: {
    marginBottom: 30,
  },
  recentSessionsSection: {
    marginBottom: 30,
  },
  sectionTitle: {
    fontSize: layout.fontSizeXXLarge,
    fontWeight: '700',
    color: colors.textPrimary,
    marginBottom: 20,
  },
  sessionCard: {
    height: layout.sessionCardHeight,
    marginBottom: 20,
  },
  sessionCardContent: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  sessionCardInfo: {
    flex: 1,
  },
  sessionCardTitle: {
    fontSize: layout.fontSizeLarge,
    fontWeight: '600',
    color: colors.textPrimary,
    marginBottom: 4,
  },
  sessionCardDate: {
    fontSize: layout.fontSizeMedium,
    color: colors.textSecondary,
  },
  sessionCardIcon: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: 'rgba(155, 129, 248, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default HomeScreen; 