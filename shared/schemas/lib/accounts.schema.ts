import { z } from "zod";
import { Account } from "@prisma/client";
import zodToJsonSchema from "zod-to-json-schema";

export const nonSensitiveAccount = z.object({
  id: z.string().uuid(),
  email: z.string().email(),
  createdAt: z.date(),
  updatedAt: z.date(),
}) satisfies z.Schema<Omit<Account, "password">>;

export type NonSensitiveAccount = z.infer<typeof nonSensitiveAccount>;

export const accountCreateBody = z.object({
  email: z
    .string({ required_error: "Email is required" })
    .email({
      message: "Email must be a valid email address",
    })
    .describe("Email address"),
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

export const AccountCreateRequest = z.object({
  body: accountCreateBody,
});

export const accountJsonSchemas = {
  AccountNonSensitive: zodToJsonSchema(nonSensitiveAccount),
  AccountCreateBody: zodToJsonSchema(accountCreateBody),
};
