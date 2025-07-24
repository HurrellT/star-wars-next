import { GetPeopleResponseSchema, Person } from "./peopleSchema";

const SWAPI_BASE_URL = process.env.NEXT_PUBLIC_SWAPI_BASE_URL;

const getPeople = async (): Promise<Person[]> => {
  const response = await fetch(`${SWAPI_BASE_URL}/people`);
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  const data = await response.json();
  console.log("🚀 ~ getPeople ~ data:", data)
  const parsed = GetPeopleResponseSchema.safeParse(data);
  if (!parsed.success) {
    throw new Error("Invalid data received from API");
  }
  return parsed.data;
};
export default getPeople;
