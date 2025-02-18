import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { routing } from '@/i18n/routing';
import Footer from '@/components/Footer/Footer';
import LayoutHeader from '@/components/Header/LayoutHeader';
import { NextUIProvider } from '@nextui-org/react';
import localFont from 'next/font/local'
import { Josefin_Sans } from 'next/font/google'
const iranSans = localFont({ src: "../../fonts/iRANSansWeb_Medium.ttf", variable: "--iran-font" })
const josefinSans = Josefin_Sans({ subsets: ['latin'], display: 'swap' })
import "./globals.css"
import { Toaster } from 'react-hot-toast';
export default async function LocaleLayout({
  children,
  params
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  const { locale } = await params
  if (!routing.locales.includes(locale as any)) {
    notFound();
  }
  const messages = await getMessages();
  const isLang = locale === "fa" ? true : false
  return (
    <html lang={locale} dir={isLang ? "rtl" : "ltr"}>
      <head>
        <head>
          <link
            rel="stylesheet"
            href="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/devicon.min.css"
          />
        </head>
      </head>
      <body className={`${isLang ? iranSans.variable : josefinSans.className} dark ${isLang ? "rtl" : "ltr"}`}>
        <NextIntlClientProvider messages={messages}>
          <NextUIProvider>
            <LayoutHeader />
            {children}
            <Footer />
            <Toaster />
          </NextUIProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}