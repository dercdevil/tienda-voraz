import request from "api";
import { useQuery } from "react-query";
export const useOrder = () => {
  const { isLoading, data, error } = useQuery(
    "/orders",
    () => request.orders.getOrders(),
    {
      onError: (err) => {
        if (err.response.status === 401) {
          localStorage.removeItem("token");
          window.location.href = "/";
        }
      },
      refetchInterval: 5000,
    }
  );
  return {
    isLoading,
    order: data || [],
    error,
  };
};
