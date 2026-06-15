import { useState } from "react";

import { useAppStore } from "@/app/store/store";

import { useDashboardQuery } from "../../hooks/use-dashboard-query";
import { useMoviesByYearQuery } from "../../hooks/use-movies-by-year-query";
import type { Movie, ProducerAwardInterval, StudioWinCount, YearWinnerCount } from "../../models/dashboard";
import { PanelCard } from "./partials/panel-card";
import { SimpleTable } from "./partials/simple-table";

const mockYearsWithMultipleWinners: YearWinnerCount[] = [
  { year: 1986, winnerCount: 2 },
  { year: 1990, winnerCount: 2 },
];

const mockTopStudios: StudioWinCount[] = [
  { name: "Columbia Pictures", winCount: 7 },
  { name: "Paramount Pictures", winCount: 6 },
  { name: "Warner Bros.", winCount: 5 },
];

const mockProducerIntervals: ProducerAwardInterval[] = [
  { producer: "Joel Silver", interval: 1, previousWin: 1990, followingWin: 1991 },
];

const DashboardPanels = () => {
  const searchYear = useAppStore((state) => state.dashboard.searchYear);
  const setSearchYear = useAppStore((state) => state.dashboard.setSearchYear);

  const [submittedYear, setSubmittedYear] = useState<number | null>(null);

  const dashboardQuery = useDashboardQuery();
  const moviesByYearQuery = useMoviesByYearQuery(submittedYear);

  const handleSearch = () => {
    const trimmedValue = searchYear.trim();
    if (!trimmedValue) {
      setSubmittedYear(null);
      return;
    }

    const year = Number(trimmedValue);
    if (!Number.isFinite(year)) {
      return;
    }

    setSubmittedYear(year);
  };

  if (dashboardQuery.isLoading) {
    return <p className="text-sm text-muted-foreground">Carregando dashboard...</p>;
  }

  if (dashboardQuery.isError) {
    return (
      <p className="text-left text-red-600">
        Erro ao carregar dashboard. Tente novamente.
      </p>
    );
  }

  const summary = dashboardQuery.data;
  const yearsRows =
    (summary?.yearsWithMultipleWinners?.length ?? 0) > 0
      ? summary?.yearsWithMultipleWinners ?? []
      : mockYearsWithMultipleWinners;
  const topStudiosRows =
    (summary?.topStudios?.length ?? 0) > 0
      ? summary?.topStudios ?? []
      : mockTopStudios;
  const minIntervalsRows =
    (summary?.producerIntervals.min?.length ?? 0) > 0
      ? summary?.producerIntervals.min ?? []
      : mockProducerIntervals;
  const maxIntervalsRows =
    (summary?.producerIntervals.max?.length ?? 0) > 0
      ? summary?.producerIntervals.max ?? []
      : mockProducerIntervals.map((item) => ({
          ...item,
          producer: "Matthew Vaughn",
          interval: 13,
          previousWin: 2002,
          followingWin: 2015,
        }));

  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
      <PanelCard title="Anos com múltiplos vencedores">
        <SimpleTable<YearWinnerCount>
          headers={[
            { key: "year", label: "Year" },
            { key: "winnerCount", label: "Win Count" },
          ]}
          rows={yearsRows}
          getRowKey={(row) => row.year}
          renderRow={(row) => [row.year, row.winnerCount]}
          emptyMessage="Nenhum ano encontrado"
        />
      </PanelCard>

      <PanelCard title="Top 3 estúdios com vencedores">
        <SimpleTable<StudioWinCount>
          headers={[
            { key: "name", label: "Name" },
            { key: "winCount", label: "Win Count" },
          ]}
          rows={topStudiosRows}
          getRowKey={(row) => row.name}
          renderRow={(row) => [row.name, row.winCount]}
          emptyMessage="Nenhum estúdio encontrado"
        />
      </PanelCard>

      <PanelCard title="Produtores com maior e menor intervalo de vitórias">
        <div className="grid grid-cols-1 gap-4 xl:grid-cols-2">
          <div>
            <h3 className="mb-2 text-xs font-semibold uppercase tracking-wide text-muted-foreground">Mínimo</h3>
            <SimpleTable<ProducerAwardInterval>
              headers={[
                { key: "producer", label: "Producer" },
                { key: "interval", label: "Interval" },
                { key: "previousWin", label: "Previous" },
                { key: "followingWin", label: "Following" },
              ]}
              rows={minIntervalsRows}
              getRowKey={(row, index) => `${row.producer}-${index}`}
              renderRow={(row) => [
                row.producer,
                row.interval,
                row.previousWin,
                row.followingWin,
              ]}
            />
          </div>
          <div>
            <h3 className="mb-2 text-xs font-semibold uppercase tracking-wide text-muted-foreground">Máximo</h3>
            <SimpleTable<ProducerAwardInterval>
              headers={[
                { key: "producer", label: "Producer" },
                { key: "interval", label: "Interval" },
                { key: "previousWin", label: "Previous" },
                { key: "followingWin", label: "Following" },
              ]}
              rows={maxIntervalsRows}
              getRowKey={(row, index) => `${row.producer}-${index}`}
              renderRow={(row) => [
                row.producer,
                row.interval,
                row.previousWin,
                row.followingWin,
              ]}
            />
          </div>
        </div>
      </PanelCard>

      <PanelCard title="Vencedores por ano">
        <div className="mb-4 flex flex-wrap items-end gap-2">
          <label className="flex flex-col text-sm text-muted-foreground">
            Ano
            <input
              type="number"
              value={searchYear}
              onChange={(event) => setSearchYear(event.target.value)}
              className="mt-1 h-10 w-36 rounded-md border bg-background px-3 text-foreground"
              placeholder="Ex: 1990"
            />
          </label>
          <button
            type="button"
            onClick={handleSearch}
            className="h-10 rounded-md bg-primary px-4 text-sm font-medium text-primary-foreground hover:opacity-90"
          >
            Buscar
          </button>
        </div>

        {moviesByYearQuery.isFetching && (
          <p className="mb-2 text-sm text-muted-foreground">Buscando filmes...</p>
        )}
        {moviesByYearQuery.isError && (
          <p className="mb-2 text-sm text-destructive">Erro ao buscar filmes para o ano informado.</p>
        )}

        {submittedYear !== null && !moviesByYearQuery.isError && (
          <SimpleTable<Movie>
            headers={[
              { key: "id", label: "Id" },
              { key: "year", label: "Year" },
              { key: "title", label: "Title" },
              { key: "winner", label: "Winner" },
            ]}
            rows={moviesByYearQuery.data ?? []}
            getRowKey={(row) => row.id}
            renderRow={(row) => [row.id, row.year, row.title, row.winner ? "Yes" : "No"]}
            emptyMessage="Nenhum filme encontrado para o ano informado"
          />
        )}
      </PanelCard>
    </div>
  );
};

export { DashboardPanels };
