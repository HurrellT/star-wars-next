import { Suspense } from "react";
import PersonDetailsSkeleton from "@/components/People/molecules/Skeleton/PersonDetailsSkeleton";

export default function PersonLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Suspense fallback={<PersonDetailsSkeleton />}>
      {children}
    </Suspense>
  );
}
