import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
  } from "../ui/tooltip";
  import { ReactNode } from "react";
  import { cn } from "@/lib/utils";

  type TooltipButtonProps = {
    title: string;
    icon: ReactNode;
    isSidebar?: boolean;
    className?: string;
    onClick?: (e?: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  };
  
  const TooltipButton = ({
    title,
    icon,
    className,
    onClick,
  }: TooltipButtonProps) => {
     return (
      <TooltipProvider delayDuration={100}>
        <Tooltip >
          <TooltipTrigger onClick={onClick} className={cn(className)} aria-label="icon button">
            {icon}
          </TooltipTrigger>
              <TooltipContent className="bg-white">
                <p className="text-xs text-black">{title}</p>
              </TooltipContent>
        
        </Tooltip>
      </TooltipProvider>
    );
  };
  
  export default TooltipButton;
  