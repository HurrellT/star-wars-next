"use client";

import { Button } from "@heroui/button";
import { addToast } from "@heroui/react";
import { FallbackProps } from "react-error-boundary";

const ErrorFallback = ({ error, resetErrorBoundary }: FallbackProps) => {
  addToast({
    title: "An error occurred",
    description: error.message,
    color: "danger",
  });

  return (
    <div role="alert">
      <p>Something went wrong:</p>
      <pre style={{ color: "red" }}>{error.message}</pre>
      <Button onPress={resetErrorBoundary}>Try again</Button>
    </div>
  );
};

export default ErrorFallback;
