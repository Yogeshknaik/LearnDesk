import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useTheme } from "@/components/ThemeProvider";

const TopLearnersCard = ({ title, learners }) => {
  const { theme } = useTheme();
  
  return (
    <Card className={`shadow-lg ${theme === "dark" ? "bg-gray-800 border-gray-700" : ""}`}>
      <CardHeader>
        <CardTitle className={theme === "dark" ? "text-gray-100" : ""}>
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {learners && learners.length > 0 ? (
            learners.map((learner) => (
              <div
                key={learner._id}
                className="flex items-center justify-between p-4 border-b"
              >
                <div>
                  <p className="font-medium">{learner.employeeName}</p>
                  <p className="text-sm text-gray-500">{learner.competency}</p>
                </div>
                <Badge variant="secondary">
                  {learner.totalHours} hrs
                </Badge>
              </div>
            ))
          ) : (
            <p>No top learners found.</p>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default TopLearnersCard;
