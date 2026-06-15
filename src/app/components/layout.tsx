import { NavLink, Outlet } from "react-router";

const Layout = () => {
  return (
    <div className="min-h-screen bg-muted/30">
      <header className="border-b bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/60">
        <div className="mx-auto flex h-16 w-full max-w-7xl items-center justify-between px-4 md:px-6">
          <div className="flex flex-col items-start">
            <span className="text-sm font-medium text-muted-foreground">Outsera</span>
            <span className="text-base font-semibold">Golden Raspberry Awards</span>
          </div>
          <nav className="flex gap-2">
          <NavLink
            to="/dashboard"
            className={({ isActive }) =>
              `rounded-md px-3 py-2 text-sm font-medium transition-colors ${
                isActive
                  ? "bg-primary text-primary-foreground"
                  : "border border-border bg-background text-foreground hover:bg-muted"
              }`
            }
          >
            Dashboard
          </NavLink>
          <NavLink
            to="/movies"
            className={({ isActive }) =>
              `rounded-md px-3 py-2 text-sm font-medium transition-colors ${
                isActive
                  ? "bg-primary text-primary-foreground"
                  : "border border-border bg-background text-foreground hover:bg-muted"
              }`
            }
          >
            Movies
          </NavLink>
        </nav>
        </div>
      </header>

      <main className="mx-auto w-full max-w-7xl p-4 md:p-6">
        <Outlet />
      </main>
    </div>
  );
};

export { Layout };
