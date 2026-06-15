import { withHelmet } from "@/shared/utils/with-helmet";

import { MoviesTable } from "../components/movies-table";

const Movies = () => {
  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-1">
        <h1 className="text-3xl font-bold tracking-tight">Movies</h1>
        <p className="text-sm text-muted-foreground">
          Data table com paginação server-side e filtros por ano e vencedor
        </p>
      </div>
      <MoviesTable />
    </div>
  );
};

const MoviesPage = withHelmet(Movies, "Outsera | Movies");

export { MoviesPage };
