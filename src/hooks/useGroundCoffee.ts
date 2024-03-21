import {
  useMutation,
  useQuery,
  useQueryClient,
  UseMutationResult,
  UseQueryResult,
} from "@tanstack/react-query";
import GroundCoffeeService, {
  GroundCoffee,
} from "../service/groundCoffeeService";

export function useGroundCoffees(): UseQueryResult<GroundCoffee[]> {
  const groundCoffeeService = new GroundCoffeeService();
  return useQuery({
    queryKey: ["groundCoffees"],
    queryFn: () => groundCoffeeService.getAllGroundCoffees(),
  });
}

export function useCreateGroundCoffee(): UseMutationResult<
  GroundCoffee,
  Error,
  GroundCoffee
> {
  const queryClient = useQueryClient();
  const groundCoffeeService = new GroundCoffeeService();

  return useMutation({
    mutationFn: (newProduct: GroundCoffee) =>
      groundCoffeeService.createGroundCoffee(newProduct),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["groundCoffees"] });
    },
  });
}

export function useGroundCoffee(id: string): UseQueryResult<GroundCoffee> {
  const groundCoffeeService = new GroundCoffeeService();

  return useQuery({
    queryKey: ["groundCoffee", id],
    queryFn: () => groundCoffeeService.getByGroundCoffeeId(id),
  });
}

export function useUpdateGroundCoffee(
  productId: string
): UseMutationResult<GroundCoffee, Error, any> {
  const queryClient = useQueryClient();
  const groundCoffeeService = new GroundCoffeeService();

  return useMutation({
    mutationFn: (updatedProduct: GroundCoffee) =>
      groundCoffeeService.updateGroundCoffee(productId, updatedProduct),

    onSuccess: (data, updatedProduct) => {
      queryClient.setQueryData(["ground", productId], data);
      queryClient.invalidateQueries({ queryKey: ["groundCoffees"] });
    },
  });
}

export function useDeleteGroundCoffee(): UseMutationResult<
  void,
  Error,
  string
> {
  const queryClient = useQueryClient();
  const groundCoffeeService = new GroundCoffeeService();

  return useMutation({
    mutationFn: (id: string) => groundCoffeeService.deleteRGroundCoffee(id),
    onSuccess: (_, id) => {
      queryClient.invalidateQueries({ queryKey: ["groundCoffee", id] });
      queryClient.invalidateQueries({ queryKey: ["groundCoffees"] });
    },
  });
}
