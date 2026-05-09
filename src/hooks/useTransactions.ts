import { useQuery } from "@tanstack/react-query";
import { getTransactions } from "../api/transactions";

export const useTransactions = (page: number = 1, limit: number = 20) => {
  const isClient = typeof window !== "undefined";
  return useQuery({
    queryKey: ["transactions", page, limit],
    queryFn: () => getTransactions(page, limit),
    enabled: isClient && !!localStorage.getItem("authToken"),
  });
};
