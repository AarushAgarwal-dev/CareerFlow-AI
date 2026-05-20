import { useState, useEffect } from 'react';
import { userData as DEFAULT_USER_DATA } from '../data/userData';

const STORAGE_KEY = 'careerflow_user_profile';

/**
 * Retrieves the current user profile from localStorage.
 * Automatically initializes with DEFAULT_USER_DATA if empty.
 */
export const getStoredProfile = () => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(DEFAULT_USER_DATA));
        return DEFAULT_USER_DATA;
    }
    try {
        return JSON.parse(stored);
    } catch (e) {
        console.error("Error parsing stored profile, falling back to default:", e);
        return DEFAULT_USER_DATA;
    }
};

/**
 * Saves a new profile state to localStorage and dispatches a custom event to update active subscribers.
 */
export const saveStoredProfile = (profile) => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(profile));
    window.dispatchEvent(new Event('profile-updated'));
};

/**
 * Resets the user profile in localStorage back to the original sample template.
 */
export const resetStoredProfile = () => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(DEFAULT_USER_DATA));
    window.dispatchEvent(new Event('profile-updated'));
    return DEFAULT_USER_DATA;
};

/**
 * React hook to access and dynamically update the active user profile.
 * Synchronizes instantly across components.
 */
export const useProfile = () => {
    const [profile, setProfile] = useState(() => getStoredProfile());

    useEffect(() => {
        const handleUpdate = () => {
            setProfile(getStoredProfile());
        };
        window.addEventListener('profile-updated', handleUpdate);
        return () => {
            window.removeEventListener('profile-updated', handleUpdate);
        };
    }, []);

    const updateProfile = (newProfile) => {
        saveStoredProfile(newProfile);
    };

    const resetProfile = () => {
        return resetStoredProfile();
    };

    return {
        profile,
        updateProfile,
        resetProfile
    };
};
