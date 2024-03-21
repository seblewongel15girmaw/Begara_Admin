import {
    useMutation,
    useQuery,
    useQueryClient,
    UseMutationResult,
    UseQueryResult,
  } from "@tanstack/react-query";
  import DestinationTypeService, {
    DestinationType,
  } from "../service/destinationTypeService";
  
  export function useDestinationTypes(): UseQueryResult<DestinationType[]> {
    const destinationTypeService = new DestinationTypeService();
    return useQuery({
      queryKey: ["destinationTypes"],
      queryFn: () => destinationTypeService.getAllDestinationTypes(),
    });
  }
  
  export function useCreateDestinationType(): UseMutationResult<
  DestinationType,
    Error,
    DestinationType
  > {
    const queryClient = useQueryClient();
    const destinationTypeService = new DestinationTypeService();
  
    return useMutation({
      mutationFn: (newProduct: DestinationType) =>
      destinationTypeService.createDestinationType(newProduct),
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["destinationTypes"] });
      },
    });
  }
  
  export function useDestinationType(id: string): UseQueryResult<DestinationType> {
    const destinationTypeService = new DestinationTypeService();
  
    return useQuery({
      queryKey: ["destinationType", id],
      queryFn: () => destinationTypeService.getByDestinationTypeId(id),
    });
  }
  
  export function useUpdateDestinationType(
    productId: string
  ): UseMutationResult<DestinationType, Error, any> {
    const queryClient = useQueryClient();
    const destinationTypeService = new DestinationTypeService();
  
    return useMutation({
      mutationFn: (updatedProduct: DestinationType) =>
      destinationTypeService.updateDestinationType(productId, updatedProduct),
  
      onSuccess: (data, updatedProduct) => {
        queryClient.setQueryData(["destination", productId], data);
        queryClient.invalidateQueries({ queryKey: ["destinationTypes"] });
      },
    });
  }
  
  export function useDeleteDestinationType(): UseMutationResult<
    void,
    Error,
    string
  > {
    const queryClient = useQueryClient();
    const destinationTypeService = new DestinationTypeService();
  
    return useMutation({
      mutationFn: (id: string) => destinationTypeService.deleteDestinationType(id),
      onSuccess: (_, id) => {
        queryClient.invalidateQueries({ queryKey: ["destinationType", id] });
        queryClient.invalidateQueries({ queryKey: ["destinationTypes"] });
      },
    });
  }
  