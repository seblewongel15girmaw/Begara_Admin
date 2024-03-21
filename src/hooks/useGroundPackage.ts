import {
  useMutation,
  useQuery,
  useQueryClient,
  UseMutationResult,
  UseQueryResult,
} from "@tanstack/react-query";

import GroundPackageService, { GroundPackage } from "../service/groundPackageService";

export function useGroundPackages(): UseQueryResult<GroundPackage[]> {
  const groundPackageService = new GroundPackageService();
  return useQuery({
    queryKey: ["groundPackages"],
    queryFn: () => groundPackageService.getAllGroundPackage(),
  });
}

export function useCreateGroundPackage(): UseMutationResult<
GroundPackage,
  Error,
  GroundPackage
> {
  const queryClient = useQueryClient();
  const groundPackageService = new GroundPackageService();

  return useMutation({
    mutationFn: (newProduct: GroundPackage) =>
    groundPackageService.createGroundPackage(newProduct),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["groundPackages"] });
    },
  });
}

export function useGroundPackage(id: string): UseQueryResult<GroundPackage> {
  const groundPackageService = new GroundPackageService();

  return useQuery({
    queryKey: ["groundPackage", id],
    queryFn: () => groundPackageService.getByGroundPackageId(id),
  });
}

export function useUpdateGroundPackage(
  productId: string
): UseMutationResult<GroundPackage, Error, any> {
  const queryClient = useQueryClient();
  const groundPackageService = new GroundPackageService();

  return useMutation({
    mutationFn: (updatedProduct: GroundPackage) =>
    groundPackageService.updateGroundPackage(productId, updatedProduct),

    onSuccess: (data, updatedProduct) => {
      queryClient.setQueryData(["groundPackage", productId], data);
      queryClient.invalidateQueries({queryKey:["groundPackages"]});
    },
  });
}

export function useDeleteGroundPackage(): UseMutationResult<void, Error, string> {
  const queryClient = useQueryClient();
  const groundPackageService = new GroundPackageService();

  return useMutation({  
    mutationFn:(id: string) => groundPackageService.deleteGroundPackage(id), 
    onSuccess: (_, id) => {
      queryClient.invalidateQueries({queryKey:["groundPackage", id]});
      queryClient.invalidateQueries({queryKey:["groundPackages"]});
    },
  });
}
