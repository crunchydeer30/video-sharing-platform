import { z } from "zod";
import zodToJsonSchema from "zod-to-json-schema";

/*
  LOGIN SCHEMA
*/

export const loginBody = z.object({
  email: z
    .string({ required_error: "Email is required" })
    .email({ message: "Invalid email" }),
  password: z.string({ required_error: "Password is required" }),
});

export type LoginBody = z.infer<typeof loginBody>;

export const LoginRequest = z.object({
  body: loginBody,
});

/*
  JSON SCHEMAS
*/

export const authJsonSchemas = {
  LoginBody: zodToJsonSchema(loginBody),
};
