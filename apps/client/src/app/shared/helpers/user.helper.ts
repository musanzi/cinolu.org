/**
 * Initiales à partir d'un nom (ex. "Jean Dupont" → "JD", "Marie" → "MA").
 * Réutilisable partout où un fallback visuel est nécessaire (avatar, header, cartes).
 */
export function getInitials(name: string | null | undefined): string {
  if (!name || typeof name !== 'string') return '?';

  const words = name.trim().split(/\s+/).filter(Boolean);
  if (words.length === 0) return '?';
  if (words.length === 1) {
    return words[0].substring(0, 2).toUpperCase();
  }

  return (words[0][0] + words[words.length - 1][0]).toUpperCase();
}
