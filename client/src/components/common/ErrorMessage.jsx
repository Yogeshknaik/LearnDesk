import React from "react";

const ErrorMessage = ({ message, className = "" }) => {
  return (
    <div className={`text-red-500 dark:text-red-400 text-sm mt-1 ${className}`}>
      {message}
    </div>
  );
};

export default ErrorMessage;
