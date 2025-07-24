"use client";

import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  Link,
  Button,
} from "@heroui/react";
import StarWarsLogo from "@/components/icons/StarWarsLogo";
import { ThemeSwitcher } from "@/components/molecules/ThemeSwitcher";

const AppNavbar = () => {
  return (
    <Navbar className="bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <NavbarBrand>
        <StarWarsLogo />
      </NavbarBrand>
      
      <NavbarContent className="hidden sm:flex gap-4" justify="center">
        {/* <NavbarItem isActive>
          <Link 
            aria-current="page" 
            href="/"
            className="font-medium"
          >
            Characters
          </Link>
        </NavbarItem> */}
      </NavbarContent>
      
      <NavbarContent justify="end">
        <NavbarItem>
          <ThemeSwitcher />
        </NavbarItem>
        <NavbarItem className="hidden lg:flex">
          <Button 
            as={Link} 
            color="primary" 
            href="https://swapi.info/"
            target="_blank"
            rel="noopener noreferrer"
            variant="flat"
            size="sm"
          >
            Join the Rebellion
          </Button>
        </NavbarItem>
      </NavbarContent>
    </Navbar>
  );
};

export default AppNavbar;
