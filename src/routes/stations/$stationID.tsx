import { Player } from "@components/player";
import { useFetchStationsQuery } from "@features/stations/queries/useFetchStationsQuery";
import { createFileRoute } from "@tanstack/react-router";
import { useMemo } from "react";

export const Route = createFileRoute("/stations/$stationID")({
  component: View,
});

function View() {
  const { stationID } = Route.useParams();
  const { data } = useFetchStationsQuery();

  const station = useMemo(() => {
    return data?.data.find((item) => item.id === stationID);
  }, [data, stationID]);

  // TODO: Error State, Loader
  if (!station) {
    return null;
  }

  return (
    <div className="h-screen w-full flex items-center justify-center">
      <Player
        stationID={station.id}
        stationThumbnail={station.imgUrl}
        stationName={station.name}
        stationStreamURL={station.streamUrl}
        stationDescription={station.description}
      />
    </div>
  );
}
