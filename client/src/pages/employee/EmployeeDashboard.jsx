import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useCreateLearningFormMutation } from "@/features/api/learningFormApi";
import { useState } from "react";
import { useSelector } from "react-redux";
import { toast } from "sonner";
import Dashboard from "../admin/Dashboard";
import useTopLearners from "@/hooks/useTopLearners";

const EmployeeDashboard = () => {
  const { user } = useSelector((state) => state.auth);
  const [createForm] = useCreateLearningFormMutation();
  const [formData, setFormData] = useState({
    courseTitle: "",
    sessionTopic: "",
    sessionType: "",
    levelOfLearning: "",
    hoursAttended: "",
    role: "",
  });

  // Use RTK Query hook for top learners
  const {
    topLearnersOfMonth,
    topLearnersOfWeek,
    isLoading: isTopLearnersLoading,
    error: topLearnersError,
  } = useTopLearners();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createForm(formData);
      toast.success("Learning form submitted successfully");
      setFormData({
        courseTitle: "",
        sessionTopic: "",
        sessionType: "",
        levelOfLearning: "",
        hoursAttended: "",
        role: "",
      });
    } catch (error) {
      toast.error("Failed to submit form");
    }
  };

  return (
    <div className="container mx-auto p-3">
      {user.role !== "admin" ? (
        <>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Learning Form */}
            <div className="md:col-span-2">
              <Card>
                <CardHeader>
                  <CardTitle>Submit Learning Details</CardTitle>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                      <Label>Course Title</Label>
                      <Input
                        value={formData.courseTitle}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            courseTitle: e.target.value,
                          })
                        }
                        required
                      />
                    </div>

                    <div>
                      <Label>Session Topic</Label>
                      <Input
                        value={formData.sessionTopic}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            sessionTopic: e.target.value,
                          })
                        }
                        required
                      />
                    </div>

                    <div>
                      <Label>Session Type</Label>
                      <Select
                        onValueChange={(value) =>
                          setFormData({ ...formData, sessionType: value })
                        }
                        required
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select session type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Online Session">
                            Online Session
                          </SelectItem>
                          <SelectItem value="Classroom Session">
                            Classroom Session
                          </SelectItem>
                          <SelectItem value="Hybrid Session">
                            Hybrid Session
                          </SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <Label>Level of Learning</Label>
                      <Select
                        onValueChange={(value) =>
                          setFormData({ ...formData, levelOfLearning: value })
                        }
                        required
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select level" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Basic">Basic</SelectItem>
                          <SelectItem value="Basic + Lab work">
                            Basic + Lab work
                          </SelectItem>
                          <SelectItem value="Intermediate">
                            Intermediate
                          </SelectItem>
                          <SelectItem value="Intermediate + Lab work">
                            Intermediate + Lab work
                          </SelectItem>
                          <SelectItem value="Advanced">Advanced</SelectItem>
                          <SelectItem value="Advanced + Lab work">
                            Advanced + Lab work
                          </SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <Label>Hours Attended</Label>
                      <Input
                        type="number"
                        step="0.5"
                        min="0"
                        value={formData.hoursAttended}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            hoursAttended: e.target.value,
                          })
                        }
                        required
                      />
                    </div>

                    <div>
                      <Label>Your Role</Label>
                      <Select
                        onValueChange={(value) =>
                          setFormData({ ...formData, role: value })
                        }
                        required
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select your role" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="I am the mentor tutoring this program">
                            I am the mentor tutoring this program
                          </SelectItem>
                          <SelectItem value="I am a learner on this program">
                            I am a learner on this program
                          </SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <Button type="submit">Submit Form</Button>
                  </form>
                </CardContent>
              </Card>
            </div>

            {/* Top Learners Sidebar */}
            <div>
              <Card>
                <CardHeader>
                  <CardTitle>Top Learners This Week</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {isTopLearnersLoading ? (
                      <p>Loading...</p>
                    ) : topLearnersError ? (
                      <p className="text-red-500">
                        Error loading top learners.
                      </p>
                    ) : topLearnersOfWeek && topLearnersOfWeek.length > 0 ? (
                      topLearnersOfWeek.map((learner, index) => (
                        <div
                          key={learner._id}
                          className="flex items-center justify-between"
                        >
                          <div className="flex items-center gap-2">
                            {/* Medal icon for top 3 */}
                            {index === 0 && (
                              <span className="text-yellow-400 text-xl">
                                🥇
                              </span>
                            )}
                            {index === 1 && (
                              <span className="text-gray-400 text-xl">🥈</span>
                            )}
                            {index === 2 && (
                              <span className="text-yellow-700 text-xl">
                                🥉
                              </span>
                            )}
                            <p className="font-medium">
                              {learner.employeeName}
                            </p>
                            <p className="text-sm text-gray-500">
                              {learner.competency}
                            </p>
                          </div>
                          <Badge variant="secondary">
                            {learner.totalHours} hrs
                          </Badge>
                        </div>
                      ))
                    ) : (
                      <p>No top learners this week.</p>
                    )}
                  </div>
                </CardContent>
              </Card>
              <Card className="mt-6">
                <CardHeader>
                  <CardTitle>Top Learners This Month</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {isTopLearnersLoading ? (
                      <p>Loading...</p>
                    ) : topLearnersError ? (
                      <p className="text-red-500">
                        Error loading top learners.
                      </p>
                    ) : topLearnersOfMonth && topLearnersOfMonth.length > 0 ? (
                      topLearnersOfMonth.map((learner, index) => (
                        <div
                          key={learner._id}
                          className="flex items-center justify-between"
                        >
                          <div className="flex items-center gap-2">
                            {/* Medal icon for top 3 */}
                            {index === 0 && (
                              <span className="text-yellow-400 text-xl">
                                🥇
                              </span>
                            )}
                            {index === 1 && (
                              <span className="text-gray-400 text-xl">🥈</span>
                            )}
                            {index === 2 && (
                              <span className="text-yellow-700 text-xl">
                                🥉
                              </span>
                            )}
                            <p className="font-medium">
                              {learner.employeeName}
                            </p>
                            <p className="text-sm text-gray-500">
                              {learner.competency}
                            </p>
                          </div>
                          <Badge variant="secondary">
                            {learner.totalHours} hrs
                          </Badge>
                        </div>
                      ))
                    ) : (
                      <p>No top learners this month.</p>
                    )}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </>
      ) : (
        <Dashboard />
      )}
    </div>
  );
};

export default EmployeeDashboard;
