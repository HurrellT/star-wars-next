"use client";

import { Button } from "@heroui/react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import SunIcon from "@/components/icons/SunIcon";
import MoonIcon from "@/components/icons/MoonIcon";

export function ThemeSwitcher() {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <Button
        isIconOnly
        variant="ghost"
        size="sm"
        className="animate-pulse"
      >
        <span className="w-4 h-4 bg-gray-300 rounded"></span>
      </Button>
    );
  }

  const isDark = theme === "dark";

  return (
    <Button
      isIconOnly
      variant="ghost"
      size="sm"
      onPress={() => setTheme(isDark ? "light" : "dark")}
      className="transition-transform hover:scale-110"
    >
      {isDark ? <SunIcon /> : <MoonIcon />}
    </Button>
  );
}
