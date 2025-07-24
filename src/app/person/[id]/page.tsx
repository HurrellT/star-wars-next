import ErrorFallback from "@/components/common/molecules/ErrorFallback";
import PersonDetails from "@/components/People/organisms/PersonDetails";
import { ErrorBoundary } from "react-error-boundary";

type PersonPageProps = {
  params: Promise<{
    id: string;
  }>;
};

const PersonPage = ({ params }: PersonPageProps) => {
  return (
    <ErrorBoundary FallbackComponent={ErrorFallback}>
      <PersonDetails params={params} />
    </ErrorBoundary>
  );
};

export default PersonPage;
