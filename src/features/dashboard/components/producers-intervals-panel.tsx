import { useProducerWinIntervals } from '../hooks/use-producer-win-intervals.query';
import type { ProducerAwardInterval } from '../models/fetch-producer-win-intervals';
import { PanelCard } from './panel-card';
import { SimpleTable } from './simple-table';

const ProducersIntervalsPanel = () => {
  const { data: producerWinIntervals } = useProducerWinIntervals();

  return (
    <PanelCard title='Produtores com maior e menor intervalo de vitórias'>
      <div className='grid grid-cols-1 gap-4 xl:grid-cols-2 col-span-12'>
        <div>
          <h3 className='mb-2 text-xs font-semibold uppercase tracking-wide text-muted-foreground'>
            Mínimo
          </h3>
          <SimpleTable<ProducerAwardInterval>
            headers={[
              { key: 'producer', label: 'Produtor' },
              { key: 'interval', label: 'Intervalo' },
              { key: 'previousWin', label: 'Vitória Anterior' },
              { key: 'followingWin', label: 'Última Vitória' },
            ]}
            rows={producerWinIntervals?.min ?? []}
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
          <h3 className='mb-2 text-xs font-semibold uppercase tracking-wide text-muted-foreground'>
            Máximo
          </h3>
          <SimpleTable<ProducerAwardInterval>
            headers={[
              { key: 'producer', label: 'Produtor' },
              { key: 'interval', label: 'Intervalo' },
              { key: 'previousWin', label: 'Vitória Anterior' },
              { key: 'followingWin', label: 'Última Vitória' },
            ]}
            rows={producerWinIntervals?.max ?? []}
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
  );
};

export { ProducersIntervalsPanel };
