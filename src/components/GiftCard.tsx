import { Badge, Box, Card, Image, Text } from "@chakra-ui/react";
import type { Gift } from "@/types";

interface GiftCardProps {
  gift: Gift;
}

export function GiftCard({ gift }: GiftCardProps) {
  return (
    <Card.Root
      overflow="hidden"
      borderRadius="2xl"
      bg="offwhite"
      border="1px solid"
      borderColor="blush"
      boxShadow="sm"
      transition="transform 0.2s ease, box-shadow 0.2s ease"
      _hover={{ transform: "translateY(-4px)", boxShadow: "md" }}
    >
      <Box position="relative" h="220px" bg="blush">
        {gift.photoUrl ? (
          <Image
            src={gift.photoUrl}
            alt={gift.name}
            objectFit="cover"
            w="full"
            h="full"
          />
        ) : (
          <Box
            w="full"
            h="full"
            display="flex"
            alignItems="center"
            justifyContent="center"
            bgGradient="to-br"
            gradientFrom="peach"
            gradientTo="sage"
          >
            <Text fontFamily="heading" fontSize="4xl" color="slate/40">
              🎁
            </Text>
          </Box>
        )}

        {gift.isReserved && (
          <Badge
            position="absolute"
            top={3}
            right={3}
            bg="slate"
            color="offwhite"
            borderRadius="full"
            px={3}
            py={1}
          >
            Reservado
          </Badge>
        )}
      </Box>

      <Card.Body p={5}>
        <Text
          fontFamily="heading"
          fontSize="xl"
          fontWeight="semibold"
          color="slate"
          mb={2}
        >
          {gift.name}
        </Text>

        <Text fontSize="sm" color="steel">
          {gift.reservedBy
            ? `Reservado por ${gift.reservedBy}`
            : "Disponível para reserva"}
        </Text>
      </Card.Body>
    </Card.Root>
  );
}
