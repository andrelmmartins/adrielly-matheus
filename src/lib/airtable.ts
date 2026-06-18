import axios from "axios";
import type { Gift, RsvpInput } from "@/types";
import {
  AirtableRequestError,
  getAirtableErrorMessage,
  getAirtableErrorStatus,
} from "./airtable-errors";

interface AirtableAttachment {
  url: string;
}

interface AirtableGiftFields {
  Nome?: string;
  Foto?: AirtableAttachment[];
  Responsavel?: string;
  Reservado?: boolean;
}

interface AirtableGiftRecord {
  id: string;
  fields: AirtableGiftFields;
}

interface AirtableListResponse<T> {
  records: T[];
}

const RSVP_FIELDS = {
  name: process.env.AIRTABLE_RSVP_FIELD_NAME ?? "Nome",
  companions: process.env.AIRTABLE_RSVP_FIELD_COMPANIONS ?? "Acompanhantes",
  notes: process.env.AIRTABLE_RSVP_FIELD_NOTES ?? "Observacoes",
} as const;

const COMPANIONS_FIELD_TYPE =
  process.env.AIRTABLE_RSVP_COMPANIONS_TYPE ?? "text";

function parseCompanionNames(companions: string): string[] {
  return companions
    .split(",")
    .map((name) => name.trim())
    .filter(Boolean);
}

function buildRsvpFields(payload: RsvpInput): Record<string, string | number> {
  const fields: Record<string, string | number> = {
    [RSVP_FIELDS.name]: payload.name,
  };

  const companionNames = parseCompanionNames(payload.companions);
  const notesParts: string[] = [];

  if (COMPANIONS_FIELD_TYPE === "number") {
    if (companionNames.length > 0) {
      fields[RSVP_FIELDS.companions] = companionNames.length;
      notesParts.push(`Acompanhantes: ${companionNames.join(", ")}`);
    }
  } else if (companionNames.length > 0) {
    fields[RSVP_FIELDS.companions] = companionNames.join(", ");
  }

  if (payload.notes) {
    notesParts.push(payload.notes);
  }

  if (notesParts.length > 0) {
    fields[RSVP_FIELDS.notes] = notesParts.join("\n\n");
  }

  return fields;
}

function getAirtableClient() {
  const apiKey = process.env.AIRTABLE_API_KEY;
  const baseId = process.env.AIRTABLE_BASE_ID;

  if (!apiKey || !baseId) {
    throw new Error("Configuração do Airtable ausente.");
  }

  return axios.create({
    baseURL: `https://api.airtable.com/v0/${baseId}`,
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
  });
}

function mapGiftRecord(record: AirtableGiftRecord): Gift {
  const { fields } = record;

  return {
    id: record.id,
    name: fields.Nome ?? "Presente sem nome",
    photoUrl: fields.Foto?.[0]?.url ?? null,
    reservedBy: fields.Responsavel ?? null,
    isReserved: Boolean(fields.Reservado),
  };
}

export async function getGifts(): Promise<Gift[]> {
  try {
    const client = getAirtableClient();
    const tableName = process.env.AIRTABLE_PRESENTES_TABLE ?? "Presentes";

    const { data } = await client.get<AirtableListResponse<AirtableGiftRecord>>(
      `/${encodeURIComponent(tableName)}`,
    );

    return data.records.map(mapGiftRecord);
  } catch (error) {
    throw new AirtableRequestError(
      getAirtableErrorMessage(error),
      getAirtableErrorStatus(error),
    );
  }
}

export async function createRsvp(payload: RsvpInput): Promise<void> {
  try {
    const client = getAirtableClient();
    const tableName = process.env.AIRTABLE_RSVP_TABLE ?? "RSVP";

    await client.post(`/${encodeURIComponent(tableName)}`, {
      records: [
        {
          fields: buildRsvpFields(payload),
        },
      ],
    });
  } catch (error) {
    if (error instanceof AirtableRequestError) {
      throw error;
    }

    throw new AirtableRequestError(
      getAirtableErrorMessage(error),
      getAirtableErrorStatus(error),
    );
  }
}

