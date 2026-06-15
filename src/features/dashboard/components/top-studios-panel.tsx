import { Medal } from 'lucide-react';

import {
  useStudioWinnersRankedHandler,
  type RankedStudioWinCount,
} from '../hooks/use-studio-winners-ranked.handler';
import { PanelCard } from './panel-card';
import { SimpleTable } from './simple-table';

const rankStyles: Record<RankedStudioWinCount['rank'], string> = {
  1: 'border-amber-500/30 bg-amber-500/10 text-amber-600',
  2: 'border-slate-400/30 bg-slate-400/10 text-slate-500',
  3: 'border-orange-500/30 bg-orange-500/10 text-orange-600',
};

const TopStudiosPanel = () => {
  const { rankedStudioWinners } = useStudioWinnersRankedHandler();

  return (
    <PanelCard title='Top 3 estúdios com mais vitórias'>
      <SimpleTable<RankedStudioWinCount>
        headers={[
          { key: 'name', label: 'Nome' },
          { key: 'winCount', label: 'Quantidade de Vitórias' },
        ]}
        rows={rankedStudioWinners}
        getRowKey={(row) => row.name}
        renderRow={(row) => [
          <div className='flex items-center gap-2' key={row.name}>
            <span
              className={`inline-flex h-7 w-7 items-center justify-center rounded-full border ${rankStyles[row.rank]}`}
            >
              <Medal className='h-3.5 w-3.5' />
            </span>
            <span>{row.name}</span>
          </div>,
          row.winCount,
        ]}
        emptyMessage='Nenhum estúdio encontrado'
      />
    </PanelCard>
  );
};

export { TopStudiosPanel };
