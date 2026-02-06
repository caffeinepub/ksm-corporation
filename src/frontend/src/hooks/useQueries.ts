import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useActor } from './useActor';
import type { Config, Product, OrderLineItem } from '../backend';
import { RegionStyle } from '../backend';

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

export function useProductsByCategory(categoryId: string) {
  const { actor, isFetching } = useActor();

  return useQuery<Product[]>({
    queryKey: ['products', categoryId],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getProductsByCategory(categoryId);
    },
    enabled: !!actor && !isFetching && !!categoryId,
  });
}

export function useProduct(productId: string) {
  const { actor, isFetching } = useActor();

  return useQuery<Product | null>({
    queryKey: ['product', productId],
    queryFn: async () => {
      if (!actor) return null;
      return actor.getProduct(productId);
    },
    enabled: !!actor && !isFetching && !!productId,
  });
}

export function usePlaceOrder() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      buyerName,
      buyerEmail,
      shippingAddress,
      lineItems,
      currency,
    }: {
      buyerName: string;
      buyerEmail: string;
      shippingAddress: string;
      lineItems: OrderLineItem[];
      currency: string;
    }) => {
      if (!actor) throw new Error('Actor not initialized');
      return actor.placeOrder(buyerName, buyerEmail, shippingAddress, lineItems, currency);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['orders'] });
    },
  });
}

// Helper function to convert RegionStyle enum to readable label
export function getStyleLabel(style: RegionStyle): string {
  const labels: Record<RegionStyle, string> = {
    [RegionStyle.american]: 'American',
    [RegionStyle.european]: 'European',
    [RegionStyle.italian]: 'Italian',
    [RegionStyle.australian]: 'Australian',
    [RegionStyle.canadian]: 'Canadian',
    [RegionStyle.southAmerican]: 'South American',
  };
  return labels[style] || style;
}

// Get all available style options
export function getStyleOptions(): RegionStyle[] {
  return [
    RegionStyle.american,
    RegionStyle.european,
    RegionStyle.italian,
    RegionStyle.australian,
    RegionStyle.canadian,
    RegionStyle.southAmerican,
  ];
}
