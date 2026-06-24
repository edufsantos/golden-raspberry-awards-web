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
      </div>
      <div className='grid grid-cols-1 gap-4 md:grid-cols-2'>
        <YearsWithMultipleWinnersPanel />
        <TopStudiosPanel />
        <ProducersIntervalsPanel />
        <MoviesByYearPanel />
      </div>
    </div>
  );
};

const DashboardPage = withHelmet(Dashboard, 'Outsera | Dashboard');

export { DashboardPage };
