import {
  useMutation,
  useQuery,
  useQueryClient,
  UseMutationResult,
  UseQueryResult,
} from "@tanstack/react-query";
import RoastedCoffeeService, { RoastedCoffee } from "../service/roastedCoffeeService";

export function useRoastedCoffees(): UseQueryResult<RoastedCoffee[]> {
  const roastedCoffeeService = new RoastedCoffeeService();
  return useQuery({
    queryKey: ["roastedCoffees"],
    queryFn: () => roastedCoffeeService.getAllRoastedCoffees(),
  });
}

export function useCreateRoastedCoffee(): UseMutationResult<
RoastedCoffee,
  Error,
  RoastedCoffee
> {
  const queryClient = useQueryClient();
  const roastedCoffeeService = new RoastedCoffeeService();

  return useMutation({
    mutationFn: (newProduct: RoastedCoffee) =>
    roastedCoffeeService.createRoastedCoffee(newProduct),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["roastedCoffees"] });
    },
  });
}

export function useRoastedCoffee(id: string): UseQueryResult<RoastedCoffee> {
  const roastedCoffeeService = new RoastedCoffeeService();

  return useQuery({
    queryKey: ["greenCoffee", id],
    queryFn: () => roastedCoffeeService.getByRoastedCoffeeId(id),
  });
}

export function useUpdateRoastedCoffee(
  productId: string
): UseMutationResult<RoastedCoffee, Error, any> {
  const queryClient = useQueryClient();
  const roastedCoffeeService = new RoastedCoffeeService();

  return useMutation({
    mutationFn: (updatedProduct: RoastedCoffee) =>
    roastedCoffeeService.updateRoastedCoffee(productId, updatedProduct),

    onSuccess: (data, updatedProduct) => {
      queryClient.setQueryData(["roasted", productId], data);
      queryClient.invalidateQueries({ queryKey: ["roastedCoffees"] });
    },
  });
}

export function useDeleteRoastedCoffee(): UseMutationResult<void, Error, string> {
  const queryClient = useQueryClient();
  const roastedCoffeeService = new RoastedCoffeeService();

  return useMutation({  
    mutationFn:(id: string) => roastedCoffeeService.deleteRoastedCoffee(id), 
    onSuccess: (_, id) => {
      queryClient.invalidateQueries({queryKey:["roastedCoffee", id]});
      queryClient.invalidateQueries({queryKey:["roastedCoffees"]});
    },
  });
}
