/**
 * Dropdown Options and Constants
 * All available options for user profile selections
 */

import {
  Gender,
  ActivityLevel,
  NutritionGoal,
  MedicalCondition,
  FoodAllergy,
  DietaryPreference,
} from '../types/UserProfile';

export interface Option<T> {
  value: T;
  label: string;
  description?: string;
}

export const GENDER_OPTIONS: Option<Gender>[] = [
  { value: 'male', label: 'Male' },
  { value: 'female', label: 'Female' },
  { value: 'other', label: 'Other' },
  { value: 'prefer_not_to_say', label: 'Prefer not to say' },
];

export const ACTIVITY_LEVEL_OPTIONS: Option<ActivityLevel>[] = [
  {
    value: 'sedentary',
    label: 'Sedentary',
    description: 'Little or no exercise',
  },
  {
    value: 'lightly_active',
    label: 'Lightly Active',
    description: 'Light exercise 1-3 days/week',
  },
  {
    value: 'moderately_active',
    label: 'Moderately Active',
    description: 'Moderate exercise 3-5 days/week',
  },
  {
    value: 'very_active',
    label: 'Very Active',
    description: 'Intense exercise 6-7 days/week',
  },
];

export const NUTRITION_GOAL_OPTIONS: Option<NutritionGoal>[] = [
  {
    value: 'weight_loss',
    label: 'Weight Loss',
    description: 'Reduce body weight',
  },
  {
    value: 'muscle_gain',
    label: 'Muscle Gain',
    description: 'Build muscle mass',
  },
  {
    value: 'diabetes_management',
    label: 'Diabetes Management',
    description: 'Control blood sugar levels',
  },
  {
    value: 'maintenance',
    label: 'Weight Maintenance',
    description: 'Maintain current weight',
  },
  {
    value: 'general_health',
    label: 'General Health',
    description: 'Overall wellness',
  },
];

export const MEDICAL_CONDITION_OPTIONS: Option<MedicalCondition>[] = [
  { value: 'none', label: 'None' },
  { value: 'diabetes', label: 'Diabetes' },
  { value: 'hypertension', label: 'Hypertension (High Blood Pressure)' },
  { value: 'heart_disease', label: 'Heart Disease' },
  { value: 'high_cholesterol', label: 'High Cholesterol' },
  { value: 'kidney_disease', label: 'Kidney Disease' },
  { value: 'celiac_disease', label: 'Celiac Disease' },
  { value: 'ibs', label: 'Irritable Bowel Syndrome (IBS)' },
];

export const FOOD_ALLERGY_OPTIONS: Option<FoodAllergy>[] = [
  { value: 'none', label: 'None' },
  { value: 'nuts', label: 'Nuts (All)' },
  { value: 'peanuts', label: 'Peanuts' },
  { value: 'tree_nuts', label: 'Tree Nuts' },
  { value: 'shellfish', label: 'Shellfish' },
  { value: 'fish', label: 'Fish' },
  { value: 'eggs', label: 'Eggs' },
  { value: 'milk', label: 'Milk/Lactose' },
  { value: 'soy', label: 'Soy' },
  { value: 'wheat', label: 'Wheat' },
  { value: 'sesame', label: 'Sesame' },
];

export const DIETARY_PREFERENCE_OPTIONS: Option<DietaryPreference>[] = [
  { value: 'none', label: 'None' },
  { value: 'vegetarian', label: 'Vegetarian' },
  { value: 'vegan', label: 'Vegan' },
  { value: 'keto', label: 'Ketogenic' },
  { value: 'mediterranean', label: 'Mediterranean' },
  { value: 'paleo', label: 'Paleo' },
  { value: 'gluten_free', label: 'Gluten-Free' },
  { value: 'dairy_free', label: 'Dairy-Free' },
  { value: 'low_carb', label: 'Low Carb' },
  { value: 'low_fat', label: 'Low Fat' },
];

export const ONBOARDING_STEPS = [
  { step: 1, title: 'Basic Information' },
  { step: 2, title: 'Activity Level' },
  { step: 3, title: 'Nutrition Goals' },
  { step: 4, title: 'Medical Conditions' },
  { step: 5, title: 'Food Allergies' },
  { step: 6, title: 'Dietary Preferences' },
];
