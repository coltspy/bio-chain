'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function ResearcherSettings() {
  const [activeTab, setActiveTab] = useState('profile');
  const [isSaved, setIsSaved] = useState(false);
  
  const [profileForm, setProfileForm] = useState({
    name: 'Dr. Sarah Johnson',
    jobTitle: 'Senior Research Scientist',
    institution: 'University Research Center',
    department: 'Oncology Research',
    email: 'sarah.johnson@researchcenter.edu',
    phone: '(555) 123-4567',
    bio: 'Experienced researcher specializing in oncology biomarkers with over 10 years in clinical research. Focus on early cancer detection methodologies and personalized medicine approaches.',
    orcid: '0000-0002-1234-5678',
    researchInterests: 'Cancer biomarkers, Precision medicine, Genetics, Proteomics'
  });
  
  const [notificationSettings, setNotificationSettings] = useState({
    emailNotifications: true,
    specimenAvailability: true,
    inquiryUpdates: true,
    weeklyDigest: false,
    systemAnnouncements: true
  });
  
  const [privacySettings, setPrivacySettings] = useState({
    showProfile: true,
    showInstitution: true,
    showContact: false,
    shareUsageData: true
  });
  
  const handleProfileChange = (e) => {
    const { name, value } = e.target;
    setProfileForm({
      ...profileForm,
      [name]: value
    });
  };
  
  const handleToggleChange = (settingType: string, name: string) => {
    if (settingType === 'notification') {
      setNotificationSettings({
        ...notificationSettings,
        [name]: !notificationSettings[name]
      });
    } else if (settingType === 'privacy') {
      setPrivacySettings({
        ...privacySettings,
        [name]: !privacySettings[name]
      });
    }
  };
  
  const handleSaveSettings = () => {
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 3000);
  };
  
  return (
    <div className="max-w-7xl mx-auto p-4 sm:p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Account Settings</h1>
        <p className="text-sm text-gray-500">
          Manage your profile, preferences, and account settings
        </p>
      </div>
      
      {/* Settings Tabs */}
      <div className="bg-white rounded-lg shadow mb-6 overflow-hidden">
        <div className="border-b border-gray-200">
          <nav className="flex -mb-px">
            {[
              { key: 'profile', label: 'Profile' },
              { key: 'notifications', label: 'Notifications' },
              { key: 'privacy', label: 'Privacy' },
              { key: 'security', label: 'Security' }
            ].map(tab => (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                className={`py-4 px-6 text-sm font-medium ${
                  activeTab === tab.key
                    ? 'border-b-2 border-indigo-500 text-indigo-600'
                    : 'text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </nav>
        </div>
        
        <div className="p-6">
          {/* Profile Settings */}
          {activeTab === 'profile' && (
            <div>
              <h2 className="text-lg font-medium text-gray-900 mb-4">Researcher Profile</h2>
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                    Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    id="name"
                    value={profileForm.name}
                    onChange={handleProfileChange}
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  />
                </div>
                
                <div>
                  <label htmlFor="jobTitle" className="block text-sm font-medium text-gray-700">
                    Job Title
                  </label>
                  <input
                    type="text"
                    name="jobTitle"
                    id="jobTitle"
                    value={profileForm.jobTitle}
                    onChange={handleProfileChange}
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  />
                </div>
                
                <div>
                  <label htmlFor="institution" className="block text-sm font-medium text-gray-700">
                    Institution
                  </label>
                  <input
                    type="text"
                    name="institution"
                    id="institution"
                    value={profileForm.institution}
                    onChange={handleProfileChange}
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  />
                </div>
                
                <div>
                  <label htmlFor="department" className="block text-sm font-medium text-gray-700">
                    Department
                  </label>
                  <input
                    type="text"
                    name="department"
                    id="department"
                    value={profileForm.department}
                    onChange={handleProfileChange}
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  />
                </div>
                
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                    Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    id="email"
                    value={profileForm.email}
                    onChange={handleProfileChange}
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  />
                </div>
                
                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
                    Phone
                  </label>
                  <input
                    type="text"
                    name="phone"
                    id="phone"
                    value={profileForm.phone}
                    onChange={handleProfileChange}
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  />
                </div>
                
                <div className="sm:col-span-2">
                  <label htmlFor="researchInterests" className="block text-sm font-medium text-gray-700">
                    Research Interests
                  </label>
                  <input
                    type="text"
                    name="researchInterests"
                    id="researchInterests"
                    value={profileForm.researchInterests}
                    onChange={handleProfileChange}
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    placeholder="Separate with commas"
                  />
                </div>
                
                <div className="sm:col-span-2">
                  <label htmlFor="bio" className="block text-sm font-medium text-gray-700">
                    Professional Bio
                  </label>
                  <textarea
                    name="bio"
                    id="bio"
                    rows={4}
                    value={profileForm.bio}
                    onChange={handleProfileChange}
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  ></textarea>
                </div>
                
                <div className="sm:col-span-2">
                  <h3 className="text-sm font-medium text-gray-700 mb-2">Profile Photo</h3>
                  <div className="flex items-center">
                    <div className="h-16 w-16 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-500">
                      <svg className="h-8 w-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                      </svg>
                    </div>
                    <button className="ml-4 bg-white py-2 px-3 border border-gray-300 rounded-md shadow-sm text-sm leading-4 font-medium text-gray-700 hover:bg-gray-50 focus:outline-none">
                      Change
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
          
          {/* Notification Settings */}
          {activeTab === 'notifications' && (
            <div>
              <h2 className="text-lg font-medium text-gray-900 mb-4">Notification Preferences</h2>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-sm font-medium text-gray-700">Email Notifications</h3>
                    <p className="text-xs text-gray-500">Receive all notifications via email</p>
                  </div>
                  <div className="flex items-center">
                    <button
                      type="button"
                      onClick={() => handleToggleChange('notification', 'emailNotifications')}
                      className={`${
                        notificationSettings.emailNotifications ? 'bg-indigo-600' : 'bg-gray-200'
                      } relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none`}
                    >
                      <span
                        className={`${
                          notificationSettings.emailNotifications ? 'translate-x-5' : 'translate-x-0'
                        } pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out`}
                      ></span>
                    </button>
                  </div>
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-sm font-medium text-gray-700">Specimen Availability</h3>
                    <p className="text-xs text-gray-500">Get notified when new specimens matching your criteria become available</p>
                  </div>
                  <div className="flex items-center">
                    <button
                      type="button"
                      onClick={() => handleToggleChange('notification', 'specimenAvailability')}
                      className={`${
                        notificationSettings.specimenAvailability ? 'bg-indigo-600' : 'bg-gray-200'
                      } relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none`}
                    >
                      <span
                        className={`${
                          notificationSettings.specimenAvailability ? 'translate-x-5' : 'translate-x-0'
                        } pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out`}
                      ></span>
                    </button>
                  </div>
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-sm font-medium text-gray-700">Inquiry Updates</h3>
                    <p className="text-xs text-gray-500">Receive notifications when there are updates to your inquiries</p>
                  </div>
                  <div className="flex items-center">
                    <button
                      type="button"
                      onClick={() => handleToggleChange('notification', 'inquiryUpdates')}
                      className={`${
                        notificationSettings.inquiryUpdates ? 'bg-indigo-600' : 'bg-gray-200'
                      } relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none`}
                    >
                      <span
                        className={`${
                          notificationSettings.inquiryUpdates ? 'translate-x-5' : 'translate-x-0'
                        } pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out`}
                      ></span>
                    </button>
                  </div>
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-sm font-medium text-gray-700">Weekly Digest</h3>
                    <p className="text-xs text-gray-500">Receive a weekly summary of platform activity</p>
                  </div>
                  <div className="flex items-center">
                    <button
                      type="button"
                      onClick={() => handleToggleChange('notification', 'weeklyDigest')}
                      className={`${
                        notificationSettings.weeklyDigest ? 'bg-indigo-600' : 'bg-gray-200'
                      } relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none`}
                    >
                      <span
                        className={`${
                          notificationSettings.weeklyDigest ? 'translate-x-5' : 'translate-x-0'
                        } pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out`}
                      ></span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
          
          {/* Privacy Settings */}
          {activeTab === 'privacy' && (
            <div>
              <h2 className="text-lg font-medium text-gray-900 mb-4">Privacy Settings</h2>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-sm font-medium text-gray-700">Profile Visibility</h3>
                    <p className="text-xs text-gray-500">Allow other researchers to view your profile</p>
                  </div>
                  <div className="flex items-center">
                    <button
                      type="button"
                      onClick={() => handleToggleChange('privacy', 'showProfile')}
                      className={`${
                        privacySettings.showProfile ? 'bg-indigo-600' : 'bg-gray-200'
                      } relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none`}
                    >
                      <span
                        className={`${
                          privacySettings.showProfile ? 'translate-x-5' : 'translate-x-0'
                        } pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out`}
                      ></span>
                    </button>
                  </div>
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-sm font-medium text-gray-700">Institution Visibility</h3>
                    <p className="text-xs text-gray-500">Display your institution in search results</p>
                  </div>
                  <div className="flex items-center">
                    <button
                      type="button"
                      onClick={() => handleToggleChange('privacy', 'showInstitution')}
                      className={`${
                        privacySettings.showInstitution ? 'bg-indigo-600' : 'bg-gray-200'
                      } relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none`}
                    >
                      <span
                        className={`${
                          privacySettings.showInstitution ? 'translate-x-5' : 'translate-x-0'
                        } pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out`}
                      ></span>
                    </button>
                  </div>
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-sm font-medium text-gray-700">Contact Information</h3>
                    <p className="text-xs text-gray-500">Make your contact details visible to other researchers</p>
                  </div>
                  <div className="flex items-center">
                    <button
                      type="button"
                      onClick={() => handleToggleChange('privacy', 'showContact')}
                      className={`${
                        privacySettings.showContact ? 'bg-indigo-600' : 'bg-gray-200'
                      } relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none`}
                    >
                      <span
                        className={`${
                          privacySettings.showContact ? 'translate-x-5' : 'translate-x-0'
                        } pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out`}
                      ></span>
                    </button>
                  </div>
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-sm font-medium text-gray-700">Usage Data</h3>
                    <p className="text-xs text-gray-500">Share usage data to help improve the platform</p>
                  </div>
                  <div className="flex items-center">
                    <button
                      type="button"
                      onClick={() => handleToggleChange('privacy', 'shareUsageData')}
                      className={`${
                        privacySettings.shareUsageData ? 'bg-indigo-600' : 'bg-gray-200'
                      } relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none`}
                    >
                      <span
                        className={`${
                          privacySettings.shareUsageData ? 'translate-x-5' : 'translate-x-0'
                        } pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out`}
                      ></span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
          
          {/* Security Settings */}
          {activeTab === 'security' && (
            <div>
              <h2 className="text-lg font-medium text-gray-900 mb-4">Security Settings</h2>
              <div className="space-y-6">
                <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
                  <div className="px-4 py-5 sm:px-6 bg-gray-50 border-b border-gray-200">
                    <h3 className="text-sm font-medium text-gray-700">Change Password</h3>
                  </div>
                  <div className="px-4 py-5 sm:p-6">
                    <div className="space-y-4">
                      <div>
                        <label htmlFor="currentPassword" className="block text-sm font-medium text-gray-700">
                          Current Password
                        </label>
                        <input
                          type="password"
                          name="currentPassword"
                          id="currentPassword"
                          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        />
                      </div>
                      <div>
                        <label htmlFor="newPassword" className="block text-sm font-medium text-gray-700">
                          New Password
                        </label>
                        <input
                          type="password"
                          name="newPassword"
                          id="newPassword"
                          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        />
                      </div>
                      <div>
                        <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">
                          Confirm New Password
                        </label>
                        <input
                          type="password"
                          name="confirmPassword"
                          id="confirmPassword"
                          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        />
                      </div>
                      <div className="flex justify-end">
                        <button className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700">
                          Update Password
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
                  <div className="px-4 py-5 sm:px-6 bg-gray-50 border-b border-gray-200">
                    <h3 className="text-sm font-medium text-gray-700">Two-Factor Authentication</h3>
                  </div>
                  <div className="px-4 py-5 sm:p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-gray-700">Protect your account with 2FA</p>
                        <p className="text-xs text-gray-500 mt-1">Two-Factor Authentication adds an extra layer of security</p>
                      </div>
                      <button className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700">
                        Enable 2FA
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
        
        <div className="px-4 py-3 bg-gray-50 sm:px-6 flex justify-end space-x-3 border-t border-gray-200">
          {isSaved && (
            <div className="mr-auto flex items-center text-sm text-green-600">
              <svg className="h-5 w-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              Settings saved successfully
            </div>
          )}
          
          <button className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50">
            Cancel
          </button>
          <button
            onClick={handleSaveSettings}
            className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700"
          >
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
}