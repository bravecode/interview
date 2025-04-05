import { Player } from "@components/player";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/share/")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div className="h-screen w-full flex items-center justify-center">
      <Player
        stationID="s131270"
        stationThumbnail="https://cdn-profiles-dev.tunein.com/s131270/images/logod.png"
        stationName="Radio Santa Claus"
        stationStreamURL="https://streaming.radiostreamlive.com/radiosantaclaus_devices"
        stationDescription="From Santa's Radio Office on the Arctic Circle North Pole, the real christmas sound. Since 2010."
      />
    </div>
  );
}
