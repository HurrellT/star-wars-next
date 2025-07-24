import { queryKeys } from "@/utils/queryKeys";
import { GetPeopleResponseSchema, Person, PersonSchema } from "./peopleSchema";
import { queryOptions } from "@tanstack/react-query";

const SWAPI_BASE_URL = process.env.NEXT_PUBLIC_SWAPI_BASE_URL;

export const getPeople = async (): Promise<Person[]> => {
  const response = await fetch(`${SWAPI_BASE_URL}/people`);
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  const data = await response.json();
  const parsed = GetPeopleResponseSchema.safeParse(data);
  if (!parsed.success) {
    throw new Error("Invalid data received from API");
  }
  return parsed.data;
};

export const getPersonById = async (id: string): Promise<Person> => {
  const response = await fetch(`${SWAPI_BASE_URL}/people/${id}`);
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  const data = await response.json();
  const parsed = PersonSchema.safeParse(data);
  if (!parsed.success) {
    throw new Error("Invalid data received from API");
  }
  return parsed.data;
};

// Query options
export const peopleQueryOptions = queryOptions({
  queryKey: [queryKeys.people],
  queryFn: getPeople,
});

export const personQueryOptions = (id: string) => queryOptions({
  queryKey: [queryKeys.people, id],
  queryFn: () => getPersonById(id),
});
