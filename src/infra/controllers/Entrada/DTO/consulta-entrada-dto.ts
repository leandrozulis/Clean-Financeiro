import { z } from "zod";

export const consultaEntradaDto = z.object({
  entradaId: z.string()
})
export type ConsultaEntradaDto = z.infer<typeof consultaEntradaDto>