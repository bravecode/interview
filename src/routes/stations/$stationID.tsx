import { Player, PlayerError } from "@components/player";
import { useFetchStationsQuery } from "@features/stations/queries/useFetchStationsQuery";
import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo } from "react";
import { FaRegArrowAltCircleLeft } from "react-icons/fa";
import { Spinner } from "@components/spinner";

export const Route = createFileRoute("/stations/$stationID")({
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
        <div>
          <Link
            to="/"
            className="flex items-center gap-1 text-white hover:text-white/80 mb-3"
          >
            <FaRegArrowAltCircleLeft className="text-sm" />
            <span className="text-xs">Go Back</span>
          </Link>

          <PlayerError message="Could not find selected station." />
        </div>
      </div>
    );
  }

  return (
    <div className="h-screen w-full flex items-center justify-center">
      <div>
        <Link
          to="/"
          className="flex items-center gap-1 text-white hover:text-white/80 mb-3"
        >
          <FaRegArrowAltCircleLeft className="text-sm" />
          <span className="text-xs">Go Back</span>
        </Link>

        <Player
          stationID={station.id}
          stationThumbnail={station.imgUrl}
          stationName={station.name}
          stationStreamURL={station.streamUrl}
          stationDescription={station.description}
        />
      </div>
    </div>
  );
}
