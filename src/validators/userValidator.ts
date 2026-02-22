import { z } from "zod";

const userValidate = z.object({
  username: z.string().optional(),
  email: z.string().email("Formato de email inválido"),
  password: z.string().min(4, "La contraseña debe tener al menos 4 caracteres")
});

export { userValidate };