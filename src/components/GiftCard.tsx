"use client";

import {
  Badge,
  Box,
  Button,
  Card,
  Dialog,
  Field,
  Image,
  Input,
  Portal,
  Text,
} from "@chakra-ui/react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { reserveGift } from "@/lib/client-api";
import type { Gift } from "@/types";

interface GiftCardProps {
  gift: Gift;
}

export function GiftCard({ gift }: GiftCardProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [guestName, setGuestName] = useState("");
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (name: string) => reserveGift(gift.id, { name }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["gifts"] });
      setIsOpen(false);
      setGuestName("");
    },
  });

  const handleOpenChange = (details: { open: boolean }) => {
    setIsOpen(details.open);

    if (!details.open) {
      setGuestName("");
      mutation.reset();
    }
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!guestName.trim()) {
      return;
    }

    mutation.mutate(guestName.trim());
  };

  return (
    <>
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

          <Text fontSize="sm" color="steel" mb={4}>
            {gift.reservedBy
              ? `Reservado por ${gift.reservedBy}`
              : "Disponível para reserva"}
          </Text>

          {!gift.isReserved && (
            <Button
              w="full"
              bg="slate"
              color="offwhite"
              borderRadius="full"
              _hover={{ bg: "steel" }}
              onClick={() => setIsOpen(true)}
            >
              Reservar
            </Button>
          )}
        </Card.Body>
      </Card.Root>

      <Dialog.Root open={isOpen} onOpenChange={handleOpenChange}>
        <Portal>
          <Dialog.Backdrop bg="blackAlpha.400" />
          <Dialog.Positioner>
            <Dialog.Content
              borderRadius="2xl"
              bg="offwhite"
              mx={4}
              maxW="md"
            >
              <Dialog.Header>
                <Dialog.Title fontFamily="heading" color="slate">
                  Reservar presente
                </Dialog.Title>
              </Dialog.Header>

              <form onSubmit={handleSubmit}>
                <Dialog.Body>
                  <Text color="steel" mb={4}>
                    Você está reservando{" "}
                    <Text as="span" fontWeight="semibold" color="slate">
                      {gift.name}
                    </Text>
                    . Informe seu nome para que os noivos saibam quem irá
                    presentear.
                  </Text>

                  <Field.Root required>
                    <Field.Label color="slate">Seu nome</Field.Label>
                    <Input
                      value={guestName}
                      onChange={(event) => setGuestName(event.target.value)}
                      placeholder="Como você gostaria de aparecer"
                      bg="white"
                      borderColor="peach"
                      autoFocus
                      _focusVisible={{ borderColor: "slate", boxShadow: "none" }}
                    />
                  </Field.Root>

                  {mutation.isError && (
                    <Text color="red.500" fontSize="sm" mt={3}>
                      {mutation.error.message}
                    </Text>
                  )}
                </Dialog.Body>

                <Dialog.Footer gap={3}>
                  <Dialog.ActionTrigger asChild>
                    <Button variant="outline" borderColor="peach" color="slate">
                      Cancelar
                    </Button>
                  </Dialog.ActionTrigger>
                  <Button
                    type="submit"
                    bg="slate"
                    color="offwhite"
                    borderRadius="full"
                    loading={mutation.isPending}
                    _hover={{ bg: "steel" }}
                  >
                    Confirmar reserva
                  </Button>
                </Dialog.Footer>
              </form>

              <Dialog.CloseTrigger />
            </Dialog.Content>
          </Dialog.Positioner>
        </Portal>
      </Dialog.Root>
    </>
  );
}
