"use client";
import ErrorFallback from "@/components/molecules/ErrorFallback";
import PeopleListSkeleton from "@/components/molecules/Skeleton/PeopleListSkeleton";
import PeopleList from "@/components/organisms/PeopleList";
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
