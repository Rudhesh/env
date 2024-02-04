import type { Metadata } from "next";
import { Inter as FontSans } from "next/font/google";
import { getServerSession } from "next-auth";
import { cn } from "@/lib/utils";
import ReduxProvider from "./reduxProvider";
import { ThemeProvider } from "@/components/Theme-provider";
import { notFound } from "next/navigation";
import { locales } from "@/config";
import { ReactNode } from "react";
import { getTranslations, unstable_setRequestLocale } from "next-intl/server";
import SessionProvider from "@/utils/SessionProvider";
import Navigation from "@/components/ui/langNavBar/Navigation";
import { Toaster } from "@/components/ui/toaster"

export const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
});



type Props = {
  children: ReactNode;
  params: {locale: string};
};

export function generateStaticParams() {
  return locales.map((locale) => ({locale}));
}

export async function generateMetadata({
  params: {locale}
}: Omit<Props, 'children'>) {
  const t = await getTranslations({locale, namespace: 'LocaleLayout'});

  return {
    title: t('title')
  };
}



export interface RootLayoutProps {
  children: React.ReactNode;
  params?: {
    locale: string 
  };
}
export default async function LocaleLayout({
  children,
  params: {locale}
}: Props) {
  // Validate that the incoming `locale` parameter is valid
  if (!locales.includes(locale as any)) notFound();

  // Enable static rendering
  unstable_setRequestLocale(locale);

  const session = await getServerSession();
  


  return (
    <html  lang={locale}>
      <SessionProvider session={session}>
        <body
          className={cn(
            "min-h-screen bg-white dark:bg-slate-900 font-sans antialiased",
            fontSans.variable
          )}
        >
          <ReduxProvider>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
             <Navigation />
           
            {children}
            <Toaster />
          </ThemeProvider>
          </ReduxProvider>
        </body>
      </SessionProvider>
    </html>
  );
}
