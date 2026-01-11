import { createContext } from 'react';

// RBAC Roles
export enum UserRole {
  SYSTEM_ADMIN = 'System Admin',
  ENGINEERING = 'Design / Engineering',
  STORES = 'Stores / Incoming QC',
  OPERATOR = 'Production Operator',
  QA_ENGINEER = 'QA Engineer',
  SUPERVISOR = 'Supervisor',
  MANAGEMENT = 'Management / Auditor'
}

// User Context Interface
export interface UserContextType {
  id: string;
  name: string;
  role: UserRole;
  isDemo: boolean;
  setRole: (role: UserRole) => void;
  checkAccess: (featureId: string) => boolean;
}

// Default context (safe fallback)
export const UserContext = createContext<UserContextType>({
  id: 'guest',
  name: 'Guest',
  role: UserRole.OPERATOR,
  isDemo: true,
  setRole: () => {},
  checkAccess: () => false
});

// App Constants
export const APP_VERSION = 'V3.1';
export const PATCH_ID = 'PP-012';
export const APP_NAME = 'BPM-OS';

// Navigation Views
export type NavView = 'dashboard' | 'system_setup' | 'sku_blueprint';