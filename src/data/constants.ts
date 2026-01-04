/**
 * Application-wide constants
 */

/** List of 28 Indian states and union territories */
export const INDIAN_STATES = [
  'Andhra Pradesh',
  'Arunachal Pradesh',
  'Assam',
  'Bihar',
  'Chhattisgarh',
  'Goa',
  'Gujarat',
  'Haryana',
  'Himachal Pradesh',
  'Jharkhand',
  'Karnataka',
  'Kerala',
  'Madhya Pradesh',
  'Maharashtra',
  'Manipur',
  'Meghalaya',
  'Mizoram',
  'Nagaland',
  'Odisha',
  'Punjab',
  'Rajasthan',
  'Sikkim',
  'Tamil Nadu',
  'Telangana',
  'Tripura',
  'Uttar Pradesh',
  'Uttarakhand',
  'West Bengal',
];

/** Gender options */
export const GENDER_OPTIONS = [
  { value: 'Male', label: 'Male' },
  { value: 'Female', label: 'Female' },
  { value: 'Other', label: 'Other' },
];

/** Status options */
export const STATUS_OPTIONS = [
  { value: 'active', label: 'Active' },
  { value: 'inactive', label: 'Inactive' },
];

/** Form validation constants */
export const MIN_AGE = 18;
export const MAX_IMAGE_SIZE = 5 * 1024 * 1024; // 5MB

/** Storage keys */
export const STORAGE_KEYS = {
  EMPLOYEES: 'employees',
  IS_AUTHENTICATED: 'isAuthenticated',
} as const;
