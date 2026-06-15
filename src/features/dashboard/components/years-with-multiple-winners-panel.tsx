import { useYearsWithMultipleWinners } from "../hooks/use-years-with-multiple-winners.query";
import type { MultipleWinnersYear } from "../models/fetch-years-with-multiple-winners";
import { PanelCard } from "./panel-card";
import { SimpleTable } from "./simple-table";
 

const YearsWithMultipleWinnersPanel = () => {
  const { data: yearsRows = [] } = useYearsWithMultipleWinners();

  return (
    <PanelCard title="Anos com múltiplos vencedores">
      <SimpleTable<MultipleWinnersYear>
        headers={[
          { key: "year", label: "Ano" },
          { key: "winnerCount", label: "Quantidade de Vencedores" },
        ]}
        rows={yearsRows}
        getRowKey={(row) => row.year}
        renderRow={(row) => [row.year, row.winnerCount]}
        emptyMessage="Nenhum ano encontrado"
      />
    </PanelCard>
  );
};

export { YearsWithMultipleWinnersPanel };
