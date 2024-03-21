import {
  useMutation,
  useQuery,
  useQueryClient,
  UseMutationResult,
  UseQueryResult,
} from "@tanstack/react-query";

import VendorService, { Vendor } from "../service/vendorService";

export function useVendors(): UseQueryResult<Vendor[]> {
  const vendorService = new VendorService();
  return useQuery({
    queryKey: ["vendors"],
    queryFn: () => vendorService.getAllVendors(),
  });
}

export function useCreateVendor(): UseMutationResult<
Vendor,
  Error,
Vendor
> {
  const queryClient = useQueryClient();
  const vendorService = new VendorService();

  return useMutation({
    mutationFn: (newProduct: Vendor) =>
    vendorService.createVendor(newProduct),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["vendors"] });
    },
  });
}

export function useVendor(id: string): UseQueryResult<Vendor> {
  const vendorService = new VendorService();

  return useQuery({
    queryKey: ["vendor", id],
    queryFn: () => vendorService.getByVendorId(id),
  });
}

export function useUpdateVendor(
  productId: string
): UseMutationResult<Vendor, Error, any> {
  const queryClient = useQueryClient();
  const vendorService = new VendorService();

  return useMutation({
    mutationFn: (updatedProduct: Vendor) =>
    vendorService.updateVendor(productId, updatedProduct),

    onSuccess: (data, updatedProduct) => {
      queryClient.setQueryData(["vendor", productId], data);
      queryClient.invalidateQueries({queryKey:["vendors"]});
    },
  });
}

export function useDeleteVendor(): UseMutationResult<void, Error, string> {
  const queryClient = useQueryClient();
  const vendorService = new VendorService();

  return useMutation({  
    mutationFn:(id: string) => vendorService.deleteVendor(id), 
    onSuccess: (_, id) => {
      queryClient.invalidateQueries({queryKey:["vendor", id]});
      queryClient.invalidateQueries({queryKey:["vendors"]});
    },
  });
}
