import { createRootRoute, Outlet } from "@tanstack/react-router";

export const Route = createRootRoute({
  component: () => (
    <main className="h-screen w-full bg-neutral-950">
      <Outlet />
    </main>
  ),
});
