import { NextResponse } from "next/server";
import { AirtableRequestError } from "@/lib/airtable-errors";
import { getGifts } from "@/lib/airtable";

export async function GET() {
  try {
    const gifts = await getGifts();
    return NextResponse.json(gifts);
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Erro ao buscar presentes.";

    const status =
      error instanceof AirtableRequestError ? error.status : 500;

    return NextResponse.json({ message }, { status });
  }
}
