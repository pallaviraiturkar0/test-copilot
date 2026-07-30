/**
 * User Profile Types
 * Defines all data structures for user health information and preferences
 */

export type Gender = 'male' | 'female' | 'other' | 'prefer_not_to_say';

export type ActivityLevel = 
  | 'sedentary' 
  | 'lightly_active' 
  | 'moderately_active' 
  | 'very_active';

export type NutritionGoal = 
  | 'weight_loss' 
  | 'muscle_gain' 
  | 'diabetes_management' 
  | 'maintenance'
  | 'general_health';

export type MedicalCondition = 
  | 'diabetes' 
  | 'hypertension' 
  | 'heart_disease' 
  | 'high_cholesterol'
  | 'kidney_disease'
  | 'celiac_disease'
  | 'ibs'
  | 'none';

export type FoodAllergy = 
  | 'nuts' 
  | 'peanuts'
  | 'tree_nuts'
  | 'shellfish' 
  | 'fish'
  | 'eggs'
  | 'milk'
  | 'soy'
  | 'wheat'
  | 'sesame'
  | 'none';

export type DietaryPreference = 
  | 'vegetarian' 
  | 'vegan' 
  | 'keto' 
  | 'mediterranean'
  | 'paleo'
  | 'gluten_free' 
  | 'dairy_free'
  | 'low_carb'
  | 'low_fat'
  | 'none';

export interface BasicDemographics {
  age: number;
  weight: number; // in kg
  height: number; // in cm
  gender: Gender;
}

export interface UserProfile extends BasicDemographics {
  activityLevel: ActivityLevel;
  nutritionGoals: NutritionGoal[];
  medicalConditions: MedicalCondition[];
  foodAllergies: FoodAllergy[];
  dietaryPreferences: DietaryPreference[];
  createdAt: string;
  updatedAt: string;
}

export interface OnboardingStep {
  step: number;
  title: string;
  completed: boolean;
}

export interface ValidationError {
  field: string;
  message: string;
}

export interface OnboardingState {
  currentStep: number;
  totalSteps: number;
  profile: Partial<UserProfile>;
  errors: ValidationError[];
}
