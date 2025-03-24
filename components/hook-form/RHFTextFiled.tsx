import React, { useState } from "react";
import { Control, Controller } from "react-hook-form";
import { Skeleton } from "../ui/skeleton";
import { Input } from "../ui/input";
import { useTranslation } from "react-i18next";
import { ComponentProps } from "react";
import { cn } from "@/lib/utils";
import RHFInputLabel from "./RHFInputLabel";
import { Eye, EyeOff } from "lucide-react";
import { Button } from "../ui/button";

interface RHFTextFieldProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  isLoading: boolean;
  inputClassName?: string;
  isPassword?: boolean;
  control: Control<any>;
  type?: ComponentProps<typeof Input>["type"];
}

const RHFTextField: React.FunctionComponent<RHFTextFieldProps> = ({
  name,
  label,
  isLoading,
  placeholder,
  control,
  inputClassName,
  type,
  isPassword,
  ...other
}) => {
  const { t } = useTranslation();
  const [isInitial, setIsInitial] = useState(true);
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="relative">
      <RHFInputLabel label={label} name={name} />
      {isLoading && <Skeleton className="h-[44px]" />}
      {!isLoading && (
        <Controller
          control={control}
          name={name as string}
          render={({ field, fieldState: { error } }) => {
            return (
              <div className="relative">
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
                    setIsInitial(type === "number" && isNaN(e.target.valueAsNumber));
                  }}
                  placeholder={placeholder ? t(placeholder) : undefined}
                  id={name}
                  type={isPassword ? (showPassword ? "text" : "password") : type}
                  value={
                    typeof field.value === "number" && field.value === 0 && isInitial
                      ? ""
                      : field.value
                  }
                  className={cn(inputClassName, "pr-10", {
                    "hide-number-input-spinners": type === "number",
                  })}
                  {...other}
                />

            
                {isPassword && (
                  <Button
                    type="button"
                    variant={'ghost'}
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute icon inset-y-0 right-3 flex items-center text-gray-500 hover:text-gray-700"
                  >
                    {!showPassword ? <EyeOff size={20} className="icon" /> : <Eye size={20}  className="icon"/>}
                  </Button>
                )}
              </div>
            );
          }}
        />
      )}
    </div>
  );
};

export default RHFTextField;
