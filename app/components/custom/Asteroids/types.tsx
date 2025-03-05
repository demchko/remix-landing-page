import { z } from "zod";

export const NasaApodSchema = z.object({
  title: z.string(),
  url: z.string().url(),
});

const EstimatedDiameterSchema = z.object({
  meters: z.object({
    estimated_diameter_min: z.number(),
  }),
});

export const NearEarthObjectSchema = z.object({
  id: z.string(),
  name: z.string(),
  estimated_diameter: EstimatedDiameterSchema,
  is_potentially_hazardous_asteroid: z.boolean(),
});

export type NearEarthObject = z.infer<typeof NearEarthObjectSchema>;

export const AsteroidsSchema = z.object({
  element_count: z.number(),
  near_earth_objects: z.record(z.string(), z.array(NearEarthObjectSchema)),
});
