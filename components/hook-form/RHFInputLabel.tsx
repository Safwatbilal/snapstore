import { useTranslation } from "react-i18next";
import { cn } from "@/lib/utils";
import Typography from "../ui/typpgraphy";
import { Label } from "../ui/label";
interface RHFInputLabel{
    label?:string;
    name?:string;
    className?:string;
}
const RHFInputLabel:React.FunctionComponent<RHFInputLabel>=({
    label,
    name,
    className
})=>{
    const {t}=useTranslation()
    return(
        <div className={cn("flex justify-between mb-3", className)}>
        <div className="flex items-center  gap-0.5">
            <Label className="text-gray-500  inline-block">
                {(t(label))}
            </Label>
        </div>
        </div>
    )
}
export default RHFInputLabel