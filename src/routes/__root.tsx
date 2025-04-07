import { QueryProvider } from "@providers/QueryProvider";
import { createRootRoute, Link, Outlet } from "@tanstack/react-router";
import { MdOutlineErrorOutline } from "react-icons/md";

export const Route = createRootRoute({
  component: () => (
    <QueryProvider>
      <main>
        <Outlet />
      </main>
    </QueryProvider>
  ),
  notFoundComponent: () => (
    <main className="h-screen w-full flex items-center justify-center">
      <div className="flex flex-col items-center">
        <MdOutlineErrorOutline className="text-[48px]" />
        <span className="text-sm font-semibold mt-3">Not Found</span>
        <Link
          to="/"
          className="text-sm hover:text-white/80 cursor-pointer mt-1"
        >
          Go to Home
        </Link>
      </div>
    </main>
  ),
});
