import {
  useMutation,
  useQuery,
  useQueryClient,
  UseMutationResult,
  UseQueryResult,
} from "@tanstack/react-query";
import GreenCoffeeService, { GreenCoffee } from "../service/greenCoffeeService";

export function useGreenCoffees(): UseQueryResult<GreenCoffee[]> {
  const greenCoffeeService = new GreenCoffeeService();
  // console.log("use gren coffee hooks")
  return useQuery({
    queryKey: ["greenCoffees"],
    queryFn: () => greenCoffeeService.getAllGreenCoffees(),
  });
}

export function useCreateGreenCoffee(): UseMutationResult<
  GreenCoffee,
  Error,
  GreenCoffee
> {
  const queryClient = useQueryClient();
  const greenCoffeeService = new GreenCoffeeService();

  return useMutation({
    mutationFn: (newProduct: GreenCoffee) =>
      greenCoffeeService.createGreenCoffee(newProduct),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["greenCoffees"] });
    },
  });
}

export function useGreenCoffee(id: string): UseQueryResult<GreenCoffee> {
  const greenCoffeeService = new GreenCoffeeService();

  return useQuery({
    queryKey: ["greenCoffee", id],
    queryFn: () => greenCoffeeService.getByGreenCoffeeId(id),
  });
}

export function useUpdateGreenCoffee(
  productId: string
): UseMutationResult<GreenCoffee, Error, any> {
  const queryClient = useQueryClient();
  const greenCoffeeService = new GreenCoffeeService();

  return useMutation({
    mutationFn: (updatedProduct: GreenCoffee) =>
      greenCoffeeService.updateGreenCoffee(productId, updatedProduct),

    onSuccess: (data, updatedProduct) => {
      queryClient.setQueryData(["greenCoffee", productId], data);
      queryClient.invalidateQueries({ queryKey: ["greenCoffees"] });
    },
  });
}

// sorting update 
export function useUpdateSortingCoffee(
  productId: string
): UseMutationResult<GreenCoffee, Error, any> {
  const queryClient = useQueryClient();
  const greenCoffeeService = new GreenCoffeeService();

  return useMutation({
    mutationFn: (updatedProduct: GreenCoffee) =>
      greenCoffeeService.updateSortingCoffee(productId, updatedProduct),

    onSuccess: (data, updatedProduct) => {
      queryClient.setQueryData(["greenCoffee", productId], data);
      queryClient.invalidateQueries({ queryKey: ["greenCoffees"] });
    },
  });
}

export function useDeleteGreenCoffee(): UseMutationResult<void, Error, string> {
  const queryClient = useQueryClient();
  const greenCoffeeService = new GreenCoffeeService();

  return useMutation({  
    mutationFn:(id: string) => greenCoffeeService.deleteGreenCoffee(id), 
    onSuccess: (_, id) => {
      queryClient.invalidateQueries({queryKey:["greenCoffee", id]});
      queryClient.invalidateQueries({queryKey:["greenCoffees"]});
    },
  });
}
