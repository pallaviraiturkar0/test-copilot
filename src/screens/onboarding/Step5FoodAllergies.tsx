/**
 * Onboarding Step 5: Food Allergies
 */

import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { MultiSelectList } from '../../components/MultiSelectList';
import { FOOD_ALLERGY_OPTIONS } from '../../constants/options';
import { FoodAllergy } from '../../types/UserProfile';

interface Step5Props {
  initialData?: FoodAllergy[];
  onNext: (allergies: FoodAllergy[]) => void;
  onBack: () => void;
}

export const Step5FoodAllergies: React.FC<Step5Props> = ({
  initialData,
  onNext,
  onBack,
}) => {
  const [allergies, setAllergies] = useState<FoodAllergy[]>(
    initialData || ['none']
  );

  const handleSelectionChange = (newAllergies: FoodAllergy[]) => {
    // If "none" is selected, clear all other selections
    if (newAllergies.includes('none') && !allergies.includes('none')) {
      setAllergies(['none']);
    } else if (newAllergies.includes('none')) {
      // If other options are selected, remove "none"
      setAllergies(newAllergies.filter((a) => a !== 'none'));
    } else if (newAllergies.length === 0) {
      // If all are deselected, default to "none"
      setAllergies(['none']);
    } else {
      setAllergies(newAllergies);
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <Text style={styles.title}>Do you have any food allergies?</Text>
        <Text style={styles.subtitle}>
          We'll make sure to exclude these from your meal plans
        </Text>

        <MultiSelectList
          options={FOOD_ALLERGY_OPTIONS}
          selectedValues={allergies}
          onSelectionChange={handleSelectionChange}
        />

        <View style={styles.warningBox}>
          <Text style={styles.warningText}>
            ⚠️ If you have severe food allergies, always verify ingredients and
            consult with your healthcare provider before trying new foods.
          </Text>
        </View>
      </ScrollView>

      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.backButton} onPress={onBack}>
          <Text style={styles.backButtonText}>Back</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => onNext(allergies)}
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
  warningBox: {
    backgroundColor: '#FFF3E0',
    padding: 12,
    borderRadius: 8,
    marginTop: 20,
  },
  warningText: {
    fontSize: 14,
    color: '#E65100',
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
