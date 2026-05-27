import { calculateBadgeInfo } from './badges.helper';

export interface ShareOptions {
  platform: 'whatsapp' | 'linkedin' | 'facebook' | 'twitter';
  link: string;
  referralCount: number;
}

export function generateShareMessage(referralCount: number): string {
  const badgeInfo = calculateBadgeInfo(referralCount);
  return badgeInfo.shareMessage;
}

export function shareToWhatsApp(link: string, referralCount: number): void {
  const message = generateShareMessage(referralCount);
  const text = encodeURIComponent(`${message} 👇\n\n${link}`);
  const url = `https://wa.me/?text=${text}`;
  window.open(url, '_blank', 'noopener,noreferrer');
}

export function shareToLinkedIn(link: string): void {
  const url = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(link)}`;
  window.open(url, '_blank', 'noopener,noreferrer,width=600,height=600');
}

export function shareToFacebook(link: string): void {
  const url = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(link)}`;
  window.open(url, '_blank', 'noopener,noreferrer,width=600,height=600');
}

export function shareToTwitter(link: string, referralCount: number): void {
  const message = generateShareMessage(referralCount);
  const text = encodeURIComponent(`${message} ${link}`);
  const url = `https://twitter.com/intent/tweet?text=${text}`;
  window.open(url, '_blank', 'noopener,noreferrer,width=600,height=600');
}

/** Partage avec un message personnalisé (ex: lien de parrainage) */
export function shareToWhatsAppWithMessage(link: string, message: string): void {
  const text = encodeURIComponent(message.replace('{LINK}', link));
  window.open(`https://wa.me/?text=${text}`, '_blank', 'noopener,noreferrer');
}

export function shareToTwitterWithMessage(link: string, message: string): void {
  const text = encodeURIComponent(message);
  const url = encodeURIComponent(link);
  window.open(`https://twitter.com/intent/tweet?text=${text}&url=${url}`, '_blank', 'noopener,noreferrer');
}

export function shareToSocial(options: ShareOptions): void {
  const { platform, link, referralCount } = options;

  switch (platform) {
    case 'whatsapp':
      shareToWhatsApp(link, referralCount);
      break;
    case 'linkedin':
      shareToLinkedIn(link);
      break;
    case 'facebook':
      shareToFacebook(link);
      break;
    case 'twitter':
      shareToTwitter(link, referralCount);
      break;
    default:
      console.error('Plateforme de partage non supportée');
  }
}
