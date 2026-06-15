type MoviesPaginationProps = {
  page: number;
  totalPages: number;
  onPrev: () => void;
  onNext: () => void;
};

const MoviesPagination = ({ page, totalPages, onPrev, onNext }: MoviesPaginationProps) => {
  return (
    <div className="mt-4 flex items-center justify-end gap-2">
      <button
        type="button"
        onClick={onPrev}
        disabled={page <= 0}
        className="h-9 rounded-md border border-slate-300 px-3 text-sm disabled:cursor-not-allowed disabled:opacity-50"
      >
        Previous
      </button>
      <span className="text-sm text-slate-700">
        Page {page + 1} of {Math.max(totalPages, 1)}
      </span>
      <button
        type="button"
        onClick={onNext}
        disabled={page + 1 >= totalPages}
        className="h-9 rounded-md border border-slate-300 px-3 text-sm disabled:cursor-not-allowed disabled:opacity-50"
      >
        Next
      </button>
    </div>
  );
};

export { MoviesPagination };
