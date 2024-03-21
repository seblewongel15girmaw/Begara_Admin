import {
  useMutation,
  useQuery,
  useQueryClient,
  UseMutationResult,
  UseQueryResult,
} from "@tanstack/react-query";

import RoastedTypeService, { RoastedType } from "../service/roastedTypeService";

export function useRoastingTypes(): UseQueryResult<RoastedType[]> {
  const roastedTypeService = new RoastedTypeService();
  return useQuery({
    queryKey: ["roastedTypes"],
    queryFn: () => roastedTypeService.getAllRoastedType(),
  });
}

export function useCreateRoastingType(): UseMutationResult<
RoastedType,
  Error,
  RoastedType
> {
  const queryClient = useQueryClient();
  const roastedTypeService = new RoastedTypeService();

  return useMutation({
    mutationFn: (newProduct: RoastedType) =>
    roastedTypeService.createRoastedType(newProduct),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["roastedTypes"] });
    },
  });
}

export function useRoastingType(id: string): UseQueryResult<RoastedType> {
  const roastedTypeService = new RoastedTypeService();

  return useQuery({
    queryKey: ["roastedType", id],
    queryFn: () => roastedTypeService.getByRoastedTypeId(id),
  });
}

export function useUpdateRoastingType(
  productId: string
): UseMutationResult<RoastedType, Error, any> {
  const queryClient = useQueryClient();
  const roastedTypeService = new RoastedTypeService();

  return useMutation({
    mutationFn: (updatedProduct: RoastedType) =>
    roastedTypeService.updateRoastedType(productId, updatedProduct),

    onSuccess: (data, updatedProduct) => {
      queryClient.setQueryData(["roastedType", productId], data);
      queryClient.invalidateQueries({queryKey:["roastedTypes"]});
    },
  });
}

export function useDeleteRoastingType(): UseMutationResult<void, Error, string> {
  const queryClient = useQueryClient();
  const roastedTypeService = new RoastedTypeService();

  return useMutation({  
    mutationFn:(id: string) => roastedTypeService.deleteRoastedType(id), 
    onSuccess: (_, id) => {
      queryClient.invalidateQueries({queryKey:["roastedType", id]});
      queryClient.invalidateQueries({queryKey:["roastedTypes"]});
    },
  });
}
