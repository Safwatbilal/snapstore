import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { updateControlState } from "@/store/slice/control";
import { dispatch } from "@/store/store";
import { changeLanguage } from "@/lib/i18n";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { SunIcon, MoonIcon } from "lucide-react";
import { changeTheme } from "@/lib/theme";
import { Badge } from "../ui/badge";

export const LanguageTabs = [
  { label: "topNav.english", value: "en" },
  { label: "topNav.arabic", value: "ar" },
];

const SelectTopBar = () => {
  const { lang, theme } = useSelector((state: IRootState) => state.control);
  const { t } = useTranslation();

  useEffect(() => {
    if (lang) changeLanguage(lang);
  }, [lang]);

  useEffect(() => {
    if (theme) changeTheme(theme);
  }, [theme]);

  const handleChangeLanguage = (value: string) => {
    dispatch(updateControlState({ key: "lang", payload: value }));
    changeLanguage(value);
  };

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    dispatch(updateControlState({ key: "theme", payload: newTheme }));
    changeTheme(newTheme);
  };

  return (
    <div className="flex gap-4 items-center">
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

     
     <Badge onClick={toggleTheme} variant='outline' className="!border-0  cursor-pointer ">
        {theme === "light" ? <SunIcon className="!w-5 !h-5" /> : <MoonIcon className="!w-5 !h-5" />}
      </Badge>
    </div>
  );
};

export default SelectTopBar;
