/**
 * Secure Storage Utility
 * Handles encrypted storage of sensitive user health data
 * 
 * Security Note: This implementation uses Expo SecureStore which provides
 * hardware-backed encryption on both iOS (Keychain) and Android (Keystore).
 * The data is encrypted at rest by the OS-level secure storage.
 */

import * as SecureStore from 'expo-secure-store';
import * as Crypto from 'expo-crypto';
import { UserProfile } from '../types/UserProfile';

const PROFILE_KEY = 'user_profile';
const PROFILE_HASH_KEY = 'user_profile_hash';

export class SecureProfileStorage {
  /**
   * Generate a hash of the data for integrity verification
   * Uses SHA-256 to ensure data hasn't been tampered with
   */
  private static async generateHash(data: string): Promise<string> {
    const digest = await Crypto.digestStringAsync(
      Crypto.CryptoDigestAlgorithm.SHA256,
      data
    );
    return digest;
  }

  /**
   * Verify data integrity by comparing hashes
   */
  private static async verifyIntegrity(data: string, expectedHash: string): Promise<boolean> {
    const actualHash = await this.generateHash(data);
    return actualHash === expectedHash;
  }

  /**
   * Prepare data for storage
   * SecureStore provides OS-level encryption, so we focus on integrity
   */
  private static async prepareForStorage(data: string): Promise<{ data: string; hash: string }> {
    const hash = await this.generateHash(data);
    return { data, hash };
  }

  /**
   * Save user profile securely
   * 
   * Security Implementation:
   * - Data is stored using Expo SecureStore
   * - iOS: Encrypted with hardware-backed keychain (AES-256)
   * - Android: Encrypted with hardware-backed keystore (AES-256)
   * - SHA-256 hash stored separately for integrity verification
   */
  static async saveProfile(profile: UserProfile): Promise<void> {
    try {
      const profileData = JSON.stringify(profile);
      const { data, hash } = await this.prepareForStorage(profileData);
      
      // Save both data and hash to SecureStore
      // SecureStore automatically encrypts data using OS-level encryption
      await SecureStore.setItemAsync(PROFILE_KEY, data);
      await SecureStore.setItemAsync(PROFILE_HASH_KEY, hash);
    } catch (error) {
      // Don't log error details to avoid exposing sensitive information
      throw new Error('Failed to save profile securely');
    }
  }

  /**
   * Load user profile
   * 
   * Verifies data integrity using stored hash before returning
   */
  static async loadProfile(): Promise<UserProfile | null> {
    try {
      const profileData = await SecureStore.getItemAsync(PROFILE_KEY);
      const storedHash = await SecureStore.getItemAsync(PROFILE_HASH_KEY);
      
      if (!profileData) {
        return null;
      }
      
      // Verify data integrity
      if (storedHash) {
        const isValid = await this.verifyIntegrity(profileData, storedHash);
        if (!isValid) {
          throw new Error('Data integrity check failed');
        }
      }
      
      return JSON.parse(profileData) as UserProfile;
    } catch (error) {
      // Don't log error details to avoid exposing sensitive information
      throw new Error('Failed to load profile');
    }
  }

  /**
   * Check if profile exists
   */
  static async hasProfile(): Promise<boolean> {
    try {
      const profileData = await SecureStore.getItemAsync(PROFILE_KEY);
      return profileData !== null;
    } catch (error) {
      return false;
    }
  }

  /**
   * Delete user profile
   * Removes both the profile data and integrity hash
   */
  static async deleteProfile(): Promise<void> {
    try {
      await SecureStore.deleteItemAsync(PROFILE_KEY);
      await SecureStore.deleteItemAsync(PROFILE_HASH_KEY);
    } catch (error) {
      throw new Error('Failed to delete profile');
    }
  }

  /**
   * Update specific profile fields
   */
  static async updateProfile(updates: Partial<UserProfile>): Promise<void> {
    try {
      const existingProfile = await this.loadProfile();
      
      if (!existingProfile) {
        throw new Error('No existing profile found');
      }
      
      const updatedProfile: UserProfile = {
        ...existingProfile,
        ...updates,
        updatedAt: new Date().toISOString(),
      };
      
      await this.saveProfile(updatedProfile);
    } catch (error) {
      console.error('Error updating profile:', error);
      throw new Error('Failed to update profile');
    }
  }
}
