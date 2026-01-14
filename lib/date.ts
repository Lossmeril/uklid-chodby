import { addDays, differenceInCalendarDays } from "date-fns";
import { formatInTimeZone } from "date-fns-tz";
import { cs, enGB, uk } from "date-fns/locale";
import { TIMEZONE } from "./config";
import { Lang } from "./i18n";

const LOCALE_MAP = { cs, en: enGB, uk } as const;

export function parseYMD(ymd: string): Date {
  // Interpret YYYY-MM-DD as midnight UTC-ish; we will always format in TIMEZONE.
  // Good enough for week-diff logic as long as you keep it consistent.
  const [y, m, d] = ymd.split("-").map(Number);
  return new Date(Date.UTC(y, m - 1, d));
}

export function pragueNow(): Date {
  // “Now” as a Date object; formatting will use timezone.
  return new Date();
}

export function weekIndexSince(startFriday: Date, now: Date): number {
  // Week 1 = startFriday..startFriday+6 days
  const days = differenceInCalendarDays(
    stripTimeUTC(now),
    stripTimeUTC(startFriday)
  );
  const idx = Math.floor(days / 7) + 1;
  return Math.max(1, idx);
}

function stripTimeUTC(d: Date): Date {
  // normalize to UTC date boundary to reduce DST weirdness for week math
  return new Date(
    Date.UTC(d.getUTCFullYear(), d.getUTCMonth(), d.getUTCDate())
  );
}

export function fridayOfWeek(startFriday: Date, weekIndex: number): Date {
  return addDays(startFriday, (weekIndex - 1) * 7);
}

export function weekendLabel(friday: Date, lang: Lang): string {
  const sun = addDays(friday, 2);

  const pattern = lang === "cs" ? "EEE d. MMM" : "EEE d MMM";
  const f = formatInTimeZone(friday, TIMEZONE, pattern, {
    locale: LOCALE_MAP[lang],
  });
  const s = formatInTimeZone(sun, TIMEZONE, pattern, {
    locale: LOCALE_MAP[lang],
  });

  return `${f} – ${s}`;
}

export function formatDatePrague(
  d: Date,
  pattern = "EEEE d. MMMM yyyy"
): string {
  return formatInTimeZone(d, TIMEZONE, pattern, { locale: cs });
}
