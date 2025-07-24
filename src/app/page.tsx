import ErrorFallback from "@/components/common/molecules/ErrorFallback";
import PeopleList from "@/components/People/organisms/PeopleList";
import { ErrorBoundary } from "react-error-boundary";
import { getPeople } from "@/services/people/people";
import { Metadata } from "next";

// Revalidate this page every 24 hours (86400 seconds)
export const revalidate = 86400;

export const metadata: Metadata = {
  title: 'Star Wars Characters - Complete Directory',
  description: 'Explore all Star Wars characters from the galaxy far, far away. Browse detailed information about your favorite heroes, villains, and everyone in between.',
  openGraph: {
    title: 'Star Wars Characters - Complete Directory',
    description: 'Explore all Star Wars characters from the galaxy far, far away.',
  },
};

export default async function Home() {
  const people = await getPeople();

  return (
    <ErrorBoundary FallbackComponent={ErrorFallback}>
      <PeopleList initialData={people} />
    </ErrorBoundary>
  );
}
