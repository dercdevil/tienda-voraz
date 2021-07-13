import request from "api";
import { useQuery } from "react-query";
export const useProfile = () => {
  const { isLoading, data, error } = useQuery(
    "/profile",
    () => request.profile.getProfile(),
    {
      onError: (err) => {
        if (err.response.status === 404) {
          window.location.href = "/home/profiles";
        }
        if (err.response.status === 401) {
          localStorage.removeItem("token");
          window.location.href = "/";
        }
      },
    }
  );
  return {
    isLoading,
    profile: data || [],
    error,
  };
};
