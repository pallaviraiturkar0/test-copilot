/**
 * Validation Utilities
 * Provides validation functions for user profile data
 */

import { UserProfile, ValidationError, DietaryPreference } from '../types/UserProfile';

export class ProfileValidator {
  /**
   * Validate basic demographics
   */
  static validateBasicDemographics(
    age: number,
    weight: number,
    height: number,
    gender: string
  ): ValidationError[] {
    const errors: ValidationError[] = [];

    if (!age || age < 13 || age > 120) {
      errors.push({
        field: 'age',
        message: 'Age must be between 13 and 120 years',
      });
    }

    if (!weight || weight < 20 || weight > 300) {
      errors.push({
        field: 'weight',
        message: 'Weight must be between 20 and 300 kg',
      });
    }

    if (!height || height < 100 || height > 250) {
      errors.push({
        field: 'height',
        message: 'Height must be between 100 and 250 cm',
      });
    }

    if (!gender) {
      errors.push({
        field: 'gender',
        message: 'Gender is required',
      });
    }

    return errors;
  }

  /**
   * Check for conflicting dietary preferences
   */
  static validateDietaryPreferences(
    preferences: DietaryPreference[]
  ): ValidationError[] {
    const errors: ValidationError[] = [];

    // Check for conflicting preferences
    const hasVegan = preferences.includes('vegan');
    const hasVegetarian = preferences.includes('vegetarian');
    const hasKeto = preferences.includes('keto');
    const hasMediterranean = preferences.includes('mediterranean');
    const hasPaleo = preferences.includes('paleo');

    // Vegan conflicts
    if (hasVegan && hasKeto) {
      errors.push({
        field: 'dietaryPreferences',
        message: 'Vegan and Keto diets are difficult to combine. Please choose one.',
      });
    }

    // Vegetarian and vegan together is redundant
    if (hasVegan && hasVegetarian) {
      errors.push({
        field: 'dietaryPreferences',
        message: 'Vegan diet includes vegetarian. Please select only vegan.',
      });
    }

    // Keto and Mediterranean can conflict
    if (hasKeto && hasMediterranean) {
      errors.push({
        field: 'dietaryPreferences',
        message: 'Keto and Mediterranean diets have different carb approaches. Consider choosing one.',
      });
    }

    // Paleo and Keto can be combined but warn user
    if (hasKeto && hasPaleo && preferences.length > 2) {
      errors.push({
        field: 'dietaryPreferences',
        message: 'Multiple restrictive diets selected. Consider simplifying your preferences.',
      });
    }

    return errors;
  }

  /**
   * Validate consistency between medical conditions and nutrition goals
   */
  static validateConsistency(profile: Partial<UserProfile>): ValidationError[] {
    const errors: ValidationError[] = [];

    // Check if diabetes is present and appropriate goals are selected
    if (
      profile.medicalConditions?.includes('diabetes') &&
      profile.nutritionGoals?.includes('muscle_gain') &&
      !profile.nutritionGoals?.includes('diabetes_management')
    ) {
      errors.push({
        field: 'nutritionGoals',
        message: 'Consider adding diabetes management to your nutrition goals.',
      });
    }

    // Check if celiac disease is present and gluten-free is selected
    if (
      profile.medicalConditions?.includes('celiac_disease') &&
      !profile.dietaryPreferences?.includes('gluten_free')
    ) {
      errors.push({
        field: 'dietaryPreferences',
        message: 'Gluten-free diet is strongly recommended for celiac disease.',
      });
    }

    // Check for milk allergy without dairy-free preference
    if (
      profile.foodAllergies?.includes('milk') &&
      !profile.dietaryPreferences?.includes('dairy_free') &&
      !profile.dietaryPreferences?.includes('vegan')
    ) {
      errors.push({
        field: 'dietaryPreferences',
        message: 'Consider selecting dairy-free due to milk allergy.',
      });
    }

    // Check BMI for weight-related goals
    if (profile.weight && profile.height) {
      const bmi = profile.weight / Math.pow(profile.height / 100, 2);
      
      if (bmi < 18.5 && profile.nutritionGoals?.includes('weight_loss')) {
        errors.push({
          field: 'nutritionGoals',
          message: 'Your BMI suggests weight loss may not be appropriate. Consider consulting a healthcare provider.',
        });
      }

      if (bmi > 30 && profile.nutritionGoals?.includes('muscle_gain') && !profile.nutritionGoals?.includes('weight_loss')) {
        errors.push({
          field: 'nutritionGoals',
          message: 'Consider adding weight management to your goals for better health outcomes.',
        });
      }
    }

    return errors;
  }

  /**
   * Validate complete profile
   */
  static validateProfile(profile: Partial<UserProfile>): ValidationError[] {
    const errors: ValidationError[] = [];

    // Validate demographics
    if (profile.age !== undefined && profile.weight !== undefined && 
        profile.height !== undefined && profile.gender) {
      errors.push(
        ...this.validateBasicDemographics(
          profile.age,
          profile.weight,
          profile.height,
          profile.gender
        )
      );
    }

    // Validate dietary preferences
    if (profile.dietaryPreferences && profile.dietaryPreferences.length > 0) {
      errors.push(...this.validateDietaryPreferences(profile.dietaryPreferences));
    }

    // Validate consistency
    errors.push(...this.validateConsistency(profile));

    return errors;
  }
}
