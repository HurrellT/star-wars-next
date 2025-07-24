"use client";
import { Button } from "@heroui/react";
import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";

const BackButton = () => {
  const router = useRouter();

  return (
    <Button
      startContent={<ArrowLeft size={16} />}
      variant="light"
      onPress={() => router.back()}
      className="mb-6"
    >
      Back to People
    </Button>
  );
};

export default BackButton;
