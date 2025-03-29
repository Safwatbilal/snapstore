"use client";
import { Controller, Control } from "react-hook-form";
import { Skeleton } from "../ui/skeleton";
import RHFInputLabel from "./RHFInputLabel";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface RHFReactSelectProps {
  name: string;
  label?: string;
  className?: string;
  placeholder?: string;
  options?: { label: string; value: string }[];
  isLoading?: boolean;
  control?: Control<any>;
}

const RHFReactSelect = ({
  name,
  label,
  options = [],
  className,
  placeholder,
  isLoading,
  control,
}: RHFReactSelectProps) => {
  return (
    <div className='w-full' >
      {label && <RHFInputLabel label={label} name={name} />}
      {isLoading ? (
        <Skeleton />
      ) : (
        <Controller
          name={name}
          control={control}
          render={({ field }) => (
            <Select onValueChange={field.onChange} value={field.value} >
              <SelectTrigger className="w-full">
                <SelectValue placeholder={placeholder || "Select an option"} />
              </SelectTrigger>
              <SelectContent>
                {options.map((option) => (
                  <SelectItem className="cursor-pointer" key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          )}
        />
      )}
    </div>
  );
};

export default RHFReactSelect;
