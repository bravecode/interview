import { Station } from "@features/stations/components/Station";
import { useFetchFavoriteStations } from "@features/stations/queries/useFetchFavoriteStations";
import { useFetchStationsQuery } from "@features/stations/queries/useFetchStationsQuery";
import { APIStation } from "@features/stations/types";
import { createFileRoute } from "@tanstack/react-router";
import { useMemo } from "react";

export const Route = createFileRoute("/_default/")({
  component: View,
});

function View() {
  const { data } = useFetchStationsQuery();
  const { data: favoriteIDs } = useFetchFavoriteStations();

  const stations = useMemo<{
    favorite: APIStation[];
    other: APIStation[];
  }>(() => {
    return (
      data?.data.reduce<{ favorite: APIStation[]; other: APIStation[] }>(
        (acc, current) => {
          if (favoriteIDs?.includes(current.id)) {
            acc.favorite.push(current);
          } else {
            acc.other.push(current);
          }

          return acc;
        },
        { favorite: [], other: [] }
      ) ?? { favorite: [], other: [] }
    );
  }, [data, favoriteIDs]);

  return (
    <div className="p-6 flex flex-col gap-6">
      {stations.favorite.length > 0 ? (
        <section>
          <header className="mb-6">
            <h2 className="text-2xl font-semibold">Favorite Stations</h2>
          </header>

          <div className="flex gap-3 flex-wrap">
            {stations.favorite.map((station) => (
              <Station data={station} key={station.id} />
            ))}
          </div>
        </section>
      ) : null}

      {stations.other.length > 0 ? (
        <section>
          <header className="mb-6">
            <h2 className="text-2xl font-semibold">Explore</h2>
          </header>

          <div className="flex gap-3 flex-wrap">
            {stations.other.map((station) => (
              <Station data={station} key={station.id} />
            ))}
          </div>
        </section>
      ) : null}
    </div>
  );
}
