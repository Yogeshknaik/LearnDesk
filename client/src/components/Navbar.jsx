import { Menu, School } from "lucide-react";
import React, { useEffect } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { Button } from "./ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import DarkMode from "@/DarkMode";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "./ui/sheet";
import { Separator } from "@radix-ui/react-dropdown-menu";
import { Link, useNavigate } from "react-router-dom";
import { useLogoutUserMutation } from "@/features/api/authApi";
import { toast } from "sonner";
import { useSelector } from "react-redux";
import { useTheme } from "next-themes";

const Navbar = () => {
  const { user } = useSelector((store) => store.auth);
  const [logoutUser, { data, isSuccess }] = useLogoutUserMutation();
  const navigate = useNavigate();
  const { theme } = useTheme();

  const logoutHandler = async () => {
    await logoutUser();
  };

  useEffect(() => {
    if (isSuccess) {
      toast.success(data?.message || "User logged out successfully");
      navigate("/login");
    }
  }, [isSuccess, data, navigate]);

  return (
    <nav className="fixed w-full z-50 bg-background/95 backdrop-blur-md border-b shadow-sm transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo and Brand */}
          <div className="flex items-center space-x-3">
            <School className="text-primary h-7 w-7" />
            <Link to="/" className="flex items-center">
              <h1 className="font-semibold text-xl tracking-tight text-primary sm:block">
                Track my learning
              </h1>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            {user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Avatar className="cursor-pointer hover:opacity-80 transition-opacity">
                    <AvatarImage
                      src={user?.photoUrl || "https://github.com/shadcn.png"}
                      alt={user.name}
                    />
                    <AvatarFallback>{user.name?.charAt(0)}</AvatarFallback>
                  </Avatar>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  <DropdownMenuLabel>My Account</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuGroup>
                    <DropdownMenuItem asChild>
                      <Link
                        to="/"
                        className="w-full hover:text-primary cursor-pointer"
                      >
                        Home
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link
                        to="/profile"
                        className="w-full hover:text-primary cursor-pointer"
                      >
                        Profile
                      </Link>
                    </DropdownMenuItem>
                    {user?.role === "admin" ? (
                      <DropdownMenuItem asChild>
                        <Link
                          to="/admin/dashboard"
                          className="w-full hover:text-primary cursor-pointer"
                        >
                          Dashboard
                        </Link>
                      </DropdownMenuItem>
                    ) : (
                      <DropdownMenuItem asChild>
                        <Link
                          to="/assigned-courses"
                          className="w-full hover:text-primary cursor-pointer"
                        >
                          Assigned Courses
                        </Link>
                      </DropdownMenuItem>
                    )}
                    <DropdownMenuItem
                      onClick={logoutHandler}
                      className="text-red-500 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-950 cursor-pointer"
                    >
                      Log out
                    </DropdownMenuItem>
                  </DropdownMenuGroup>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <div className="flex items-center space-x-4">
                <Button variant="ghost" onClick={() => navigate("/login")}>
                  Login
                </Button>
                <Button onClick={() => navigate("/login")}>Sign up</Button>
              </div>
            )}
            <DarkMode />
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center space-x-4">
            <DarkMode />
            <Sheet>
              <SheetTrigger asChild>
                <Button
                  size="icon"
                  className="rounded-full hover:bg-accent"
                  variant="ghost"
                >
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-full max-w-xs">
                <SheetHeader className="text-left space-y-4 pb-4">
                  <SheetTitle className="text-primary">Menu</SheetTitle>
                </SheetHeader>
                {user ? (
                  <>
                    <div className="flex items-center space-x-3 mb-6 pb-6 border-b">
                      <Avatar className="h-10 w-10">
                        <AvatarImage
                          src={
                            user?.photoUrl || "https://github.com/shadcn.png"
                          }
                          alt={user.name}
                        />
                        <AvatarFallback>{user.name?.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-medium">{user.name}</p>
                        <p className="text-sm text-muted-foreground">
                          {user.email}
                        </p>
                      </div>
                    </div>
                    <nav className="flex flex-col space-y-4">
                      <Link
                        to="/"
                        className="text-sm hover:text-primary transition-colors px-2 py-1 rounded-md hover:bg-accent"
                      >
                        Home
                      </Link>
                      <Link
                        to="/profile"
                        className="text-sm hover:text-primary transition-colors px-2 py-1 rounded-md hover:bg-accent"
                      >
                        Profile
                      </Link>
                      {user?.role === "admin" && (
                        <Link
                          to="/admin/dashboard"
                          className="text-sm hover:text-primary transition-colors px-2 py-1 rounded-md hover:bg-accent"
                        >
                          Dashboard
                        </Link>
                      )}
                      <button
                        onClick={logoutHandler}
                        className="text-sm text-left text-red-500 hover:text-red-600 transition-colors px-2 py-1 rounded-md hover:bg-red-50 dark:hover:bg-red-950/50"
                      >
                        Log out
                      </button>
                    </nav>
                  </>
                ) : (
                  <div className="flex flex-col space-y-3">
                    <Button
                      variant="outline"
                      onClick={() => navigate("/login")}
                      className="w-full"
                    >
                      Login
                    </Button>
                    <Button
                      onClick={() => navigate("/login")}
                      className="w-full"
                    >
                      Sign up
                    </Button>
                  </div>
                )}
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
