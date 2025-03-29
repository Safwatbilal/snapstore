import { SheetHeader, SheetDescription, SheetTitle } from "../ui/sheet";
import React from "react";

interface TitleSheetProps {
  title: string;
  description: string;
}

const TitleSheet: React.FunctionComponent<TitleSheetProps> = ({ title, description }) => {
  return (
    <SheetHeader>
      <SheetTitle>{title}</SheetTitle>
      <SheetDescription>{description}</SheetDescription>
    </SheetHeader>
  );
};

export default TitleSheet;
