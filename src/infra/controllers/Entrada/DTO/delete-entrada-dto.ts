import { z } from "zod";

export const deleteEntradaDTO = z.object({
  entradaId: z.string()
})

export type DeleteEntradaDTO = z.infer<typeof deleteEntradaDTO>