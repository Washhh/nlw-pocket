import { useQuery } from "@tanstack/react-query";
import { PendingGoalsResponse, PendingGoalsType } from "../types";

export const usePendingGoals = () => {
  const query = useQuery<PendingGoalsType>({
    queryKey: ["pendingGoals"],
    queryFn: async () => {
      const response = await fetch("http://localhost:3333/pending-goals");
      const data = (await response.json()) as PendingGoalsResponse;
      return data.pendingGoals;
    },
    staleTime: 1000 * 60 * 60, // 1 hora
  });

  return {
    data: query.data,
  };
};
