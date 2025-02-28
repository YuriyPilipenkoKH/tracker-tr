import { primarySchema } from "./primarySchema";
import z from 'zod'


export const profileSchema = primarySchema.pick({
  name: true,
  email: true,
  phone: true,
  city: true,
});

// Infer the type of loginSchema
export type profileSchemaType = z.infer<typeof profileSchema>;