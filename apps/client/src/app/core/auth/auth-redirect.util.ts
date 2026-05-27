/**
 * URL de fallback après login quand returnUrl est absent ou invalide.
 */
export const AUTH_REDIRECT_FALLBACK = '/dashboard';

/** Chemins considérés comme "page de login" — on ne redirige jamais vers eux après connexion. */
const LOGIN_PATHS = ['/sign-in', '/login', '/sign-up'];

export function isSafeInternalReturnUrl(returnUrl: unknown): returnUrl is string {
  if (typeof returnUrl !== 'string') {
    return false;
  }

  const trimmed = returnUrl.trim();
  if (
    trimmed === '' ||
    !trimmed.startsWith('/') ||
    trimmed.startsWith('//') ||
    trimmed.includes('\\') ||
    trimmed.includes(':')
  ) {
    return false;
  }

  const path = trimmed.split('?')[0];
  return !LOGIN_PATHS.some((login) => path === login || path.startsWith(login + '/'));
}

/**
 * Valide un returnUrl issu des query params.
 * - Absent / vide / pas une chaîne → fallback
 * - Ne commence pas par `/` (URL externe) → fallback
 * - Protocol-relative, backslash ou schéma explicite → fallback
 * - Page de login (éviter boucle) → fallback
 *
 * @param returnUrl - Valeur brute (query param)
 * @returns URL sûre, toujours relative (commence par /), jamais la page de login
 */
export function validateReturnUrl(returnUrl: unknown): string {
  if (!isSafeInternalReturnUrl(returnUrl)) {
    return AUTH_REDIRECT_FALLBACK;
  }
  return returnUrl.trim();
}
