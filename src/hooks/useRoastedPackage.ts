import {
  useMutation,
  useQuery,
  useQueryClient,
  UseMutationResult,
  UseQueryResult,
} from "@tanstack/react-query";

import RoastedPackageService, { RoastedPackage } from "../service/roastedPackageService";

export function useRoastedPackages(): UseQueryResult<RoastedPackage[]> {
  const roastedPackageService = new RoastedPackageService();
  return useQuery({
    queryKey: ["roastedPackages"],
    queryFn: () => roastedPackageService.getAllRoastedPackage(),
  });
}

export function useCreateRoastedPackage(): UseMutationResult<
RoastedPackage,
  Error,
  RoastedPackage
> {
  const queryClient = useQueryClient();
  const roastedPackageService = new RoastedPackageService();

  return useMutation({
    mutationFn: (newProduct: RoastedPackage) =>
    roastedPackageService.createRoastedPackage(newProduct),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["roastedPackages"] });
    },
  });
}

export function useRoastedCoffee(id: string): UseQueryResult<RoastedPackage> {
  const roastedPackageService = new RoastedPackageService();

  return useQuery({
    queryKey: ["roastedPackage", id],
    queryFn: () => roastedPackageService.getByRoastedPackageId(id),
  });
}

export function useUpdateRoastedPackage(
  productId: string
): UseMutationResult<RoastedPackage, Error, any> {
  const queryClient = useQueryClient();
  const roastedPackageService = new RoastedPackageService();

  return useMutation({
    mutationFn: (updatedProduct: RoastedPackage) =>
    roastedPackageService.updateRoastedPackage(productId, updatedProduct),

    onSuccess: (data, updatedProduct) => {
      queryClient.setQueryData(["roastedPackage", productId], data);
      queryClient.invalidateQueries({queryKey:["roastedPackages"]});
    },
  });
}

export function useDeleteRoastedPackage(): UseMutationResult<void, Error, string> {
  const queryClient = useQueryClient();
  const roastedPackageService = new RoastedPackageService();

  return useMutation({  
    mutationFn:(id: string) => roastedPackageService.deleteRoastedPackage(id), 
    onSuccess: (_, id) => {
      queryClient.invalidateQueries({queryKey:["roastedPackage", id]});
      queryClient.invalidateQueries({queryKey:["roastedPackages"]});
    },
  });
}
