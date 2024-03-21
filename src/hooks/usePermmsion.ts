import {
    useMutation,
    useQuery,
    useQueryClient,
    UseMutationResult,
    UseQueryResult,
  } from "@tanstack/react-query";
  
  import PermissionService, { Permission } from "../service/permissionService";
  
  export function usePermissions(): UseQueryResult<Permission[]> {
    const permissionService = new PermissionService();
    return useQuery({
      queryKey: ["permissions"],
      queryFn: () => permissionService.getAllPermissions(),
    });
  }
  
  export function useCreatePermission(): UseMutationResult<
  Permission,
    Error,
  Permission
  > {
    const queryClient = useQueryClient();
    const permissionService = new PermissionService();
  
    return useMutation({
      mutationFn: (newProduct: Permission) =>
      permissionService.createPermission(newProduct),
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["permissions"] });
      },
    });
  }
  
  export function usePermission(id: string): UseQueryResult<Permission> {
    const permissionService = new PermissionService();
  
    return useQuery({
      queryKey: ["permission", id],
      queryFn: () => permissionService.getByPermissionId(id),
    });
  }
  
  export function useUpdatePermission(
    productId: string
  ): UseMutationResult<Permission, Error, any> {
    const queryClient = useQueryClient();
    const permissionService = new PermissionService();
  
    return useMutation({
      mutationFn: (updatedProduct: Permission) =>
      permissionService.updatePermission(productId, updatedProduct),
  
      onSuccess: (data, updatedProduct) => {
        queryClient.setQueryData(["permission", productId], data);
        queryClient.invalidateQueries({queryKey:["permissions"]});
      },
    });
  }
  
  export function useDeletePermission(): UseMutationResult<void, Error, string> {
    const queryClient = useQueryClient();
    const permissionService = new PermissionService();
  
    return useMutation({  
      mutationFn:(id: string) => permissionService.deletePermission(id), 
      onSuccess: (_, id) => {
        queryClient.invalidateQueries({queryKey:["permission", id]});
        queryClient.invalidateQueries({queryKey:["permissions"]});
      },
    });
  }
  