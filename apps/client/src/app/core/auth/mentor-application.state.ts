import { Injectable, computed, inject } from '@angular/core';
import { MentorStatus } from '@shared/models';
import { AuthStore } from './auth.store';

export type MentorApplicationStatus = 'none' | MentorStatus;

/**
 * État centralisé de la candidature mentor (basé sur IUser.mentor_profile).
 * À utiliser pour la page /dashboard/user/mentor/apply et la cohérence UX.
 */
@Injectable({
  providedIn: 'root'
})
export class MentorApplicationState {
  private readonly authStore = inject(AuthStore);

  private readonly user = computed(() => this.authStore.user());
  readonly mentorProfile = computed(() => this.user()?.mentor_profile ?? null);

  /** 'none' = jamais postulé, sinon status du profil (pending | approved | rejected). */
  readonly status = computed<MentorApplicationStatus>(() => {
    const profile = this.mentorProfile();
    if (!profile) return 'none';
    return profile.status;
  });

  readonly hasNoApplication = computed(() => !this.mentorProfile());
  readonly isPending = computed(() => this.status() === MentorStatus.PENDING);
  readonly isRejected = computed(() => this.status() === MentorStatus.REJECTED);
  readonly isApproved = computed(() => this.status() === MentorStatus.APPROVED);

  /** CV manquant : candidature pending mais aucun CV soumis. */
  readonly isCvMissing = computed(() => this.isPending() && !this.mentorProfile()?.cv);

  /** Si true, la page candidature doit rediriger vers /dashboard/mentor. */
  readonly shouldRedirectToMentorDashboard = computed(() => this.isApproved());

  /** Formulaire en lecture seule (candidature en cours). */
  readonly isFormReadonly = computed(() => this.isPending());

  /** L'utilisateur peut soumettre / resoumettre (jamais postulé ou refusé). */
  readonly canSubmitApplication = computed(() => this.hasNoApplication() || this.isRejected());

  /** Message à afficher lorsque candidature en attente. */
  readonly pendingMessage = computed(() => (this.isPending() ? 'Votre candidature est en cours de traitement' : null));
}
