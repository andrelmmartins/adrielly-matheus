import axios, { type AxiosError } from "axios";

interface AirtableErrorBody {
  error?: {
    type?: string;
    message?: string;
  };
}

export class AirtableRequestError extends Error {
  status: number;

  constructor(message: string, status = 500) {
    super(message);
    this.name = "AirtableRequestError";
    this.status = status;
  }
}

export function getAirtableErrorMessage(error: unknown): string {
  if (!axios.isAxiosError(error)) {
    return error instanceof Error
      ? error.message
      : "Erro ao comunicar com o Airtable.";
  }

  const axiosError = error as AxiosError<AirtableErrorBody>;
  const airtableMessage = axiosError.response?.data?.error?.message;

  if (airtableMessage) {
    if (airtableMessage.includes("cannot accept the provided value")) {
      return `${airtableMessage}. Confira o tipo do campo no Airtable (texto longo ou número).`;
    }

    return airtableMessage;
  }

  if (axiosError.response?.status === 422) {
    return "Dados inválidos para o Airtable. Verifique os nomes dos campos na tabela RSVP.";
  }

  return axiosError.message || "Erro ao comunicar com o Airtable.";
}

export function getAirtableErrorStatus(error: unknown): number {
  if (axios.isAxiosError(error) && axiosErrorHasStatus(error)) {
    const status = error.response?.status;

    if (status && status >= 400 && status < 600) {
      return status;
    }
  }

  return 500;
}

function axiosErrorHasStatus(
  error: AxiosError,
): error is AxiosError & { response: { status: number } } {
  return typeof error.response?.status === "number";
}
