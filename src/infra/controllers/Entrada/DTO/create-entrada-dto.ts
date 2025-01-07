import { z } from "zod";

export const createEntradaDTO = z.object({
  valor: z.number(),
  descricao: z.string(),
  meioPagamento: z.string()
})

export type CreateEntradaDTO = z.infer<typeof createEntradaDTO>
