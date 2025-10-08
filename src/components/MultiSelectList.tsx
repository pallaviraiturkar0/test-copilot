/**
 * Multi-Select List Component
 * Allows selection of multiple options from a list
 */

import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { Option } from '../constants/options';

interface MultiSelectListProps<T> {
  options: Option<T>[];
  selectedValues: T[];
  onSelectionChange: (values: T[]) => void;
  maxSelections?: number;
}

export function MultiSelectList<T extends string>({
  options,
  selectedValues,
  onSelectionChange,
  maxSelections,
}: MultiSelectListProps<T>) {
  const handleToggle = (value: T) => {
    if (selectedValues.includes(value)) {
      // Remove from selection
      onSelectionChange(selectedValues.filter((v) => v !== value));
    } else {
      // Add to selection if not at max
      if (!maxSelections || selectedValues.length < maxSelections) {
        onSelectionChange([...selectedValues, value]);
      }
    }
  };

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {options.map((option) => {
        const isSelected = selectedValues.includes(option.value);
        const isDisabled =
          !isSelected && maxSelections && selectedValues.length >= maxSelections;

        return (
          <TouchableOpacity
            key={option.value}
            style={[
              styles.option,
              isSelected && styles.selectedOption,
              isDisabled && styles.disabledOption,
            ]}
            onPress={() => handleToggle(option.value)}
            disabled={isDisabled}
          >
            <View style={styles.checkbox}>
              {isSelected && <View style={styles.checkboxInner} />}
            </View>
            <View style={styles.optionContent}>
              <Text style={[styles.optionLabel, isSelected && styles.selectedLabel]}>
                {option.label}
              </Text>
              {option.description && (
                <Text style={styles.optionDescription}>{option.description}</Text>
              )}
            </View>
          </TouchableOpacity>
        );
      })}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  option: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    backgroundColor: '#f5f5f5',
    borderRadius: 8,
    marginBottom: 10,
    borderWidth: 2,
    borderColor: 'transparent',
  },
  selectedOption: {
    backgroundColor: '#E8F5E9',
    borderColor: '#4CAF50',
  },
  disabledOption: {
    opacity: 0.5,
  },
  checkbox: {
    width: 24,
    height: 24,
    borderRadius: 4,
    borderWidth: 2,
    borderColor: '#999',
    marginRight: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkboxInner: {
    width: 14,
    height: 14,
    borderRadius: 2,
    backgroundColor: '#4CAF50',
  },
  optionContent: {
    flex: 1,
  },
  optionLabel: {
    fontSize: 16,
    color: '#333',
    fontWeight: '500',
  },
  selectedLabel: {
    color: '#2E7D32',
    fontWeight: '600',
  },
  optionDescription: {
    fontSize: 13,
    color: '#666',
    marginTop: 4,
  },
});
