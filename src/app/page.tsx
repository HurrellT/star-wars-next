'use client';
import { Button } from "@hurrellt/ui";

export default function Home() {
  return (
    <>
      <h1 className="text-3xl font-bold underline text-red-500">
        Hello world!
      </h1>
      <Button text="Click me!" onClick={() => alert("Button clicked!")} />
    </>
  );
}
