/**
 * Main App Component
 * Entry point for the Nutrition App with user onboarding
 */

import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { StatusBar } from 'expo-status-bar';
import { PrivacyPolicyScreen } from './src/screens/PrivacyPolicyScreen';
import { OnboardingContainer } from './src/screens/OnboardingContainer';
import { ProfileEditScreen } from './src/screens/ProfileEditScreen';
import { HomeScreen } from './src/screens/HomeScreen';
import { SecureProfileStorage } from './src/utils/secureStorage';

const Stack = createStackNavigator();

export default function App() {
  const [hasAcceptedPolicy, setHasAcceptedPolicy] = useState(false);
  const [hasProfile, setHasProfile] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    checkProfile();
  }, []);

  const checkProfile = async () => {
    try {
      const profileExists = await SecureProfileStorage.hasProfile();
      setHasProfile(profileExists);
      if (profileExists) {
        setHasAcceptedPolicy(true);
      }
    } catch (error) {
      console.error('Error checking profile:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handlePolicyAccept = () => {
    setHasAcceptedPolicy(true);
  };

  const handleOnboardingComplete = () => {
    setHasProfile(true);
  };

  const handleStartOnboarding = () => {
    setHasProfile(false);
  };

  if (isLoading) {
    return null; // Or a loading screen
  }

  return (
    <>
      <StatusBar style="auto" />
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            headerStyle: {
              backgroundColor: '#4CAF50',
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
              fontWeight: 'bold',
            },
          }}
        >
          {!hasAcceptedPolicy ? (
            <Stack.Screen name="Privacy" options={{ headerShown: false }}>
              {() => <PrivacyPolicyScreen onAccept={handlePolicyAccept} />}
            </Stack.Screen>
          ) : !hasProfile ? (
            <Stack.Screen
              name="Onboarding"
              options={{ title: 'Setup Your Profile', headerLeft: () => null }}
            >
              {() => <OnboardingContainer onComplete={handleOnboardingComplete} />}
            </Stack.Screen>
          ) : (
            <>
              <Stack.Screen name="Home" options={{ title: 'Nutrition App' }}>
                {() => <HomeScreen onEditProfile={handleStartOnboarding} />}
              </Stack.Screen>
              <Stack.Screen
                name="Profile"
                options={{ title: 'Your Profile' }}
                component={ProfileEditScreen}
              />
              <Stack.Screen
                name="EditOnboarding"
                options={{ title: 'Edit Profile' }}
              >
                {() => (
                  <OnboardingContainer onComplete={() => setHasProfile(true)} />
                )}
              </Stack.Screen>
            </>
          )}
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
}
