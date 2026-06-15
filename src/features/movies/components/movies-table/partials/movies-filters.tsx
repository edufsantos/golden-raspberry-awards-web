import type { WinnerFilter } from "../../../models/movie";

type MoviesFiltersProps = {
  year: string;
  winner: WinnerFilter;
  onYearChange: (value: string) => void;
  onWinnerChange: (value: WinnerFilter) => void;
};

const MoviesFilters = ({ year, winner, onYearChange, onWinnerChange }: MoviesFiltersProps) => {
  return (
    <div className="mb-4 flex flex-wrap gap-3">
      <label className="flex flex-col text-left text-sm text-slate-700">
        Year
        <input
          type="number"
          value={year}
          onChange={(event) => onYearChange(event.target.value)}
          className="mt-1 h-10 w-36 rounded-md border border-slate-300 px-3"
          placeholder="Ex: 2018"
        />
      </label>

      <label className="flex flex-col text-left text-sm text-slate-700">
        Winner
        <select
          value={winner}
          onChange={(event) => onWinnerChange(event.target.value as WinnerFilter)}
          className="mt-1 h-10 w-36 rounded-md border border-slate-300 px-3"
        >
          <option value="all">All</option>
          <option value="yes">Yes</option>
          <option value="no">No</option>
        </select>
      </label>
    </div>
  );
};

export { MoviesFilters };
