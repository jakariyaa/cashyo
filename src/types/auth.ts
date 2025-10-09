export interface User {
  _id: string;
  name: string;
  email: string;
  role: string;
  isActive: boolean;
  isApproved: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface AuthResponse {
  success: boolean;
  message: string;
  data: {
    user: User;
  };
  statusCode: number;
}

export interface AuthError {
  status: number;
  data: {
    message: string;
  };
}

export interface RegisterRequest {
  name: string;
  email: string;
  password: string;
  role?: "user" | "agent";
}

export interface LoginRequest {
  email: string;
  password: string;
}
