/**
 * Secure Storage Utility
 * Handles encrypted storage of sensitive user health data
 */

import * as SecureStore from 'expo-secure-store';
import * as Crypto from 'expo-crypto';
import { UserProfile } from '../types/UserProfile';

const PROFILE_KEY = 'user_profile';
const ENCRYPTION_KEY = 'encryption_key';

export class SecureProfileStorage {
  /**
   * Generate or retrieve encryption key
   */
  private static async getEncryptionKey(): Promise<string> {
    let key = await SecureStore.getItemAsync(ENCRYPTION_KEY);
    
    if (!key) {
      // Generate a new key
      const randomBytes = await Crypto.getRandomBytesAsync(32);
      key = Array.from(randomBytes)
        .map(b => b.toString(16).padStart(2, '0'))
        .join('');
      await SecureStore.setItemAsync(ENCRYPTION_KEY, key);
    }
    
    return key;
  }

  /**
   * Simple XOR encryption for demo purposes
   * In production, use a proper encryption library
   */
  private static async encrypt(data: string): Promise<string> {
    const key = await this.getEncryptionKey();
    let encrypted = '';
    
    for (let i = 0; i < data.length; i++) {
      const charCode = data.charCodeAt(i);
      const keyChar = key.charCodeAt(i % key.length);
      encrypted += String.fromCharCode(charCode ^ keyChar);
    }
    
    // Base64 encode the result
    return Buffer.from(encrypted).toString('base64');
  }

  /**
   * Simple XOR decryption
   */
  private static async decrypt(encryptedData: string): Promise<string> {
    const key = await this.getEncryptionKey();
    const encrypted = Buffer.from(encryptedData, 'base64').toString();
    let decrypted = '';
    
    for (let i = 0; i < encrypted.length; i++) {
      const charCode = encrypted.charCodeAt(i);
      const keyChar = key.charCodeAt(i % key.length);
      decrypted += String.fromCharCode(charCode ^ keyChar);
    }
    
    return decrypted;
  }

  /**
   * Save user profile securely
   */
  static async saveProfile(profile: UserProfile): Promise<void> {
    try {
      const profileData = JSON.stringify(profile);
      const encryptedData = await this.encrypt(profileData);
      await SecureStore.setItemAsync(PROFILE_KEY, encryptedData);
    } catch (error) {
      console.error('Error saving profile:', error);
      throw new Error('Failed to save profile securely');
    }
  }

  /**
   * Load user profile
   */
  static async loadProfile(): Promise<UserProfile | null> {
    try {
      const encryptedData = await SecureStore.getItemAsync(PROFILE_KEY);
      
      if (!encryptedData) {
        return null;
      }
      
      const decryptedData = await this.decrypt(encryptedData);
      return JSON.parse(decryptedData) as UserProfile;
    } catch (error) {
      console.error('Error loading profile:', error);
      throw new Error('Failed to load profile');
    }
  }

  /**
   * Check if profile exists
   */
  static async hasProfile(): Promise<boolean> {
    try {
      const encryptedData = await SecureStore.getItemAsync(PROFILE_KEY);
      return encryptedData !== null;
    } catch (error) {
      console.error('Error checking profile:', error);
      return false;
    }
  }

  /**
   * Delete user profile
   */
  static async deleteProfile(): Promise<void> {
    try {
      await SecureStore.deleteItemAsync(PROFILE_KEY);
    } catch (error) {
      console.error('Error deleting profile:', error);
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
