import {
  useMutation,
  useQuery,
  useQueryClient,
  UseMutationResult,
  UseQueryResult,
} from "@tanstack/react-query";

import UserService, { User } from "../service/userService";

export function useAllUsers(): UseQueryResult<User[]> {
  const user = new UserService();

  return useQuery({ queryKey: ["users"], queryFn: () => user.getAllUsers() });
}

export function useCreateUser(): UseMutationResult<User, Error, User> {
  const queryClient = useQueryClient();
  const userService = new UserService();

  return useMutation({
    mutationFn: (newUser: User) => userService.createUser(newUser),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
    },
  });
}

//* Read_Single_User
export function useUser(id: string): UseQueryResult<User> {
  const userService = new UserService();

  return useQuery({
    queryKey: ["user", id],
    queryFn: () => userService.getByUserId(id),
  });
}

//* Update_user
export function useUpdateUser(): UseMutationResult<User, Error, any> {
  const queryClient = useQueryClient();
  const userService = new UserService();

  return useMutation({
    mutationFn: (updatedUser: User) => userService.updateUser("1", updatedUser),

    onSuccess: (data, updatedUser) => {
      queryClient.setQueryData(["user", updatedUser.id], data);
    },
  });
}

// ! deleting a user
export function useDeleteUser(): UseMutationResult<void, Error, string> {
  const queryClient = useQueryClient();
  const userService = new UserService();

  return useMutation({
    mutationFn: (id: string) => userService.deleteUser(id),
    onSuccess: (_, id) => {
      queryClient.invalidateQueries({ queryKey: ["user", id] });
      queryClient.invalidateQueries({ queryKey: ["users"] });
    },
  });
}
