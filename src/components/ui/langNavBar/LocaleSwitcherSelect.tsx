'use client';

import { usePathname, useRouter } from '@/navigation';
import clsx from 'clsx';
import {ChangeEvent, ReactNode, useTransition} from 'react';
import { ChevronDown } from 'lucide-react';

type Props = {
  children: ReactNode;
  defaultValue: string;
  label: string;
};

export default function LocaleSwitcherSelect({
  children,
  defaultValue,
  label
}: Props) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const pathname = usePathname();

  function onSelectChange(event: ChangeEvent<HTMLSelectElement>) {
    const nextLocale = event.target.value;
    startTransition(() => {
      router.replace(pathname, {locale: nextLocale});
    });
  }

  return (
    <label
      className={clsx(
        'relative text-gray-400 rounded transition-colors hover:bg-slate-200  dark:hover:bg-slate-700',
        isPending && 'transition-opacity [&:disabled]:opacity-30'
      )}
    >
      <p className="sr-only">{label}</p>
      <select
        className="inline-flex appearance-none text-sm bg-transparent py-2 pl-2 pr-6"
        defaultValue={defaultValue}
        disabled={isPending}
        onChange={onSelectChange}
      >
        {children}
      </select>
      <span className="pointer-events-none absolute right-2 py-3  "><ChevronDown className='h-3 w-5'/></span>
    </label>
  );
}
