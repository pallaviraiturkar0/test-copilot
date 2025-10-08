/**
 * Validation Utilities Tests
 */

import { ProfileValidator } from '../../src/utils/validation';
import { DietaryPreference } from '../../src/types/UserProfile';

describe('ProfileValidator', () => {
  describe('validateBasicDemographics', () => {
    it('should pass validation for valid demographics', () => {
      const errors = ProfileValidator.validateBasicDemographics(
        25,
        70,
        175,
        'male'
      );
      expect(errors).toHaveLength(0);
    });

    it('should fail for age below minimum', () => {
      const errors = ProfileValidator.validateBasicDemographics(
        10,
        70,
        175,
        'male'
      );
      expect(errors).toHaveLength(1);
      expect(errors[0].field).toBe('age');
    });

    it('should fail for age above maximum', () => {
      const errors = ProfileValidator.validateBasicDemographics(
        150,
        70,
        175,
        'male'
      );
      expect(errors).toHaveLength(1);
      expect(errors[0].field).toBe('age');
    });

    it('should fail for weight below minimum', () => {
      const errors = ProfileValidator.validateBasicDemographics(
        25,
        15,
        175,
        'male'
      );
      expect(errors).toHaveLength(1);
      expect(errors[0].field).toBe('weight');
    });

    it('should fail for height below minimum', () => {
      const errors = ProfileValidator.validateBasicDemographics(
        25,
        70,
        50,
        'male'
      );
      expect(errors).toHaveLength(1);
      expect(errors[0].field).toBe('height');
    });

    it('should fail for missing gender', () => {
      const errors = ProfileValidator.validateBasicDemographics(
        25,
        70,
        175,
        ''
      );
      expect(errors).toHaveLength(1);
      expect(errors[0].field).toBe('gender');
    });
  });

  describe('validateDietaryPreferences', () => {
    it('should pass for non-conflicting preferences', () => {
      const preferences: DietaryPreference[] = ['vegetarian', 'gluten_free'];
      const errors = ProfileValidator.validateDietaryPreferences(preferences);
      expect(errors).toHaveLength(0);
    });

    it('should detect vegan and keto conflict', () => {
      const preferences: DietaryPreference[] = ['vegan', 'keto'];
      const errors = ProfileValidator.validateDietaryPreferences(preferences);
      expect(errors.length).toBeGreaterThan(0);
      expect(errors[0].field).toBe('dietaryPreferences');
    });

    it('should detect vegan and vegetarian redundancy', () => {
      const preferences: DietaryPreference[] = ['vegan', 'vegetarian'];
      const errors = ProfileValidator.validateDietaryPreferences(preferences);
      expect(errors.length).toBeGreaterThan(0);
    });

    it('should detect keto and mediterranean conflict', () => {
      const preferences: DietaryPreference[] = ['keto', 'mediterranean'];
      const errors = ProfileValidator.validateDietaryPreferences(preferences);
      expect(errors.length).toBeGreaterThan(0);
    });
  });

  describe('validateConsistency', () => {
    it('should recommend diabetes management for diabetes patients', () => {
      const profile = {
        age: 50,
        weight: 80,
        height: 170,
        gender: 'male' as const,
        medicalConditions: ['diabetes' as const],
        nutritionGoals: ['muscle_gain' as const],
      };
      
      const errors = ProfileValidator.validateConsistency(profile);
      expect(errors.length).toBeGreaterThan(0);
      expect(errors[0].field).toBe('nutritionGoals');
    });

    it('should recommend gluten-free for celiac disease', () => {
      const profile = {
        age: 30,
        weight: 70,
        height: 165,
        gender: 'female' as const,
        medicalConditions: ['celiac_disease' as const],
        dietaryPreferences: ['mediterranean' as const],
      };
      
      const errors = ProfileValidator.validateConsistency(profile);
      expect(errors.length).toBeGreaterThan(0);
      expect(errors[0].field).toBe('dietaryPreferences');
    });

    it('should recommend dairy-free for milk allergy', () => {
      const profile = {
        age: 25,
        weight: 65,
        height: 160,
        gender: 'female' as const,
        foodAllergies: ['milk' as const],
        dietaryPreferences: ['mediterranean' as const],
      };
      
      const errors = ProfileValidator.validateConsistency(profile);
      expect(errors.length).toBeGreaterThan(0);
      expect(errors[0].field).toBe('dietaryPreferences');
    });

    it('should warn about weight loss with low BMI', () => {
      const profile = {
        age: 20,
        weight: 45,
        height: 170,
        gender: 'female' as const,
        nutritionGoals: ['weight_loss' as const],
      };
      
      const errors = ProfileValidator.validateConsistency(profile);
      expect(errors.length).toBeGreaterThan(0);
      expect(errors[0].field).toBe('nutritionGoals');
    });
  });

  describe('validateProfile', () => {
    it('should validate complete profile successfully', () => {
      const profile = {
        age: 30,
        weight: 70,
        height: 175,
        gender: 'male' as const,
        activityLevel: 'moderately_active' as const,
        nutritionGoals: ['maintenance' as const],
        medicalConditions: ['none' as const],
        foodAllergies: ['none' as const],
        dietaryPreferences: ['mediterranean' as const],
      };
      
      const errors = ProfileValidator.validateProfile(profile);
      expect(errors).toHaveLength(0);
    });

    it('should detect multiple issues in profile', () => {
      const profile = {
        age: 10, // Invalid age
        weight: 70,
        height: 175,
        gender: 'male' as const,
        dietaryPreferences: ['vegan' as const, 'keto' as const], // Conflicting
      };
      
      const errors = ProfileValidator.validateProfile(profile);
      expect(errors.length).toBeGreaterThan(1);
    });
  });
});
