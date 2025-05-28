export interface UserProfile {
  id: string;
  firstName: string;
  lastName: string;
  avatar: string | null;
  dateOfBirth: string;
  email: string;
  location: string;
  phoneNumber: string;
  username: string;
}

export interface UserProfileResponse {
  status: boolean;
  code: number;
  timestamp: string;
  message: string;
  data: UserProfile;
} 