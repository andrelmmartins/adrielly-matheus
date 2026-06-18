import { NextResponse } from "next/server";
import { AirtableRequestError } from "@/lib/airtable-errors";
import { createRsvp } from "@/lib/airtable";
import type { RsvpInput } from "@/types";

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as RsvpInput;

    if (!body.name?.trim()) {
      return NextResponse.json(
        { message: "O nome é obrigatório." },
        { status: 400 },
      );
    }

    await createRsvp({
      name: body.name.trim(),
      companions: body.companions?.trim() ?? "",
      notes: body.notes?.trim() ?? "",
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    const message =
      error instanceof Error
        ? error.message
        : "Erro ao confirmar presença.";

    const status =
      error instanceof AirtableRequestError ? error.status : 500;

    return NextResponse.json({ message }, { status });
  }
}
