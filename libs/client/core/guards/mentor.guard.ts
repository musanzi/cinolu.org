import { inject } from '@angular/core';
import { Router, CanActivateFn } from '@angular/router';
import { AuthStore } from '../auth/auth.store';
import { RightsService } from '../auth/rights.service';

export const mentorGuard: CanActivateFn = (state) => {
  const auth = inject(AuthStore);
  const router = inject(Router);
  const rightsService = inject(RightsService);

  const user = auth.user();

  if (!user) {
    router.navigate(['/sign-in'], { queryParams: { returnUrl: state.url } });
    return false;
  }

  if (rightsService.canAccessMentorArea(user)) {
    return true;
  }

  const reason = rightsService.getMentorRedirectReason(user);
  if (reason === 'pending') {
    router.navigate(['/dashboard/user/mentor/application-pending']);
    return false;
  }
  if (reason === 'rejected') {
    router.navigate(['/dashboard/user/mentor/application-rejected']);
    return false;
  }

  router.navigate(['/dashboard/user'], {
    queryParams: {
      error: user.mentor_profile ? 'access-denied' : 'no-mentor-profile',
      message: user.mentor_profile ? 'Accès réservé aux mentors' : 'Profil mentor introuvable'
    }
  });
  return false;
};
