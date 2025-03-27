import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
  } from "@/components/ui/select";
  import { LanguageTabs } from "@/constansts/static-options";
  import { updateControlState } from "@/store/slice/control";
  import { dispatch } from "@/store/store";
  import { changeLanguage } from "@/lib/i18n";
  import { useSelector } from "react-redux";
  import { useEffect } from "react";
import { useTranslation } from "react-i18next";
  
  const SelectTopBar = () => {
    const { lang } = useSelector((state: IRootState) => state.control);
    const {t}=useTranslation()

    useEffect(() => {
      if (lang) {
        changeLanguage(lang);
      }
    }, [lang]);
  
    const handleChangeLanguage = (value: string) => {
      dispatch(updateControlState({ key: "lang", payload: value }));
      changeLanguage(value);
    };
  
    return (
      <Select onValueChange={handleChangeLanguage} value={lang}>
        <SelectTrigger className="cursor-pointer" aria-label="language button">
          <SelectValue></SelectValue>
        </SelectTrigger>
        <SelectContent>
          {LanguageTabs.map(({ label, value }, idx) => (
            <SelectItem key={idx} value={value} className="flex cursor-pointer">
              {t(label)}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    );
  };
  
  export default SelectTopBar;
  