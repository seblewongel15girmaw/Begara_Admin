import {
  useMutation,
  useQuery,
  useQueryClient,
  UseMutationResult,
  UseQueryResult,
} from "@tanstack/react-query";

import RoleService, { Role } from "../service/roleService";

export function useRoles(): UseQueryResult<Role[]> {
  const roleService = new RoleService();
  return useQuery({
    queryKey: ["roles"],
    queryFn: () => roleService.getAllRoles(),
  });
}

export function useCreateRole(): UseMutationResult<Role, Error, Role> {
  const queryClient = useQueryClient();
  const roleService = new RoleService();

  return useMutation({
    mutationFn: (newProduct: Role) => roleService.createRole(newProduct),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["roles"] });
    },
  });
}

export function useRole(id: string): UseQueryResult<Role> {
  const roleService = new RoleService();

  return useQuery({
    queryKey: ["role", id],
    queryFn: () => roleService.getByRoleId(id),
  });
}

export function useUpdateRole(
  productId: string
): UseMutationResult<Role, Error, any> {
  const queryClient = useQueryClient();
  const roleService = new RoleService();

  return useMutation({
    mutationFn: (updatedProduct: Role) =>
      roleService.updateRole(productId, updatedProduct),

    onSuccess: (data, updatedProduct) => {
      queryClient.setQueryData(["role", productId], data);
      queryClient.invalidateQueries({ queryKey: ["roles"] });
    },
  });
}

export function useDeleteRole(): UseMutationResult<void, Error, string> {
  const queryClient = useQueryClient();
  const roleService = new RoleService();

  return useMutation({
    mutationFn: (id: string) => roleService.deleteRole(id),
    onSuccess: (_, id) => {
      queryClient.invalidateQueries({ queryKey: ["role", id] });
      queryClient.invalidateQueries({ queryKey: ["roles"] });
    },
  });
}
