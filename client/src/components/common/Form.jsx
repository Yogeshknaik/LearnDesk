import React from "react";
import { ErrorMessage } from "./ErrorMessage";

const FormField = ({
  label,
  error,
  children,
  required = false,
  className = "",
}) => {
  return (
    <div className={`space-y-2.5 ${className}`}>
      {label && (
        <label className="text-sm font-medium leading-none text-foreground/90 peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
          {label}
          {required && (
            <span className="text-destructive ml-1 animate-pulse">*</span>
          )}
        </label>
      )}
      <div className="relative">
        {children}
        {error && (
          <div className="absolute -bottom-5 left-0 w-full">
            <ErrorMessage message={error} />
          </div>
        )}
      </div>
    </div>
  );
};

const Form = ({ onSubmit, children, className = "" }) => {
  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(e);
  };

  return (
    <form onSubmit={handleSubmit} className={className}>
      {children}
    </form>
  );
};

Form.Field = FormField;

export default Form;
