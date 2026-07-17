import { Box, Center, Heading, Stack } from "@chakra-ui/react";
import { Reveal } from "@/components/Reveal";

export default function Info() {
  return (
    <Box
      as="section"
      position="relative"
      py={{ base: 16, md: 24 }}
      bg="pinkDark"
      backgroundImage="url(/flower-pattern.png)"
      backgroundRepeat="repeat"
      backgroundSize="320px"
    >
      <Reveal>
        <Center position="relative" zIndex={1} px={{ base: 6, md: 8 }}>
          <Stack textAlign="center" gap={{ base: 2, md: 3 }}>
            <Heading
              as="h2"
              fontFamily="body"
              fontWeight="normal"
              fontSize={{ base: "xl", md: "2xl" }}
              color="white"
              letterSpacing="0.04em"
            >
              Chá de Cozinha
            </Heading>
            <Heading
              as="p"
              fontFamily="heading"
              fontWeight="normal"
              fontSize={{ base: "4xl", md: "6xl" }}
              color="white"
              lineHeight="1.1"
            >
              Adrielly Medeiros
            </Heading>
          </Stack>
        </Center>
      </Reveal>
    </Box>
  );
}
