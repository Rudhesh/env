

import pick from 'lodash/pick';

import {NextIntlClientProvider, useMessages, useTranslations} from 'next-intl';
import Sidebar from '../ui/sidebar';
import Navbar from '../ui/navBar';
 
export default function  Counter() {
  // Receive messages provided in `i18n.ts`
  const t =  useTranslations('Sidebar');
 // Create an array of headings
 const headings = [
    t("heading1"),
    t("heading2"),
    t("heading3"),
    t("subtitle8")
  ];

  return (
    <div> <Sidebar/></div>
   
   
  );
}