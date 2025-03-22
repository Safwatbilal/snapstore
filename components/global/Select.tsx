import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { LanguageTabs } from "@/constansts/static-options";
const SelectTopBar=()=>{
    return(
        <div className="">
        <Select >
            <SelectTrigger aria-label="language button">
                <SelectValue></SelectValue>

            </SelectTrigger>
            <SelectContent>
            {LanguageTabs.map(({ label, value }, idx) => (
                <SelectItem key={idx} value={value} className="flex">
                    {label}
                </SelectItem>
        ))}
            </SelectContent>
        </Select>
        </div>
    )
}
export default SelectTopBar