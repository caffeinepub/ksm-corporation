import { useQuery } from '@tanstack/react-query';
import { useActor } from './useActor';
import type { Config } from '../backend';

export function useStorefrontConfig() {
  const { actor, isFetching } = useActor();

  return useQuery<Config>({
    queryKey: ['storefrontConfig'],
    queryFn: async () => {
      if (!actor) throw new Error('Actor not initialized');
      return actor.getConfig();
    },
    enabled: !!actor && !isFetching,
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
}
