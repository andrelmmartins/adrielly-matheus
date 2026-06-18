"use client";

import { ChakraProvider } from "@chakra-ui/react";
import type { ReactNode } from "react";
import { system } from "@/theme";
import { QueryProvider } from "./QueryProvider";

interface AppProvidersProps {
  children: ReactNode;
}

export function AppProviders({ children }: AppProvidersProps) {
  return (
    <ChakraProvider value={system}>
      <QueryProvider>{children}</QueryProvider>
    </ChakraProvider>
  );
}
