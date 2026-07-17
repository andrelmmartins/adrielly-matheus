import { RsvpForm } from "@/components/RsvpForm";
import { Reveal } from "@/components/Reveal";
import { Box, Container, Heading } from "@chakra-ui/react";

export default function Confirmation() {
  return (
    <Box
      as="section"
      id="confirmation"
      py={{ base: 20, md: 28 }}
      bg="pinkLight"
    >
      <Container maxW="3xl">
        <Reveal>
          <Heading
            as="h2"
            fontFamily="heading"
            fontWeight="normal"
            fontSize={{ base: "2xl", md: "5xl" }}
            color="beigeDark"
            textAlign="center"
            mb={{ base: 8, md: 14 }}
          >
            Confirme sua Presença
          </Heading>
        </Reveal>

        <Reveal delay={60}>
          <RsvpForm />
        </Reveal>
      </Container>
    </Box>
  );
}
