import { MetadataRoute } from 'next';
import { routing, getPathname } from '@/i18n/routing';

const host = process.env.NEXT_PUBLIC_URL || 'http://localhost:3000';

const staticRoutes = ['/', '/users', '/projects', '/blog', '/about']; // مسیرهای ثابت

export default function sitemap(): MetadataRoute.Sitemap {
  return staticRoutes.map(getEntry);
}

type Href = Parameters<typeof getPathname>[0]['href'];

function getEntry(href: Href) {
  return {
    url: getUrl(href, routing.defaultLocale),
    alternates: {
      languages: Object.fromEntries(
        routing.locales.map((locale) => [locale, getUrl(href, locale)])
      )
    }
  };
}

function getUrl(href: Href, locale: (typeof routing.locales)[number]) {
  const pathname = getPathname({ locale, href });
  return host + pathname;
}
