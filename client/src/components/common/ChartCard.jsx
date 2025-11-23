import React from "react";
import { useTheme } from "@/components/ThemeProvider";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import { Card } from "@/components/ui/card";

const chartTypes = {
  bar: "bar",
  pie: "pie",
};

const colors = {
  light: ["#0047AB", "#00A650", "#F59E0B", "#4338CA", "#E11D48"],
  dark: ["#3B82F6", "#10B981", "#FBBF24", "#6366F1", "#EC4899"],
};

const ChartCard = ({
  type = "bar",
  data,
  title,
  height = 300,
  dataKey = "value",
  nameKey = "name",
  className = "",
}) => {
  const { theme } = useTheme();
  const isDark = theme === "dark";
  const currentColors = colors[isDark ? "dark" : "light"];

  const renderChart = () => {
    switch (type) {
      case chartTypes.pie:
        return (
          <PieChart>
            <Pie
              data={data}
              dataKey={dataKey}
              nameKey={nameKey}
              cx="50%"
              cy="50%"
              outerRadius={100}
              label
            >
              {data.map((_, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={currentColors[index % currentColors.length]}
                />
              ))}
            </Pie>
            <Tooltip
              contentStyle={{
                backgroundColor: isDark ? "#1F2937" : "#FFFFFF",
                borderColor: isDark ? "#374151" : "#E5E7EB",
                borderRadius: "0.375rem",
              }}
              itemStyle={{
                color: isDark ? "#E5E7EB" : "#111827",
              }}
            />
          </PieChart>
        );

      case chartTypes.bar:
      default:
        return (
          <BarChart data={data}>
            <CartesianGrid
              strokeDasharray="3 3"
              stroke={isDark ? "#374151" : "#E5E7EB"}
            />
            <XAxis
              dataKey={nameKey}
              stroke={isDark ? "#9CA3AF" : "#4B5563"}
              tickLine={false}
            />
            <YAxis stroke={isDark ? "#9CA3AF" : "#4B5563"} tickLine={false} />
            <Tooltip
              contentStyle={{
                backgroundColor: isDark ? "#1F2937" : "#FFFFFF",
                borderColor: isDark ? "#374151" : "#E5E7EB",
                borderRadius: "0.375rem",
              }}
              itemStyle={{
                color: isDark ? "#E5E7EB" : "#111827",
              }}
            />
            <Bar
              dataKey={dataKey}
              fill={currentColors[0]}
              radius={[4, 4, 0, 0]}
            />
          </BarChart>
        );
    }
  };
  return (
    <Card
      className={`overflow-hidden relative shadow-xl border-none bg-gradient-to-br from-background to-background/80 backdrop-blur-sm ${className}`}
    >
      <div className="p-6">
        {title && (
          <h3 className="text-lg font-medium mb-6 text-foreground/90">
            {title}
          </h3>
        )}
        <div style={{ height: height }} className="p-2">
          <ResponsiveContainer width="100%" height="100%">
            {renderChart()}
          </ResponsiveContainer>
        </div>
      </div>
      <div className="absolute inset-0 border border-primary/5 rounded-lg pointer-events-none" />
    </Card>
  );
};

export default ChartCard;
