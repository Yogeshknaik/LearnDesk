import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const DataTable = ({
  columns,
  data,
  emptyMessage = "No data available",
  isLoading = false,
  className = "",
}) => {
  if (isLoading) {
    return (
      <div className="w-full h-64 flex items-center justify-center bg-gradient-to-br from-background to-background/80 backdrop-blur-sm rounded-lg border shadow-sm">
        <div className="flex flex-col items-center gap-2">
          <div className="h-8 w-8 relative">
            <div className="absolute inset-0 rounded-full border-t-2 border-r-2 border-primary animate-spin"></div>
            <div className="absolute inset-1 rounded-full border-2 border-primary/30"></div>
          </div>
          <span className="text-sm text-muted-foreground animate-pulse">
            Loading...
          </span>
        </div>
      </div>
    );
  }

  if (!data?.length) {
    return (
      <div className="w-full h-64 flex flex-col items-center justify-center bg-gradient-to-br from-background to-background/80 backdrop-blur-sm rounded-lg border shadow-sm gap-3">
        <div className="h-12 w-12 rounded-lg bg-muted flex items-center justify-center">
          <svg
            className="h-6 w-6 text-muted-foreground"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"
            />
          </svg>
        </div>
        <p className="text-muted-foreground">{emptyMessage}</p>
      </div>
    );
  }
  return (
    <div
      className={`rounded-lg border shadow-sm bg-gradient-to-br from-background to-background/80 backdrop-blur-sm ${className}`}
    >
      <Table>
        <TableHeader>
          <TableRow className="bg-muted/50">
            {columns.map((column) => (
              <TableHead
                key={column.key}
                className={`font-semibold text-foreground/80 ${column.className}`}
              >
                {column.header}
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((row, index) => (
            <TableRow
              key={row.id || index}
              className="hover:bg-muted/30 transition-colors"
            >
              {columns.map((column) => (
                <TableCell
                  key={`${row.id || index}-${column.key}`}
                  className={column.className}
                >
                  {column.render ? column.render(row) : row[column.key]}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default DataTable;
