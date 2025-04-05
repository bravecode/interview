export const fetchFavoriteStations = (): string[] => {
  const storage = localStorage.getItem("favorite_stations");

  if (storage) {
    return JSON.parse(storage) as string[];
  }

  return [];
};
