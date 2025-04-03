import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { updateControlState } from "@/store/slice/control";
import { dispatch } from "@/store/store";
import { changeLanguage } from "@/lib/i18n";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { SunIcon, MoonIcon } from "lucide-react"; // استخدام الأيقونات الخاصة
import { changeTheme } from "@/lib/theme";

export const LanguageTabs = [
  { label: "topNav.english", value: "en" },
  { label: "topNav.arabic", value: "ar" },
];

export const ThemeTabs = [
  { label: "Light", value: "light", icon: <SunIcon size={18} /> },
  { label: "Dark", value: "dark", icon: <MoonIcon size={18} /> },
];

const SelectTopBar = () => {
  const { lang, theme } = useSelector((state: IRootState) => state.control);
  const { t } = useTranslation();

  useEffect(() => {
    if (lang) {
      changeLanguage(lang);
    }
  }, [lang]);

  useEffect(() => {
    if (theme) {
      changeTheme(theme)
    }
  }, [theme]);

  const handleChangeLanguage = (value: string) => {
    dispatch(updateControlState({ key: "lang", payload: value }));
    changeLanguage(value);
  };

  const handleChangeTheme = (value: string) => {
    dispatch(updateControlState({ key: "theme", payload: value }));
    changeTheme(value)
  };

  return (
    <div className="flex gap-4">
      <Select onValueChange={handleChangeLanguage} value={lang}>
        <SelectTrigger className="cursor-pointer" aria-label="language button">
          <SelectValue>{t(lang === "en" ? "English" : "عربي")}</SelectValue>
        </SelectTrigger>
        <SelectContent>
          {LanguageTabs.map(({ label, value }, idx) => (
            <SelectItem key={idx} value={value} className="flex cursor-pointer">
              {t(label)}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <Select onValueChange={handleChangeTheme} value={theme}>
        <SelectTrigger className="cursor-pointer" aria-label="theme button">
          <SelectValue>{theme === "light" ? <SunIcon size={18} /> : <MoonIcon size={18} />}</SelectValue>
        </SelectTrigger>
        <SelectContent>
          {ThemeTabs.map(({ label, value, icon }, idx) => (
            <SelectItem key={idx} value={value} className="flex cursor-pointer">
              {icon} {label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};

export default SelectTopBar;
