import { NextResponse } from "next/server";
import { AirtableRequestError } from "@/lib/airtable-errors";
import { reserveGift, unreserveGift } from "@/lib/airtable";
import type { ReserveGiftInput } from "@/types";

interface RouteParams {
  params: Promise<{ id: string }>;
}

export async function PATCH(request: Request, { params }: RouteParams) {
  try {
    const { id } = await params;
    const body = (await request.json()) as ReserveGiftInput;

    if (!body.name?.trim()) {
      return NextResponse.json(
        { message: "O nome é obrigatório para reservar." },
        { status: 400 },
      );
    }

    const gift = await reserveGift(id, body.name.trim());

    return NextResponse.json(gift);
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Erro ao reservar presente.";

    const status =
      error instanceof AirtableRequestError ? error.status : 500;

    return NextResponse.json({ message }, { status });
  }
}

export async function DELETE(_request: Request, { params }: RouteParams) {
  try {
    const { id } = await params;
    const gift = await unreserveGift(id);

    return NextResponse.json(gift);
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Erro ao desreservar presente.";

    const status =
      error instanceof AirtableRequestError ? error.status : 500;

    return NextResponse.json({ message }, { status });
  }
}
