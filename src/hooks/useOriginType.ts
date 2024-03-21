import {
  useMutation,
  useQuery,
  useQueryClient,
  UseMutationResult,
  UseQueryResult,
} from "@tanstack/react-query";

import OriginService, { Origin } from "../service/originService";

export function useOrigins(): UseQueryResult<Origin[]> {
  const originService = new OriginService();
  return useQuery({
    queryKey: ["origins"],
    queryFn: () => originService.getAllOrigins(),
  });
}

export function useCreateOrigin(): UseMutationResult<Origin, Error, Origin> {
  const queryClient = useQueryClient();
  const originService = new OriginService();

  return useMutation({
    mutationFn: (newProduct: Origin) => originService.createOrigin(newProduct),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["origins"] });
    },
  });
}

export function useOrigin(id: string): UseQueryResult<Origin> {
  const originService = new OriginService();

  return useQuery({
    queryKey: ["origin", id],
    queryFn: () => originService.getByOriginId(id),
  });
}

export function useUpdateOrigin(
  productId: string
): UseMutationResult<Origin, Error, any> {
  const queryClient = useQueryClient();
  const originService = new OriginService();

  return useMutation({
    mutationFn: (updatedProduct: Origin) =>
      originService.updateOrigin(productId, updatedProduct),

    onSuccess: (data, updatedProduct) => {
      queryClient.setQueryData(["origin", productId], data);
      queryClient.invalidateQueries({ queryKey: ["origins"] });
    },
  });
}

export function useDeleteOrigin(): UseMutationResult<void, Error, string> {
  const queryClient = useQueryClient();
  const originService = new OriginService();

  return useMutation({
    mutationFn: (id: string) => originService.deleteOrigin(id),
    onSuccess: (_, id) => {
      queryClient.invalidateQueries({ queryKey: ["origin", id] });
      queryClient.invalidateQueries({ queryKey: ["origins"] });
    },
  });
}
