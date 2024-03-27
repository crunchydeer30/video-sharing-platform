import { z } from "zod";
import { Video, VideoDetails, ProcessingDetails } from "@prisma/client";
import { channelSchema } from "./channels.schema";
import zodToJsonSchema from "zod-to-json-schema";

/*
  VIDEO SCHEMA
*/

export const videoDetailsSchema = z.object({
  duration: z.number().pipe(z.number().default(300)),
}) satisfies z.Schema<Omit<VideoDetails, "videoId">>;

export const processingDetailsSchema = z.object({
  status_240p: z.enum([
    "COMPLETED",
    "NOT_AVAILABLE",
    "NOT_STARTED",
    "IN_PROGRESS",
    "FAILED",
  ]),
  status_360p: z.enum([
    "COMPLETED",
    "NOT_AVAILABLE",
    "NOT_STARTED",
    "IN_PROGRESS",
    "FAILED",
  ]),
  status_480p: z.enum([
    "COMPLETED",
    "NOT_AVAILABLE",
    "NOT_STARTED",
    "IN_PROGRESS",
    "FAILED",
  ]),
  status_720p: z.enum([
    "COMPLETED",
    "NOT_AVAILABLE",
    "NOT_STARTED",
    "IN_PROGRESS",
    "FAILED",
  ]),
  status_1080p: z.enum([
    "COMPLETED",
    "NOT_AVAILABLE",
    "NOT_STARTED",
    "IN_PROGRESS",
    "FAILED",
  ]),
}) satisfies z.Schema<Omit<ProcessingDetails, "videoId">>;

export const videoSchema = z.object({
  id: z.string().uuid(),
  title: z.string().pipe(z.string().default("Video title")),
  url: z.string().pipe(z.string().default("/video_url.mp4")),
  description: z.string().pipe(z.string().default("Video description")),
  channelId: z.string().uuid(),
  handle: z.string().pipe(z.string().default("@user-hJscxz12")),
  preview: z.string().pipe(z.string().default("/preview_url.mp4")),
  thumbnail: z.string().pipe(z.string().default("/thumbnail_url.png")),
  visibility: z.enum(["DRAFT", "PUBLIC", "PRIVATE"]),
  createdAt: z.date(),
  updatedAt: z.date(),
  channel: channelSchema,
  details: videoDetailsSchema,
  processing: processingDetailsSchema,
}) satisfies z.Schema<Video>;

export type VideoSchema = z.infer<typeof videoSchema>;

export const videosArraySchema = z.array(videoSchema);

/*
  VIDEO LIST SCHEMA
*/

export const videoListQuery = z.object({
  include: z.array(z.enum(["channel", "comments", "videoDetails"])).optional(),
  title: z
    .object({
      contains: z.string().optional(),
      equals: z.string().optional(),
      startsWith: z.string().optional(),
      endsWith: z.string().optional(),
    })
    .optional(),
  channelId: z
    .object({
      equals: z.string().uuid().optional(),
    })
    .optional(),
});

export type videoListQuerySchema = z.infer<typeof videoListQuery>;

/*
  JSON SCHEMAS
*/

export const videosJsonSchemas = {
  Video: zodToJsonSchema(videoSchema),
  VideosArray: zodToJsonSchema(videosArraySchema),
  VideoListQuery: zodToJsonSchema(videoListQuery),
};
