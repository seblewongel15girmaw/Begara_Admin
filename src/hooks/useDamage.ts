import {
    useMutation,
    useQuery,
    useQueryClient,
    UseMutationResult,
    UseQueryResult,
  } from "@tanstack/react-query";
  import DamageService, { Damage } from "../service/damageService";
  
  export function useDamages(): UseQueryResult<Damage[]> {
    const damageService = new DamageService();
    // console.log("use gren coffee hooks")
    return useQuery({
      queryKey: ["damages"],
      queryFn: () => damageService.getAllDamages(),
    });
  }
  
  export function useCreateDamage(): UseMutationResult<Damage, Error, Damage> {
    const queryClient = useQueryClient();
    const damageService = new DamageService();
  
    return useMutation({
      mutationFn: (newProduct: Damage) => damageService.createDamage(newProduct),
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["damages"] });
      },
    });
  }
  
  export function useDamage(id: string): UseQueryResult<Damage> {
    const damageService = new DamageService();
  
    return useQuery({
      queryKey: ["damage", id],
      queryFn: () => damageService.getByDamageId(id),
    });
  }
  
  export function useUpdateDamage(
    productId: string
  ): UseMutationResult<Damage, Error, any> {
    const queryClient = useQueryClient();
    const damageService = new DamageService();
  
    return useMutation({
      mutationFn: (updatedProduct: Damage) =>
      damageService.updateDamage(productId, updatedProduct),
  
      onSuccess: (data, updatedProduct) => {
        queryClient.setQueryData(["damage", productId], data);
        queryClient.invalidateQueries({ queryKey: ["damages"] });
      },
    });
  }
  
  export function useDeleteDamage(): UseMutationResult<void, Error, string> {
    const queryClient = useQueryClient();
    const damageService = new DamageService();
  
    return useMutation({
      mutationFn: (id: string) => damageService.deleteDamage(id),
      onSuccess: (_, id) => {
        queryClient.invalidateQueries({ queryKey: ["damage", id] });
        queryClient.invalidateQueries({ queryKey: ["damages"] });
      },
    });
  }
  