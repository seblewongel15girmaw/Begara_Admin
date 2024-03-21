import {
  useMutation,
  useQuery,
  useQueryClient,
  UseMutationResult,
  UseQueryResult,
} from "@tanstack/react-query";

import PackageService, { Package } from "../service/packageService";

export function usePackages(): UseQueryResult<Package[]> {
  const packageService = new PackageService();
  return useQuery({
    queryKey: ["packages"],
    queryFn: () => packageService.getAllPackage(),
  });
}

export function useCreatePackage(): UseMutationResult<
Package,
  Error,
Package
> {
  const queryClient = useQueryClient();
  const packageService = new PackageService();

  return useMutation({
    mutationFn: (newProduct: Package) =>
    packageService.createPackage(newProduct),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["packages"] });
    },
  });
}

export function usePackage(id: string): UseQueryResult<Package> {
  const packageService = new PackageService();

  return useQuery({
    queryKey: ["package", id],
    queryFn: () => packageService.getByPackageId(id),
  });
}

export function useUpdatePackage(
  productId: string
): UseMutationResult<Package, Error, any> {
  const queryClient = useQueryClient();
  const packageService = new PackageService();

  return useMutation({
    mutationFn: (updatedProduct: Package) =>
    packageService.updatePackage(productId, updatedProduct),

    onSuccess: (data, updatedProduct) => {
      queryClient.setQueryData(["package", productId], data);
      queryClient.invalidateQueries({queryKey:["packages"]});
    },
  });
}

export function useDeletePackage(): UseMutationResult<void, Error, string> {
  const queryClient = useQueryClient();
  const packageService = new PackageService();

  return useMutation({  
    mutationFn:(id: string) => packageService.deletePackage(id), 
    onSuccess: (_, id) => {
      queryClient.invalidateQueries({queryKey:["package", id]});
      queryClient.invalidateQueries({queryKey:["packages"]});
    },
  });
}
