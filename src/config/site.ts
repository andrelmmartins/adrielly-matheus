export const SITE_CONFIG = {
  title: "Adrielly & Matheus",
  description: "Chá de cozinha de Adrielly e Matheus",
  eventDate: new Date(
    process.env.NEXT_PUBLIC_EVENT_DATE ?? "2026-08-15T15:00:00-03:00",
  ),
  couple: {
    bride: "Adrielly",
    groom: "Matheus",
  },
} as const;
