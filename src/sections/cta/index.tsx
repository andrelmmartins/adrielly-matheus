import { Box, Flex, Heading, Image } from "@chakra-ui/react";
import { Reveal } from "@/components/Reveal";

export default function Cta() {
  return (
    <Box
      as="section"
      id="top"
      minH="100vh"
      bg="beigeLight"
      display="flex"
      alignItems="center"
      overflow="hidden"
      position="relative"
    >
      <Flex
        direction={{ base: "column", lg: "row" }}
        align="center"
        w="full"
        minH="100vh"
      >
        <Flex
          flex={{ base: "none", lg: "1" }}
          direction="column"
          justify="center"
          px={{ base: 8, md: 12, lg: 16 }}
          py={{ base: 28, md: 32, lg: 0 }}
          w={{ base: "full", lg: "45%" }}
        >
          <Reveal>
            <Heading
              as="h1"
              fontFamily="heading"
              fontWeight="normal"
              lineHeight="1.05"
              letterSpacing="-0.02em"
            >
              <Box
                as="span"
                display="block"
                fontSize={{ base: "5xl", lg: "7xl", xl: "8xl" }}
                color="beigeDark"
              >
                Deixa
              </Box>
              <Box
                as="span"
                display="block"
                fontSize={{ base: "8xl", lg: "9xl", xl: "9xl" }}
                color="pinkDark"
                my={{ base: 0, md: 1 }}
              >
                Deus
              </Box>
              <Box
                as="span"
                display="block"
                fontSize={{ base: "5xl", lg: "7xl", xl: "8xl" }}
                color="beigeDark"
              >
                sonhar em ti!
              </Box>
            </Heading>
          </Reveal>
        </Flex>

        <Box
          position="absolute"
          bottom={0}
          right={0}
          w={{ base: "100%", lg: "65%" }}
          mixBlendMode="multiply"
          pointerEvents="none"
        >
          <Reveal delay={80}>
            <Image
              src="/jesus.png"
              alt="Ilustração de Jesus oferecendo uma rosa"
              objectFit="contain"
              objectPosition="bottom right"
              w="full"
              h="98vh"
            />
          </Reveal>
        </Box>
      </Flex>
    </Box>
  );
}
