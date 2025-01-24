import { z } from "zod";

export const validatedCartaoIdDTO = z.object({
  cartaoId: z.string()
})

export type ValidatedCartaoIdDTO = z.infer<typeof validatedCartaoIdDTO>
