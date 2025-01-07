import { z } from "zod";

export const deleteSaidaDTO = z.object({
  saidaId: z.string()
})

export type DeleteSaidaDTO = z.infer<typeof deleteSaidaDTO>