'use client'

import { useEffect, useState } from 'react'
import { useTheme } from 'next-themes'
import { Sun } from 'lucide-react';
import { SunMoon } from 'lucide-react';
import { Button } from './button';

const ThemeButton: () => JSX.Element | null = () => {
  const { resolvedTheme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)
  useEffect(() => setMounted(true), [])

  if (!mounted) {
    return null
  }


  return (
    <Button
      className='flex items-center justify-center rounded p-2 transition-colors hover:bg-slate-200  dark:hover:bg-slate-700'
      onClick={() => setTheme(resolvedTheme === 'dark' ? 'light' : 'dark')}
    >
      {resolvedTheme === 'dark' ? (
        <Sun className='h-5 w-5 text-orange-300' />
      ) : (
        <SunMoon className='h-5 w-5 text-slate-800' />
      )}
    </Button>
  )
}

export default ThemeButton
