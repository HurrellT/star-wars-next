"use client";
import CardSkeleton from "@/components/molecules/CardSkeleton";
import getPeople from "@/services/people";
import { Button } from "@heroui/button";
import { addToast } from "@heroui/react";
import { useQuery } from "@tanstack/react-query";
import { Button as CrossPlatformButton } from "@hurrellt/ui";
import { ThemeSwitcher } from "@/components/molecules/ThemeSwitcher";

export default function Home() {
  const { data, isLoading, error } = useQuery({
    queryKey: ["people"],
    queryFn: getPeople,
  });

  error &&
    addToast({
      title: error.name,
      description: error.message,
      color: "danger",
    });

  return (
    <div>
      <Button variant="solid" color="primary">Click me</Button>
      <ThemeSwitcher />
      <CrossPlatformButton text="Cross-platform Button" onClick={() => console.log("Cross-platform button pressed!")} />
      {isLoading ? <CardSkeleton /> : JSON.stringify(data, null, 2)}
    </div>
  );
}
