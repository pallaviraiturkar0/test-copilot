# Nutrition App 🥗

A comprehensive mobile application for personalized nutrition planning with secure health data management.

## Features

- **Multi-step Onboarding Flow**: Guided setup process with progress indicators
- **Comprehensive Health Data Collection**:
  - Basic demographics (age, weight, height, gender)
  - Activity level selection
  - Nutrition goals (weight loss, muscle gain, diabetes management, etc.)
  - Medical conditions tracking
  - Food allergies and intolerances
  - Dietary preferences (vegetarian, vegan, keto, etc.)
- **Data Validation**: Intelligent validation with logical consistency checks
- **Secure Storage**: Encrypted storage of sensitive health information
- **Profile Management**: Easy editing and updating of user profiles
- **Privacy First**: Clear privacy policy and health data handling disclosure

## Technology Stack

- **React Native with Expo**: Cross-platform mobile development
- **React Navigation**: Navigation management
- **Expo Secure Store**: Encrypted data storage
- **TypeScript**: Type-safe code structure

## Setup Instructions

1. Clone the repository:
   ```bash
   git clone https://github.com/pallaviraiturkar0/test-copilot.git
   ```

2. Navigate to the project directory:
   ```bash
   cd test-copilot
   ```

3. Install the dependencies:
   ```bash
   npm install
   ```

4. Start the development server:
   ```bash
   npm start
   ```

5. Run on your preferred platform:
   ```bash
   npm run android  # For Android
   npm run ios      # For iOS
   npm run web      # For Web
   ```

## Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── ProgressIndicator.tsx
│   ├── MultiSelectList.tsx
│   └── SingleSelectList.tsx
├── screens/            # Screen components
│   ├── onboarding/     # Onboarding step screens
│   ├── HomeScreen.tsx
│   ├── ProfileEditScreen.tsx
│   ├── PrivacyPolicyScreen.tsx
│   └── OnboardingContainer.tsx
├── types/              # TypeScript type definitions
│   └── UserProfile.ts
├── utils/              # Utility functions
│   ├── validation.ts
│   └── secureStorage.ts
└── constants/          # App constants and options
    └── options.ts
```

## Security Features

- **Encrypted Storage**: All health data is encrypted using Expo Secure Store
- **Local Storage**: Data stored locally on device, never transmitted
- **Privacy Controls**: Users can delete their data at any time
- **Data Validation**: Comprehensive validation to ensure data integrity

## Health Data Handling

This app takes user privacy seriously:
- Health information is stored securely on the user's device
- Data is encrypted using industry-standard methods
- No data is shared with third parties
- Users maintain full control over their data
- Medical disclaimer provided before data collection

## Validation Features

- **Demographics Validation**: Age (13-120), weight (20-300 kg), height (100-250 cm)
- **Logical Consistency Checks**:
  - Conflicting dietary preferences detection (e.g., vegan + keto)
  - Medical condition alignment with nutrition goals
  - Allergy and dietary preference correlation
  - BMI-based goal recommendations

## Contribution Guidelines

1. Fork the repository
2. Create a new branch for your feature or fix:
   ```bash
   git checkout -b feature/YourFeature
   ```
3. Commit your changes:
   ```bash
   git commit -m "Add your message"
   ```
4. Push to the branch:
   ```bash
   git push origin feature/YourFeature
   ```
5. Create a pull request

## License

This project is open source and available under the MIT License.

## Support

For questions or issues, please open an issue on GitHub.