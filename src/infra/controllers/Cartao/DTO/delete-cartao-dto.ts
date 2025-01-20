import { z } from "zod";

export const deleteCartaoDTO = z.object({
  cartaoId: z.string()
})

export type DeleteCartaoDTO = z.infer<typeof deleteCartaoDTO>