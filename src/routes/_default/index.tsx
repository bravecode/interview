import { Station } from "@features/stations/components/Station";
import { useFetchStationsQuery } from "@features/stations/queries/useFetchStationsQuery";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_default/")({
  component: View,
});

function View() {
  const { data } = useFetchStationsQuery();

  return (
    <div>
      <section>
        <header>
          <h1>Explore</h1>
        </header>

        <div className="flex gap-3 flex-wrap">
          {data?.data.map((station) => (
            <Station data={station} key={station.id} />
          ))}
        </div>
      </section>
    </div>
  );
}
