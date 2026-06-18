"use client";

import { Box, Container, Flex, Link } from "@chakra-ui/react";
import NextLink from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const NAV_ITEMS = [
  { href: "/", label: "Início" },
  { href: "/presentes", label: "Presentes" },
  { href: "/confirmar", label: "Confirmação" },
] as const;

export function Header() {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 24);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <Box
      as="header"
      position="fixed"
      top={0}
      left={0}
      right={0}
      zIndex={100}
      transition="background 0.3s ease, box-shadow 0.3s ease, backdrop-filter 0.3s ease"
      bg={isScrolled ? "offwhite/90" : "transparent"}
      backdropFilter={isScrolled ? "blur(12px)" : "none"}
      boxShadow={isScrolled ? "sm" : "none"}
    >
      <Container maxW="6xl" py={4}>
        <Flex align="center" justify="space-between" gap={6}>
          <Link
            asChild
            fontFamily="heading"
            fontSize="2xl"
            fontWeight="semibold"
            color="slate"
            letterSpacing="wider"
          >
            <NextLink href="/">A & M</NextLink>
          </Link>

          <Flex as="nav" gap={{ base: 4, md: 8 }} align="center">
            {NAV_ITEMS.map((item) => {
              const isActive =
                item.href === "/"
                  ? pathname === "/"
                  : pathname.startsWith(item.href);

              return (
                <Link
                  key={item.href}
                  asChild
                  fontSize="sm"
                  fontWeight={isActive ? "semibold" : "medium"}
                  color={isActive ? "slate" : "steel"}
                  letterSpacing="wide"
                  textTransform="uppercase"
                  borderBottom={isActive ? "2px solid" : "2px solid transparent"}
                  borderColor={isActive ? "salmon" : "transparent"}
                  pb={1}
                  transition="color 0.2s ease"
                  _hover={{ color: "slate" }}
                >
                  <NextLink href={item.href}>{item.label}</NextLink>
                </Link>
              );
            })}
          </Flex>
        </Flex>
      </Container>
    </Box>
  );
}
