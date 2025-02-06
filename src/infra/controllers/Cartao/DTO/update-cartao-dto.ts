import { z } from "zod";

export const updateCartaoDTO = z.object({
  limite: z.optional(z.number()),
  descricao: z.optional(z.string()),
  nomeBanco: z.optional(z.string()),
  dtfechamento: z.optional(z.string()),
  dtvencimento: z.optional(z.string())
})

export type UpdateCartaoDTO = z.infer<typeof updateCartaoDTO>