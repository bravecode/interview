import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/stations/$stationID")({
  component: View,
});

function View() {
  const { stationID } = Route.useParams();

  return (
    <div>
      Station Preview
      <span>{stationID}</span>
    </div>
  );
}
