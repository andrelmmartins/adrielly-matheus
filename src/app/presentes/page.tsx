"use client";

import {
  Box,
  Container,
  Heading,
  SimpleGrid,
  Spinner,
  Text,
} from "@chakra-ui/react";
import { useQuery } from "@tanstack/react-query";
import { GiftCard } from "@/components/GiftCard";
import { fetchGifts } from "@/lib/client-api";

export default function GiftsPage() {
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["gifts"],
    queryFn: fetchGifts,
  });

  return (
    <Box
      minH="100vh"
      pt={{ base: 24, md: 28 }}
      pb={16}
      bgGradient="to-b"
      gradientFrom="offwhite"
      gradientTo="blush"
    >
      <Container maxW="6xl" py={{ base: 8, md: 12 }}>
        <Box textAlign="center" mb={{ base: 10, md: 14 }}>
          <Text
            fontSize="sm"
            fontWeight="medium"
            color="steel"
            letterSpacing="widest"
            textTransform="uppercase"
            mb={3}
          >
            Chá de cozinha
          </Text>
          <Heading
            as="h1"
            fontFamily="heading"
            fontSize={{ base: "4xl", md: "5xl" }}
            color="slate"
            mb={4}
          >
            Lista de presentes
          </Heading>
          <Text color="steel" maxW="2xl" mx="auto">
            Escolha um presente com carinho. Os itens reservados aparecem com o
            nome de quem irá presentear.
          </Text>
        </Box>

        {isLoading && (
          <Box display="flex" justifyContent="center" py={20}>
            <Spinner size="lg" color="slate" />
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
            <Text color="steel">Nenhum presente cadastrado ainda.</Text>
          </Box>
        )}

        {data && data.length > 0 && (
          <SimpleGrid columns={{ base: 1, sm: 2, lg: 3 }} gap={6}>
            {data.map((gift) => (
              <GiftCard key={gift.id} gift={gift} />
            ))}
          </SimpleGrid>
        )}
      </Container>
    </Box>
  );
}
