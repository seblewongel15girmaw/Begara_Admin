import {
  useMutation,
  useQuery,
  useQueryClient,
  UseMutationResult,
  UseQueryResult,
} from "@tanstack/react-query";

import OrderService, { Order } from "../service/orderService";

export function useOrders(): UseQueryResult<Order[]> {
  const orderService = new OrderService();
  return useQuery({
    queryKey: ["orders"],
    queryFn: () => orderService.getAllOrders(),
  });
}

export function useCreateOrder(): UseMutationResult<Order, Error, Order> {
  const queryClient = useQueryClient();
  const orderService = new OrderService();

  return useMutation({
    mutationFn: (newProduct: Order) => orderService.createOrder(newProduct),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["orders"] });
    },
  });
}

export function useOrder(id: string): UseQueryResult<Order> {
  const orderService = new OrderService();

  return useQuery({
    queryKey: ["order", id],
    queryFn: () => orderService.getByOrderId(id),
  });
}

export function useUpdateOrder(
  productId: string
): UseMutationResult<Order, Error, any> {
  const queryClient = useQueryClient();
  const orderService = new OrderService();

  return useMutation({
    mutationFn: (updatedProduct: Order) =>
      orderService.updateOrder(productId, updatedProduct),

    onSuccess: (data, updatedProduct) => {
      queryClient.setQueryData(["order", productId], data);
    },
  });
}

export function useDeleteOrder(): UseMutationResult<void, Error, string> {
  const queryClient = useQueryClient();
  const orderService = new OrderService();

  return useMutation({
    mutationFn: (id: string) => orderService.deleteOrder(id),
    onSuccess: (_, id) => {
      queryClient.invalidateQueries({ queryKey: ["order", id] });
      queryClient.invalidateQueries({ queryKey: ["orders"] });
    },
  });
}
