import { z } from "zod";

export const removeRendaFixaDTO = z.object({
  rendaFixaId: z.string()
})

export type RemoveRendaFixaDTO = z.infer<typeof removeRendaFixaDTO>