import {
    useMutation,
    useQuery,
    useQueryClient,
    UseMutationResult,
    UseQueryResult,
  } from "@tanstack/react-query";
  import DeliveryTypeService, {
    DeliveryType,
  } from "../service/deliveryTypeService";
  import { ToastContainer, toast } from "react-toastify";
  
  export function useDeliveryTypes(): UseQueryResult<DeliveryType[]> {
    const deliveryTypeService = new DeliveryTypeService();
    return useQuery({
      queryKey: ["deliveryTypes"],
      queryFn: () => deliveryTypeService.getAllDeliveryTypes(),
    });
  }
  
  export function useCreateDeliveryType(): UseMutationResult<
  DeliveryType,
    Error,
    DeliveryType
  > {
    const queryClient = useQueryClient();
    const deliveryTypeService = new DeliveryTypeService();
  
    return useMutation({
      mutationFn: (newProduct: DeliveryType) =>
      deliveryTypeService.createDeliveryType(newProduct),
      onSuccess: (data) => {
        queryClient.invalidateQueries({ queryKey: ["deliveryTypes"] });
      },
    });
  }
  
  export function useDeliveryType(id: string): UseQueryResult<DeliveryType> {
    const deliveryTypeService = new DeliveryTypeService();
  
    return useQuery({
      queryKey: ["deliveryType", id],
      queryFn: () => deliveryTypeService.getByDeliveryTypeId(id),
    });
  }
  
  export function useUpdateDeliveryType(
    productId: string
  ): UseMutationResult<DeliveryType, Error, any> {
    const queryClient = useQueryClient();
    const deliveryTypeService = new DeliveryTypeService();
  
    return useMutation({
      mutationFn: (updatedProduct: DeliveryType) =>
      deliveryTypeService.updateDeliveryType(productId, updatedProduct),
  
      onSuccess: (data, updatedProduct) => {
        queryClient.setQueryData(["delivery", productId], data);
        queryClient.invalidateQueries({ queryKey: ["deliveryTypes"] });
        queryClient.invalidateQueries({ queryKey: ["deliveryTypes"] });
      },
      onError(error, variables, context) {
          
      },
    });
  }
  
  export function useDeleteDeliveryType(): UseMutationResult<
    void,
    Error,
    string
  > {
    const queryClient = useQueryClient();
    const deliveryTypeService = new DeliveryTypeService();
  
    return useMutation({
      mutationFn: (id: string) => deliveryTypeService.deleteDeliveryType(id),
      onSuccess: (_, id) => {
        queryClient.invalidateQueries({ queryKey: ["deliveryType", id] });
        queryClient.invalidateQueries({ queryKey: ["deliveryTypes"] });
      },
    });
  }
  