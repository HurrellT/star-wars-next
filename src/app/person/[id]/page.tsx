import ErrorFallback from "@/components/common/molecules/ErrorFallback";
import PersonDetails from "@/components/People/organisms/PersonDetails";
import { ErrorBoundary } from "react-error-boundary";
import { getPeople, getPersonById } from "@/services/people/people";
import { extractIdFromUrl } from "@/utils/personUtils";
import { Metadata } from "next";

// Revalidate this page every 24 hours (86400 seconds)
export const revalidate = 86400;

type PersonPageProps = {
  params: Promise<{
    id: string;
  }>;
};

export async function generateMetadata({ params }: PersonPageProps): Promise<Metadata> {
  const { id } = await params;
  
  try {
    const person = await getPersonById(id);
    return {
      title: `${person.name} - Star Wars Characters`,
      description: `Learn about ${person.name}, a Star Wars character born in ${person.birth_year}. Height: ${person.height}, Gender: ${person.gender}.`,
      openGraph: {
        title: `${person.name} - Star Wars Characters`,
        description: `Learn about ${person.name}, a Star Wars character born in ${person.birth_year}.`,
      },
    };
  } catch {
    return {
      title: 'Star Wars Character - Not Found',
      description: 'The requested Star Wars character could not be found.',
    };
  }
}

export async function generateStaticParams() {
  try {
    const people = await getPeople();
    return people.map((person) => ({
      id: extractIdFromUrl(person.url),
    }));
  } catch (error) {
    console.error('Error generating static params:', error);
    return [];
  }
}

const PersonPage = async ({ params }: PersonPageProps) => {
  const { id } = await params;
  const person = await getPersonById(id);

  return (
    <ErrorBoundary FallbackComponent={ErrorFallback}>
      <PersonDetails personId={id} initialData={person} />
    </ErrorBoundary>
  );
};

export default PersonPage;
