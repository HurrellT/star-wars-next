"use client";
import ErrorFallback from "@/components/molecules/ErrorFallback";
import PeopleListSkeleton from "@/components/molecules/Skeleton/PeopleListSkeleton";
import AppNavbar from "@/components/organisms/AppNavbar";
import PeopleList from "@/components/organisms/PeopleList";
import { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";

export default function Home() {
  return (
    <div className="min-h-screen">
      <AppNavbar />
      <main className="container mx-auto px-4 py-8">
        <ErrorBoundary FallbackComponent={ErrorFallback}>
          <Suspense fallback={<PeopleListSkeleton />}>
            <PeopleList />
          </Suspense>
        </ErrorBoundary>
      </main>
    </div>
  );
}
