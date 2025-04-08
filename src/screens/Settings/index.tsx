import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  ScrollView, 
  TouchableOpacity, 
  SafeAreaView,
  Switch,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import colors from '../../constants/colors';
import layout from '../../constants/layout';
import Card from '../../components/common/Card';
import Button from '../../components/common/Button';

// Mock user data
const mockUser = {
  email: 'user@example.com',
  firstName: 'Alex',
  lastName: 'Johnson',
};

// Mock settings
type SettingsState = {
  theme: 'light' | 'dark' | 'system';
  notifications: boolean;
  dataSharing: boolean;
  storageEnabled: boolean;
  aiModel: string;
  voiceEnabled: boolean;
};

const SettingsScreen: React.FC = () => {
  const [settings, setSettings] = useState<SettingsState>({
    theme: 'light',
    notifications: true,
    dataSharing: false,
    storageEnabled: true,
    aiModel: 'GPT-3.5 Turbo',
    voiceEnabled: true,
  });

  const handleToggleSetting = (setting: keyof SettingsState, value: boolean) => {
    setSettings(prev => ({
      ...prev,
      [setting]: value,
    }));
  };

  const handleSelectTheme = (theme: 'light' | 'dark' | 'system') => {
    setSettings(prev => ({
      ...prev,
      theme,
    }));
  };

  const handleSelectModel = (aiModel: string) => {
    setSettings(prev => ({
      ...prev,
      aiModel,
    }));
  };

  const handleLogout = () => {
    // Would handle logout in a real app
    console.log('Logging out');
  };

  const renderSettingSwitch = (
    label: string, 
    key: 'notifications' | 'dataSharing' | 'storageEnabled' | 'voiceEnabled', 
    description?: string
  ) => (
    <View style={styles.settingItem}>
      <View style={styles.settingContent}>
        <Text style={styles.settingLabel}>{label}</Text>
        {description && <Text style={styles.settingDescription}>{description}</Text>}
      </View>
      <Switch
        value={settings[key]}
        onValueChange={(value) => handleToggleSetting(key, value)}
        trackColor={{ false: colors.divider, true: colors.primary }}
        thumbColor={colors.cardBackground}
      />
    </View>
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView 
        style={styles.scrollView}
        contentContainerStyle={styles.container}
        showsVerticalScrollIndicator={false}
      >
        {/* Profile Card */}
        <Card style={styles.profileCard}>
          <View style={styles.profileHeader}>
            <View style={styles.profileAvatar}>
              <Text style={styles.profileInitials}>
                {mockUser.firstName.charAt(0)}{mockUser.lastName.charAt(0)}
              </Text>
            </View>
            <View style={styles.profileInfo}>
              <Text style={styles.profileName}>
                {mockUser.firstName} {mockUser.lastName}
              </Text>
              <Text style={styles.profileEmail}>{mockUser.email}</Text>
            </View>
          </View>
          <TouchableOpacity style={styles.editProfileButton}>
            <Text style={styles.editProfileText}>Edit Profile</Text>
          </TouchableOpacity>
        </Card>

        {/* Appearance Settings */}
        <Card style={styles.settingsCard}>
          <Text style={styles.settingsSection}>Appearance</Text>
          
          <View style={styles.themeSelector}>
            <Text style={styles.settingLabel}>Theme</Text>
            <View style={styles.themeOptions}>
              <TouchableOpacity 
                style={[
                  styles.themeOption, 
                  settings.theme === 'light' && styles.themeOptionSelected
                ]}
                onPress={() => handleSelectTheme('light')}
              >
                <Text style={[
                  styles.themeOptionText,
                  settings.theme === 'light' && styles.themeOptionTextSelected
                ]}>Light</Text>
              </TouchableOpacity>
              
              <TouchableOpacity 
                style={[
                  styles.themeOption, 
                  settings.theme === 'dark' && styles.themeOptionSelected
                ]}
                onPress={() => handleSelectTheme('dark')}
              >
                <Text style={[
                  styles.themeOptionText,
                  settings.theme === 'dark' && styles.themeOptionTextSelected
                ]}>Dark</Text>
              </TouchableOpacity>
              
              <TouchableOpacity 
                style={[
                  styles.themeOption, 
                  settings.theme === 'system' && styles.themeOptionSelected
                ]}
                onPress={() => handleSelectTheme('system')}
              >
                <Text style={[
                  styles.themeOptionText,
                  settings.theme === 'system' && styles.themeOptionTextSelected
                ]}>System</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Card>

        {/* Notifications Settings */}
        <Card style={styles.settingsCard}>
          <Text style={styles.settingsSection}>Notifications</Text>
          {renderSettingSwitch(
            'Push Notifications', 
            'notifications', 
            'Receive reminders and updates'
          )}
        </Card>

        {/* AI Model Settings */}
        <Card style={styles.settingsCard}>
          <Text style={styles.settingsSection}>AI Assistant</Text>
          
          <View style={styles.modelSetting}>
            <Text style={styles.settingLabel}>AI Model</Text>
            <TouchableOpacity style={styles.modelSelector}>
              <Text style={styles.modelValue}>{settings.aiModel}</Text>
              <Ionicons name="chevron-forward" size={18} color={colors.textSecondary} />
            </TouchableOpacity>
          </View>
          
          {renderSettingSwitch(
            'Voice Mode', 
            'voiceEnabled', 
            'Enable voice conversations'
          )}
        </Card>

        {/* Privacy Settings */}
        <Card style={styles.settingsCard}>
          <Text style={styles.settingsSection}>Privacy</Text>
          
          {renderSettingSwitch(
            'Data Sharing', 
            'dataSharing', 
            'Help improve the app by sharing anonymous usage data'
          )}
          
          {renderSettingSwitch(
            'Local Storage', 
            'storageEnabled', 
            'Store conversation history on your device'
          )}
        </Card>

        {/* About Section */}
        <Card style={styles.settingsCard}>
          <Text style={styles.settingsSection}>About</Text>
          <TouchableOpacity style={styles.aboutItem}>
            <Text style={styles.aboutItemText}>Terms of Service</Text>
            <Ionicons name="chevron-forward" size={18} color={colors.textSecondary} />
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.aboutItem}>
            <Text style={styles.aboutItemText}>Privacy Policy</Text>
            <Ionicons name="chevron-forward" size={18} color={colors.textSecondary} />
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.aboutItem}>
            <Text style={styles.aboutItemText}>Version 1.0.0</Text>
          </TouchableOpacity>
        </Card>

        {/* Logout Button */}
        <Button
          title="Log Out"
          onPress={handleLogout}
          variant="outline"
          style={styles.logoutButton}
        />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.background,
  },
  scrollView: {
    flex: 1,
  },
  container: {
    padding: 24,
    paddingBottom: 40,
  },
  profileCard: {
    marginBottom: 20,
  },
  profileHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  profileAvatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
  },
  profileInitials: {
    fontSize: 24,
    fontWeight: '600',
    color: colors.textLight,
  },
  profileInfo: {
    flex: 1,
  },
  profileName: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.textPrimary,
    marginBottom: 4,
  },
  profileEmail: {
    fontSize: 14,
    color: colors.textSecondary,
  },
  editProfileButton: {
    alignSelf: 'flex-end',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 16,
    backgroundColor: colors.backgroundEnd,
  },
  editProfileText: {
    fontSize: 14,
    fontWeight: '500',
    color: colors.primary,
  },
  settingsCard: {
    marginBottom: 20,
  },
  settingsSection: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.textPrimary,
    marginBottom: 16,
  },
  themeSelector: {
    marginBottom: 8,
  },
  themeOptions: {
    flexDirection: 'row',
    marginTop: 12,
  },
  themeOption: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 16,
    backgroundColor: colors.inputBackground,
    marginRight: 12,
  },
  themeOptionSelected: {
    backgroundColor: colors.primary,
  },
  themeOptionText: {
    color: colors.textSecondary,
    fontWeight: '500',
  },
  themeOptionTextSelected: {
    color: colors.textLight,
  },
  settingItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: colors.divider,
  },
  settingContent: {
    flex: 1,
    marginRight: 16,
  },
  settingLabel: {
    fontSize: 16,
    fontWeight: '500',
    color: colors.textPrimary,
    marginBottom: 4,
  },
  settingDescription: {
    fontSize: 14,
    color: colors.textSecondary,
  },
  modelSetting: {
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: colors.divider,
  },
  modelSelector: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 8,
    backgroundColor: colors.inputBackground,
    marginTop: 8,
  },
  modelValue: {
    fontSize: 16,
    color: colors.textPrimary,
  },
  aboutItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: colors.divider,
  },
  aboutItemText: {
    fontSize: 16,
    color: colors.textPrimary,
  },
  logoutButton: {
    marginVertical: 10,
  },
});

export default SettingsScreen; 