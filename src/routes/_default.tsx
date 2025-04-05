import { createFileRoute, Outlet } from "@tanstack/react-router";

export const Route = createFileRoute("/_default")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div className="h-full w-full grid grid-cols-[80px_1fr] grid-rows-[1fr_80px]">
      <div className="col-start-2 cold-end-3 row-start-1 row-end-2">
        <Outlet />
      </div>
    </div>
  );
}
