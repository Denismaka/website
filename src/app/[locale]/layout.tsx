import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { routing } from '@/i18n/routing';
import { ThemeProvider } from '@/providers/ThemeProviders';
import StoreProvider from '@/providers/StoreProvider';
import Header from '@/components/Header';
import '@/app/globals.css';
import Footer from '@/components/Footer';

export default async function LocaleLayout({
  children, params
}: { children: React.ReactNode, params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!routing.locales.includes(locale as any)) notFound();

  const messages = await getMessages();

  return (
    <html lang={locale} suppressHydrationWarning>
      <body className="min-h-screen flex flex-col" suppressHydrationWarning>
        <NextIntlClientProvider messages={messages}>
          <StoreProvider>
            <ThemeProvider
              attribute="class"
              defaultTheme="system"
              enableSystem
              disableTransitionOnChange
            >
              <Header />
              <main className="pt-20">
                {children}
              </main>
              <Footer />
            </ThemeProvider>
          </StoreProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}