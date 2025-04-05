// Normally it would be an API call to something like /stations/:stationID/favorite
export const saveFavoriteStation = async (stationID: string) => {
  const storage = localStorage.getItem("favorite_stations");

  if (!storage) {
    localStorage.setItem("favorite_stations", JSON.stringify([stationID]));

    return;
  }

  const parsed = JSON.parse(storage) as string[];

  localStorage.setItem(
    "favorite_stations",
    JSON.stringify([...parsed, stationID])
  );
};
