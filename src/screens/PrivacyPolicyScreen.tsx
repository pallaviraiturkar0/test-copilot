/**
 * Privacy Policy Screen
 * Displays privacy policy and health data handling disclosure
 */

import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';

interface PrivacyPolicyScreenProps {
  onAccept: () => void;
  onDecline?: () => void;
}

export const PrivacyPolicyScreen: React.FC<PrivacyPolicyScreenProps> = ({
  onAccept,
  onDecline,
}) => {
  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <Text style={styles.title}>Privacy Policy & Health Data Handling</Text>
        
        <Text style={styles.sectionTitle}>Your Privacy Matters</Text>
        <Text style={styles.text}>
          We take your privacy and the security of your health information seriously.
          This notice explains how we collect, use, and protect your data.
        </Text>

        <Text style={styles.sectionTitle}>What Information We Collect</Text>
        <Text style={styles.text}>
          • Basic demographics (age, weight, height, gender){'\n'}
          • Activity level and fitness information{'\n'}
          • Nutrition goals and dietary preferences{'\n'}
          • Medical conditions (for personalization purposes){'\n'}
          • Food allergies and intolerances
        </Text>

        <Text style={styles.sectionTitle}>How We Use Your Information</Text>
        <Text style={styles.text}>
          Your health information is used exclusively to:{'\n'}
          • Personalize your nutrition recommendations{'\n'}
          • Generate safe and appropriate meal plans{'\n'}
          • Track your progress toward your goals{'\n'}
          • Provide relevant health and nutrition insights
        </Text>

        <Text style={styles.sectionTitle}>Data Security</Text>
        <Text style={styles.text}>
          • All health data is encrypted and stored securely on your device{'\n'}
          • We use industry-standard encryption methods{'\n'}
          • Your data is never shared with third parties{'\n'}
          • You can delete your data at any time
        </Text>

        <Text style={styles.sectionTitle}>Your Rights</Text>
        <Text style={styles.text}>
          You have the right to:{'\n'}
          • Access your stored health information{'\n'}
          • Update or correct your data at any time{'\n'}
          • Delete your profile and all associated data{'\n'}
          • Withdraw consent and discontinue use of the app
        </Text>

        <Text style={styles.sectionTitle}>Medical Disclaimer</Text>
        <Text style={styles.text}>
          This app provides general nutrition information and is not intended to
          replace professional medical advice. Always consult with a healthcare
          provider before making significant dietary changes, especially if you
          have medical conditions or food allergies.
        </Text>

        <Text style={styles.sectionTitle}>Contact & Support</Text>
        <Text style={styles.text}>
          If you have questions about our privacy practices or data handling,
          please contact our support team.
        </Text>

        <View style={styles.spacer} />
      </ScrollView>

      <View style={styles.buttonContainer}>
        {onDecline && (
          <TouchableOpacity style={styles.declineButton} onPress={onDecline}>
            <Text style={styles.declineButtonText}>Decline</Text>
          </TouchableOpacity>
        )}
        <TouchableOpacity
          style={[styles.acceptButton, !onDecline && styles.acceptButtonFull]}
          onPress={onAccept}
        >
          <Text style={styles.acceptButtonText}>Accept & Continue</Text>
        </TouchableOpacity>
      </View>
    </View>
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
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    marginTop: 16,
    marginBottom: 8,
  },
  text: {
    fontSize: 15,
    color: '#666',
    lineHeight: 22,
    marginBottom: 12,
  },
  spacer: {
    height: 20,
  },
  buttonContainer: {
    flexDirection: 'row',
    padding: 20,
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: '#e0e0e0',
    gap: 12,
  },
  declineButton: {
    flex: 1,
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#999',
  },
  declineButtonText: {
    color: '#666',
    fontSize: 16,
    fontWeight: 'bold',
  },
  acceptButton: {
    flex: 1,
    backgroundColor: '#4CAF50',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
  },
  acceptButtonFull: {
    flex: 1,
  },
  acceptButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
