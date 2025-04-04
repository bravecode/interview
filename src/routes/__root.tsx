import { createRootRoute, Link, Outlet } from "@tanstack/react-router";

export const Route = createRootRoute({
  component: () => (
    <main>
      <nav>
        <Link to="/">Home</Link>
      </nav>

      <div>
        <Outlet />
      </div>
    </main>
  ),
});
