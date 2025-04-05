// Normally it would be an API call to something like /stations/:stationID/favorite
export const removeFavoriteStation = async (stationID: string) => {
  const storage = localStorage.getItem("favorite_stations");

  if (!storage) {
    return;
  }

  const parsed = JSON.parse(storage) as string[];

  localStorage.setItem(
    "favorite_stations",
    JSON.stringify(parsed.filter((ID) => ID !== stationID))
  );
};
