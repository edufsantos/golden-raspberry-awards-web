import { PRODUCERS_INTERVAL_HEADERS } from '../constants/producers-interval-panel';
import { useProducerWinIntervals } from '../hooks/use-producer-win-intervals.query';
import type { ProducerAwardInterval } from '../models/fetch-producer-win-intervals';
import { PanelCard } from './panel-card';
import { SimpleTable } from './simple-table';

const ProducersIntervalsPanel = () => {
  const { data: producerWinIntervals } = useProducerWinIntervals();

  return (
    <PanelCard title='Producers with longest and shortest intervals between wins'>
      <div className='grid grid-cols-1 gap-4  col-span-12'>
        <div>
          <h3 className='mb-2 text-xs font-semibold uppercase tracking-wide text-muted-foreground'>
            Maximum
          </h3>
          <SimpleTable<ProducerAwardInterval>
            headers={PRODUCERS_INTERVAL_HEADERS}
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
        <div>
          <h3 className='mb-2 text-xs font-semibold uppercase tracking-wide text-muted-foreground'>
            Minimum
          </h3>
          <SimpleTable<ProducerAwardInterval>
            headers={PRODUCERS_INTERVAL_HEADERS}
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
      </div>
    </PanelCard>
  );
};

export { ProducersIntervalsPanel };
