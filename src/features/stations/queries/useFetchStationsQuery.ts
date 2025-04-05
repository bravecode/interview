import { useQuery } from "@tanstack/react-query";
import { fetchStations } from "../services/fetchStations";

export const useFetchStationsQuery = () => {
  return useQuery({
    queryKey: ["stations:all"],
    queryFn: () => fetchStations(),
  });
};
