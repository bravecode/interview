import { Player, PlayerError } from "@components/player";
import { Spinner } from "@components/spinner";
import { useFetchStationsQuery } from "@features/stations/queries/useFetchStationsQuery";
import { createFileRoute } from "@tanstack/react-router";
import { useMemo } from "react";

export const Route = createFileRoute("/share/$stationID")({
  component: View,
});

function View() {
  const { stationID } = Route.useParams();
  const { data, status } = useFetchStationsQuery();

  const station = useMemo(() => {
    return data?.data.find((item) => item.id === stationID);
  }, [data, stationID]);

  // Note: Skeleton would be a better UX, but spinner is faster solution that's fine for this application.
  if (status === "pending") {
    return (
      <div className="h-screen w-full flex items-center justify-center">
        <Spinner />
      </div>
    );
  }

  if (!station) {
    return (
      <div className="h-screen w-full flex items-center justify-center">
        <PlayerError message="Could not find selected station." />
      </div>
    );
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
