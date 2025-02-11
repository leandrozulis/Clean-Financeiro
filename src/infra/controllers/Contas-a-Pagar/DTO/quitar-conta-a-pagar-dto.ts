import { z } from "zod";

export const quitarparcelaContaAPagarDTO = z.object({
  valorPago: z.number(),
  contaapagarId: z.string()
})

export type QuitarParcelaContaAPagarDTO = z.infer<typeof quitarparcelaContaAPagarDTO>
