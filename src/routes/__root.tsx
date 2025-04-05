import { QueryProvider } from "@providers/QueryProvider";
import { createRootRoute, Outlet } from "@tanstack/react-router";

export const Route = createRootRoute({
  component: () => (
    <QueryProvider>
      <main className="h-screen w-full bg-neutral-950 overflow-y-auto p-12">
        <Outlet />
      </main>
    </QueryProvider>
  ),
});
