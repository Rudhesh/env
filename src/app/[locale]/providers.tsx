'use client'

import { ThemeProvider } from 'next-themes'

export default function Providers({ children }: {
  children: React.ReactNode}): JSX.Element{
  return <ThemeProvider attribute='class'>{children}</ThemeProvider>
}
