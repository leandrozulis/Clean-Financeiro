import { z } from "zod";

export const validatedToken = z.object({
  token: z.string()
})

export type ValidatedToken = z.infer<typeof validatedToken>