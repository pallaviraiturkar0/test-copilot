/**
 * Onboarding Step 4: Medical Conditions
 */

import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { MultiSelectList } from '../../components/MultiSelectList';
import { MEDICAL_CONDITION_OPTIONS } from '../../constants/options';
import { MedicalCondition } from '../../types/UserProfile';

interface Step4Props {
  initialData?: MedicalCondition[];
  onNext: (conditions: MedicalCondition[]) => void;
  onBack: () => void;
}

export const Step4MedicalConditions: React.FC<Step4Props> = ({
  initialData,
  onNext,
  onBack,
}) => {
  const [conditions, setConditions] = useState<MedicalCondition[]>(
    initialData || ['none']
  );

  const handleSelectionChange = (newConditions: MedicalCondition[]) => {
    // If "none" is selected, clear all other selections
    if (newConditions.includes('none') && !conditions.includes('none')) {
      setConditions(['none']);
    } else if (newConditions.includes('none')) {
      // If other options are selected, remove "none"
      setConditions(newConditions.filter((c) => c !== 'none'));
    } else if (newConditions.length === 0) {
      // If all are deselected, default to "none"
      setConditions(['none']);
    } else {
      setConditions(newConditions);
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <Text style={styles.title}>Any medical conditions?</Text>
        <Text style={styles.subtitle}>
          This helps us provide safe nutrition recommendations
        </Text>

        <MultiSelectList
          options={MEDICAL_CONDITION_OPTIONS}
          selectedValues={conditions}
          onSelectionChange={handleSelectionChange}
        />

        <View style={styles.infoBox}>
          <Text style={styles.infoText}>
            ℹ️ This information is stored securely and used only to personalize your
            nutrition plan. Always consult your healthcare provider before making
            significant dietary changes.
          </Text>
        </View>
      </ScrollView>

      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.backButton} onPress={onBack}>
          <Text style={styles.backButtonText}>Back</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => onNext(conditions)}
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
  infoBox: {
    backgroundColor: '#E3F2FD',
    padding: 12,
    borderRadius: 8,
    marginTop: 20,
  },
  infoText: {
    fontSize: 14,
    color: '#1565C0',
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
