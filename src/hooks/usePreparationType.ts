import {
  useMutation,
  useQuery,
  useQueryClient,
  UseMutationResult,
  UseQueryResult,
} from "@tanstack/react-query";
import PreparationTypeService, { PreparationType } from "../service/preparationTypeService";

export function usePreparationTypes(): UseQueryResult<PreparationType[]> {
  const preparationTypeService = new PreparationTypeService();
  return useQuery({
    queryKey: ["preparationTypes"],
    queryFn: () => preparationTypeService.getAllPreparationType(),
  });
}

export function useCreatePreparationType(): UseMutationResult<
PreparationType,
  Error,
  PreparationType
> {
  const queryClient = useQueryClient();
  const preparationTypeService = new PreparationTypeService();

  return useMutation({
    mutationFn: (newProduct: PreparationType) =>
    preparationTypeService.createPreparationType(newProduct),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["preparationTypes"] });
    },
  });
}

export function usePreparationType(id: string): UseQueryResult<PreparationType> {
  const preparationTypeService = new PreparationTypeService();

  return useQuery({
    queryKey: ["preparationType", id],
    queryFn: () => preparationTypeService.getByPreparationTypeId(id),
  });
}

export function useUpdatePreparationType(
  productId: string
): UseMutationResult<PreparationType, Error, any> {
  const queryClient = useQueryClient();
  const preparationTypeService = new PreparationTypeService();

  return useMutation({
    mutationFn: (updatedProduct: PreparationType) =>
    preparationTypeService.updatePreparationType(productId, updatedProduct),

    onSuccess: (data, updatedProduct) => {
      queryClient.setQueryData(["preparationType", productId], data);
      queryClient.invalidateQueries({queryKey:["preparationTypes"]});
    },
  });
}

export function useDeletePreparationType(): UseMutationResult<void, Error, string> {
  const queryClient = useQueryClient();
  const preparationTypeService = new PreparationTypeService();

  return useMutation({  
    mutationFn:(id: string) => preparationTypeService.deletePreparationType(id), 
    onSuccess: (_, id) => {
      queryClient.invalidateQueries({queryKey:["preparationType", id]});
      queryClient.invalidateQueries({queryKey:["preparationTypes"]});
    },
  });
}
