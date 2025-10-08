/**
 * Onboarding Container
 * Orchestrates the multi-step onboarding flow
 */

import React, { useState } from 'react';
import { View, StyleSheet, Alert } from 'react-native';
import { ProgressIndicator } from '../components/ProgressIndicator';
import { Step1BasicInfo } from './onboarding/Step1BasicInfo';
import { Step2ActivityLevel } from './onboarding/Step2ActivityLevel';
import { Step3NutritionGoals } from './onboarding/Step3NutritionGoals';
import { Step4MedicalConditions } from './onboarding/Step4MedicalConditions';
import { Step5FoodAllergies } from './onboarding/Step5FoodAllergies';
import { Step6DietaryPreferences } from './onboarding/Step6DietaryPreferences';
import { UserProfile } from '../types/UserProfile';
import { SecureProfileStorage } from '../utils/secureStorage';
import { ProfileValidator } from '../utils/validation';
import { ONBOARDING_STEPS } from '../constants/options';

interface OnboardingContainerProps {
  onComplete: () => void;
}

export const OnboardingContainer: React.FC<OnboardingContainerProps> = ({
  onComplete,
}) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [profileData, setProfileData] = useState<Partial<UserProfile>>({});

  const stepTitles = ONBOARDING_STEPS.map((s) => s.title);
  const totalSteps = ONBOARDING_STEPS.length;

  const handleStep1Complete = (data: {
    age: number;
    weight: number;
    height: number;
    gender: any;
  }) => {
    setProfileData((prev) => ({ ...prev, ...data }));
    setCurrentStep(2);
  };

  const handleStep2Complete = (activityLevel: any) => {
    setProfileData((prev) => ({ ...prev, activityLevel }));
    setCurrentStep(3);
  };

  const handleStep3Complete = (nutritionGoals: any[]) => {
    setProfileData((prev) => ({ ...prev, nutritionGoals }));
    setCurrentStep(4);
  };

  const handleStep4Complete = (medicalConditions: any[]) => {
    setProfileData((prev) => ({ ...prev, medicalConditions }));
    setCurrentStep(5);
  };

  const handleStep5Complete = (foodAllergies: any[]) => {
    setProfileData((prev) => ({ ...prev, foodAllergies }));
    setCurrentStep(6);
  };

  const handleStep6Complete = async (dietaryPreferences: any[]) => {
    const completeProfile: UserProfile = {
      ...profileData,
      dietaryPreferences,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    } as UserProfile;

    // Final validation
    const errors = ProfileValidator.validateProfile(completeProfile);
    
    if (errors.length > 0) {
      const warningMessages = errors.map((e) => e.message).join('\n\n');
      Alert.alert(
        'Recommendations',
        warningMessages + '\n\nDo you want to continue anyway?',
        [
          { text: 'Review', style: 'cancel' },
          {
            text: 'Continue',
            onPress: async () => {
              await saveProfile(completeProfile);
            },
          },
        ]
      );
    } else {
      await saveProfile(completeProfile);
    }
  };

  const saveProfile = async (profile: UserProfile) => {
    try {
      await SecureProfileStorage.saveProfile(profile);
      Alert.alert(
        'Success!',
        'Your profile has been saved securely.',
        [{ text: 'OK', onPress: onComplete }]
      );
    } catch (error) {
      Alert.alert('Error', 'Failed to save profile. Please try again.');
    }
  };

  return (
    <View style={styles.container}>
      <ProgressIndicator
        currentStep={currentStep}
        totalSteps={totalSteps}
        stepTitles={stepTitles}
      />

      {currentStep === 1 && (
        <Step1BasicInfo
          initialData={profileData}
          onNext={handleStep1Complete}
        />
      )}

      {currentStep === 2 && (
        <Step2ActivityLevel
          initialData={profileData.activityLevel}
          onNext={handleStep2Complete}
          onBack={() => setCurrentStep(1)}
        />
      )}

      {currentStep === 3 && (
        <Step3NutritionGoals
          initialData={profileData.nutritionGoals}
          onNext={handleStep3Complete}
          onBack={() => setCurrentStep(2)}
        />
      )}

      {currentStep === 4 && (
        <Step4MedicalConditions
          initialData={profileData.medicalConditions}
          onNext={handleStep4Complete}
          onBack={() => setCurrentStep(3)}
        />
      )}

      {currentStep === 5 && (
        <Step5FoodAllergies
          initialData={profileData.foodAllergies}
          onNext={handleStep5Complete}
          onBack={() => setCurrentStep(4)}
        />
      )}

      {currentStep === 6 && (
        <Step6DietaryPreferences
          initialData={profileData.dietaryPreferences}
          onNext={handleStep6Complete}
          onBack={() => setCurrentStep(5)}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
