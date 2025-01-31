import { z } from "zod";

export const createRendaFixaDTO = z.object({
  valor: z.number()
})

export type CreateRendaFixaDTO = z.infer<typeof createRendaFixaDTO>