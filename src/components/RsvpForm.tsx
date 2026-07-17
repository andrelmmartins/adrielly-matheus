"use client";

import {
  Box,
  Button,
  Field,
  Input,
  Stack,
  Text,
  Textarea,
} from "@chakra-ui/react";
import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { submitRsvp } from "@/lib/client-api";
import type { RsvpInput } from "@/types";

const INITIAL_FORM: Pick<RsvpInput, "name" | "notes"> = {
  name: "",
  notes: "",
};

export function RsvpForm() {
  const [form, setForm] = useState(INITIAL_FORM);
  const [isSuccess, setIsSuccess] = useState(false);

  const mutation = useMutation({
    mutationFn: submitRsvp,
    onSuccess: () => {
      setIsSuccess(true);
      setForm(INITIAL_FORM);
    },
  });

  const handleChange = (field: keyof typeof INITIAL_FORM, value: string) => {
    setForm((current) => ({ ...current, [field]: value }));
    if (isSuccess) {
      setIsSuccess(false);
    }
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    mutation.mutate({
      name: form.name,
      companions: "",
      notes: form.notes,
    });
  };

  return (
    <Box
      bg="white"
      borderRadius="3xl"
      p={{ base: 8, md: 12 }}
      maxW="2xl"
      mx="auto"
      w="full"
    >
      <form onSubmit={handleSubmit}>
        <Stack gap={6}>
          <Field.Root required>
            <Field.Label color="beigeDark" fontFamily="body" fontSize="md">
              Nome
            </Field.Label>
            <Input
              value={form.name}
              onChange={(event) => handleChange("name", event.target.value)}
              placeholder="Seu nome completo"
              bg="beigeLight"
              borderColor="beigeMid"
              borderRadius="xl"
              size="lg"
              _focusVisible={{ borderColor: "pinkDark", boxShadow: "none" }}
            />
          </Field.Root>

          <Field.Root>
            <Field.Label color="beigeDark" fontFamily="body" fontSize="md">
              Observações
            </Field.Label>
            <Textarea
              value={form.notes}
              onChange={(event) => handleChange("notes", event.target.value)}
              placeholder="Atraso, restrições alimentares ou outra observação..."
              rows={4}
              bg="beigeLight"
              borderColor="beigeMid"
              borderRadius="xl"
              _focusVisible={{ borderColor: "pinkDark", boxShadow: "none" }}
            />
          </Field.Root>

          {mutation.isError && (
            <Text color="red.500" fontSize="sm">
              {mutation.error.message}
            </Text>
          )}

          {isSuccess && (
            <Text color="pinkDark" fontSize="md" fontFamily="body">
              Presença confirmada com sucesso! Obrigado por responder.
            </Text>
          )}

          <Button
            type="submit"
            bg="pinkDark"
            color="white"
            borderRadius="xl"
            size="lg"
            fontFamily="heading"
            fontSize="lg"
            loading={mutation.isPending}
            _hover={{ bg: "beigeDark" }}
          >
            Confirmar presença
          </Button>
        </Stack>
      </form>
    </Box>
  );
}
