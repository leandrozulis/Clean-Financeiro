import { z } from "zod";

export const createSaidaDTO = z.object({
  valor: z.number(),
  descricao: z.string(),
  meioPagamento: z.string()
})

export type CreateSaidaDTO = z.infer<typeof createSaidaDTO>