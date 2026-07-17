"use client";

import {
  Badge,
  Box,
  Button,
  Center,
  Dialog,
  Field,
  Image,
  Input,
  Portal,
  Text,
} from "@chakra-ui/react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState, useSyncExternalStore } from "react";
import { reserveGift, unreserveGift } from "@/lib/client-api";
import {
  addReservedGift,
  hasReservedGift,
  removeReservedGift,
  subscribeReservedGifts,
} from "@/lib/reserved-gifts-cookie";
import type { Gift } from "@/types";

interface GiftCardProps {
  gift: Gift;
}

export function GiftCard({ gift }: GiftCardProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [guestName, setGuestName] = useState("");
  const queryClient = useQueryClient();

  const isMine = useSyncExternalStore(
    subscribeReservedGifts,
    () => hasReservedGift(gift.id),
    () => false,
  );

  const reserveMutation = useMutation({
    mutationFn: (name: string) => reserveGift(gift.id, { name }),
    onSuccess: () => {
      addReservedGift(gift.id);
      queryClient.invalidateQueries({ queryKey: ["gifts"] });
      setIsOpen(false);
      setGuestName("");
    },
  });

  const unreserveMutation = useMutation({
    mutationFn: () => unreserveGift(gift.id),
    onSuccess: () => {
      removeReservedGift(gift.id);
      queryClient.invalidateQueries({ queryKey: ["gifts"] });
    },
  });

  const handleOpenChange = (details: { open: boolean }) => {
    setIsOpen(details.open);

    if (!details.open) {
      setGuestName("");
      reserveMutation.reset();
    }
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!guestName.trim()) {
      return;
    }

    reserveMutation.mutate(guestName.trim());
  };

  const canUnreserve = gift.isReserved && isMine;

  return (
    <>
      <Box
        overflow="hidden"
        borderRadius={{ base: "2xl", md: "3xl" }}
        bg="pinkLight"
        transition="transform 0.25s ease, box-shadow 0.25s ease"
        _hover={{ transform: "translateY(-4px)", boxShadow: "md" }}
        h="full"
        display="flex"
        flexDirection="column"
      >
        <Box
          p={{ base: 2.5, md: 5 }}
          flex="1"
          display="flex"
          flexDirection="column"
          gap={{ base: 2, md: 4 }}
        >
          <Center
            position="relative"
            h={{ base: "120px", md: "300px" }}
            backgroundColor="#FFF"
            p={{ base: 1.5, md: 2 }}
            borderRadius="lg"
          >
            {gift.photoUrl ? (
              <Image
                src={gift.photoUrl}
                alt={gift.name}
                objectFit="contain"
                borderRadius="lg"
                h="full"
              />
            ) : (
              <Box
                w="full"
                h="full"
                display="flex"
                alignItems="center"
                justifyContent="center"
              >
                <Text
                  fontFamily="heading"
                  fontSize={{ base: "lg", md: "3xl" }}
                  color="beigeDark/50"
                >
                  Presente
                </Text>
              </Box>
            )}

            {gift.isReserved && (
              <Badge
                position="absolute"
                top={{ base: 1.5, md: 3 }}
                right={{ base: 1.5, md: 3 }}
                bg="green"
                color="white"
                borderRadius="full"
                px={{ base: 1.5, md: 3 }}
                py={{ base: 0.5, md: 1 }}
                fontFamily="heading"
                fontSize={{ base: "2xs", md: "xs" }}
              >
                Reservado
              </Badge>
            )}
          </Center>

          <Text
            fontFamily="heading"
            fontSize={{ base: "sm", md: "xl" }}
            color="beigeDark"
            mb={{ base: 0, md: 2 }}
            lineHeight="short"
            flex="1"
            lineClamp={2}
          >
            {gift.name}
          </Text>

          {canUnreserve ? (
            <Button
              w="full"
              size={{ base: "xs", md: "md" }}
              variant="outline"
              borderColor="beigeMid"
              color="beigeDark"
              borderRadius={{ base: "lg", md: "xl" }}
              fontFamily="heading"
              fontSize={{ base: "xs", md: "md" }}
              loading={unreserveMutation.isPending}
              _hover={{ bg: "beigeLight", borderColor: "beigeDark" }}
              onClick={() => unreserveMutation.mutate()}
            >
              Desreservar
            </Button>
          ) : (
            <Button
              w="full"
              size={{ base: "xs", md: "md" }}
              bg="pinkDark"
              color="white"
              borderRadius={{ base: "lg", md: "xl" }}
              fontFamily="heading"
              fontSize={{ base: "xs", md: "md" }}
              px={{ base: 2, md: 4 }}
              _hover={{ bg: "beigeDark" }}
              onClick={() => setIsOpen(true)}
              disabled={gift.isReserved}
            >
              <Text as="span" display={{ base: "none", md: "inline" }}>
                {gift.isReserved
                  ? `Reservado por ${gift.reservedBy}`
                  : "Reservar"}
              </Text>
              <Text as="span" display={{ base: "inline", md: "none" }}>
                {gift.isReserved ? "Reservado" : "Reservar"}
              </Text>
            </Button>
          )}

          {unreserveMutation.isError && (
            <Text color="red.500" fontSize={{ base: "2xs", md: "sm" }}>
              {unreserveMutation.error.message}
            </Text>
          )}
        </Box>
      </Box>

      <Dialog.Root open={isOpen} onOpenChange={handleOpenChange} placement="center">
        <Portal>
          <Dialog.Backdrop bg="blackAlpha.300" backdropFilter="blur(4px)" />
          <Dialog.Positioner>
            <Dialog.Content
              borderRadius="3xl"
              bg="white"
              mx={4}
              maxW="md"
              border="1px solid"
              borderColor="pinkLight"
            >
              <Dialog.Header>
                <Dialog.Title
                  fontFamily="heading"
                  color="beigeDark"
                  fontSize="2xl"
                >
                  Reservar presente
                </Dialog.Title>
              </Dialog.Header>

              <form onSubmit={handleSubmit}>
                <Dialog.Body>
                  <Text fontFamily="body" color="beigeMid" mb={4}>
                    Você está reservando{" "}
                    <Text as="span" fontWeight="semibold" color="beigeDark">
                      {gift.name}
                    </Text>
                    . Informe seu nome para que saibamos quem irá presentear.
                  </Text>

                  <Field.Root required>
                    <Field.Label fontFamily="body" color="beigeDark">
                      Seu nome
                    </Field.Label>
                    <Input
                      value={guestName}
                      onChange={(event) => setGuestName(event.target.value)}
                      placeholder="Informe o seu nome"
                      bg="beigeLight"
                      borderColor="beigeMid"
                      borderRadius="xl"
                      autoFocus
                      _focusVisible={{
                        borderColor: "pinkDark",
                        boxShadow: "none",
                      }}
                    />
                  </Field.Root>

                  {reserveMutation.isError && (
                    <Text color="red.500" fontSize="sm" mt={3}>
                      {reserveMutation.error.message}
                    </Text>
                  )}
                </Dialog.Body>

                <Dialog.Footer gap={3}>
                  <Dialog.ActionTrigger asChild>
                    <Button
                      variant="outline"
                      borderColor="beigeMid"
                      color="beigeDark"
                      borderRadius="xl"
                      fontFamily="heading"
                    >
                      Cancelar
                    </Button>
                  </Dialog.ActionTrigger>
                  <Button
                    type="submit"
                    bg="pinkDark"
                    color="white"
                    borderRadius="xl"
                    fontFamily="heading"
                    loading={reserveMutation.isPending}
                    _hover={{ bg: "beigeDark" }}
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
