import type { IUser } from '@shared/models';

export const ROLE_ADMIN = 'admin';
export const ROLE_STAFF = 'staff';
export const ROLE_MENTOR = 'mentor';
export const ROLE_USER = 'user';

export function getRoles(user: IUser | null): string[] {
  return user?.roles ?? [];
}

export function hasMentorRole(user: IUser | null): boolean {
  return getRoles(user).includes(ROLE_MENTOR);
}
