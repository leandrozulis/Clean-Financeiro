import { z } from "zod";

export const deleteContaAPagarDTO = z.object({
  contaapagarId: z.string()
})

export type DeleteContaAPagarDTO = z.infer<typeof deleteContaAPagarDTO>