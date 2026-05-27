/** Shared Tailwind class strings for public design system components */

export const PUBLIC_CONTAINER_CLASSES =
  'mx-auto w-full max-w-screen-2xl px-5 sm:px-8 lg:px-16 xl:px-24 2xl:px-32';

export const PUBLIC_CONTAINER_WIDE_CLASSES =
  'mx-auto w-full max-w-screen-5xl px-5 sm:px-8 lg:px-16 xl:px-24 2xl:px-32';

export const PUBLIC_SECTION_SPACING = 'py-12 lg:py-20';

export const PUBLIC_H1_CLASSES =
  'text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl lg:text-6xl';

export const PUBLIC_H2_CLASSES =
  'text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl';

export const PUBLIC_BODY_CLASSES = 'text-base leading-relaxed text-gray-600 sm:text-lg';

export const PUBLIC_BUTTON_VARIANTS = {
  primary:
    'inline-flex min-h-11 items-center justify-center gap-2 rounded-xl bg-brand-600 px-5 text-sm font-semibold text-white transition-colors duration-200 hover:bg-brand-700 disabled:cursor-not-allowed disabled:opacity-60',
  secondary:
    'inline-flex min-h-11 items-center justify-center gap-2 rounded-xl border border-gray-300 bg-white px-5 text-sm font-semibold text-gray-900 transition-colors duration-200 hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-60',
  ghost:
    'inline-flex min-h-11 items-center justify-center gap-2 rounded-xl px-5 text-sm font-semibold text-brand-700 transition-colors duration-200 hover:bg-brand-50 disabled:cursor-not-allowed disabled:opacity-60',
  link: 'inline-flex items-center gap-2 text-sm font-semibold text-brand-700 transition-colors duration-200 hover:text-brand-800',
  danger:
    'inline-flex min-h-11 items-center justify-center gap-2 rounded-xl border border-red-200 bg-white px-5 text-sm font-semibold text-red-600 transition-colors duration-200 hover:bg-red-50 disabled:cursor-not-allowed disabled:opacity-60'
} as const;

export const PUBLIC_CARD_VARIANTS = {
  default: 'rounded-2xl border border-gray-200 bg-white p-5 md:p-6',
  interactive:
    'rounded-2xl border border-gray-200 bg-white p-5 transition-colors duration-200 hover:border-gray-300 md:p-6',
  media: 'overflow-hidden rounded-2xl border border-gray-200 bg-white',
  compact: 'rounded-2xl border border-gray-200 bg-white p-4',
  dark: 'rounded-2xl border border-gray-700 bg-gray-900 p-5 text-white md:p-6'
} as const;
