import { Injectable } from '@angular/core';
import { getRoles, hasMentorRole, ROLE_ADMIN, ROLE_MENTOR, ROLE_STAFF } from './role.util';
import type { IUser } from '@shared/models';
import { MentorStatus } from '@shared/models';

export type MentorRedirectReason = 'pending' | 'rejected' | null;

@Injectable({
  providedIn: 'root'
})
export class RightsService {

  getRoles(user: IUser | null): string[] {
    return getRoles(user);
  }

  hasRole(user: IUser | null, role: string): boolean {
    return getRoles(user).includes(role);
  }

  canAccessMentorArea(user: IUser | null): boolean {
    if (!user || !hasMentorRole(user)) return false;
    const profile = user.mentor_profile;
    return !!profile && profile.status === MentorStatus.APPROVED;
  }

  canSeeMentorMenu(user: IUser | null): boolean {
    return this.canAccessMentorArea(user);
  }

  getMentorRedirectReason(user: IUser | null): MentorRedirectReason {
    if (!user || !hasMentorRole(user) || !user.mentor_profile) return null;
    const status = user.mentor_profile.status;
    if (status === MentorStatus.PENDING) return 'pending';
    if (status === MentorStatus.REJECTED) return 'rejected';
    return null;
  }

  isAdminOrStaff(user: IUser | null): boolean {
    const roles = getRoles(user);
    return roles.includes(ROLE_ADMIN) || roles.includes(ROLE_STAFF);
  }

  getRoleLabel(user: IUser | null): string {
    if (!user || !user.roles?.length) return 'Entrepreneur';
    if (this.hasRole(user, ROLE_ADMIN)) return 'Administrateur';
    if (this.hasRole(user, ROLE_MENTOR)) return 'Mentor';
    return 'Entrepreneur';
  }

  resolveLandingRoute(user: IUser | null): string {
    if (!user) return '/dashboard/user';
    const reason = this.getMentorRedirectReason(user);
    if (reason === 'pending') return '/dashboard/user/mentor/application-pending';
    if (reason === 'rejected') return '/dashboard/user/mentor/application-rejected';
    if (this.canAccessMentorArea(user)) return '/dashboard/mentor';
    return '/dashboard/user';
  }
}
