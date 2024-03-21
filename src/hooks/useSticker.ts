import {
  useMutation,
  useQuery,
  useQueryClient,
  UseMutationResult,
  UseQueryResult,
} from "@tanstack/react-query";

import StickerService, { Sticker } from "../service/stickerService";

export function useAllStickers(): UseQueryResult<Sticker[]> {
  const sticker = new StickerService();

  return useQuery({ queryKey: ["stickers"], queryFn: () => sticker.getAllStickers() });
}

export function useCreateSticker(): UseMutationResult<Sticker, Error, Sticker> {
  const queryClient = useQueryClient();
  const stickerService = new StickerService();

  return useMutation({
    mutationFn: (newSticker: Sticker) => stickerService.createSticker(newSticker),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["stickers"] });
    },
  });
}

//* Read_Single_Sticker
export function useSticker(id: string): UseQueryResult<Sticker> {
  const stickerService = new StickerService();

  return useQuery({
    queryKey: ["sticker", id],
    queryFn: () => stickerService.getByStickerId(id),
  });
}

//* Update_Sticker
export function useUpdateSticker(): UseMutationResult<Sticker, Error, any> {
  const queryClient = useQueryClient();
  const stickerService = new StickerService();

  return useMutation({
    mutationFn: (updatedSticker: Sticker) => stickerService.updateSticker("1", updatedSticker),

    onSuccess: (data, updatedSticker) => {
      queryClient.setQueryData(["sticker", updatedSticker.id], data);
    },
  });
}

// ! deleting a Sticker
export function useDeleteSticker(): UseMutationResult<void, Error, string> {
  const queryClient = useQueryClient();
  const stickerService = new StickerService();

  return useMutation({
    mutationFn: (id: string) => stickerService.deleteSticker(id),
    onSuccess: (_, id) => {
      queryClient.invalidateQueries({ queryKey: ["sticker", id] });
      queryClient.invalidateQueries({ queryKey: ["stickers"] });
    },
  });
}
