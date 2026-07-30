/**
 * Onboarding Step 2: Activity Level
 */

import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { SingleSelectList } from '../../components/SingleSelectList';
import { ACTIVITY_LEVEL_OPTIONS } from '../../constants/options';
import { ActivityLevel } from '../../types/UserProfile';

interface Step2Props {
  initialData?: ActivityLevel;
  onNext: (activityLevel: ActivityLevel) => void;
  onBack: () => void;
}

export const Step2ActivityLevel: React.FC<Step2Props> = ({
  initialData,
  onNext,
  onBack,
}) => {
  const [activityLevel, setActivityLevel] = useState<ActivityLevel | null>(
    initialData || null
  );

  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <Text style={styles.title}>What's your activity level?</Text>
        <Text style={styles.subtitle}>
          This helps us calculate your daily calorie needs
        </Text>

        <SingleSelectList
          options={ACTIVITY_LEVEL_OPTIONS}
          selectedValue={activityLevel}
          onSelectionChange={setActivityLevel}
        />
      </ScrollView>

      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.backButton} onPress={onBack}>
          <Text style={styles.backButtonText}>Back</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.button, !activityLevel && styles.buttonDisabled]}
          onPress={() => activityLevel && onNext(activityLevel)}
          disabled={!activityLevel}
        >
          <Text style={styles.buttonText}>Next</Text>
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
  buttonDisabled: {
    backgroundColor: '#ccc',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
