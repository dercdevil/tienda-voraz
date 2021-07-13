import request from "api";
import { useQuery } from "react-query";
export const useUser = () => {
  const { isLoading, data, error } = useQuery(
    "/user",
    () => request.profile.getUser(),
    {
      refetchInterval: 5000,
    }
  );
  return {
    isLoading,
    user: data || [],
    error,
  };
};
