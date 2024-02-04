import {Pathnames} from 'next-intl/navigation';

export const locales = ['en', 'de'] as const;

export const pathnames = {
  '/': '/',
  '/dashboard': {
    en: '/dashboard',
    de: '/objectschaubilder'
  },
  '/search': {
    en: '/search',
    de: '/suchen'
  },
  '/notification': {
    en: '/notification',
    de: '/benachrichtigung'
  }
} satisfies Pathnames<typeof locales>;

// Use the default: `always`
export const localePrefix = undefined;

export type AppPathnames = keyof typeof pathnames;
