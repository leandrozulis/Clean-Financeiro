import { z } from "zod";

export const consultaSaidaDto = z.object({
  saidaId: z.string()
})
export type ConsultaSaidaDto = z.infer<typeof consultaSaidaDto>