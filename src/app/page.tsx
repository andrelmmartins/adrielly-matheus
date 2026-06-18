import { Box, Container, Flex, Heading, Image, Text } from "@chakra-ui/react";
import { Countdown } from "@/components/Countdown";
import { SITE_CONFIG } from "@/config/site";

export default function HomePage() {
  const { bride, groom } = SITE_CONFIG.couple;

  return (
    <Box
      minH="100vh"
      pt={{ base: 24, md: 28 }}
      bgGradient="to-br"
      gradientFrom="blush"
      gradientVia="offwhite"
      gradientTo="sage"
      position="relative"
      overflow="hidden"
    >
      <Box
        position="absolute"
        top="-10%"
        right="-5%"
        w={{ base: "280px", md: "420px" }}
        opacity={0.35}
        pointerEvents="none"
      >
        <Image src="/flowers-overlay.svg" alt="" w="full" />
      </Box>

      <Box
        position="absolute"
        bottom="-8%"
        left="-8%"
        w={{ base: "240px", md: "360px" }}
        opacity={0.3}
        pointerEvents="none"
        transform="rotate(180deg)"
      >
        <Image src="/flowers-overlay.svg" alt="" w="full" />
      </Box>

      <Container maxW="6xl" py={{ base: 12, md: 20 }} position="relative">
        <Flex
          direction={{ base: "column", lg: "row" }}
          align="center"
          justify="space-between"
          gap={{ base: 12, lg: 16 }}
        >
          <Box flex="1" maxW="xl">
            <Text
              fontSize="sm"
              fontWeight="medium"
              color="steel"
              letterSpacing="widest"
              textTransform="uppercase"
              mb={4}
            >
              Chá de cozinha
            </Text>

            <Heading
              as="h1"
              fontFamily="heading"
              fontSize={{ base: "5xl", md: "7xl" }}
              fontWeight="semibold"
              color="slate"
              lineHeight="1.05"
              mb={6}
            >
              {bride}
              <Text as="span" color="salmon" mx={3}>
                &
              </Text>
              {groom}
            </Heading>

            <Text
              fontSize={{ base: "lg", md: "xl" }}
              color="steel"
              lineHeight="tall"
              mb={10}
              maxW="md"
            >
              Com muito carinho, convidamos você para celebrar conosco este
              momento especial. Confira a lista de presentes e confirme sua
              presença.
            </Text>

            <Countdown />
          </Box>

          <Box
            flex="1"
            position="relative"
            w="full"
            maxW="480px"
            alignSelf="stretch"
          >
            <Box
              position="relative"
              borderRadius="3xl"
              overflow="hidden"
              boxShadow="xl"
              transform="rotate(2deg)"
              border="6px solid"
              borderColor="offwhite"
            >
              <Image
                src="/couple-placeholder.svg"
                alt={`${bride} e ${groom}`}
                w="full"
                h="auto"
              />
            </Box>

            <Box
              position="absolute"
              top="-12%"
              right="-8%"
              w="55%"
              zIndex={2}
              pointerEvents="none"
            >
              <Image src="/flowers-overlay.svg" alt="" w="full" />
            </Box>

            <Box
              position="absolute"
              bottom="-10%"
              left="-10%"
              w="50%"
              zIndex={2}
              pointerEvents="none"
              transform="rotate(-15deg)"
            >
              <Image src="/flowers-overlay.svg" alt="" w="full" />
            </Box>
          </Box>
        </Flex>
      </Container>
    </Box>
  );
}
