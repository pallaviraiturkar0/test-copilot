/**
 * Profile Edit Screen
 * Allows users to edit their profile after initial setup
 */

import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
} from 'react-native';
import { SecureProfileStorage } from '../utils/secureStorage';
import { UserProfile } from '../types/UserProfile';

interface ProfileEditScreenProps {
  onSave?: () => void;
  onStartOnboarding?: () => void;
}

export const ProfileEditScreen: React.FC<ProfileEditScreenProps> = ({
  onSave,
  onStartOnboarding,
}) => {
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
      Alert.alert('Error', 'Failed to load profile');
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteProfile = () => {
    Alert.alert(
      'Delete Profile',
      'Are you sure you want to delete your profile? This action cannot be undone.',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: async () => {
            try {
              await SecureProfileStorage.deleteProfile();
              Alert.alert('Success', 'Profile deleted successfully', [
                { text: 'OK', onPress: onStartOnboarding },
              ]);
            } catch (error) {
              Alert.alert('Error', 'Failed to delete profile');
            }
          },
        },
      ]
    );
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#4CAF50" />
        <Text style={styles.loadingText}>Loading profile...</Text>
      </View>
    );
  }

  if (!profile) {
    return (
      <View style={styles.emptyContainer}>
        <Text style={styles.emptyTitle}>No Profile Found</Text>
        <Text style={styles.emptyText}>
          You haven't set up your profile yet. Let's get started!
        </Text>
        <TouchableOpacity style={styles.button} onPress={onStartOnboarding}>
          <Text style={styles.buttonText}>Create Profile</Text>
        </TouchableOpacity>
      </View>
    );
  }

  const formatArray = (arr: any[]) => {
    return arr
      .filter((item) => item !== 'none')
      .map((item) => item.replace(/_/g, ' '))
      .join(', ') || 'None';
  };

  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <Text style={styles.title}>Your Profile</Text>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Basic Information</Text>
          <View style={styles.infoRow}>
            <Text style={styles.label}>Age:</Text>
            <Text style={styles.value}>{profile.age} years</Text>
          </View>
          <View style={styles.infoRow}>
            <Text style={styles.label}>Weight:</Text>
            <Text style={styles.value}>{profile.weight} kg</Text>
          </View>
          <View style={styles.infoRow}>
            <Text style={styles.label}>Height:</Text>
            <Text style={styles.value}>{profile.height} cm</Text>
          </View>
          <View style={styles.infoRow}>
            <Text style={styles.label}>Gender:</Text>
            <Text style={styles.value}>
              {profile.gender.replace(/_/g, ' ')}
            </Text>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Activity & Goals</Text>
          <View style={styles.infoRow}>
            <Text style={styles.label}>Activity Level:</Text>
            <Text style={styles.value}>
              {profile.activityLevel.replace(/_/g, ' ')}
            </Text>
          </View>
          <View style={styles.infoRow}>
            <Text style={styles.label}>Nutrition Goals:</Text>
            <Text style={styles.value}>{formatArray(profile.nutritionGoals)}</Text>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Health Information</Text>
          <View style={styles.infoRow}>
            <Text style={styles.label}>Medical Conditions:</Text>
            <Text style={styles.value}>
              {formatArray(profile.medicalConditions)}
            </Text>
          </View>
          <View style={styles.infoRow}>
            <Text style={styles.label}>Food Allergies:</Text>
            <Text style={styles.value}>{formatArray(profile.foodAllergies)}</Text>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Dietary Preferences</Text>
          <View style={styles.infoRow}>
            <Text style={styles.value}>
              {formatArray(profile.dietaryPreferences)}
            </Text>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.timestamp}>
            Last updated: {new Date(profile.updatedAt).toLocaleDateString()}
          </Text>
        </View>
      </ScrollView>

      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.deleteButton}
          onPress={handleDeleteProfile}
        >
          <Text style={styles.deleteButtonText}>Delete Profile</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.editButton} onPress={onStartOnboarding}>
          <Text style={styles.buttonText}>Edit Profile</Text>
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
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  loadingText: {
    marginTop: 12,
    fontSize: 16,
    color: '#666',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#fff',
  },
  emptyTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 12,
  },
  emptyText: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginBottom: 24,
  },
  scrollView: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 24,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    marginBottom: 12,
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  label: {
    fontSize: 15,
    color: '#666',
    flex: 1,
  },
  value: {
    fontSize: 15,
    color: '#333',
    flex: 2,
    textAlign: 'right',
    textTransform: 'capitalize',
  },
  timestamp: {
    fontSize: 13,
    color: '#999',
    fontStyle: 'italic',
  },
  buttonContainer: {
    flexDirection: 'row',
    padding: 20,
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: '#e0e0e0',
    gap: 12,
  },
  button: {
    backgroundColor: '#4CAF50',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
    minWidth: 200,
  },
  editButton: {
    flex: 1,
    backgroundColor: '#4CAF50',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
  },
  deleteButton: {
    flex: 1,
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#f44336',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  deleteButtonText: {
    color: '#f44336',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
