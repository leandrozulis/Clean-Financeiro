import { z } from "zod";

export const createContaAPagarDTO = z.object({
  valor: z.number(),
  descricao: z.string(),
  parcelas: z.string(),
  pago: z.optional(z.date())
})

export type CreateContaAPagarDTO = z.infer<typeof createContaAPagarDTO>
