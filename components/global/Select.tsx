import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { LanguageTabs } from "@/constansts/static-options";
import { updateControlState } from '@/store/slice/control'
import { dispatch } from '@/store/store'
import { changeLanguage } from "@/lib/i18n";
import { useSelector } from "react-redux";
const SelectTopBar=()=>{
    const handleChangeLanguage = (value: string) => {
        dispatch(updateControlState({ key: "lang", payload: value }));
        changeLanguage(value);
    };
    const { lang } = useSelector((state: IRootState) => state.control);
    return(
        
        <Select onValueChange={handleChangeLanguage} value={lang} >
            <SelectTrigger  className="cursor-pointer" aria-label="language button">
                <SelectValue></SelectValue>

            </SelectTrigger>
            <SelectContent>
            {LanguageTabs.map(({ label, value }, idx) => (
                <SelectItem  key={idx} value={value} className="flex cursor-pointer">
                    {label}
                </SelectItem>
        ))}
            </SelectContent>
        </Select>
      
    )
}
export default SelectTopBar