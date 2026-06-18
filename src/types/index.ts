export interface Gift {
  id: string;
  name: string;
  photoUrl: string | null;
  reservedBy: string | null;
  isReserved: boolean;
}

export interface RsvpInput {
  name: string;
  companions: string;
  notes: string;
}

export interface RsvpRecord extends RsvpInput {
  id: string;
  submittedAt: string;
}

export interface ReserveGiftInput {
  name: string;
}
