/**
 * Home Screen
 * Main dashboard after profile setup
 */

import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import { SecureProfileStorage } from '../utils/secureStorage';
import { UserProfile } from '../types/UserProfile';

interface HomeScreenProps {
  onEditProfile: () => void;
}

export const HomeScreen: React.FC<HomeScreenProps> = ({ onEditProfile }) => {
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadProfile();
  }, []);

  const loadProfile = async () => {
    try {
      const loadedProfile = await SecureProfileStorage.loadProfile();
      setProfile(loadedProfile);
    } catch (error) {
      console.error('Error loading profile:', error);
    } finally {
      setLoading(false);
    }
  };

  const calculateBMI = () => {
    if (!profile) return 0;
    const heightInMeters = profile.height / 100;
    return (profile.weight / (heightInMeters * heightInMeters)).toFixed(1);
  };

  const getBMICategory = (bmi: number) => {
    if (bmi < 18.5) return { category: 'Underweight', color: '#FF9800' };
    if (bmi < 25) return { category: 'Normal', color: '#4CAF50' };
    if (bmi < 30) return { category: 'Overweight', color: '#FF9800' };
    return { category: 'Obese', color: '#f44336' };
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#4CAF50" />
      </View>
    );
  }

  if (!profile) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>Failed to load profile</Text>
      </View>
    );
  }

  const bmi = parseFloat(calculateBMI());
  const bmiInfo = getBMICategory(bmi);

  return (
    <ScrollView style={styles.container}>
      <View style={styles.welcomeSection}>
        <Text style={styles.welcomeText}>Welcome back!</Text>
        <Text style={styles.subtitle}>
          Here's your health overview
        </Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>BMI</Text>
        <Text style={[styles.bmiValue, { color: bmiInfo.color }]}>{bmi}</Text>
        <Text style={[styles.bmiCategory, { color: bmiInfo.color }]}>
          {bmiInfo.category}
        </Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>Your Goals</Text>
        {profile.nutritionGoals
          .filter((goal) => goal !== 'none')
          .map((goal, index) => (
            <View key={index} style={styles.goalItem}>
              <Text style={styles.goalText}>
                • {goal.replace(/_/g, ' ')}
              </Text>
            </View>
          ))}
      </View>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>Activity Level</Text>
        <Text style={styles.infoText}>
          {profile.activityLevel.replace(/_/g, ' ')}
        </Text>
      </View>

      {profile.medicalConditions.filter((c) => c !== 'none').length > 0 && (
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Health Considerations</Text>
          {profile.medicalConditions
            .filter((condition) => condition !== 'none')
            .map((condition, index) => (
              <Text key={index} style={styles.infoText}>
                • {condition.replace(/_/g, ' ')}
              </Text>
            ))}
        </View>
      )}

      {profile.foodAllergies.filter((a) => a !== 'none').length > 0 && (
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Food Allergies</Text>
          {profile.foodAllergies
            .filter((allergy) => allergy !== 'none')
            .map((allergy, index) => (
              <Text key={index} style={styles.infoText}>
                • {allergy.replace(/_/g, ' ')}
              </Text>
            ))}
        </View>
      )}

      {profile.dietaryPreferences.filter((p) => p !== 'none').length > 0 && (
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Dietary Preferences</Text>
          {profile.dietaryPreferences
            .filter((pref) => pref !== 'none')
            .map((pref, index) => (
              <Text key={index} style={styles.infoText}>
                • {pref.replace(/_/g, ' ')}
              </Text>
            ))}
        </View>
      )}

      <TouchableOpacity style={styles.editButton} onPress={onEditProfile}>
        <Text style={styles.editButtonText}>Edit Profile</Text>
      </TouchableOpacity>

      <View style={styles.spacer} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
  },
  welcomeSection: {
    backgroundColor: '#4CAF50',
    padding: 24,
    paddingTop: 32,
    paddingBottom: 32,
  },
  welcomeText: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#fff',
    opacity: 0.9,
  },
  card: {
    backgroundColor: '#fff',
    margin: 16,
    marginTop: 8,
    marginBottom: 8,
    padding: 20,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 12,
  },
  bmiValue: {
    fontSize: 48,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 8,
  },
  bmiCategory: {
    fontSize: 18,
    fontWeight: '600',
    textAlign: 'center',
    textTransform: 'uppercase',
  },
  goalItem: {
    marginBottom: 8,
  },
  goalText: {
    fontSize: 16,
    color: '#333',
    textTransform: 'capitalize',
  },
  infoText: {
    fontSize: 16,
    color: '#333',
    marginBottom: 4,
    textTransform: 'capitalize',
  },
  editButton: {
    backgroundColor: '#4CAF50',
    margin: 16,
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
  },
  editButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  errorText: {
    fontSize: 16,
    color: '#f44336',
    textAlign: 'center',
  },
  spacer: {
    height: 20,
  },
});
