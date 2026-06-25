import { withHelmet } from '@/shared/utils/with-helmet';

import { MoviesTable } from '../components/movies-table';

const Movies = () => {
  return (
    <div className='space-y-6'>
      <div className='flex flex-col gap-1'>
        <h1 className='text-3xl font-bold tracking-tight'>List movies</h1>
      </div>
      <MoviesTable />
    </div>
  );
};

const MoviesPage = withHelmet(Movies, 'Outsera | Movies');

export { MoviesPage };
