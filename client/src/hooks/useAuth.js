import { useSelector } from "react-redux";
import { useLoadUserQuery } from "@/features/api/authApi";

const useAuth = () => {
  const { user } = useSelector((state) => state.auth);
  const { isLoading } = useLoadUserQuery();

  return {
    user,
    isAuthenticated: !!user,
    isLoading,
    role: user?.role,
  };
};

export default useAuth;
