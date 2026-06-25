import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
} from 'lucide-react';

type MoviesPaginationProps = {
  page: number;
  totalPages: number;
  onPageChange: (page: number) => void;
};

const MoviesPagination = ({
  page,
  totalPages,
  onPageChange,
}: MoviesPaginationProps) => {
  const safeTotalPages = Math.max(totalPages, 1);
  const currentPage = Math.min(Math.max(page, 0), safeTotalPages - 1);

  const startPage =
    safeTotalPages <= 5
      ? 0
      : currentPage <= 2
        ? 0
        : currentPage >= safeTotalPages - 3
          ? safeTotalPages - 5
          : currentPage - 2;

  const endPage = Math.min(startPage + 4, safeTotalPages - 1);
  const visiblePages = Array.from(
    { length: endPage - startPage + 1 },
    (_, index) => startPage + index,
  );

  const isFirstPage = currentPage <= 0;
  const isLastPage = currentPage >= safeTotalPages - 1;

  return (
    <div className='flex items-center justify-center gap-2 w-full bg-gray-100 p-4'>
      <button
        type='button'
        onClick={() => onPageChange(0)}
        disabled={isFirstPage}
        aria-label='First page'
        className='flex h-9 w-9 cursor-pointer hover:bg-gray-50 items-center justify-center rounded-md border bg-background text-foreground transition-colors hover:bg-muted disabled:cursor-not-allowed disabled:opacity-50'
      >
        <ChevronsLeft className='h-4 w-4' />
      </button>
      <button
        type='button'
        onClick={() => onPageChange(currentPage - 1)}
        disabled={isFirstPage}
        aria-label='Previous page'
        className='flex h-9 w-9 cursor-pointer hover:bg-gray-50 items-center justify-center rounded-md border bg-background text-foreground transition-colors hover:bg-muted disabled:cursor-not-allowed disabled:opacity-50'
      >
        <ChevronLeft className='h-4 w-4' />
      </button>

      {visiblePages.map((pageNumber) => (
        <button
          key={pageNumber}
          type='button'
          onClick={() => onPageChange(pageNumber)}
          aria-label={`Go to page ${pageNumber + 1}`}
          aria-current={pageNumber === currentPage ? 'page' : undefined}
          className={`h-9 cursor-pointer hover:bg-gray-50 min-w-9 rounded-md border px-3 text-sm transition-colors ${
            pageNumber === currentPage
              ? 'border-blue-500 bg-blue-500 text-white hover:bg-blue-600!'
              : 'bg-background text-foreground hover:bg-muted'
          }`}
        >
          {pageNumber + 1}
        </button>
      ))}

      <button
        type='button'
        onClick={() => onPageChange(currentPage + 1)}
        disabled={isLastPage}
        aria-label='Next page'
        className='flex h-9 w-9 cursor-pointer hover:bg-gray-50 items-center justify-center rounded-md border bg-background text-foreground transition-colors hover:bg-muted disabled:cursor-not-allowed disabled:opacity-50'
      >
        <ChevronRight className='h-4 w-4' />
      </button>
      <button
        type='button'
        onClick={() => onPageChange(safeTotalPages - 1)}
        disabled={isLastPage}
        aria-label='Last page'
        className='flex h-9 w-9 cursor-pointer hover:bg-gray-50 items-center justify-center rounded-md border bg-background text-foreground transition-colors hover:bg-muted disabled:cursor-not-allowed disabled:opacity-50'
      >
        <ChevronsRight className='h-4 w-4' />
      </button>
    </div>
  );
};

export { MoviesPagination };
