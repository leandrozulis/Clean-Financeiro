import { z } from "zod";

export const updateContaAPagarDTO = z.object({
  valor: z.number(),
  descricao: z.string(),
  parcelas: z.string(),
  contaapagarId: z.string()
})

export type UpdateContaAPagarDTO = z.infer<typeof updateContaAPagarDTO>
