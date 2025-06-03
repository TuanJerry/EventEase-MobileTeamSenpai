export interface LoginResponse {
  access_token: string;
  refresh_token: string;
}

export interface LogoutResponse {
  message: string;
}

export interface RegisterRequest {
  firstName: string;
  lastName: string;
  email: string;
  username: string;
  password: string;
  confirmPassword: string;
}

export interface RegisterResponse {
  status: boolean;
  code: number;
  timestamp: string;
  message: string;
  data: {
    id: string;
    firstName: string;
    lastName: string;
    avatar: string | null;
    dateOfBirth: string | null;
    email: string;
    location: string | null;
    phoneNumber: string | null;
    username: string;
  } | null;
} 