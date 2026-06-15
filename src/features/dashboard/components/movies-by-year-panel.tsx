import { useMoviesByYearHandler } from '../hooks/use-movies-by.handler';
import type { Movie } from '../models/fetch-movies-by-year';
import { PanelCard } from './panel-card';
import { SimpleTable } from './simple-table';

const MoviesByYearPanel = () => {
  const { searchYear, setSearchYear, handleSearch, moviesByYearQuery } =
    useMoviesByYearHandler();

  return (
    <PanelCard title='Vencedores por ano'>
      <div className='mb-4 flex flex-wrap items-end gap-2'>
        <label className='flex flex-col text-sm text-muted-foreground'>
          Ano
          <input
            type='number'
            value={searchYear}
            onChange={(event) => setSearchYear(event.target.value)}
            className='mt-1 h-10 w-36 rounded-md border bg-background px-3 text-foreground'
            placeholder='Ex: 1990'
          />
        </label>
        <button
          type='button'
          onClick={handleSearch}
          className='h-10 rounded-md bg-primary px-4 text-sm font-medium text-primary-foreground hover:opacity-90'
        >
          Buscar
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
            { key: 'id', label: 'ID' },
            { key: 'year', label: 'Ano' },
            { key: 'title', label: 'Título' },
            { key: 'winner', label: 'Vencedor' },
          ]}
          rows={moviesByYearQuery.data ?? []}
          getRowKey={(row) => row.id}
          renderRow={(row) => [
            row.id,
            row.year,
            row.title,
            row.winner ? 'Sim' : 'Não',
          ]}
          emptyMessage='Nenhum filme encontrado para o ano informado'
        />
      )}
    </PanelCard>
  );
};

export { MoviesByYearPanel };
