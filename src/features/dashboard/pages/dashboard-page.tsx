import { withHelmet } from '@/shared/utils/with-helmet';

import { MoviesByYearPanel } from '../components/movies-by-year-panel';
import { ProducersIntervalsPanel } from '../components/producers-intervals-panel';
import { TopStudiosPanel } from '../components/top-studios-panel';
import { YearsWithMultipleWinnersPanel } from '../components/years-with-multiple-winners-panel';

const Dashboard = () => {
  return (
    <div className='space-y-6'>
      <div className='flex flex-col gap-1'>
        <h1 className='text-3xl font-bold tracking-tight'>Dashboard</h1>
        <p className='text-sm text-muted-foreground'>
          Resumo dos vencedores do Golden Raspberry Awards
        </p>
      </div>
      <div className='grid grid-cols-1 gap-4 md:grid-cols-2'>
        <YearsWithMultipleWinnersPanel />
        <TopStudiosPanel />
        <div className='col-span-1 md:col-span-2'>
          <ProducersIntervalsPanel />
        </div>
        <div className='col-span-1 md:col-span-2'>
          <MoviesByYearPanel />
        </div>
      </div>
    </div>
  );
};

const DashboardPage = withHelmet(Dashboard, 'Outsera | Dashboard');

export { DashboardPage };
