import { useAuthStore } from './auth.store';
import type { PermissionCheckMode } from './auth.type';

/**
 * Check if the current user has any of the specified roles
 */
export const hasAnyRoles = (roles: string[]): boolean => {
  const { user } = useAuthStore.getState();
  if (!user || !user.roles) return false;
  
  return roles.some(role => user.roles.includes(role));
};

/**
 * Check if the current user has all of the specified roles
 */
export const hasAllRoles = (roles: string[]): boolean => {
  const { user } = useAuthStore.getState();
  if (!user || !user.roles) return false;
  
  return roles.every(role => user.roles.includes(role));
};

/**
 * Check if the current user has the specified permissions
 */
export const hasPermissions = (
  permissions: string[],
  mode: PermissionCheckMode = 'AND'
): boolean => {
  const { user } = useAuthStore.getState();
  if (!user || !user.permissions) return false;
  
  if (mode === 'AND') {
    return permissions.every(permission => user.permissions.includes(permission));
  } else {
    return permissions.some(permission => user.permissions.includes(permission));
  }
};

/**
 * Check if access is allowed based on roles
 */
export const isAllowAccessForRoles = (
  requiredRoles: string[],
  mode: PermissionCheckMode = 'OR'
): boolean => {
  const { user } = useAuthStore.getState();
  if (!user) return false;
  
  if (mode === 'AND') {
    return hasAllRoles(requiredRoles);
  } else {
    return hasAnyRoles(requiredRoles);
  }
};

/**
 * Check if the current user is authenticated
 */
export const isAuthenticated = (): boolean => {
  const { isAuthenticated } = useAuthStore.getState();
  return isAuthenticated;
};

/**
 * Get the current user
 */
export const getCurrentUser = () => {
  const { user } = useAuthStore.getState();
  return user;
};
