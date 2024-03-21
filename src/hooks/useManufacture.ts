import {
  useMutation,
  useQuery,
  useQueryClient,
  UseMutationResult,
  UseQueryResult,
} from "@tanstack/react-query";

import ManufactureService, { Manufacture } from "../service/manufactureService";

export function useAllManufactures(): UseQueryResult<Manufacture[]> {
  const manufacture = new ManufactureService();

  return useQuery({ queryKey: ["manufactures"], queryFn: () => manufacture.getAllManufactures() });
}

export function useCreateManufacture(): UseMutationResult<Manufacture, Error, Manufacture> {
  const queryClient = useQueryClient();
  const manufactureService = new ManufactureService();

  return useMutation({
    mutationFn: (newManufacture: Manufacture) => manufactureService.createManufacture(newManufacture),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["manufactures"] });
    },
  });
}

//* Read_Single_Manufacture
export function useManufacture(id: string): UseQueryResult<Manufacture> {
  const manufactureService = new ManufactureService();

  return useQuery({
    queryKey: ["manufacture", id],
    queryFn: () => manufactureService.getByManufactureId(id),
  });
}

//* Update_Manufacture
export function useUpdateManufacture(): UseMutationResult<Manufacture, Error, any> {
  const queryClient = useQueryClient();
  const manufactureService = new ManufactureService();

  return useMutation({
    mutationFn: (updatedManufacture: Manufacture) => manufactureService.updateManufacture("1", updatedManufacture),

    onSuccess: (data, updatedManufacture) => {
      queryClient.setQueryData(["manufacture", updatedManufacture.id], data);
    },
  });
}

// ! deleting a Manufacture
export function useDeleteManufacture(): UseMutationResult<void, Error, string> {
  const queryClient = useQueryClient();
  const manufactureService = new ManufactureService();

  return useMutation({
    mutationFn: (id: string) => manufactureService.deleteManufacture(id),
    onSuccess: (_, id) => {
      queryClient.invalidateQueries({ queryKey: ["manufacture", id] });
      queryClient.invalidateQueries({ queryKey: ["manufactures"] });
    },
  });
}
