import api from "./axios";
import type { Gift, ReserveGiftInput, RsvpInput } from "@/types";

export async function fetchGifts(): Promise<Gift[]> {
  const { data } = await api.get<Gift[]>("/presentes");
  return data;
}

export async function reserveGift(
  giftId: string,
  payload: ReserveGiftInput,
): Promise<Gift> {
  const { data } = await api.patch<Gift>(`/presentes/${giftId}`, payload);
  return data;
}

export async function submitRsvp(payload: RsvpInput): Promise<void> {
  await api.post("/rsvp", payload);
}
