import { useAppStore } from "@/app/store/store";

import { useFetchMoviesQuery } from "../../hooks/use-fetch-movies-query";
import { MoviesFilters } from "./partials/movies-filters";
import { MoviesPagination } from "./partials/movies-pagination";

const MoviesTable = () => {
  const page = useAppStore((state) => state.movies.page);
  const year = useAppStore((state) => state.movies.year);
  const winner = useAppStore((state) => state.movies.winner);

  const setPage = useAppStore((state) => state.movies.setPage);
  const setYear = useAppStore((state) => state.movies.setYear);
  const setWinner = useAppStore((state) => state.movies.setWinner);

  const { data, isLoading, isError, isFetching } = useFetchMoviesQuery();

  return (
    <section className="rounded-xl border bg-card p-4 text-card-foreground shadow-sm">
      <MoviesFilters year={year} winner={winner} onYearChange={setYear} onWinnerChange={setWinner} />

      {isLoading && <p className="text-sm text-muted-foreground">Carregando filmes...</p>}
      {isError && (
        <p className="text-sm text-destructive">Erro ao carregar filmes. Tente novamente.</p>
      )}

      {!isLoading && !isError && (
        <>
          {isFetching && <p className="mb-2 text-sm text-muted-foreground">Atualizando tabela...</p>}
          <div className="overflow-x-auto rounded-md border">
            <table className="min-w-full text-sm">
              <thead>
                <tr className="bg-muted/50 text-left">
                  <th className="h-10 border-b px-3 text-xs font-medium uppercase tracking-wide text-muted-foreground">Id</th>
                  <th className="h-10 border-b px-3 text-xs font-medium uppercase tracking-wide text-muted-foreground">Year</th>
                  <th className="h-10 border-b px-3 text-xs font-medium uppercase tracking-wide text-muted-foreground">Title</th>
                  <th className="h-10 border-b px-3 text-xs font-medium uppercase tracking-wide text-muted-foreground">Winner</th>
                </tr>
              </thead>
              <tbody>
                {(data?.content ?? []).length > 0 ? (
                  (data?.content ?? []).map((movie) => (
                    <tr key={movie.id} className="border-b text-left last:border-b-0">
                      <td className="h-10 px-3">{movie.id}</td>
                      <td className="h-10 px-3">{movie.year}</td>
                      <td className="h-10 px-3">{movie.title}</td>
                      <td className="h-10 px-3">{movie.winner ? "Yes" : "No"}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={4} className="px-3 py-4 text-left text-muted-foreground">
                      Nenhum filme encontrado.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          <MoviesPagination
            page={data?.number ?? page}
            totalPages={data?.totalPages ?? 0}
            onPrev={() => setPage(Math.max(page - 1, 0))}
            onNext={() => {
              const nextPage = page + 1;
              if (nextPage < (data?.totalPages ?? 0)) {
                setPage(nextPage);
              }
            }}
          />
        </>
      )}
    </section>
  );
};

export { MoviesTable };
