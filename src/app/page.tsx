"use client";
import ErrorFallback from "@/components/molecules/ErrorFallback";
import PeopleListSkeleton from "@/components/molecules/Skeleton/PeopleListSkeleton";
import AppNavbar from "@/components/organisms/AppNavbar";
import Footer from "@/components/organisms/Footer";
import PeopleList from "@/components/organisms/PeopleList";
import { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <AppNavbar />
      <main className="container mx-auto px-4 py-8 flex-1">
        <ErrorBoundary FallbackComponent={ErrorFallback}>
          <Suspense fallback={<PeopleListSkeleton />}>
            <PeopleList />
          </Suspense>
        </ErrorBoundary>
      </main>
      <Footer />
    </div>
  );
}
