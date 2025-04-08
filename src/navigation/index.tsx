import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import { RootStackParamList } from '../types';

// Import screens
import HomeScreen from '../screens/Home';
import ChatScreen from '../screens/Chat';
import VoiceScreen from '../screens/Voice';
import SessionRecapScreen from '../screens/SessionRecap';
import SettingsScreen from '../screens/Settings';
import LoginScreen from '../screens/Login';
import RegisterScreen from '../screens/Register';

// Create navigators
const Stack = createStackNavigator<RootStackParamList>();
const Tab = createBottomTabNavigator<RootStackParamList>();

// Bottom Tab Navigator
const MainTabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          height: 94,
          paddingBottom: 30,
          paddingTop: 10,
        },
      }}
    >
      <Tab.Screen 
        name="Home" 
        component={HomeScreen} 
        options={{
          tabBarLabel: 'Home',
          // We'll add icons later
        }}
      />
      <Tab.Screen 
        name="Voice" 
        component={VoiceScreen} 
        options={{
          tabBarLabel: 'Therapy',
          // We'll add icons later
        }}
      />
      <Tab.Screen 
        name="Chat" 
        component={ChatScreen} 
        options={{
          tabBarLabel: 'Message',
          // We'll add icons later
        }}
      />
      <Tab.Screen 
        name="Settings" 
        component={SettingsScreen} 
        options={{
          tabBarLabel: 'Settings',
          // We'll add icons later
        }}
      />
    </Tab.Navigator>
  );
};

// Auth Stack Navigator
const AuthNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Register" component={RegisterScreen} />
    </Stack.Navigator>
  );
};

// Main Stack Navigator
const RootNavigator = () => {
  // We'll add auth check logic later
  const isAuthenticated = true;

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {!isAuthenticated ? (
        <Stack.Screen name="Auth" component={AuthNavigator} />
      ) : (
        <>
          <Stack.Screen name="Home" component={MainTabNavigator} />
          <Stack.Screen 
            name="SessionRecap" 
            component={SessionRecapScreen}
            options={{
              presentation: 'card',
            }}
          />
        </>
      )}
    </Stack.Navigator>
  );
};

// Main navigation container
const Navigation = () => {
  return (
    <NavigationContainer>
      <RootNavigator />
    </NavigationContainer>
  );
};

export default Navigation; 