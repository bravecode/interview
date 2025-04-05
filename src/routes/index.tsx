import { createFileRoute } from "@tanstack/react-router";
import { Player } from "../shared/components/player";

export const Route = createFileRoute("/")({
  component: View,
});

function View() {
  return (
    <div className="h-full w-full flex items-center justify-center">
      <Player
        stationThumbnail="https://cdn-profiles-dev.tunein.com/s131270/images/logod.png"
        stationName="Radio Santa Claus"
        stationStreamURL="https://streaming.radiostreamlive.com/radiosantaclaus_devices"
        stationDescription="From Santa's Radio Office on the Arctic Circle North Pole, the real christmas sound. Since 2010."
      />
    </div>
  );
}
