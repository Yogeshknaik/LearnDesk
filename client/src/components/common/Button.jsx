import React from "react";
import { LoadingSpinner } from "./LoadingSpinner";

const Button = ({
  children,
  variant = "primary",
  size = "medium",
  isLoading = false,
  disabled = false,
  className = "",
  ...props
}) => {
  const baseClasses =
    "inline-flex items-center justify-center rounded-md font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 active:scale-[0.98]";

  const variants = {
    primary:
      "bg-primary text-primary-foreground hover:bg-primary/90 shadow-lg hover:shadow-primary/25 hover:-translate-y-0.5",
    secondary:
      "bg-secondary text-secondary-foreground hover:bg-secondary/90 shadow-lg hover:shadow-secondary/25 hover:-translate-y-0.5",
    destructive:
      "bg-destructive text-destructive-foreground hover:bg-destructive/90 shadow-lg hover:shadow-destructive/25 hover:-translate-y-0.5",
    outline:
      "border border-input bg-background hover:bg-accent hover:text-accent-foreground shadow-sm hover:shadow hover:-translate-y-0.5",
    ghost:
      "hover:bg-accent hover:text-accent-foreground hover:-translate-y-0.5",
    link: "text-primary underline-offset-4 hover:underline hover:text-primary/80",
  };

  const sizes = {
    small: "h-8 px-3 text-xs",
    medium: "h-10 px-4 py-2",
    large: "h-12 px-8 text-lg",
  };

  return (
    <button
      className={`
        ${baseClasses}
        ${variants[variant]}
        ${sizes[size]}
        ${className}
      `}
      disabled={isLoading || disabled}
      {...props}
    >
      {isLoading && <LoadingSpinner size="small" className="mr-2" />}
      {children}
    </button>
  );
};

export default Button;
