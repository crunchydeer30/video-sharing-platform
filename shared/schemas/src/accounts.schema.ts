import { z } from "zod";
import { Account } from "@prisma/client";
import zodToJsonSchema from "zod-to-json-schema";

export const accountCreateBody = z.object({
  email: z.string({ required_error: "Email is required" }).email({
    message: "Email must be a valid email address",
  }),
  password: z
    .string({ required_error: "Password is required" })
    .min(8, "Password must be at least 8 characters long")
    .regex(/[A-Z]/, {
      message: "Password must contain at least one capital letter",
    })
    .regex(/[!@#$%^&*(),.?":{}|<>_]/, {
      message: "Password must contain at least one special character",
    }),
}) satisfies z.Schema<Omit<Account, "id" | "createdAt" | "updatedAt">>;

export type AccountCreateBody = z.infer<typeof accountCreateBody>;

export const accountCreateRequest = z.object({
  body: accountCreateBody,
});

export const accountJsonSchemas = {
  AccountCreateBody: zodToJsonSchema(accountCreateBody),
};
