import { useTranslations } from 'next-intl';
import Login from './login/page'
import {locales} from '../../config';
import {notFound} from 'next/navigation';
import { unstable_setRequestLocale } from 'next-intl/server';
type Props = {
  params: {locale: string};
};

export default function Home({params: {locale}}: Props) {
  const t = useTranslations('Login');
  // Validate that the incoming `locale` parameter is valid
  const isValidLocale = locales.some((cur) => cur === locale);
  if (!isValidLocale) notFound();

  // Enable static rendering
  unstable_setRequestLocale(locale);

  return (
    <main >
      
   <Login title={t("title")} button={t("button")} footer={t("footer")}/>
    </main>
  )
}

