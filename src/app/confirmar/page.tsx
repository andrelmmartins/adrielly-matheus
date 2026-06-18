import { Box, Container, Flex, Heading, Text } from "@chakra-ui/react";
import { RsvpForm } from "@/components/RsvpForm";

export default function ConfirmPage() {
  return (
    <Box
      minH="100vh"
      pt={{ base: 24, md: 28 }}
      pb={16}
      bgGradient="to-br"
      gradientFrom="blush"
      gradientTo="sage"
      position="relative"
      overflow="hidden"
    >
      <Container maxW="6xl" py={{ base: 8, md: 12 }}>
        <Flex
          direction={{ base: "column", lg: "row" }}
          align={{ base: "stretch", lg: "center" }}
          justify="space-between"
          gap={{ base: 10, lg: 16 }}
        >
          <Box flex="1" maxW="lg">
            <Text
              fontSize="sm"
              fontWeight="medium"
              color="steel"
              letterSpacing="widest"
              textTransform="uppercase"
              mb={3}
            >
              Sua presença
            </Text>
            <Heading
              as="h1"
              fontFamily="heading"
              fontSize={{ base: "4xl", md: "5xl" }}
              color="slate"
              mb={4}
            >
              Confirmação de presença
            </Heading>
            <Text color="steel" fontSize="lg" lineHeight="tall">
              Preencha o formulário abaixo para nos avisar se você poderá
              comparecer. Informe também os nomes dos acompanhantes e qualquer
              observação importante.
            </Text>
          </Box>

          <Flex flex="1" justify={{ base: "center", lg: "flex-end" }}>
            <RsvpForm />
          </Flex>
        </Flex>
      </Container>
    </Box>
  );
}
