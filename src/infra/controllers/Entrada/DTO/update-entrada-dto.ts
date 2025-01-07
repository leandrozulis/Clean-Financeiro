import { z } from "zod";

export const updateEntradaDTO = z.object({
  valor: z.optional(z.number()),
  descricao: z.optional(z.string()),
  meioPagamento: z.optional(z.string())
})

export const idEntradaDto = z.object({
  entradaId: z.string()
})

export type IdEntradaDto = z.infer<typeof idEntradaDto>
export type UpdateEntradaDTO = z.infer<typeof updateEntradaDTO>

