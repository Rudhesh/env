import { useTranslations } from "next-intl";
import LocaleSwitcher from "./LocaleSwitcher";
import NavigationLink from "./NavigationLink";
import Image from "next/image";
import ThemeButton from "../themeButton";
export default function Navigation() {
  const t = useTranslations("Navigation");

  return (
    <div className="fixed  right-10 z-20">
      <div className="container flex justify-end text-white">
        <ThemeButton /> <LocaleSwitcher />
      </div>
    </div>
  );
}
