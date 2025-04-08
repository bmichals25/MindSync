import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  ScrollView, 
  TouchableOpacity, 
  SafeAreaView,
  Share 
} from 'react-native';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { format } from 'date-fns';

import { RootStackParamList, ActionItem as ActionItemType, MoodType } from '../../types';
import Card from '../../components/common/Card';
import Button from '../../components/common/Button';
import ActionItem from '../../components/session/ActionItem';
import colors from '../../constants/colors';
import layout from '../../constants/layout';

// Mock data for session recap
const mockSessionData = {
  id: '1',
  title: 'Managing Work Stress',
  date: new Date(),
  duration: 25,
  mode: 'voice' as const,
  moodBefore: {
    value: MoodType.STRESSED,
    intensity: 8,
    timestamp: new Date(Date.now() - 30 * 60 * 1000),
  },
  moodAfter: {
    value: MoodType.CALM,
    intensity: 4,
    timestamp: new Date(),
  },
  summary: "In today's session, we explored your work-related stress triggers and identified several strategies to help manage them. You mentioned feeling overwhelmed by multiple deadlines and difficulty prioritizing tasks. We discussed implementing a structured planning system and setting boundaries around work hours.",
  actionItems: [
    {
      id: '1',
      text: 'Create a priority matrix for work tasks',
      isCompleted: false,
      sessionId: '1',
      createdAt: new Date(),
    },
    {
      id: '2',
      text: 'Schedule 10-minute mindfulness breaks twice daily',
      isCompleted: true,
      sessionId: '1',
      createdAt: new Date(),
    },
    {
      id: '3',
      text: 'Establish a clear end-of-work ritual to transition to personal time',
      isCompleted: false,
      sessionId: '1',
      createdAt: new Date(),
    },
  ],
};

type SessionRecapScreenNavigationProp = StackNavigationProp<RootStackParamList, 'SessionRecap'>;
type SessionRecapScreenRouteProp = RouteProp<RootStackParamList, 'SessionRecap'>;

