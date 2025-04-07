import React from "react";
import { useFetchFavoriteStations } from "../queries/useFetchFavoriteStations";
import { FaRegHeart, FaHeart } from "react-icons/fa6";
import { useQueryClient } from "@tanstack/react-query";
import {
  useRemoveFavoriteStationMutation,
  useSaveFavoriteStationMutation,
} from "../mutations/useFavoriteStationMutation";
import classNames from "classnames";

type StationFavoriteProps = {
  stationID: string;
};

export const StationFavorite: React.FC<StationFavoriteProps> = ({
  stationID,
}) => {
  const queryClient = useQueryClient();
  const { data = [] } = useFetchFavoriteStations();
  const isFavorite = data.includes(stationID);

  const { mutate: saveFavoriteStation } =
    useSaveFavoriteStationMutation(stationID);
  const { mutate: removeFavoriteStation } =
    useRemoveFavoriteStationMutation(stationID);

  const handleFavorite = () => {
    if (isFavorite) {
      removeFavoriteStation();
    } else {
      saveFavoriteStation();
    }

    queryClient.setQueryData<string[]>(
      ["stations:favorite:all"],
      (prev = []) => {
        if (!isFavorite) {
          return [...prev, stationID];
        }

        return prev.filter((ID) => ID !== stationID);
      }
    );
  };

  return (
    <button
      onClick={handleFavorite}
      className={classNames(
        "cursor-pointer text-[16px]",
        isFavorite
          ? "text-red-400 hover:text-red-400/80"
          : "text-white hover:text-white/80"
      )}
      data-testid={
        isFavorite ? "favorite-station-remove" : "favorite-station-add"
      }
    >
      {isFavorite ? <FaHeart /> : <FaRegHeart />}
    </button>
  );
};
