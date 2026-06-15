import { useState } from "react";

import { useAppStore } from "@/app/store/store";

import { useDashboardQuery } from "../../hooks/use-dashboard-query";
import { useMoviesByYearQuery } from "../../hooks/use-movies-by-year-query";
import type { Movie, ProducerAwardInterval, StudioWinCount, YearWinnerCount } from "../../models/dashboard";
import { PanelCard } from "./partials/panel-card";
import { SimpleTable } from "./partials/simple-table";

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
    return <p className="text-left text-slate-600">Carregando dashboard...</p>;
  }

  if (dashboardQuery.isError) {
    return (
      <p className="text-left text-red-600">
        Erro ao carregar dashboard. Tente novamente.
      </p>
    );
  }

  const summary = dashboardQuery.data;

  return (
    <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
      <PanelCard title="Anos com múltiplos vencedores">
        <SimpleTable<YearWinnerCount>
          headers={[
            { key: "year", label: "Year" },
            { key: "winnerCount", label: "Win Count" },
          ]}
          rows={summary?.yearsWithMultipleWinners ?? []}
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
          rows={summary?.topStudios ?? []}
          getRowKey={(row) => row.name}
          renderRow={(row) => [row.name, row.winCount]}
          emptyMessage="Nenhum estúdio encontrado"
        />
      </PanelCard>

      <PanelCard title="Produtores com maior e menor intervalo de vitórias">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <div>
            <h3 className="mb-2 text-left text-sm font-semibold text-slate-700">Mínimo</h3>
            <SimpleTable<ProducerAwardInterval>
              headers={[
                { key: "producer", label: "Producer" },
                { key: "interval", label: "Interval" },
                { key: "previousWin", label: "Previous" },
                { key: "followingWin", label: "Following" },
              ]}
              rows={summary?.producerIntervals.min ?? []}
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
            <h3 className="mb-2 text-left text-sm font-semibold text-slate-700">Máximo</h3>
            <SimpleTable<ProducerAwardInterval>
              headers={[
                { key: "producer", label: "Producer" },
                { key: "interval", label: "Interval" },
                { key: "previousWin", label: "Previous" },
                { key: "followingWin", label: "Following" },
              ]}
              rows={summary?.producerIntervals.max ?? []}
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

      <PanelCard title="Busca de filmes por ano">
        <div className="mb-4 flex flex-wrap items-end gap-2">
          <label className="flex flex-col text-left text-sm text-slate-700">
            Year
            <input
              type="number"
              value={searchYear}
              onChange={(event) => setSearchYear(event.target.value)}
              className="mt-1 h-10 rounded-md border border-slate-300 px-3"
              placeholder="Ex: 1990"
            />
          </label>
          <button
            type="button"
            onClick={handleSearch}
            className="h-10 rounded-md bg-slate-800 px-4 text-sm font-medium text-white hover:bg-slate-700"
          >
            Buscar
          </button>
        </div>

        {moviesByYearQuery.isFetching && (
          <p className="mb-2 text-left text-slate-600">Buscando filmes...</p>
        )}
        {moviesByYearQuery.isError && (
          <p className="mb-2 text-left text-red-600">Erro ao buscar filmes para o ano informado.</p>
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
