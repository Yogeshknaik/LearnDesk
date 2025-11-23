// McgPr7oX7v1mMcbN
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  useLoginUserMutation,
  useRegisterUserMutation,
} from "@/features/api/authApi";
import { Loader2 } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

const Login = () => {
  const [signupInput, setSignupInput] = useState({
    name: "",
    email: "",
    password: "",
    employeeId: "",
    competency: "",
  });
  const [loginInput, setLoginInput] = useState({ email: "", password: "" });

  const [
    registerUser,
    {
      data: registerData,
      error: registerError,
      isLoading: registerIsLoading,
      isSuccess: registerIsSuccess,
    },
  ] = useRegisterUserMutation();
  const [
    loginUser,
    {
      data: loginData,
      error: loginError,
      isLoading: loginIsLoading,
      isSuccess: loginIsSuccess,
    },
  ] = useLoginUserMutation();
  const navigate = useNavigate();

  const changeInputHandler = (e, type) => {
    const { name, value } = e.target;
    if (type === "signup") {
      setSignupInput({ ...signupInput, [name]: value });
    } else {
      setLoginInput({ ...loginInput, [name]: value });
    }
  };

  const handleRegistration = async (type) => {
    const inputData =
      type === "signup" ? { ...signupInput, role: "employee" } : loginInput;
    const action = type === "signup" ? registerUser : loginUser;
    await action(inputData);
  };
  // Employee login is now handled by the same login form
  useEffect(() => {
    if (registerIsSuccess && registerData) {
      toast.success(registerData.message || "Signup successful.");
      navigate("/");
    }
    if (registerError) {
      toast.error(registerError.data.message || "Signup Failed");
    }
    if (loginIsSuccess && loginData) {
      toast.success(loginData.message || "Login successful.");
      navigate("/");
    }
    if (loginError) {
      toast.error(loginError.data.message || "login Failed");
    }
  }, [
    loginIsLoading,
    registerIsLoading,
    loginData,
    registerData,
    loginError,
    registerError,
    loginIsSuccess,
    registerIsSuccess,
    navigate,
  ]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-50 to-blue-100 dark:from-gray-900 dark:to-gray-800 px-4">
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
          Welcome to LMS Portal
        </h1>
        <p className="text-gray-600 dark:text-gray-300">
          Sign in to your account or create a new one
        </p>
      </div>

      <div className="w-full max-w-md">
        <Tabs defaultValue="login" className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-8 pb-9">
            <TabsTrigger value="login" className="text-base">
              Login
            </TabsTrigger>
            <TabsTrigger value="signup" className="text-base">
              Signup
            </TabsTrigger>
          </TabsList>

          <TabsContent value="login">
            <Card className="border-none shadow-lg">
              <CardHeader className="space-y-1">
                <CardTitle className="text-2xl font-bold">Login</CardTitle>
                <CardDescription>
                  Enter your credentials to access your account
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    type="email"
                    name="email"
                    value={loginInput.email}
                    onChange={(e) => changeInputHandler(e, "login")}
                    placeholder="name@company.com"
                    className="w-full"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="password">Password</Label>
                  <Input
                    type="password"
                    name="password"
                    value={loginInput.password}
                    onChange={(e) => changeInputHandler(e, "login")}
                    placeholder="••••••••"
                    className="w-full"
                  />
                </div>
              </CardContent>
              <CardFooter>
                <Button
                  className="w-full"
                  size="lg"
                  disabled={loginIsLoading}
                  onClick={() => handleRegistration("login")}
                >
                  {loginIsLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Signing in...
                    </>
                  ) : (
                    "Sign in"
                  )}
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>

          <TabsContent value="signup">
            <Card className="border-none shadow-lg">
              <CardHeader className="space-y-1">
                <CardTitle className="text-2xl font-bold">
                  Create an account
                </CardTitle>
                <CardDescription>
                  Enter your details to create your account
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name</Label>
                  <Input
                    type="text"
                    name="name"
                    value={signupInput.name}
                    onChange={(e) => changeInputHandler(e, "signup")}
                    placeholder="yogesh k"
                    className="w-full"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    type="email"
                    name="email"
                    value={signupInput.email}
                    onChange={(e) => changeInputHandler(e, "signup")}
                    placeholder="yours@visionet.com"
                    className="w-full"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="password">Password</Label>
                  <Input
                    type="password"
                    name="password"
                    value={signupInput.password}
                    onChange={(e) => changeInputHandler(e, "signup")}
                    placeholder="••••••••"
                    className="w-full"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="employeeId">Employee ID</Label>
                  <Input
                    type="text"
                    name="employeeId"
                    value={signupInput.employeeId}
                    onChange={(e) => changeInputHandler(e, "signup")}
                    placeholder="40806"
                    className="w-full"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="competency">Competency</Label>
                  <select
                    name="competency"
                    value={signupInput.competency}
                    onChange={(e) => changeInputHandler(e, "signup")}
                    className="w-full border rounded px-3 py-2 bg-white dark:bg-gray-800 dark:text-white"
                  >
                    <option value="">Select Competency</option>
                    <option value="CNEX">CNEX</option>
                    <option value="Data">Data</option>
                    <option value="Testing">Testing</option>
                    <option value="Automation">Automation</option>
                  </select>
                </div>
              </CardContent>
              <CardFooter>
                <Button
                  className="w-full"
                  size="lg"
                  disabled={registerIsLoading}
                  onClick={() => handleRegistration("signup")}
                >
                  {registerIsLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Creating account...
                    </>
                  ) : (
                    "Create account"
                  )}
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};
export default Login;
