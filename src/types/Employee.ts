export interface Employee {
  id: string;
  profileImage: string;
  fullName: string;
  gender: 'Male' | 'Female' | 'Other';
  dateOfBirth: string; // Format: YYYY-MM-DD
  state: string;
  isActive: boolean;
}
