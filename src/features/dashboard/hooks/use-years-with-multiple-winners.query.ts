import { useEffect, useState } from 'react';

import { useServices } from '@/app/context/services-context';

import type { MultipleWinnersYear } from '../models/fetch-years-with-multiple-winners';

export const useYearsWithMultipleWinners = () => {
  const { dashboardService } = useServices();

  const [data, setData] = useState<MultipleWinnersYear[] | null>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  // Poderiamos utilizar useQuery do react-query aqui, mas para manter a consistência com os outros hooks e evitar dependências adicionais, optei por usar useEffect e useState.
  useEffect(() => {
    let mounted = true;

    const run = async () => {
      setIsLoading(true);
      setIsError(false);

      try {
        const response = await dashboardService.fetchYearsWithMultipleWinners();
        if (!mounted) return;
        setData(response);
      } catch {
        if (!mounted) return;
        setIsError(true);
      } finally {
        if (mounted) {
          setIsLoading(false);
        }
      }
    };

    run();

    return () => {
      mounted = false;
    };
  }, [dashboardService]);

  return {
    data,
    isLoading,
    isError,
  };
};
