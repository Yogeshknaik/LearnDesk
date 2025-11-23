import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader2 } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";

const Profile = () => {
  const [name, setName] = useState("");
  const [profilePhoto, setProfilePhoto] = useState("");
  const [user, setUser] = useState(null);
  const [learningForms, setLearningForms] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [updateUserIsLoading, setUpdateUserIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [error, setError] = useState(null);
  const [isSuccess, setIsSuccess] = useState(false);

  const fetchUserData = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(
        "http://localhost:3001/api/v1/user/profile",
        {
          credentials: "include",
        }
      );
      if (!response.ok) {
        throw new Error("Failed to fetch user data");
      }
      const data = await response.json();
      setUser(data.user);
    } catch (error) {
      setError(error.message);
      setIsError(true);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchLearningForms = async () => {
    if (!user?.employeeId) return;

    try {
      console.log("Fetching learning forms...");
      const response = await fetch(
        "http://localhost:3001/api/v1/learning-form/my",
        {
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
            employeeId: user.employeeId,
          },
        }
      );
      if (!response.ok) {
        throw new Error("Failed to fetch learning forms");
      }
      const data = await response.json();
      console.log("Learning forms fetched:", data.forms);
      setLearningForms(data.forms);
    } catch (error) {
      console.error("Error fetching learning forms:", error);
      setError(error.message);
      setIsError(true);
    }
  };

  const updateUser = async (formData) => {
    setUpdateUserIsLoading(true);
    try {
      const response = await fetch(
        "http://localhost:3001/api/v1/user/profile/update",
        {
          method: "PUT",
          body: formData,
          credentials: "include",
        }
      );
      if (!response.ok) {
        throw new Error("Failed to update user data");
      }
      const data = await response.json();
      setIsSuccess(true);
      toast.success(data.message || "Profile updated.");
      fetchUserData(); // Refetch user data after update
    } catch (error) {
      setError(error.message);
      setIsError(true);
      toast.error(error.message || "Failed to update profile");
    } finally {
      setUpdateUserIsLoading(false);
    }
  };

  const onChangeHandler = (e) => {
    const file = e.target.files?.[0];
    if (file) setProfilePhoto(file);
  };

  const updateUserHandler = async () => {
    const formData = new FormData();
    formData.append("name", name);
    formData.append("profilePhoto", profilePhoto);
    await updateUser(formData);
  };

  useEffect(() => {
    fetchUserData();
  }, []);

  useEffect(() => {
    if (user?.employeeId) {
      fetchLearningForms();
    }
  }, [user]);

  useEffect(() => {
    if (isSuccess) {
      fetchUserData();
    }
  }, [isSuccess]);

  if (isLoading) return <h1>Profile Loading...</h1>;

  return (
    <div className="max-w-4xl mx-auto px-4 my-10">
      <h1 className="font-bold text-2xl text-center md:text-left">PROFILE</h1>
      <div className="flex flex-col md:flex-row items-center md:items-start gap-8 my-5">
        <div className="flex flex-col items-center">
          <Avatar className="h-24 w-24 md:h-32 md:w-32 mb-4">
            <AvatarImage
              src={user?.photoUrl || "https://github.com/shadcn.png"}
              alt="@shadcn"
            />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
        </div>
        <div>
          <div className="mb-2">
            <h1 className="font-semibold text-gray-900 dark:text-gray-100">
              Name:
              <span className="font-normal text-gray-700 dark:text-gray-300 ml-2">
                {user?.name}
              </span>
            </h1>
          </div>
          <div className="mb-2">
            <h1 className="font-semibold text-gray-900 dark:text-gray-100">
              Email:
              <span className="font-normal text-gray-700 dark:text-gray-300 ml-2">
                {user?.email}
              </span>
            </h1>
          </div>
          <div className="mb-2">
            <h1 className="font-semibold text-gray-900 dark:text-gray-100">
              {user.employeeId ? "Employee Id" : "Role"}
              <span className="font-normal text-gray-700 dark:text-gray-300 ml-2">
                {user?.employeeId || "ADMIN"}
              </span>
            </h1>
          </div>
          <div className="mb-2">
            <h1 className="font-semibold text-gray-900 dark:text-gray-100">
              Competency:
              <span className="font-normal text-gray-700 dark:text-gray-300 ml-2">
                {user?.competency || "MANAGEMENT"}
              </span>
            </h1>
          </div>
          <Dialog>
            <DialogTrigger asChild>
              <Button size="sm" className="mt-2">
                Edit Profile
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Edit Profile</DialogTitle>
                <DialogDescription>
                  Make changes to your profile here. Click save when you're
                  done.
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label>Name</Label>
                  <Input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Name"
                    className="col-span-3"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label>Profile Photo</Label>
                  <Input
                    onChange={onChangeHandler}
                    type="file"
                    accept="image/*"
                    className="col-span-3"
                  />
                </div>
              </div>
              <DialogFooter>
                <Button
                  disabled={updateUserIsLoading}
                  onClick={updateUserHandler}
                >
                  {updateUserIsLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Please
                      wait
                    </>
                  ) : (
                    "Save Changes"
                  )}
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {user?.role !== "admin" && (
        <div>
          <h1 className="font-medium text-lg">Your Learning Forms</h1>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 my-5">
            {learningForms.length === 0 ? (
              <h1>No learning forms available</h1>
            ) : (
              learningForms.map((form) => (
                <div
                  key={form._id}
                  className="rounded-2xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 p-6 shadow-md hover:shadow-lg transition"
                >
                  <h2 className="text-xl font-bold text-gray-800 dark:text-gray-100 mb-4">
                    {form.courseTitle}
                  </h2>
                  <div className="space-y-1 text-sm text-gray-700 dark:text-gray-300">
                    <p>
                      <span className="font-semibold">Hours Attended:</span>{" "}
                      {form.hoursAttended}
                    </p>
                    <p>
                      <span className="font-semibold">Level of Learning:</span>{" "}
                      {form.levelOfLearning}
                    </p>
                    <p>
                      <span className="font-semibold">Role:</span> {form.role}
                    </p>
                    <p>
                      <span className="font-semibold">Session Topic:</span>{" "}
                      {form.sessionTopic}
                    </p>
                    <p>
                      <span className="font-semibold">Session Type:</span>{" "}
                      {form.sessionType}
                    </p>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Profile;
