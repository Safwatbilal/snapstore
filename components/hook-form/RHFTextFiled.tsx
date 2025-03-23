import React, { useState } from "react";
import { Control, Controller } from "react-hook-form";
import { Skeleton } from "../ui/skeleton";
import { Input } from "../ui/input";
import { useTranslation } from "react-i18next";
import { ComponentProps } from "react";
import { cn } from "@/lib/utils";
import Typography from "../ui/typpgraphy";

interface RHFTextFieldProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string; // تم تصحيح الخطأ في التسمية هنا
  isLoading: boolean;
  inputClassName?: string;
  control: Control<any>;
  type?: ComponentProps<typeof Input>["type"];
}

const RHFTextField: React.FunctionComponent<RHFTextFieldProps> = ({
  name,
  label, // تم تصحيح الخطأ هنا
  isLoading,
  placeholder,
  control,
  inputClassName,
  type,
  ...other
}) => {
  const { t } = useTranslation();
  const [isInitial, setIsInitial] = useState(true);
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div>
      {isLoading && <Skeleton className="h-[44px]" />}
      {!isLoading && (
        <Controller
          control={control}
          name={name as string}
          render={({ field, fieldState: { error } }) => {
            return (
              <div>
                {label && (
                  <label htmlFor={name} className="block text-sm font-medium">
                    {t(label)}
                  </label>
                )}
                <Input
                  {...field}
                  error={error?.message}
                  onChange={(e) => {
                    const value =
                      type === "number"
                        ? isNaN(e.target.valueAsNumber)
                          ? "0"
                          : parseFloat(e.target.value).toFixed(2)
                        : e.target.value;
                    field.onChange(type === "number" ? parseFloat(value) : value);
                    setIsInitial(
                      type === "number" && isNaN(e.target.valueAsNumber)
                    );
                  }}
                  placeholder={placeholder ? t(placeholder) : undefined}
                  id={name}
                  type={
                    type === "password"
                      ? showPassword
                        ? "text"
                        : "password"
                      : type
                  }
                  value={
                    typeof field.value === "number" &&
                    field.value === 0 &&
                    isInitial
                      ? ""
                      : field.value
                  }
                  className={cn(inputClassName, {
                    "hide-number-input-spinners": type === "number",
                  })}
                  {...other}
                  
                />
            
                
              </div>
              
            );
          }}
        />
      )}
      
    </div>
  );
};

export default RHFTextField;
