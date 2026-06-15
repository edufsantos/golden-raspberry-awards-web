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
    <section className="rounded-lg border border-slate-200 bg-white p-4 shadow-sm">
      <MoviesFilters year={year} winner={winner} onYearChange={setYear} onWinnerChange={setWinner} />

      {isLoading && <p className="text-left text-slate-600">Carregando filmes...</p>}
      {isError && (
        <p className="text-left text-red-600">Erro ao carregar filmes. Tente novamente.</p>
      )}

      {!isLoading && !isError && (
        <>
          {isFetching && <p className="mb-2 text-left text-slate-500">Atualizando tabela...</p>}
          <div className="overflow-x-auto">
            <table className="min-w-full border-collapse text-sm">
              <thead>
                <tr className="bg-slate-50 text-left">
                  <th className="border-b border-slate-200 px-3 py-2 font-medium text-slate-700">Id</th>
                  <th className="border-b border-slate-200 px-3 py-2 font-medium text-slate-700">Year</th>
                  <th className="border-b border-slate-200 px-3 py-2 font-medium text-slate-700">Title</th>
                  <th className="border-b border-slate-200 px-3 py-2 font-medium text-slate-700">Winner</th>
                </tr>
              </thead>
              <tbody>
                {(data?.content ?? []).length > 0 ? (
                  (data?.content ?? []).map((movie) => (
                    <tr key={movie.id} className="text-left odd:bg-white even:bg-slate-50/30">
                      <td className="border-b border-slate-100 px-3 py-2 text-slate-700">{movie.id}</td>
                      <td className="border-b border-slate-100 px-3 py-2 text-slate-700">{movie.year}</td>
                      <td className="border-b border-slate-100 px-3 py-2 text-slate-700">{movie.title}</td>
                      <td className="border-b border-slate-100 px-3 py-2 text-slate-700">{movie.winner ? "Yes" : "No"}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={4} className="px-3 py-4 text-left text-slate-500">
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
