/**
 * Single Select List Component
 * Allows selection of a single option from a list
 */

import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { Option } from '../constants/options';

interface SingleSelectListProps<T> {
  options: Option<T>[];
  selectedValue: T | null;
  onSelectionChange: (value: T) => void;
}

export function SingleSelectList<T extends string>({
  options,
  selectedValue,
  onSelectionChange,
}: SingleSelectListProps<T>) {
  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {options.map((option) => {
        const isSelected = selectedValue === option.value;

        return (
          <TouchableOpacity
            key={option.value}
            style={[styles.option, isSelected && styles.selectedOption]}
            onPress={() => onSelectionChange(option.value)}
          >
            <View style={styles.radio}>
              {isSelected && <View style={styles.radioInner} />}
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
  radio: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#999',
    marginRight: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  radioInner: {
    width: 12,
    height: 12,
    borderRadius: 6,
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
