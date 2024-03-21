import {
  useMutation,
  useQuery,
  useQueryClient,
  UseMutationResult,
  UseQueryResult,
} from "@tanstack/react-query";
import AssetService, { Asset } from "../service/assetsService";

export function useAssets(): UseQueryResult<Asset[]> {
  const assetService = new AssetService();
  // console.log("use gren coffee hooks")
  return useQuery({
    queryKey: ["assets"],
    queryFn: () => assetService.getAllAssets(),
  });
}

export function useCreateAsset(): UseMutationResult<Asset, Error, Asset> {
  const queryClient = useQueryClient();
  const assetService = new AssetService();

  return useMutation({
    mutationFn: (newProduct: Asset) => assetService.createAsset(newProduct),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["assets"] });
    },
  });
}

export function useAsset(id: string): UseQueryResult<Asset> {
  const assetService = new AssetService();

  return useQuery({
    queryKey: ["asset", id],
    queryFn: () => assetService.getByAssetId(id),
  });
}

export function useUpdateAsset(
  productId: string
): UseMutationResult<Asset, Error, any> {
  const queryClient = useQueryClient();
  const assetService = new AssetService();

  return useMutation({
    mutationFn: (updatedProduct: Asset) =>
      assetService.updateAsset(productId, updatedProduct),

    onSuccess: (data, updatedProduct) => {
      queryClient.setQueryData(["asset", productId], data);
      queryClient.invalidateQueries({ queryKey: ["assets"] });
    },
  });
}

export function useDeleteAsset(): UseMutationResult<void, Error, string> {
  const queryClient = useQueryClient();
  const assetService = new AssetService();

  return useMutation({
    mutationFn: (id: string) => assetService.deleteAsset(id),
    onSuccess: (_, id) => {
      queryClient.invalidateQueries({ queryKey: ["asset", id] });
      queryClient.invalidateQueries({ queryKey: ["assets"] });
    },
  });
}
