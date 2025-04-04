import { Player } from "./shared/components/Player";

function App() {
  return (
    <main>
      <Player
        stationThumbnail="https://cdn-profiles-dev.tunein.com/s131270/images/logod.png"
        stationName="Radio Santa Claus"
        stationStreamURL="https://streaming.radiostreamlive.com/radiosantaclaus_devices"
      />
    </main>
  );
}

export default App;
