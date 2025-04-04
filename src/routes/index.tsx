import { createFileRoute } from "@tanstack/react-router";
import { Player } from "../shared/components/Player";

export const Route = createFileRoute("/")({
  component: View,
});

function View() {
  return (
    <div className="p-2">
      <h3>Welcome Home!</h3>

      <Player
        stationThumbnail="https://cdn-profiles-dev.tunein.com/s131270/images/logod.png"
        stationName="Radio Santa Claus"
        stationStreamURL="https://streaming.radiostreamlive.com/radiosantaclaus_devices"
      />
    </div>
  );
}
