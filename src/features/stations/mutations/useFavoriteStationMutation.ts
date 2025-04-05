import { useMutation } from "@tanstack/react-query";
import { saveFavoriteStation } from "../services/saveFavoriteStation";
import { removeFavoriteStation } from "../services/removeFavoriteStation";

export const useSaveFavoriteStationMutation = (stationID: string) => {
  return useMutation({
    mutationKey: ["stations:favorite:save", stationID],
    mutationFn: () => saveFavoriteStation(stationID),
  });
};

export const useRemoveFavoriteStationMutation = (stationID: string) => {
  return useMutation({
    mutationKey: ["stations:favorite:remove", stationID],
    mutationFn: () => removeFavoriteStation(stationID),
  });
};
