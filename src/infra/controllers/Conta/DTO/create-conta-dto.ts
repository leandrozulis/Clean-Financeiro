import { z } from "zod";

export const createContaDTO = z.object({
  email: z.string(),
  senha: z.string(),
  nome: z.string(),
  saldo: z.optional(z.number())
})

export type CreateContaDTO = z.infer<typeof createContaDTO>