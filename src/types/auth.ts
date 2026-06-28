export interface LoginRequest {
  userAccount: string;
  authenticationCredential: string;
}

export interface LoginResponse {
  token: string;
  expiresAt: string;
  userAccountId: string;
  userAccountRole: string;
}

export interface RegisterRequest {
  names: string;
  surnames: string;
  email: string;
  password: string;
  accountName: string;
  organizationId: string;
  userAccountRole?: string;
}

export interface RegisterResponse {
  userAccountId: string;
  userAccount: string;
  accountName: string;
  email: string;
}

export interface AuthUser {
  userAccountId: string;
  userAccountRole: string;
  token: string;
  expiresAt: string;
}
