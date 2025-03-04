import { z } from "zod";
export const AddDomainSchema = z.object({
  domain: z.string().min(3, "Domain is required"),
  icon: z.optional(z.union([z.string(), z.instanceof(File)])),
});

export type AddDomainSchemaType = z.infer<typeof AddDomainSchema>;