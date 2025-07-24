import ErrorFallback from "@/components/common/molecules/ErrorFallback";
import PeopleListSkeleton from "@/components/People/molecules/Skeleton/PeopleListSkeleton";
import PeopleList from "@/components/People/organisms/PeopleList";
import { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";

export default function Home() {
  return (
    <ErrorBoundary FallbackComponent={ErrorFallback}>
      <Suspense fallback={<PeopleListSkeleton />}>
        <PeopleList />
      </Suspense>
    </ErrorBoundary>
  );
}
