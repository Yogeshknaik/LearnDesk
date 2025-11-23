import React from "react";
import { Card } from "@/components/ui/card";
import { useTheme } from "@/components/ThemeProvider";

const StatsCard = ({
  title,
  value,
  icon: Icon,
  trend,
  trendValue,
  colorClass = "text-blue-600 dark:text-blue-400",
  bgClass = "bg-blue-50 dark:bg-blue-950",
}) => {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  return (
    <Card className="overflow-hidden relative shadow-xl border-none bg-gradient-to-br from-background to-background/80 backdrop-blur-sm">
      <div className="p-6">
        <div className="flex items-center justify-between mb-4">
          <div
            className={`p-3 rounded-xl ${bgClass} ring-2 ring-primary/10 shadow-inner`}
          >
            <Icon className={`w-6 h-6 ${colorClass}`} />
          </div>
          {trend && (
            <div
              className={`
              flex items-center gap-1 text-sm font-medium rounded-full px-2.5 py-0.5
              ${
                trendValue >= 0
                  ? "text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/50"
                  : "text-rose-600 dark:text-rose-400 bg-rose-50 dark:bg-rose-950/50"
              }
            `}
            >
              {trendValue >= 0 ? "↑" : "↓"}
              <span>{Math.abs(trendValue)}%</span>
            </div>
          )}
        </div>
        <h3 className="text-lg font-medium text-muted-foreground mb-2">
          {title}
        </h3>
        <p className="text-3xl font-bold text-foreground">{value}</p>
      </div>
      <div
        className={`
        absolute bottom-0 left-0 right-0 h-1.5
        ${colorClass.replace("text", "bg")}
        opacity-90
      `}
      />
    </Card>
  );
};

export default StatsCard;
