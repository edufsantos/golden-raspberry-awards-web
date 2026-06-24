import { Search } from 'lucide-react';

import { useMoviesByYearHandler } from '../hooks/use-movies-by.handler';
import type { Movie } from '../models/fetch-movies-by-year';
import { PanelCard } from './panel-card';
import { SimpleTable } from './simple-table';

const MoviesByYearPanel = () => {
  const { searchYear, setSearchYear, handleSearch, moviesByYearQuery } =
    useMoviesByYearHandler();

  return (
    <PanelCard title='List movies winners by year'>
      <div className='mb-4 flex flex-row items-end gap-2'>
        <input
          type='number'
          value={searchYear}
          onChange={(event) => setSearchYear(event.target.value)}
          className='mt-1 h-10 w-full rounded-md border bg-background px-3 text-foreground'
          placeholder='Search by year'
        />
        <button
          type='button'
          onClick={handleSearch}
          className='flex h-10 w-10 items-center justify-center rounded-md bg-blue-500 text-white hover:bg-blue-600'
          aria-label='Search'
        >
          <Search className='h-4 w-4' />
        </button>
      </div>

      {moviesByYearQuery.isFetching && (
        <p className='mb-2 text-sm text-muted-foreground'>Buscando filmes...</p>
      )}
      {moviesByYearQuery.isError && (
        <p className='mb-2 text-sm text-destructive'>
          Erro ao buscar filmes para o ano informado.
        </p>
      )}

      {moviesByYearQuery.data && !moviesByYearQuery.isError && (
        <SimpleTable<Movie>
          headers={[
            { key: 'id', label: 'Id' },
            { key: 'year', label: 'Year' },
            { key: 'title', label: 'Title' },
          ]}
          rows={moviesByYearQuery.data ?? []}
          getRowKey={(row) => row.id}
          renderRow={(row) => [row.id, row.year, row.title]}
          emptyMessage='No movies found for the specified year'
        />
      )}
    </PanelCard>
  );
};

export { MoviesByYearPanel };
