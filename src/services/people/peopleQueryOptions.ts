import getPeople from "@/services/people/people";
import { queryOptions } from "@tanstack/react-query";

const peopleQueryOptions = queryOptions({
  queryKey: ["people"],
  queryFn: getPeople,
});

export default peopleQueryOptions;
