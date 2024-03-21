import {
  useMutation,
  useQuery,
  useQueryClient,
  UseMutationResult,
  UseQueryResult,
} from "@tanstack/react-query";
import GradeTypeService, {
  GradeType,
} from "../service/gradeTypeService";

export function useGradeTypes(): UseQueryResult<GradeType[]> {
  const gradeTypeService = new GradeTypeService();
  return useQuery({
    queryKey: ["gradeTypes"],
    queryFn: () => gradeTypeService.getAllGradeTypes(),
  });
}

export function useCreateGradeType(): UseMutationResult<
GradeType,
  Error,
  GradeType
> {
  const queryClient = useQueryClient();
  const gradeTypeService = new GradeTypeService();

  return useMutation({
    mutationFn: (newProduct: GradeType) =>
    gradeTypeService.createGradeType(newProduct),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["gradeTypes"] });
    },
  });
}

export function useGradeType(id: string): UseQueryResult<GradeType> {
  const gradeTypeService = new GradeTypeService();

  return useQuery({
    queryKey: ["GradeType", id],
    queryFn: () => gradeTypeService.getByGradeTypeId(id),
  });
}

export function useUpdateGradeType(
  productId: string
): UseMutationResult<GradeType, Error, any> {
  const queryClient = useQueryClient();
  const gradeTypeService = new GradeTypeService();

  return useMutation({
    mutationFn: (updatedProduct: GradeType) =>
    gradeTypeService.updateGradeType(productId, updatedProduct),

    onSuccess: (data, updatedProduct) => {
      queryClient.setQueryData(["grade", productId], data);
      queryClient.invalidateQueries({ queryKey: ["groundTypes"] });
    },
  });
}

export function useDeleteGradeType(): UseMutationResult<
  void,
  Error,
  string
> {
  const queryClient = useQueryClient();
  const gradeTypeService = new GradeTypeService();

  return useMutation({
    mutationFn: (id: string) => gradeTypeService.deleteGradeType(id),
    onSuccess: (_, id) => {
      queryClient.invalidateQueries({ queryKey: ["gradeType", id] });
      queryClient.invalidateQueries({ queryKey: ["groundTypes"] });
    },
  });
}
