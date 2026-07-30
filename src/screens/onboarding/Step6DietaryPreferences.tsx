/**
 * Onboarding Step 6: Dietary Preferences
 */

import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { MultiSelectList } from '../../components/MultiSelectList';
import { DIETARY_PREFERENCE_OPTIONS } from '../../constants/options';
import { DietaryPreference } from '../../types/UserProfile';
import { ProfileValidator } from '../../utils/validation';

interface Step6Props {
  initialData?: DietaryPreference[];
  onNext: (preferences: DietaryPreference[]) => void;
  onBack: () => void;
}

export const Step6DietaryPreferences: React.FC<Step6Props> = ({
  initialData,
  onNext,
  onBack,
}) => {
  const [preferences, setPreferences] = useState<DietaryPreference[]>(
    initialData || ['none']
  );
  const [errors, setErrors] = useState<string[]>([]);

  const handleSelectionChange = (newPreferences: DietaryPreference[]) => {
    // If "none" is selected, clear all other selections
    if (newPreferences.includes('none') && !preferences.includes('none')) {
      setPreferences(['none']);
    } else if (newPreferences.includes('none')) {
      // If other options are selected, remove "none"
      setPreferences(newPreferences.filter((p) => p !== 'none'));
    } else if (newPreferences.length === 0) {
      // If all are deselected, default to "none"
      setPreferences(['none']);
    } else {
      setPreferences(newPreferences);
    }
    setErrors([]); // Clear errors on change
  };

  const handleNext = () => {
    // Validate dietary preferences for conflicts
    const validationErrors = ProfileValidator.validateDietaryPreferences(preferences);
    
    if (validationErrors.length > 0) {
      setErrors(validationErrors.map((e) => e.message));
      return;
    }

    onNext(preferences);
  };

  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <Text style={styles.title}>Any dietary preferences?</Text>
        <Text style={styles.subtitle}>
          Select the dietary approaches you'd like to follow
        </Text>

        <MultiSelectList
          options={DIETARY_PREFERENCE_OPTIONS}
          selectedValues={preferences}
          onSelectionChange={handleSelectionChange}
        />

        {errors.length > 0 && (
          <View style={styles.errorContainer}>
            {errors.map((error, index) => (
              <Text key={index} style={styles.errorText}>
                • {error}
              </Text>
            ))}
          </View>
        )}

        <View style={styles.infoBox}>
          <Text style={styles.infoText}>
            💡 You can update these preferences anytime in your profile settings.
          </Text>
        </View>
      </ScrollView>

      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.backButton} onPress={onBack}>
          <Text style={styles.backButtonText}>Back</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={handleNext}
        >
          <Text style={styles.buttonText}>Complete</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  scrollView: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    marginBottom: 24,
  },
  errorContainer: {
    backgroundColor: '#FFEBEE',
    padding: 12,
    borderRadius: 8,
    marginTop: 10,
  },
  errorText: {
    color: '#C62828',
    fontSize: 14,
    marginBottom: 4,
  },
  infoBox: {
    backgroundColor: '#E8F5E9',
    padding: 12,
    borderRadius: 8,
    marginTop: 20,
  },
  infoText: {
    fontSize: 14,
    color: '#2E7D32',
    lineHeight: 20,
  },
  buttonContainer: {
    flexDirection: 'row',
    padding: 20,
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: '#e0e0e0',
    gap: 12,
  },
  backButton: {
    flex: 1,
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#4CAF50',
  },
  backButtonText: {
    color: '#4CAF50',
    fontSize: 16,
    fontWeight: 'bold',
  },
  button: {
    flex: 1,
    backgroundColor: '#4CAF50',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
