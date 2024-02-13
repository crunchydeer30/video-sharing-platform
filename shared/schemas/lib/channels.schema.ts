import { z } from "zod";
import zodToJsonSchema from "zod-to-json-schema";
import { Channel } from "@prisma/client";
import { Optional } from "./utils";

/*
  CHANNEL SCHEMA
*/

export const channelSchema = z.object({
  id: z.string().uuid(),
  title: z.string().pipe(z.string().default("Channel title")),
  description: z.string().pipe(z.string().default("Channel description")),
  accountId: z.string().uuid(),
  handle: z.string().pipe(z.string().default("@user-hJscxz12")),
  image: z.string().pipe(z.string().default("/assets/default_profile.png")),
  createdAt: z.date(),
  updatedAt: z.date(),
}) satisfies z.Schema<Channel>;

/*
  CREATE CHANNEL SCHEMA
*/

export const channelCreateBody = z.object({
  title: z
    .string({ required_error: "Channel title is required" })
    .min(3, "Channel title must be at least 3 characters long")
    .max(25, "Channel title must be at most 25 characters long")
    .refine((v) => v.trim() === v, {
      message: "Channel title must be trimmed",
    }),
  description: z
    .string()
    .min(3, "Channel description must be at least 3 characters long")
    .max(100, "Channel description must be at most 100 characters long")
    .refine((v) => v?.trim() === v, {
      message: "Channel description must be trimmed",
    })
    .optional(),
  handle: z
    .string()
    .regex(/^@/, {
      message: "Handle must start with @ symbol",
    })
    .regex(/^(?!.*@.*@)/, {
      message: "Handle must not contain more than one @ symbol",
    })
    .regex(/^[a-zA-Z0-9_@-]+$/, {
      message:
        "Handle must only contain letters, numbers, underscores and hyphens",
    })
    .min(3, "Handle must be at least 3 characters long")
    .max(25, "Handle must be at most 25 characters long")
    .optional(),
}) satisfies z.Schema<
  Optional<
    Omit<Channel, "id" | "createdAt" | "updatedAt" | "image" | "accountId">,
    "description" | "handle"
  >
>;

export type ChannelCreateBody = z.infer<typeof channelCreateBody>;

export const ChannelCreateRequest = z.object({
  body: channelCreateBody,
});

/*
  UPDATE CHANNEL SCHEMA
*/

export const channelUpdateBody = channelCreateBody.extend({
  title: z
    .string({ required_error: "Channel title is required" })
    .min(3, "Channel title must be at least 3 characters long")
    .max(25, "Channel title must be at most 25 characters long")
    .refine((v) => v.trim() === v, {
      message: "Channel title must be trimmed",
    })
    .optional(),
});

export type ChannelUpdateBody = z.infer<typeof channelUpdateBody>;

export const ChannelUpdateRequest = z.object({
  body: channelUpdateBody,
});

/*
  JSON SCHEMAS
*/

export const channelJsonSchemas = {
  Channel: zodToJsonSchema(channelSchema),
  ChannelCreateBody: zodToJsonSchema(channelCreateBody),
  ChannelUpdateBody: zodToJsonSchema(channelUpdateBody),
};
