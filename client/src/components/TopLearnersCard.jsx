import { useGetTopLearnersQuery } from "@/features/api/learningFormApi";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export const TopLearnersCard = () => {
  const { data } = useGetTopLearnersQuery();

  return (
    <Card>
      <CardHeader>
        <CardTitle>Top Learners This Week</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {data?.topLearners?.map((learner, index) => (
            <div key={learner._id} className="flex items-center justify-between">
              <div>
                <p className="font-medium">{learner.employeeName}</p>
                <p className="text-sm text-gray-500">{learner.competency}</p>
              </div>
              <Badge>{learner.totalHours} hrs</Badge>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
