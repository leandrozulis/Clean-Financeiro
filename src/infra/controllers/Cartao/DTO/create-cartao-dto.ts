import { z } from "zod";

export const createCartaoDTO = z.object({
  limite: z.number(),
  descricao: z.string(),
  nomeBanco: z.string(),
  dtfechamento: z.string(),
  dtvencimento: z.string()
})

export type CreateCartaoDTO = z.infer<typeof createCartaoDTO>