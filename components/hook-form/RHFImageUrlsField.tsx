import { useTranslation } from "react-i18next";
import RHFInputLabel from "./RHFInputLabel";
import { Skeleton } from "../ui/skeleton";
import { useFieldArray, Controller, Control } from "react-hook-form";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Trash2, Plus } from "lucide-react";
import { Collapse } from "@mui/material";
import { TransitionGroup } from "react-transition-group";
import { motion } from "framer-motion"; // استيراد Framer Motion

interface Props {
    name: string;
    label?: string;
    isLoading?: boolean;
    control: Control<any>;
    placeholder: string;
}

const RHFImageUrlsField = ({ name, label, isLoading, control, placeholder }: Props) => {
    const { t } = useTranslation();
    const { fields, append, remove } = useFieldArray({
        control,
        name,
    });

    if (fields.length === 0) {
        append('');
    }

    const handleAddImageUrl = () => {
        append('');  
    };

    const handleRemoveImageUrl = (index: number) => {
        remove(index);     
    };

    return (
        <div className="mb-4">
            {label && <RHFInputLabel label={label} name={name} />}
            <div className="space-y-2">
                {isLoading ? (
                    <Skeleton className="h-[44px]" />
                ) : (
                    <>
                        <TransitionGroup>
                            {fields.map((field, index) => (
                                <Collapse key={field.id}>
                                    <div className="flex gap-2 items-center mb-2">
                                        <Controller
                                            control={control}
                                              name={`${name}[${index}]`}
                                            render={({ field: inputField, fieldState: { error } }) => (
                                                <div className="relative w-full  ">
                                                    <Input
                                                        {...inputField}
                                                        placeholder={placeholder}
                                                        error={error?.message}
                                                        id={name}
                                                        
                                                    />
                                                    <Button
                                                        type="button"
                                                        variant="ghost"
                                                        onClick={() => handleRemoveImageUrl(index)}
                                                        className={`absolute icon inset-y-0  right-${index===fields.length-1?'10':'0'} flex items-center text-gray-500 hover:text-gray-700`}
                                                    >
                                                        <Trash2 className=" text-red-500" />
                                                    </Button>
                                                    
                                                    
                                                    {index === fields.length - 1 && (
                                                        <motion.div
                                                            initial={{ y: 0 }}
                                                            animate={{ y: 10 }}
                                                            transition={{ type: "spring", stiffness: 300 }}
                                                            className="absolute right-[0] top-[-18px] mt-2"
                                                        >
                                                            <Button
                                                                type="button"
                                                                variant='ghost'
                                                                onClick={handleAddImageUrl}
                                                                className="absolute icon inset-y-0 right-0 flex items-center  "
                                                                disabled={fields.length >= 5}
                                                            >
                                                                <Plus className="text-black" />
                                                            </Button>
                                                        </motion.div>
                                                    )}
                                                </div>
                                            )}
                                        />
                                    </div>
                                </Collapse>
                            ))}
                        </TransitionGroup>
                    </>
                )}
            </div>
        </div>
    );
};

export default RHFImageUrlsField;
