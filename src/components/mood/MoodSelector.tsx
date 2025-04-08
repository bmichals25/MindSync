import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { AntDesign } from '@expo/vector-icons';

import { MoodType } from '../../types';
import colors from '../../constants/colors';
import layout from '../../constants/layout';

interface MoodOption {
  type: MoodType;
  icon: string;
  label: string;
  color: string;
}

const moodOptions: MoodOption[] = [
  { type: MoodType.HAPPY, icon: 'smile-circle', label: 'Happy', color: colors.moodHappy },
  { type: MoodType.CALM, icon: 'android', label: 'Calm', color: colors.info },
  { type: MoodType.NEUTRAL, icon: 'meh', label: 'Neutral', color: colors.moodNeutral },
  { type: MoodType.ANXIOUS, icon: 'ellipsis1', label: 'Anxious', color: colors.warning },
  { type: MoodType.SAD, icon: 'frown', label: 'Sad', color: colors.moodSad },
  { type: MoodType.ANGRY, icon: 'pushpin', label: 'Angry', color: colors.error },
];

interface MoodSelectorProps {
  onSelect: (mood: MoodType, intensity: number) => void;
  initialMood?: MoodType;
  initialIntensity?: number;
}

const MoodSelector: React.FC<MoodSelectorProps> = ({ 
  onSelect, 
  initialMood = MoodType.NEUTRAL,
  initialIntensity = 5
}) => {
  const [selectedMood, setSelectedMood] = useState<MoodType>(initialMood);
  const [intensity, setIntensity] = useState<number>(initialIntensity);

  const handleMoodSelect = (mood: MoodType) => {
    setSelectedMood(mood);
    onSelect(mood, intensity);
  };

  const handleIntensityChange = (value: number) => {
    setIntensity(value);
    onSelect(selectedMood, value);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>How are you feeling?</Text>
      
      <View style={styles.moodContainer}>
        {moodOptions.map((mood) => (
          <TouchableOpacity
            key={mood.type}
            style={[
              styles.moodOption,
              selectedMood === mood.type && styles.selectedMood,
              { borderColor: mood.color }
            ]}
            onPress={() => handleMoodSelect(mood.type)}
          >
            <AntDesign 
              name={mood.icon as any} 
              size={32} 
              color={selectedMood === mood.type ? mood.color : colors.textSecondary} 
            />
            <Text 
              style={[
                styles.moodLabel,
                selectedMood === mood.type && { color: mood.color }
              ]}
            >
              {mood.label}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <Text style={styles.intensityLabel}>Intensity: {intensity}</Text>
      
      <View style={styles.intensityContainer}>
        <Text style={styles.intensityEndLabel}>Low</Text>
        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((value) => (
          <TouchableOpacity
            key={value}
            style={[
              styles.intensityOption,
              intensity === value && styles.selectedIntensity,
              intensity === value && { backgroundColor: getMoodColor(selectedMood) }
            ]}
            onPress={() => handleIntensityChange(value)}
          >
            <Text 
              style={[
                styles.intensityValue,
                intensity === value && styles.selectedIntensityValue
              ]}
            >
              {value}
            </Text>
          </TouchableOpacity>
        ))}
        <Text style={styles.intensityEndLabel}>High</Text>
      </View>
    </View>
  );
};

// Helper function to get the color for a mood type
const getMoodColor = (moodType: MoodType): string => {
  const mood = moodOptions.find(m => m.type === moodType);
  return mood ? mood.color : colors.primary;
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    alignItems: 'center',
  },
  title: {
    fontSize: layout.fontSizeXLarge,
    fontWeight: '600',
    color: colors.textPrimary,
    marginBottom: layout.spacingLarge,
  },
  moodContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    marginBottom: layout.spacingLarge,
  },
  moodOption: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: layout.spacingMedium,
    margin: layout.spacingSmall,
    borderRadius: layout.radiusLarge,
    borderWidth: 1,
    borderColor: colors.divider,
    width: 80,
    height: 80,
  },
  selectedMood: {
    borderWidth: 2,
    backgroundColor: colors.backgroundEnd,
  },
  moodLabel: {
    marginTop: 8,
    fontSize: layout.fontSizeSmall,
    color: colors.textSecondary,
  },
  intensityLabel: {
    fontSize: layout.fontSizeMedium,
    color: colors.textPrimary,
    marginBottom: layout.spacingMedium,
  },
  intensityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
  },
  intensityOption: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: colors.divider,
    alignItems: 'center',
    justifyContent: 'center',
    margin: 4,
  },
  selectedIntensity: {
    width: 28,
    height: 28,
    borderRadius: 14,
  },
  intensityValue: {
    fontSize: 10,
    color: colors.textSecondary,
  },
  selectedIntensityValue: {
    fontSize: 12,
    fontWeight: 'bold',
    color: colors.textLight,
  },
  intensityEndLabel: {
    fontSize: layout.fontSizeSmall,
    color: colors.textSecondary,
    marginHorizontal: 8,
  },
});

export default MoodSelector; 