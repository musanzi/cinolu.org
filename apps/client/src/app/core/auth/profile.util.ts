import { IUser } from '@shared/models/entities.models';

function hasValidName(name: string | null | undefined): boolean {
  const normalized = (name ?? '').trim();
  if (normalized.length < 2 || normalized.includes('@')) {
    return false;
  }
  return /[A-Za-z]/.test(normalized);
}

/** Profil à compléter après inscription (champs déplacés vers PATCH /auth/me). */
export function isProfileIncomplete(user: IUser | null | undefined): boolean {
  if (!user) {
    return true;
  }

  if (!hasValidName(user.name)) {
    return true;
  }

  if (!user.phone_number?.trim()) {
    return true;
  }

  if (!user.country?.trim()) {
    return true;
  }

  if (!user.city?.trim()) {
    return true;
  }

  if (!user.gender?.trim()) {
    return true;
  }

  if (!user.birth_date) {
    return true;
  }

  return false;
}
