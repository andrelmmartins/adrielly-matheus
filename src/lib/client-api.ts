import api from "./axios";
import type { Gift, RsvpInput } from "@/types";

export async function fetchGifts(): Promise<Gift[]> {
  const { data } = await api.get<Gift[]>("/presentes");
  return data;
}

export async function submitRsvp(payload: RsvpInput): Promise<void> {
  await api.post("/rsvp", payload);
}
