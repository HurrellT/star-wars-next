import { z } from "zod";

export const PersonSchema = z.object({
  name: z.string(),
  height: z.string(),
  mass: z.string(),
  hair_color: z.string(),
  skin_color: z.string(),
  eye_color: z.string(),
  birth_year: z.string(),
  gender: z.string(),
  homeworld: z.url(),
  films: z.array(z.url()),
  species: z.array(z.url()),
  vehicles: z.array(z.url()),
  starships: z.array(z.url()),
  created: z.iso.datetime(),
  edited: z.iso.datetime(),
  url: z.url(),
});

export type Person = z.infer<typeof PersonSchema>;

export const GetPeopleResponseSchema = z.array(PersonSchema);
