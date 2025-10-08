/**
 * Progress Indicator Component
 * Displays onboarding progress with step indicators
 */

import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

interface ProgressIndicatorProps {
  currentStep: number;
  totalSteps: number;
  stepTitles?: string[];
}

export const ProgressIndicator: React.FC<ProgressIndicatorProps> = ({
  currentStep,
  totalSteps,
  stepTitles,
}) => {
  const progressPercentage = (currentStep / totalSteps) * 100;

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.stepText}>
          Step {currentStep} of {totalSteps}
        </Text>
        {stepTitles && stepTitles[currentStep - 1] && (
          <Text style={styles.titleText}>{stepTitles[currentStep - 1]}</Text>
        )}
      </View>

      <View style={styles.progressBarContainer}>
        <View style={[styles.progressBar, { width: `${progressPercentage}%` }]} />
      </View>

      <View style={styles.stepsContainer}>
        {Array.from({ length: totalSteps }, (_, i) => (
          <View
            key={i}
            style={[
              styles.stepDot,
              i < currentStep && styles.completedDot,
              i === currentStep - 1 && styles.currentDot,
            ]}
          />
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    paddingVertical: 15,
    backgroundColor: '#fff',
  },
  header: {
    marginBottom: 10,
  },
  stepText: {
    fontSize: 14,
    color: '#666',
    fontWeight: '500',
  },
  titleText: {
    fontSize: 18,
    color: '#333',
    fontWeight: 'bold',
    marginTop: 4,
  },
  progressBarContainer: {
    height: 6,
    backgroundColor: '#E0E0E0',
    borderRadius: 3,
    overflow: 'hidden',
    marginBottom: 15,
  },
  progressBar: {
    height: '100%',
    backgroundColor: '#4CAF50',
    borderRadius: 3,
  },
  stepsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  stepDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#E0E0E0',
    flex: 1,
    marginHorizontal: 2,
  },
  completedDot: {
    backgroundColor: '#4CAF50',
  },
  currentDot: {
    backgroundColor: '#2196F3',
    width: 12,
    height: 12,
    borderRadius: 6,
  },
});
