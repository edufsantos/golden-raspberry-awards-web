type MoviesPaginationProps = {
  page: number;
  totalPages: number;
  onPrev: () => void;
  onNext: () => void;
};

const MoviesPagination = ({
  page,
  totalPages,
  onPrev,
  onNext,
}: MoviesPaginationProps) => {
  return (
    <div className='mt-4 flex items-center justify-end gap-2'>
      <button
        type='button'
        onClick={onPrev}
        disabled={page <= 0}
        className='h-9 rounded-md border cursor-pointer hover:opacity-50 bg-background px-3 text-sm text-foreground transition-colors hover:bg-muted disabled:cursor-not-allowed disabled:opacity-50'
      >
        Anterior
      </button>
      <span className='text-sm text-muted-foreground'>
        Página {page + 1} de {Math.max(totalPages, 1)}
      </span>
      <button
        type='button'
        onClick={onNext}
        disabled={page + 1 >= totalPages}
        className='h-9 rounded-md border cursor-pointer  hover:opacity-50 bg-background px-3 text-sm text-foreground transition-colors hover:bg-muted disabled:cursor-not-allowed disabled:opacity-50'
      >
        Próxima
      </button>
    </div>
  );
};

export { MoviesPagination };