const SessionRecapScreen: React.FC = () => {
  const navigation = useNavigation<SessionRecapScreenNavigationProp>();
  const route = useRoute<SessionRecapScreenRouteProp>();
  const { sessionId } = route.params;
  
  // In a real app, we'd fetch the session data based on sessionId
  const session = mockSessionData;
  
  const [actionItems, setActionItems] = useState<ActionItemType[]>(session.actionItems);

  const handleToggleActionItem = (id: string, isCompleted: boolean) => {
    setActionItems(prev => 
      prev.map(item => 
        item.id === id ? { ...item, isCompleted } : item
      )
    );
  };

  const handleBack = () => {
    navigation.goBack();
  };

  const handleShare = async () => {
    try {
      const formattedDate = format(session.date, 'MMMM d, yyyy');
      const actionItemsText = session.actionItems
        .map(item => `- ${item.text}${item.isCompleted ? ' ✓' : ''}`)
        .join('\n');
      
      const message = `Session Summary: ${session.title}\n\nDate: ${formattedDate}\nDuration: ${session.duration} minutes\n\nKey Points:\n${session.summary}\n\nAction Items:\n${actionItemsText}`;
      
      await Share.share({
        message,
        title: `MindSync - ${session.title}`,
      });
    } catch (error) {
      console.error('Error sharing session:', error);
    }
  };

  const getMoodColor = (moodType: MoodType): string => {
    switch(moodType) {
      case MoodType.HAPPY:
        return colors.moodHappy;
      case MoodType.SAD:
        return colors.moodSad;
      case MoodType.NEUTRAL:
        return colors.moodNeutral;
      case MoodType.ANXIOUS:
        return colors.warning;
      case MoodType.ANGRY:
        return colors.error;
      case MoodType.CALM:
        return colors.info;
      default:
        return colors.primary;
    }
  };

  const getMoodLabel = (moodType: MoodType): string => {
    switch(moodType) {
      case MoodType.HAPPY:
        return 'Happy';
      case MoodType.SAD:
        return 'Sad';
      case MoodType.NEUTRAL:
        return 'Neutral';
      case MoodType.ANXIOUS:
        return 'Anxious';
      case MoodType.ANGRY:
        return 'Angry';
      case MoodType.CALM:
        return 'Calm';
      default:
        return 'Unknown';
    }
  };

  const renderMoodPill = (moodType: MoodType, intensity: number, label: string) => {
    const color = getMoodColor(moodType);
    return (
      <View style={styles.moodPillContainer}>
        <Text style={styles.moodPillLabel}>{label}</Text>
        <View style={[styles.moodPill, { backgroundColor: color }]}>
          <Text style={styles.moodText}>{getMoodLabel(moodType)}</Text>
          <Text style={styles.intensityText}>{intensity}/10</Text>
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.headerButton} onPress={handleBack}>
          <Ionicons name="chevron-back" size={24} color={colors.textPrimary} />
        </TouchableOpacity>
        
        <Text style={styles.headerTitle}>Session Summary</Text>
        
        <TouchableOpacity style={styles.headerButton} onPress={handleShare}>
          <Ionicons name="share-outline" size={24} color={colors.textPrimary} />
        </TouchableOpacity>
      </View>

      <ScrollView 
        style={styles.scrollView}
        contentContainerStyle={styles.container}
        showsVerticalScrollIndicator={false}
      >
        {/* Session Info Card */}
        <Card style={styles.infoCard}>
          <Text style={styles.dateText}>
            {format(session.date, 'MMMM d, yyyy')}
          </Text>
          <Text style={styles.titleText}>{session.title}</Text>
          <View style={styles.sessionDetails}>
            <View style={styles.durationContainer}>
              <Ionicons name="time-outline" size={18} color={colors.textSecondary} />
              <Text style={styles.durationText}>{session.duration} minutes</Text>
            </View>
            <View style={styles.modeContainer}>
              {session.mode === 'voice' ? (
                <Ionicons name="mic-outline" size={18} color={colors.primary} />
              ) : (
                <Ionicons name="chatbubble-outline" size={18} color={colors.primary} />
              )}
              <Text style={styles.modeText}>
                {session.mode === 'voice' ? 'Voice' : 'Chat'} Mode
              </Text>
            </View>
          </View>
        </Card>

        {/* Mood Tracking Card */}
        <Card style={styles.moodCard}>
          <Text style={styles.cardTitle}>Mood Tracking</Text>
          <View style={styles.moodTrackingContainer}>
            {renderMoodPill(session.moodBefore.value, session.moodBefore.intensity, 'Before')}
            <View style={styles.improvementIndicator}>
              <MaterialCommunityIcons 
                name="arrow-right" 
                size={22} 
                color={colors.primary} 
              />
            </View>
            {renderMoodPill(session.moodAfter.value, session.moodAfter.intensity, 'After')}
          </View>
        </Card>

        {/* Session Summary Card */}
        <Card style={styles.summaryCard}>
          <Text style={styles.cardTitle}>Session Summary</Text>
          <Text style={styles.summaryText}>{session.summary}</Text>
        </Card>

        {/* Action Items Card */}
        <Card style={styles.actionItemsCard}>
          <Text style={styles.cardTitle}>Action Items</Text>
          <View style={styles.actionItemsList}>
            {actionItems.map(item => (
              <ActionItem 
                key={item.id} 
                item={item} 
                onToggleComplete={handleToggleActionItem} 
              />
            ))}
          </View>
        </Card>

        {/* Action Buttons */}
        <View style={styles.buttonContainer}>
          <Button 
            title="Schedule Follow-up" 
            onPress={() => {}}
            variant="primary"
            style={styles.primaryButton}
          />
          <Button 
            title="Back to Home" 
            onPress={() => navigation.navigate('Home')}
            variant="secondary"
            style={styles.secondaryButton}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.background,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    height: 60,
    backgroundColor: colors.cardBackground,
    borderBottomWidth: 1,
    borderBottomColor: colors.divider,
  },
  headerButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: colors.textPrimary,
  },
  scrollView: {
    flex: 1,
  },
  container: {
    padding: 24,
    paddingBottom: 40,
  },
  infoCard: {
    marginBottom: 16,
  },
  dateText: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.primary,
    marginBottom: 8,
  },
  titleText: {
    fontSize: 20,
    fontWeight: '600',
    color: colors.textPrimary,
    marginBottom: 12,
  },
  sessionDetails: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  durationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 16,
  },
  durationText: {
    fontSize: 16,
    color: colors.textSecondary,
    marginLeft: 4,
  },
  modeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  modeText: {
    fontSize: 16,
    color: colors.primary,
    marginLeft: 4,
    fontWeight: '500',
  },
  moodCard: {
    marginBottom: 16,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.textPrimary,
    marginBottom: 16,
  },
  moodTrackingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  moodPillContainer: {
    flex: 1,
    alignItems: 'center',
  },
  moodPillLabel: {
    fontSize: 14,
    color: colors.textSecondary,
    marginBottom: 8,
  },
  moodPill: {
    width: 110,
    paddingVertical: 10,
    borderRadius: 20,
    alignItems: 'center',
  },
  moodText: {
    color: colors.textLight,
    fontWeight: '600',
    fontSize: 16,
  },
  intensityText: {
    color: colors.textLight,
    opacity: 0.8,
    fontSize: 14,
  },
  improvementIndicator: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: 'rgba(155, 129, 248, 0.1)',
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 10,
  },
  summaryCard: {
    marginBottom: 16,
  },
  summaryText: {
    fontSize: 16,
    lineHeight: 24,
    color: colors.textSecondary,
  },
  actionItemsCard: {
    marginBottom: 24,
  },
  actionItemsList: {
    marginTop: 4,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  primaryButton: {
    width: '48%',
  },
  secondaryButton: {
    width: '48%',
  },
});

export default SessionRecapScreen; 