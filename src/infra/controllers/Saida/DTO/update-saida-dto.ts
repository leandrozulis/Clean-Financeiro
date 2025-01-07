import { z } from "zod";

export const updateSaidaDTO = z.object({
  valor: z.optional(z.number()),
  descricao: z.optional(z.string()),
  meioPagamento: z.optional(z.string())
})

export const idSaidaDto = z.object({
  saidaId: z.string()
})

export type IdSaidaDto = z.infer<typeof idSaidaDto>
export type UpdateSaidaDTO = z.infer<typeof updateSaidaDTO>

