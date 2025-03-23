import { cn } from "@/lib/utils";
import { cva, VariantProps } from "class-variance-authority";
import React from "react";

const typographyVariants = cva("text-gray-900 leading-5", {
  variants: {
    variant: {
      h1: "text-7xl", // display-2x
      h2: "text-6xl", // display-1x
      h3: "text-5xl", //  display-lg
      h4: "text-4xl", // display-md
      h5: "text-3xl", // display-sm
      h6: "text-2xl", // display-xs
      subtitle1: "text-xl", // text-xl
      subtitle2: "text-lg", // text-lg
      body1: "text-md", // text-md
      body2: "text-sm", // text-sm
      caption: "text-xs", // text-xs
    },
    size: {
      regular: "font-regular",
      medium: "font-medium",
      semibold: "font-semibold",
      bold: "font-bold",
    },
  },
  defaultVariants: {
    variant: "body1",
    size: "semibold",
  },
});

interface TypographyProps
  extends VariantProps<typeof typographyVariants>,
    React.DetailedHTMLProps<
      React.HTMLAttributes<HTMLHeadingElement>,
      HTMLHeadingElement
    > {
  children?: React.ReactNode;
  className?: string;
  renderedComponent?: string;
}

const Typography: React.FunctionComponent<TypographyProps> = ({
  size,
  style,
  children,
  className,
  variant = "body2",
  renderedComponent,
}) => {
  const component =
    renderedComponent || renderTypographyComponent(variant as "string");
  const TypographyElement = React.createElement(component, {
    className: cn(className, typographyVariants({ variant, size, className })),
    children,
    style,
  });
  return <>{TypographyElement}</>;
};

const renderTypographyComponent = (variant: string) => {
  switch (variant) {
    case "subtitle1":
    case "subtitle2":
    case "body1":
    case "body2":
      return "p";
    case "caption":
      return "span";
    default:
      return variant;
  }
};

export default Typography;
