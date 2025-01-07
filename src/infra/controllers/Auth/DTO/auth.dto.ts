import { z } from "zod";

export const authDTO = z.object({
  email: z.string(),
  senha: z.string()
})

export type AuthDTO = z.infer<typeof authDTO>