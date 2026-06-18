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

const INITIAL_FORM: RsvpInput = {
  name: "",
  companions: "",
  notes: "",
};

export function RsvpForm() {
  const [form, setForm] = useState<RsvpInput>(INITIAL_FORM);
  const [isSuccess, setIsSuccess] = useState(false);

  const mutation = useMutation({
    mutationFn: submitRsvp,
    onSuccess: () => {
      setIsSuccess(true);
      setForm(INITIAL_FORM);
    },
  });

  const handleChange = (field: keyof RsvpInput, value: string) => {
    setForm((current) => ({ ...current, [field]: value }));
    if (isSuccess) {
      setIsSuccess(false);
    }
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    mutation.mutate(form);
  };

  return (
    <Box
      bg="offwhite"
      borderRadius="2xl"
      border="1px solid"
      borderColor="blush"
      p={{ base: 6, md: 8 }}
      boxShadow="sm"
      maxW="xl"
      w="full"
    >
      <form onSubmit={handleSubmit}>
        <Stack gap={6}>
        <Field.Root required>
          <Field.Label color="slate">Nome completo</Field.Label>
          <Input
            value={form.name}
            onChange={(event) => handleChange("name", event.target.value)}
            placeholder="Seu nome"
            bg="white"
            borderColor="peach"
            _focusVisible={{ borderColor: "slate", boxShadow: "none" }}
          />
        </Field.Root>

        <Field.Root>
          <Field.Label color="slate">Acompanhantes</Field.Label>
          <Input
            value={form.companions}
            onChange={(event) => handleChange("companions", event.target.value)}
            placeholder="Nomes dos acompanhantes, separados por vírgula"
            bg="white"
            borderColor="peach"
            _focusVisible={{ borderColor: "slate", boxShadow: "none" }}
          />
        </Field.Root>

        <Field.Root>
          <Field.Label color="slate">Observações</Field.Label>
          <Textarea
            value={form.notes}
            onChange={(event) => handleChange("notes", event.target.value)}
            placeholder="Restrições alimentares, mensagem para os noivos..."
            rows={4}
            bg="white"
            borderColor="peach"
            _focusVisible={{ borderColor: "slate", boxShadow: "none" }}
          />
        </Field.Root>

        {mutation.isError && (
          <Text color="red.500" fontSize="sm">
            {mutation.error.message}
          </Text>
        )}

        {isSuccess && (
          <Text color="sage" fontSize="sm" fontWeight="medium">
            Presença confirmada com sucesso! Obrigado por responder.
          </Text>
        )}

        <Button
          type="submit"
          bg="slate"
          color="offwhite"
          borderRadius="full"
          size="lg"
          loading={mutation.isPending}
          _hover={{ bg: "steel" }}
        >
          Confirmar presença
        </Button>
        </Stack>
      </form>
    </Box>
  );
}
