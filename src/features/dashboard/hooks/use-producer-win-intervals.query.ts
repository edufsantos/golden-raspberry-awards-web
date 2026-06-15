import { useEffect, useState } from 'react';

import { useServices } from '@/app/context/services-context';

import type { ProducerWinIntervals } from '../models/fetch-producer-win-intervals';

export const useProducerWinIntervals = () => {
  const { dashboardService } = useServices();

  const [data, setData] = useState<ProducerWinIntervals | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  // Poderiamos utilizar useQuery do react-query aqui, mas para manter a consistência com os outros hooks e evitar dependências adicionais, optei por usar useEffect e useState.
  useEffect(() => {
    let mounted = true;

    const run = async () => {
      setIsLoading(true);
      setIsError(false);

      try {
        const response = await dashboardService.fetchProducerWinIntervals();
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
