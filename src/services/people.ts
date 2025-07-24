const SWAPI_BASE_URL = process.env.NEXT_PUBLIC_SWAPI_BASE_URL;

const getPeople = async (
  // page: number
) => {
  const response = await fetch(`${SWAPI_BASE_URL}/people`); //?page=${page}
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  return response.json();
};
export default getPeople;
