import { useYearsWithMultipleWinners } from '../hooks/use-years-with-multiple-winners.query';
import type { MultipleWinnersYear } from '../models/fetch-years-with-multiple-winners';
import { PanelCard } from './panel-card';
import { SimpleTable } from './simple-table';

const YearsWithMultipleWinnersPanel = () => {
  const { data: yearsRows = [] } = useYearsWithMultipleWinners();

  return (
    <PanelCard title='List years with multiple winners'>
      <SimpleTable<MultipleWinnersYear>
        headers={[
          { key: 'year', label: 'Year' },
          { key: 'winnerCount', label: 'Win Count' },
        ]}
        rows={yearsRows ?? []}
        getRowKey={(row) => row.year}
        renderRow={(row) => [row.year, row.winnerCount]}
        emptyMessage='No years found'
      />
    </PanelCard>
  );
};

export { YearsWithMultipleWinnersPanel };
