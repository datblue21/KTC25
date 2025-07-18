export type PermissionCheckMode = 'AND' | 'OR' | 'any';

export interface User {
  id: string;
  username: string;
  email: string;
  roles: string[];
  permissions: string[];
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  token: string | null;
}
