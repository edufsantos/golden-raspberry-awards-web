import type { WinnerFilter } from "../../../models/movie";

type MoviesFiltersProps = {
  year: string;
  winner: WinnerFilter;
  onYearChange: (value: string) => void;
  onWinnerChange: (value: WinnerFilter) => void;
};

const MoviesFilters = ({ year, winner, onYearChange, onWinnerChange }: MoviesFiltersProps) => {
  return (
    <div className="mb-4 grid gap-3 md:grid-cols-3">
      <label className="flex flex-col text-sm text-muted-foreground">
        Year
        <input
          type="number"
          value={year}
          onChange={(event) => onYearChange(event.target.value)}
          className="mt-1 h-10 rounded-md border bg-background px-3 text-foreground"
          placeholder="Ex: 2018"
        />
      </label>

      <label className="flex flex-col text-sm text-muted-foreground">
        Winner
        <select
          value={winner}
          onChange={(event) => onWinnerChange(event.target.value as WinnerFilter)}
          className="mt-1 h-10 rounded-md border bg-background px-3 text-foreground"
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
