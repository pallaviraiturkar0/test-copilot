# Nutrition App Architecture

## Overview

This is a React Native mobile application built with Expo that provides a comprehensive user onboarding system for collecting health and nutrition data.

## System Architecture

### Data Flow

1. **Privacy Policy** → User must accept before proceeding
2. **Onboarding Flow** → 6-step data collection process
3. **Profile Storage** → Encrypted local storage
4. **Home Dashboard** → Display user data and insights
5. **Profile Management** → Edit and update profile

### Component Hierarchy

```
App.tsx (Root)
├── PrivacyPolicyScreen
└── NavigationContainer
    ├── OnboardingContainer
    │   ├── ProgressIndicator
    │   ├── Step1BasicInfo
    │   │   └── SingleSelectList
    │   ├── Step2ActivityLevel
    │   │   └── SingleSelectList
    │   ├── Step3NutritionGoals
    │   │   └── MultiSelectList
    │   ├── Step4MedicalConditions
    │   │   └── MultiSelectList
    │   ├── Step5FoodAllergies
    │   │   └── MultiSelectList
    │   └── Step6DietaryPreferences
    │       └── MultiSelectList
    ├── HomeScreen
    └── ProfileEditScreen
```

## Data Model

### UserProfile

The core data structure that stores all user information:

```typescript
interface UserProfile {
  // Demographics
  age: number;
  weight: number; // kg
  height: number; // cm
  gender: Gender;
  
  // Activity & Goals
  activityLevel: ActivityLevel;
  nutritionGoals: NutritionGoal[];
  
  // Health Information
  medicalConditions: MedicalCondition[];
  foodAllergies: FoodAllergy[];
  dietaryPreferences: DietaryPreference[];
  
  // Metadata
  createdAt: string;
  updatedAt: string;
}
```

## Security Implementation

### Encryption

- **Storage**: Expo SecureStore (iOS Keychain / Android Keystore)
- **Encryption Method**: XOR cipher with device-specific key
- **Key Management**: Auto-generated on first use, stored securely

### Data Protection

1. **Local Only**: All data stored on device
2. **No Transmission**: Data never sent to servers
3. **User Control**: Users can delete data anytime
4. **Encrypted**: Health data encrypted at rest

## Validation System

### Three-Level Validation

1. **Field Validation**
   - Age: 13-120 years
   - Weight: 20-300 kg
   - Height: 100-250 cm
   - Required fields

2. **Logical Consistency**
   - Conflicting dietary preferences (vegan + keto)
   - Medical condition alignment
   - Allergy-diet correlation

3. **Health Recommendations**
   - BMI-based goal suggestions
   - Medical condition warnings
   - Safety recommendations

## Screen Flow

### First Launch
```
Privacy Policy → Onboarding (Step 1-6) → Home Dashboard
```

### Returning User
```
Home Dashboard ↔ Profile Edit ↔ Onboarding (Edit Mode)
```

### Profile Management
```
Home → View Profile → Edit Profile → Re-run Onboarding
```

## Technology Stack

### Core Technologies
- **React Native**: Cross-platform mobile framework
- **Expo**: Development platform and SDK
- **TypeScript**: Type-safe development
- **React Navigation**: Navigation management

### Key Libraries
- `expo-secure-store`: Encrypted storage
- `expo-crypto`: Cryptographic operations
- `@react-navigation/native`: Navigation
- `@react-navigation/stack`: Stack navigation

### Development Tools
- **Jest**: Testing framework
- **ESLint**: Code linting
- **TypeScript**: Static typing
- **Metro**: JavaScript bundler

## Onboarding Steps

### Step 1: Basic Demographics
- Age input (number)
- Weight input (decimal)
- Height input (number)
- Gender selection (radio)

### Step 2: Activity Level
- Single selection from 4 options
- Descriptive text for each level

### Step 3: Nutrition Goals
- Multiple selection allowed
- 5 goal options

### Step 4: Medical Conditions
- Multiple selection
- 8 condition options
- Informational disclaimer

### Step 5: Food Allergies
- Multiple selection
- 11 allergy options
- Safety warning

### Step 6: Dietary Preferences
- Multiple selection
- 10 preference options
- Conflict validation
- Completion action

## Extensibility

### Adding New Options

1. Update type definitions in `src/types/UserProfile.ts`
2. Add options to `src/constants/options.ts`
3. Update validation in `src/utils/validation.ts`

### Adding New Steps

1. Create new step component in `src/screens/onboarding/`
2. Add to `OnboardingContainer.tsx`
3. Update `ONBOARDING_STEPS` constant
4. Add validation logic

### Customizing Validation

Validation rules are centralized in `src/utils/validation.ts`:
- `validateBasicDemographics()`: Field-level validation
- `validateDietaryPreferences()`: Conflict detection
- `validateConsistency()`: Cross-field validation

## Best Practices

### Security
- Never log sensitive health data
- Always use SecureStore for health info
- Validate all user inputs
- Provide clear privacy disclosures

### UX
- Show progress indicator
- Allow navigation backward
- Provide helpful descriptions
- Display validation errors clearly

### Development
- Use TypeScript for type safety
- Write tests for validation logic
- Keep components focused and reusable
- Follow React Native best practices

## Future Enhancements

### Potential Features
- Data export functionality
- Cloud backup (optional, with consent)
- Integration with health apps
- Meal plan generation
- Progress tracking
- Calorie calculator
- Nutrition insights

### Technical Improvements
- Stronger encryption algorithm
- Biometric authentication
- Offline sync capabilities
- Analytics (privacy-preserving)
- A/B testing framework
- Performance optimization
