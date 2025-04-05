import { useQuery } from "@tanstack/react-query";
import { fetchFavoriteStations } from "../services/fetchFavoriteStations";

export const useFetchFavoriteStations = () => {
  return useQuery({
    queryKey: ["stations:favorite:all"],
    queryFn: () => fetchFavoriteStations(),
  });
};
