import React from "react";

const PageHeader = ({ title, description, children, className = "" }) => {
  return (
    <div className={`space-y-4 ${className}`}>
      <div>
        <h1 className="text-2xl font-bold tracking-tight">{title}</h1>
        {description && <p className="text-muted-foreground">{description}</p>}
      </div>
      {children && <div className="flex items-center gap-4">{children}</div>}
    </div>
  );
};

export default PageHeader;
