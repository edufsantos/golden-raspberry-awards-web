import { NavLink, Outlet } from "react-router";

const Layout = () => {
  return (
    <div className="mx-auto min-h-screen w-full max-w-6xl px-4 py-6">
      <header className="mb-6 rounded-lg border border-slate-200 bg-white p-4 shadow-sm">
        <h1 className="mb-3 text-left text-xl font-semibold text-slate-900">
          Razzie Movies Dashboard
        </h1>
        <nav className="flex gap-2">
          <NavLink
            to="/dashboard"
            className={({ isActive }) =>
              `rounded-md px-3 py-2 text-sm font-medium ${
                isActive
                  ? "bg-slate-900 text-white"
                  : "border border-slate-300 text-slate-700 hover:bg-slate-100"
              }`
            }
          >
            Dashboard
          </NavLink>
          <NavLink
            to="/movies"
            className={({ isActive }) =>
              `rounded-md px-3 py-2 text-sm font-medium ${
                isActive
                  ? "bg-slate-900 text-white"
                  : "border border-slate-300 text-slate-700 hover:bg-slate-100"
              }`
            }
          >
            Movies
          </NavLink>
        </nav>
      </header>

      <main>
        <Outlet />
      </main>
    </div>
  );
};

export { Layout };
