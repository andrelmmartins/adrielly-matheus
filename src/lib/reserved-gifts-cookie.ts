const COOKIE_NAME = "reserved_gifts";
const MAX_AGE_DAYS = 365;

const listeners = new Set<() => void>();

function emitChange() {
  for (const listener of listeners) {
    listener();
  }
}

function parseCookieValue(raw: string | undefined): string[] {
  if (!raw) {
    return [];
  }

  try {
    const parsed = JSON.parse(decodeURIComponent(raw)) as unknown;
    return Array.isArray(parsed)
      ? parsed.filter((id): id is string => typeof id === "string")
      : [];
  } catch {
    return [];
  }
}

function getCookieRaw(): string | undefined {
  if (typeof document === "undefined") {
    return undefined;
  }

  const match = document.cookie
    .split("; ")
    .find((entry) => entry.startsWith(`${COOKIE_NAME}=`));

  return match?.slice(COOKIE_NAME.length + 1);
}

function writeCookie(ids: string[]) {
  if (typeof document === "undefined") {
    return;
  }

  const value = encodeURIComponent(JSON.stringify(ids));
  const maxAge = MAX_AGE_DAYS * 24 * 60 * 60;

  document.cookie = `${COOKIE_NAME}=${value}; path=/; max-age=${maxAge}; samesite=lax`;
  emitChange();
}

export function subscribeReservedGifts(listener: () => void) {
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
  };
}

export function getReservedGiftIds(): string[] {
  return parseCookieValue(getCookieRaw());
}

export function hasReservedGift(giftId: string): boolean {
  return getReservedGiftIds().includes(giftId);
}

export function addReservedGift(giftId: string) {
  const ids = getReservedGiftIds();

  if (!ids.includes(giftId)) {
    writeCookie([...ids, giftId]);
  }
}

export function removeReservedGift(giftId: string) {
  writeCookie(getReservedGiftIds().filter((id) => id !== giftId));
}
