/**
 * Onboarding Step 1: Basic Demographics
 * Collects age, weight, height, and gender
 */

import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { SingleSelectList } from '../../components/SingleSelectList';
import { GENDER_OPTIONS } from '../../constants/options';
import { Gender } from '../../types/UserProfile';
import { ProfileValidator } from '../../utils/validation';

interface Step1Props {
  initialData?: {
    age?: number;
    weight?: number;
    height?: number;
    gender?: Gender;
  };
  onNext: (data: {
    age: number;
    weight: number;
    height: number;
    gender: Gender;
  }) => void;
}

export const Step1BasicInfo: React.FC<Step1Props> = ({ initialData, onNext }) => {
  const [age, setAge] = useState(initialData?.age?.toString() || '');
  const [weight, setWeight] = useState(initialData?.weight?.toString() || '');
  const [height, setHeight] = useState(initialData?.height?.toString() || '');
  const [gender, setGender] = useState<Gender | null>(initialData?.gender || null);
  const [errors, setErrors] = useState<string[]>([]);

  const handleNext = () => {
    const ageNum = parseInt(age);
    const weightNum = parseFloat(weight);
    const heightNum = parseFloat(height);

    if (!gender) {
      setErrors(['Please select your gender']);
      return;
    }

    const validationErrors = ProfileValidator.validateBasicDemographics(
      ageNum,
      weightNum,
      heightNum,
      gender
    );

    if (validationErrors.length > 0) {
      setErrors(validationErrors.map((e) => e.message));
      return;
    }

    onNext({
      age: ageNum,
      weight: weightNum,
      height: heightNum,
      gender,
    });
  };

  const isFormValid =
    age !== '' && weight !== '' && height !== '' && gender !== null;

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <Text style={styles.title}>Tell us about yourself</Text>
        <Text style={styles.subtitle}>
          We'll use this information to personalize your nutrition plan
        </Text>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>Age (years)</Text>
          <TextInput
            style={styles.input}
            value={age}
            onChangeText={setAge}
            keyboardType="number-pad"
            placeholder="Enter your age"
            maxLength={3}
          />
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>Weight (kg)</Text>
          <TextInput
            style={styles.input}
            value={weight}
            onChangeText={setWeight}
            keyboardType="decimal-pad"
            placeholder="Enter your weight"
          />
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>Height (cm)</Text>
          <TextInput
            style={styles.input}
            value={height}
            onChangeText={setHeight}
            keyboardType="number-pad"
            placeholder="Enter your height"
          />
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>Gender</Text>
          <SingleSelectList
            options={GENDER_OPTIONS}
            selectedValue={gender}
            onSelectionChange={setGender}
          />
        </View>

        {errors.length > 0 && (
          <View style={styles.errorContainer}>
            {errors.map((error, index) => (
              <Text key={index} style={styles.errorText}>
                • {error}
              </Text>
            ))}
          </View>
        )}
      </ScrollView>

      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={[styles.button, !isFormValid && styles.buttonDisabled]}
          onPress={handleNext}
          disabled={!isFormValid}
        >
          <Text style={styles.buttonText}>Next</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
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
  inputContainer: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 8,
  },
  input: {
    backgroundColor: '#f5f5f5',
    padding: 15,
    borderRadius: 8,
    fontSize: 16,
    borderWidth: 1,
    borderColor: '#e0e0e0',
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
  buttonContainer: {
    padding: 20,
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: '#e0e0e0',
  },
  button: {
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
