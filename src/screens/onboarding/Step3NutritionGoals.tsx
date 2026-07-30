/**
 * Onboarding Step 3: Nutrition Goals
 */

import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { MultiSelectList } from '../../components/MultiSelectList';
import { NUTRITION_GOAL_OPTIONS } from '../../constants/options';
import { NutritionGoal } from '../../types/UserProfile';

interface Step3Props {
  initialData?: NutritionGoal[];
  onNext: (goals: NutritionGoal[]) => void;
  onBack: () => void;
}

export const Step3NutritionGoals: React.FC<Step3Props> = ({
  initialData,
  onNext,
  onBack,
}) => {
  const [goals, setGoals] = useState<NutritionGoal[]>(initialData || []);

  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <Text style={styles.title}>What are your nutrition goals?</Text>
        <Text style={styles.subtitle}>Select all that apply</Text>

        <MultiSelectList
          options={NUTRITION_GOAL_OPTIONS}
          selectedValues={goals}
          onSelectionChange={setGoals}
        />
      </ScrollView>

      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.backButton} onPress={onBack}>
          <Text style={styles.backButtonText}>Back</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.button, goals.length === 0 && styles.buttonDisabled]}
          onPress={() => onNext(goals)}
          disabled={goals.length === 0}
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
