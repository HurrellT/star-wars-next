"use client";
import CardSkeleton from "@/components/molecules/CardSkeleton";
import { ThemeSwitcher } from "@/components/molecules/ThemeSwitcher";
import peopleQueryOptions from "@/services/people/peopleQueryOptions";
import { Button } from "@heroui/button";
import { Button as CrossPlatformButton } from "@hurrellt/ui";
import { useSuspenseQuery } from "@tanstack/react-query";
import { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";
import ErrorFallback from "@/components/molecules/ErrorFallback";

function PeopleList() {
  const { data, refetch } = useSuspenseQuery(peopleQueryOptions);

  return (
    <div>
      <Button onPress={() => refetch()}>Click me</Button>
      <ThemeSwitcher />
      <CrossPlatformButton
        text="Cross-platform Button"
        onClick={() => console.log("Cross-platform button pressed!")}
      />
      {JSON.stringify(data, null, 2)}
    </div>
  );
}

export default function Home() {
  return (
    <ErrorBoundary FallbackComponent={ErrorFallback}>
      <Suspense fallback={<CardSkeleton />}>
        <PeopleList />
      </Suspense>
    </ErrorBoundary>
  );
}
