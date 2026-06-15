import { withHelmet } from "@/shared/utils/with-helmet";

import { MoviesTable } from "../components/movies-table";

const Movies = () => {
  return (
    <div className="space-y-4">
      <h1 className="text-left text-2xl font-semibold text-slate-900">Listagem de filmes</h1>
      <MoviesTable />
    </div>
  );
};

const MoviesPage = withHelmet(Movies, "Outsera | Movies");

export { MoviesPage };
