export function openExternalUrl(url?: string, target: '_blank' | '_self' = '_blank'): void {
  if (!url) return;
  if (typeof window === 'undefined') return;
  window.open(url, target);
}

export function formatDateForGoogleCalendarUTC(d: string | Date): string {
  const dt = new Date(d);
  const yyyy = dt.getUTCFullYear().toString().padStart(4, '0');
  const mm = (dt.getUTCMonth() + 1).toString().padStart(2, '0');
  const dd = dt.getUTCDate().toString().padStart(2, '0');
  const hh = dt.getUTCHours().toString().padStart(2, '0');
  const min = dt.getUTCMinutes().toString().padStart(2, '0');
  const ss = dt.getUTCSeconds().toString().padStart(2, '0');
  return `${yyyy}${mm}${dd}T${hh}${min}${ss}Z`;
}
