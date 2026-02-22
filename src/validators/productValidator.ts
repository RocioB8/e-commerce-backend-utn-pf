import { z } from "zod";

const productValidate = z.object({
  name: z.string().min(4, "⚠ El nombre debe tener al menos 4 caracteres"),
  price: z.number().positive("⚠ El precio debe ser un número positivo"),
  stock: z.number().optional(),
  description: z.string().min(10, "⚠ La descripción es muy corta"),
  category: z.string().min(1, "⚠ La categoría es obligatoria"),

  variants: z.array(
    z.object({
      number: z.number().min(36, "⚠ El talle mínimo es 36")
        .max(42, "⚠ El talle máximo es 42"),
      color: z.string(),
      quantity: z.number().int().nonnegative()
    })
  ).min(1, "⚠ Debe haber al menos una variante (talle/color)")
});

const productIdSchema = z.object({
  id: z.string().regex(/^[0-9a-fA-F]{24}$/, "❌ ID de producto inválido")
});

const productPartialValidate = productValidate.partial();


export { productValidate, productPartialValidate, productIdSchema };