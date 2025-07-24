"use client";

import { ThemeSwitcher } from "@/components/common/molecules/ThemeSwitcher";
import StarWarsLogo from "@/components/icons/StarWarsLogo";
import { Navbar, NavbarBrand, NavbarContent, NavbarItem } from "@heroui/react";
import { Button as CrossPlatformButton } from "@hurrellt/ui";

const AppNavbar = () => {
  return (
    <Navbar className="bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <NavbarBrand>
        <StarWarsLogo />
      </NavbarBrand>

      <NavbarContent
        className="hidden sm:flex gap-4"
        justify="center"
      ></NavbarContent>

      <NavbarContent justify="end">
        <NavbarItem>
          <ThemeSwitcher />
        </NavbarItem>
        <NavbarItem className="hidden lg:flex">
          <CrossPlatformButton
            text={"Join the Rebellion"}
            containerClassName="bg-primary/20 hover:bg-primary/30 active:bg-primary/40 dark:bg-primary/30 dark:hover:bg-primary/40 dark:active:bg-primary/50 px-3 py-1.5 rounded-md transition-colors"
            textClassName="!text-primary dark:text-primary text-xs font-medium"
            // I use onPress with window.open instead because Pressable has no href, rel or target props
            onPress={() => {
              window.open(
                "https://swapi.info/",
                "_blank",
                "noopener,noreferrer"
              );
            }}
          />
        </NavbarItem>
      </NavbarContent>
    </Navbar>
  );
};

export default AppNavbar;
