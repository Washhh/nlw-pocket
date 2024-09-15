import { useQuery } from "@tanstack/react-query";
import { SummaryResponse, SummaryType } from "../types";

export const useSummary = () => {
  const query = useQuery<SummaryType>({
    queryKey: ["summary"],
    queryFn: async () => {
      const response = await fetch("http://localhost:3333/summary");
      const data = (await response.json()) as SummaryResponse
      return data.summary;
    },
    staleTime: 1000 * 60 * 60 // 1 hora
  });

  return {
    data: query.data,
  };
};
