"use client";

import { GiftCard } from "@/components/GiftCard";
import { Reveal } from "@/components/Reveal";
import { fetchGifts } from "@/lib/client-api";
import type { Gift } from "@/types";
import {
  Box,
  Container,
  Heading,
  SimpleGrid,
  Spinner,
  Text,
} from "@chakra-ui/react";
import { useQuery } from "@tanstack/react-query";

export default function Gifts() {
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["gifts"],
    queryFn: fetchGifts,
  });

  return (
    <Box
      as="section"
      id="gifts"
      minH="100vh"
      py={{ base: 20, md: 28 }}
      bg="beigeLight"
    >
      <Container maxW="7xl">
        <Reveal>
          <Box textAlign="center" mb={{ base: 8, md: 14 }}>
            <Heading
              as="h2"
              fontFamily="heading"
              fontWeight="normal"
              fontSize={{ base: "2xl", md: "5xl" }}
              color="pinkDark"
              mb={{ base: 2, md: 4 }}
            >
              Lista de Presentes
            </Heading>
            <Text
              fontFamily="body"
              color="beigeDark"
              maxW="2xl"
              mx="auto"
              fontSize={{ base: "sm", md: "lg" }}
              lineHeight="tall"
              px={{ base: 2, md: 0 }}
            >
              Escolha um presente com carinho. Os itens reservados aparecem com
              o nome de quem irá presentear.
            </Text>
          </Box>
        </Reveal>

        {isLoading && (
          <Box display="flex" justifyContent="center" py={20}>
            <Spinner size="lg" color="pinkDark" />
          </Box>
        )}

        {isError && (
          <Box textAlign="center" py={12}>
            <Text color="red.500">
              {error instanceof Error
                ? error.message
                : "Não foi possível carregar os presentes."}
            </Text>
          </Box>
        )}

        {data && data.length === 0 && (
          <Box textAlign="center" py={12}>
            <Text color="beigeDark">Nenhum presente cadastrado ainda.</Text>
          </Box>
        )}

        {data && data.length > 0 && (
          <SimpleGrid columns={{ base: 2, lg: 4 }} gap={{ base: 3, md: 6 }}>
            {data.map((gift: Gift, index: number) => (
              <Reveal key={gift.id} delay={Math.min(index, 6) * 20}>
                <GiftCard gift={gift} />
              </Reveal>
            ))}
          </SimpleGrid>
        )}
      </Container>
    </Box>
  );
}
