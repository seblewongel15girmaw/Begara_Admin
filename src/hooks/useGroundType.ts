import {
  useMutation,
  useQuery,
  useQueryClient,
  UseMutationResult,
  UseQueryResult,
} from "@tanstack/react-query";
import GroundTypeService, {
  GroundType,
} from "../service/groundTypeService";

export function useGroundTypes(): UseQueryResult<GroundType[]> {
  const groundTypeService = new GroundTypeService();
  return useQuery({
    queryKey: ["groundTypes"],
    queryFn: () => groundTypeService.getAllGroundTypes(),
  });
}

export function useCreateGroundType(): UseMutationResult<
  GroundType,
  Error,
  GroundType
> {
  const queryClient = useQueryClient();
  const groundTypeService = new GroundTypeService();

  return useMutation({
    mutationFn: (newProduct: GroundType) =>
      groundTypeService.createGroundType(newProduct),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["groundTypes"] });
    },
  });
}

export function useGroundType(id: string): UseQueryResult<GroundType> {
  const groundTypeService = new GroundTypeService();

  return useQuery({
    queryKey: ["groundType", id],
    queryFn: () => groundTypeService.getByGroundTypeId(id),
  });
}

export function useUpdateGroundType(
  productId: string
): UseMutationResult<GroundType, Error, any> {
  const queryClient = useQueryClient();
  const groundTypeService = new GroundTypeService();

  return useMutation({
    mutationFn: (updatedProduct: GroundType) =>
      groundTypeService.updateGroundType(productId, updatedProduct),

    onSuccess: (data, updatedProduct) => {
      queryClient.setQueryData(["ground", productId], data);
    },
  });
}

export function useDeleteGroundTypeCoffee(): UseMutationResult<
  void,
  Error,
  string
> {
  const queryClient = useQueryClient();
  const groundTypeService = new GroundTypeService();

  return useMutation({
    mutationFn: (id: string) => groundTypeService.deleteGroundType(id),
    onSuccess: (_, id) => {
      queryClient.invalidateQueries({ queryKey: ["groundType", id] });
      queryClient.invalidateQueries({ queryKey: ["groundTypes"] });
    },
  });
}
