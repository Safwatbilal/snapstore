import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { themTabs } from "@/constansts/static-options";
const SelectThems=()=>{
    return(
        <Select>
            <SelectTrigger aria-label="language button">
                <SelectValue></SelectValue>

            </SelectTrigger>
            <SelectContent>
            {themTabs.map(({ label, value }, idx) => (
                <SelectItem key={idx} value={value} className="flex">
                    {label}
                </SelectItem>
        ))}
            </SelectContent>
        </Select>
    )
}
export default SelectThems