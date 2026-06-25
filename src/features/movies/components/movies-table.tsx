import { useMoviesTableHandler } from '../hooks/use-movies-table.handler';
import type { WinnerFilter } from '../models/movie';
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

  return (
    <section>
      {isLoading && (
        <p className='text-sm text-muted-foreground'>Loading movies...</p>
      )}
      {isError && (
        <p className='text-sm text-destructive'>
          Error loading movies. Please try again.
        </p>
      )}

      {!isLoading && !isError && (
        <>
          {isFetching && (
            <p className='mb-2 text-sm text-muted-foreground'>
              Updating list...
            </p>
          )}
          <div className='overflow-x-auto rounded-md border'>
            <table className='min-w-full table-fixed text-sm'>
              <thead>
                <tr className='text-center bg-gray-100'>
                  <th className='h-10 w-1/4 border px-3 text-xs font-bold uppercase tracking-wide text-muted-foreground'>
                    Id
                  </th>
                  <th className='h-10 w-1/4 border px-3 text-xs font-bold uppercase tracking-wide text-muted-foreground'>
                    <div className='flex flex-col items-center justify-center py-2'>
                      <span>Year</span>
                      <input
                        type='number'
                        value={year}
                        onChange={(event) => setYear(event.target.value)}
                        className='mt-1 h-10  w-full rounded-md border bg-white px-3 text-foreground'
                        placeholder='Filter by year'
                      />
                    </div>
                  </th>
                  <th className='h-10 w-1/4 border px-3 text-xs font-bold uppercase tracking-wide text-muted-foreground'>
                    <span>Title</span>
                  </th>
                  <th className='h-10 w-1/4 border px-3 text-xs font-bold uppercase tracking-wide text-muted-foreground'>
                    <div className='flex flex-col items-center justify-center py-2'>
                      <span>Winner</span>
                      <select
                        value={winner}
                        onChange={(event) =>
                          setWinner(event.target.value as WinnerFilter)
                        }
                        className='mt-1 h-10 rounded-md border w-full bg-white px-3 text-foreground'
                      >
                        <option value='all'>List all</option>
                        <option value='yes'>Yes</option>
                        <option value='no'>No</option>
                      </select>
                    </div>
                  </th>
                </tr>
              </thead>
              <tbody>
                {(data?.movies ?? []).length > 0 ? (
                  (data?.movies ?? []).map((movie) => (
                    <tr
                      key={movie.id}
                      className='border-b text-left last:border-b-0 odd:bg-white even:bg-gray-100'
                    >
                      <td className='h-10 border px-3'>{movie.id}</td>
                      <td className='h-10 border px-3'>{movie.year}</td>
                      <td className='h-10 border px-3'>{movie.title}</td>
                      <td className='h-10 border px-3'>
                        {movie.winner ? 'Yes' : 'No'}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td
                      colSpan={4}
                      className='border px-3 py-4 text-left text-muted-foreground'
                    >
                      No movies found.
                    </td>
                  </tr>
                )}
              </tbody>
              <tfoot>
                <tr>
                  <td colSpan={4} className='border p-0'>
                    <MoviesPagination
                      page={data?.number ?? page}
                      totalPages={data?.total ?? 0}
                      onPageChange={(nextPage) => {
                        const safeTotalPages = Math.max(data?.total ?? 0, 1);
                        const clampedPage = Math.min(
                          Math.max(nextPage, 0),
                          safeTotalPages - 1,
                        );

                        setPage(clampedPage);
                      }}
                    />
                  </td>
                </tr>
              </tfoot>
            </table>
          </div>
        </>
      )}
    </section>
  );
};

export { MoviesTable };
