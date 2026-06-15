import { useEffect } from 'react';

import { useFetchMovieByIdQuery } from '../hooks/use-fetch-movie-by-id.query';

type MovieDetailsModalProps = {
  movieId: number;
  onClose: () => void;
};

const MovieDetailsModal = ({ movieId, onClose }: MovieDetailsModalProps) => {
  const { data, isLoading, isFetching, isError } =
    useFetchMovieByIdQuery(movieId);

  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    window.addEventListener('keydown', handleEscape);

    return () => {
      window.removeEventListener('keydown', handleEscape);
    };
  }, [onClose]);

  return (
    <div
      className='fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4'
      role='presentation'
      onClick={onClose}
    >
      <div
        className='w-full max-w-2xl rounded-2xl border bg-white p-6 text-foreground shadow-2xl'
        role='dialog'
        aria-modal='true'
        aria-labelledby='movie-details-title'
        onClick={(event) => event.stopPropagation()}
      >
        <div className='mb-6 flex items-start justify-between gap-4'>
          <div>
            <p className='text-sm text-muted-foreground'>Detalhes do filme</p>
            <h2 id='movie-details-title' className='text-2xl font-semibold'>
              {data?.title ?? `Filme #${movieId}`}
            </h2>
          </div>
          <button
            type='button'
            onClick={onClose}
            aria-label='Fechar modal de detalhes do filme'
            className='rounded-md border px-3 py-2 text-sm transition-colors hover:bg-muted'
          >
            Fechar
          </button>
        </div>

        {isLoading && (
          <p className='text-sm text-muted-foreground'>
            Carregando detalhes do filme...
          </p>
        )}

        {isError && (
          <p className='text-sm text-destructive'>
            Erro ao carregar os detalhes do filme. Tente novamente.
          </p>
        )}

        {!isLoading && !isError && data && (
          <div className='space-y-6'>
            {isFetching && (
              <p className='text-sm text-muted-foreground'>
                Atualizando detalhes...
              </p>
            )}

            <div className='grid gap-4 md:grid-cols-2'>
              <div className='rounded-xl border bg-card p-4'>
                <p className='text-xs uppercase tracking-wide text-muted-foreground'>
                  Id
                </p>
                <p className='mt-1 text-base font-medium'>{data.id}</p>
              </div>
              <div className='rounded-xl border bg-card p-4'>
                <p className='text-xs uppercase tracking-wide text-muted-foreground'>
                  Ano
                </p>
                <p className='mt-1 text-base font-medium'>{data.year}</p>
              </div>
              <div className='rounded-xl border bg-card p-4'>
                <p className='text-xs uppercase tracking-wide text-muted-foreground'>
                  Título
                </p>
                <p className='mt-1 text-base font-medium'>{data.title}</p>
              </div>
              <div className='rounded-xl border bg-card p-4'>
                <p className='text-xs uppercase tracking-wide text-muted-foreground'>
                  Vencedor
                </p>
                <p className='mt-1 text-base font-medium'>
                  {data.winner ? 'Sim' : 'Não'}
                </p>
              </div>
            </div>

            <div className='grid gap-4 md:grid-cols-2'>
              <div className='rounded-xl border bg-card p-4'>
                <p className='text-xs uppercase tracking-wide text-muted-foreground'>
                  Estúdios
                </p>
                <ul className='mt-2 list-disc space-y-1 pl-5 text-sm'>
                  {data.studios.length > 0 ? (
                    data.studios.map((studio) => <li key={studio}>{studio}</li>)
                  ) : (
                    <li>Não informado</li>
                  )}
                </ul>
              </div>

              <div className='rounded-xl border bg-card p-4'>
                <p className='text-xs uppercase tracking-wide text-muted-foreground'>
                  Produtores
                </p>
                <ul className='mt-2 list-disc space-y-1 pl-5 text-sm'>
                  {data.producers.length > 0 ? (
                    data.producers.map((producer) => (
                      <li key={producer}>{producer}</li>
                    ))
                  ) : (
                    <li>Não informado</li>
                  )}
                </ul>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export { MovieDetailsModal };
