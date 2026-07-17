"use client";

import {
  Box,
  Drawer,
  Flex,
  IconButton,
  Image,
  Link,
  Portal,
  Text,
  VStack,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";

const NAV_ITEMS = [
  { href: "#gifts", label: "Lista de Presentes" },
  { href: "#confirmation", label: "Confirmar presença" },
] as const;

function MenuIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M4 7h16M4 12h16M4 17h16"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}

function CloseIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M6 6l12 12M18 6L6 18"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 24);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const showGlass = isScrolled;

  const closeMenu = () => setIsMenuOpen(false);

  return (
    <Box
      as="header"
      position="fixed"
      top={0}
      left={0}
      right={0}
      zIndex={100}
      pointerEvents="none"
    >
      <Flex
        align="center"
        justify="space-between"
        px={{ base: 4, md: 8 }}
        pt={0}
        gap={4}
        pointerEvents="auto"
      >
        <Link
          href="#top"
          aria-label="Início"
          _hover={{ opacity: 0.9 }}
          transition="opacity 0.2s ease"
        >
          <Box
            bg="white"
            h={{ base: "100px", md: "140px" }}
            borderTopRadius={0}
            borderBottomRadius="full"
            display="flex"
            alignItems="end"
            justifyContent="center"
            py={{ base: "14px", md: "20px" }}
            px={{ base: "8px", md: "10px" }}
          >
            <Image
              src="/logo.png"
              alt="Logo do chá de cozinha"
              h={{ base: "40px", md: "80px" }}
              w="auto"
              objectFit="contain"
            />
          </Box>
        </Link>

        <Flex
          display={{ base: "none", md: "flex" }}
          align="center"
          gap={4}
          flexWrap="wrap"
          justify="center"
        >
          {NAV_ITEMS.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              fontFamily="body"
              fontSize="md"
              color="pinkDark"
              px={4}
              py={2.5}
              borderRadius="full"
              bg={showGlass ? "white/50" : "transparent"}
              backdropFilter={showGlass ? "blur(16px)" : "none"}
              border="1px solid"
              borderColor={showGlass ? "white/60" : "transparent"}
              boxShadow={
                showGlass ? "0 4px 24px rgba(242, 162, 169, 0.15)" : "none"
              }
              transition="background 0.35s cubic-bezier(0.22, 1, 0.36, 1), border-color 0.35s cubic-bezier(0.22, 1, 0.36, 1), box-shadow 0.35s cubic-bezier(0.22, 1, 0.36, 1), color 0.35s cubic-bezier(0.22, 1, 0.36, 1), backdrop-filter 0.35s cubic-bezier(0.22, 1, 0.36, 1)"
              _hover={{
                color: "beigeDark",
                bg: showGlass ? "white/70" : "transparent",
              }}
            >
              {item.label}
            </Link>
          ))}
        </Flex>

        <IconButton
          display={{ base: "inline-flex", md: "none" }}
          aria-label={isMenuOpen ? "Fechar menu" : "Abrir menu"}
          onClick={() => setIsMenuOpen(true)}
          bg="white/70"
          color="pinkDark"
          backdropFilter="blur(16px)"
          border="1px solid"
          borderColor="white/60"
          borderRadius="full"
          boxShadow="0 4px 24px rgba(242, 162, 169, 0.15)"
          size="md"
          mt={3}
          _hover={{ bg: "white/90", color: "beigeDark" }}
        >
          <MenuIcon />
        </IconButton>
      </Flex>

      <Drawer.Root
        open={isMenuOpen}
        onOpenChange={(details) => setIsMenuOpen(details.open)}
        placement="end"
        size="xs"
      >
        <Portal>
          <Drawer.Backdrop bg="blackAlpha.300" backdropFilter="blur(4px)" />
          <Drawer.Positioner>
            <Drawer.Content bg="beigeLight" borderLeftRadius="2xl">
              <Drawer.Header
                display="flex"
                alignItems="center"
                justifyContent="space-between"
                px={5}
                pt={5}
                pb={2}
              >
                <Text
                  fontFamily="heading"
                  color="beigeDark"
                  fontSize="xl"
                >
                  Menu
                </Text>
                <Drawer.CloseTrigger asChild>
                  <IconButton
                    aria-label="Fechar menu"
                    variant="ghost"
                    color="beigeDark"
                    borderRadius="full"
                    size="sm"
                  >
                    <CloseIcon />
                  </IconButton>
                </Drawer.CloseTrigger>
              </Drawer.Header>

              <Drawer.Body px={5} pb={8}>
                <VStack align="stretch" gap={3} mt={4}>
                  {NAV_ITEMS.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={closeMenu}
                      fontFamily="body"
                      fontSize="lg"
                      color="pinkDark"
                      px={4}
                      py={3}
                      borderRadius="xl"
                      bg="white"
                      border="1px solid"
                      borderColor="pinkLight"
                      _hover={{ color: "beigeDark", bg: "pinkLight" }}
                    >
                      {item.label}
                    </Link>
                  ))}
                </VStack>
              </Drawer.Body>
            </Drawer.Content>
          </Drawer.Positioner>
        </Portal>
      </Drawer.Root>
    </Box>
  );
}
