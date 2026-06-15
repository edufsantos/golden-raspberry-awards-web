import { useMovieDetailsModalHandler } from '../hooks/use-movie-details-modal.handler';
import { useMoviesTableHandler } from '../hooks/use-movies-table.handler';
import { MovieDetailsModal } from './movie-details-modal';
import { MoviesFilters } from './movies-filters';
import { MoviesPagination } from './movies-pagination';

const MoviesTable = () => {
  const {
    page,
    year,
    winner,
    setPage,
    setYear,
    setWinner,
    data,
    isLoading,
    isError,
    isFetching,
  } = useMoviesTableHandler();
  const {
    selectedMovieId,
    isMovieDetailsOpen,
    openMovieDetails,
    closeMovieDetails,
  } = useMovieDetailsModalHandler();

  return (
    <section className='rounded-xl border bg-card p-4 text-card-foreground shadow-sm'>
      <MoviesFilters
        year={year}
        winner={winner}
        onYearChange={setYear}
        onWinnerChange={setWinner}
      />

      {isLoading && (
        <p className='text-sm text-muted-foreground'>Carregando filmes...</p>
      )}
      {isError && (
        <p className='text-sm text-destructive'>
          Erro ao carregar filmes. Tente novamente.
        </p>
      )}

      {!isLoading && !isError && (
        <>
          {isFetching && (
            <p className='mb-2 text-sm text-muted-foreground'>
              Atualizando tabela...
            </p>
          )}
          <div className='overflow-x-auto rounded-md border'>
            <table className='min-w-full text-sm'>
              <thead>
                <tr className='bg-muted/50 text-left'>
                  <th className='h-10 border-b px-3 text-xs font-medium uppercase tracking-wide text-muted-foreground'>
                    Id
                  </th>
                  <th className='h-10 border-b px-3 text-xs font-medium uppercase tracking-wide text-muted-foreground'>
                    Ano
                  </th>
                  <th className='h-10 border-b px-3 text-xs font-medium uppercase tracking-wide text-muted-foreground'>
                    Título
                  </th>
                  <th className='h-10 border-b px-3 text-xs font-medium uppercase tracking-wide text-muted-foreground'>
                    Vencedor
                  </th>
                  <th className='h-10 border-b px-3 text-xs font-medium uppercase tracking-wide text-muted-foreground'>
                    Ações
                  </th>
                </tr>
              </thead>
              <tbody>
                {(data?.movies ?? []).length > 0 ? (
                  (data?.movies ?? []).map((movie) => (
                    <tr
                      key={movie.id}
                      className='border-b text-left last:border-b-0'
                    >
                      <td className='h-10 px-3'>{movie.id}</td>
                      <td className='h-10 px-3'>{movie.year}</td>
                      <td className='h-10 px-3'>{movie.title}</td>
                      <td className='h-10 px-3'>
                        {movie.winner ? 'Sim' : 'Não'}
                      </td>
                      <td className='h-10 px-3'>
                        <button
                          type='button'
                          onClick={() => openMovieDetails(movie.id)}
                          className='rounded-md border bg-background px-3 py-1.5 text-sm font-medium text-foreground transition-colors hover:bg-muted'
                        >
                          Ver detalhes
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td
                      colSpan={5}
                      className='px-3 py-4 text-left text-muted-foreground'
                    >
                      Nenhum filme encontrado.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          <MoviesPagination
            page={data?.number ?? page}
            totalPages={data?.total ?? 0}
            onPrev={() => setPage(Math.max(page - 1, 0))}
            onNext={() => {
              const nextPage = page + 1;
              if (nextPage < (data?.total ?? 0)) {
                setPage(nextPage);
              }
            }}
          />

          {isMovieDetailsOpen && selectedMovieId !== null && (
            <MovieDetailsModal
              movieId={selectedMovieId}
              onClose={closeMovieDetails}
            />
          )}
        </>
      )}
    </section>
  );
};

export { MoviesTable };
