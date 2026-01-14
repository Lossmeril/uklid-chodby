// lib/date.ts
import { addDays, differenceInCalendarDays } from "date-fns";
import { formatInTimeZone } from "date-fns-tz";
import { cs, enGB, uk } from "date-fns/locale";
import { TIMEZONE } from "./config";
import type { Lang } from "./i18n";

const LOCALE_MAP = { cs, en: enGB, uk } as const;

export function parseYMD(ymd: string): Date {
  // Interpret YYYY-MM-DD as midnight UTC (date-only anchor).
  const [y, m, d] = ymd.split("-").map(Number);
  return new Date(Date.UTC(y, m - 1, d));
}

export function pragueNow(): Date {
  // Current instant; format using TIMEZONE when displaying.
  return new Date();
}

function stripTimeUTC(d: Date): Date {
  // Normalize to UTC date boundary (helps avoid DST-related off-by-one in day diffs).
  return new Date(
    Date.UTC(d.getUTCFullYear(), d.getUTCMonth(), d.getUTCDate())
  );
}

/** Prague-local "YYYY-MM-DD" for a Date */
function pragueYMD(d: Date): string {
  return formatInTimeZone(d, TIMEZONE, "yyyy-MM-dd");
}

/** ISO day of week in Prague: 1=Mon ... 5=Fri ... 7=Sun */
function pragueIsoDay(d: Date): number {
  return Number(formatInTimeZone(d, TIMEZONE, "i"));
}

/**
 * Returns the Friday that is relevant for cleaning:
 * - Mon–Thu: next Friday (upcoming weekend)
 * - Fri–Sun: this week's Friday (current weekend)
 */
export function relevantCleaningFriday(now: Date): Date {
  // Normalize "today" as Prague calendar day
  const todayPrague = parseYMD(pragueYMD(now));
  const iso = pragueIsoDay(now); // 1..7 (Mon..Sun)

  const delta =
    iso <= 4
      ? 5 - iso // Mon-Thu -> forward to next Friday
      : -(iso - 5); // Fri-Sun -> back to this Friday (0, -1, -2)

  return addDays(todayPrague, delta);
}

/**
 * Week 1 = startFriday..startFriday+6 days
 * Uses calendar weeks since the anchor Friday.
 */
export function weekIndexSince(startFriday: Date, now: Date): number {
  const days = differenceInCalendarDays(
    stripTimeUTC(now),
    stripTimeUTC(startFriday)
  );
  const idx = Math.floor(days / 7) + 1;
  return Math.max(1, idx);
}

/**
 * Dashboard-friendly: week index based on the upcoming (or current) cleaning weekend.
 * Mon–Thu will show the next weekend, not the one that already passed.
 */
export function cleaningWeekIndexSince(startFriday: Date, now: Date): number {
  const refFriday = relevantCleaningFriday(now);
  const days = differenceInCalendarDays(
    stripTimeUTC(refFriday),
    stripTimeUTC(startFriday)
  );
  const idx = Math.floor(days / 7) + 1;
  return Math.max(1, idx);
}

export function fridayOfWeek(startFriday: Date, weekIndex: number): Date {
  return addDays(startFriday, (weekIndex - 1) * 7);
}

export function weekendLabel(friday: Date, lang: Lang): string {
  const sun = addDays(friday, 2);

  // Short, print-friendly. Adjust patterns if you want longer forms.
  const pattern = lang === "cs" ? "EEE d. M." : "EEE d MMM";
  const f = formatInTimeZone(friday, TIMEZONE, pattern, {
    locale: LOCALE_MAP[lang],
  });
  const s = formatInTimeZone(sun, TIMEZONE, pattern, {
    locale: LOCALE_MAP[lang],
  });

  return `${f} – ${s}`;
}

/**
 * Czech primary formatting helper (kept Czech as default, as requested).
 * If you want language-aware, I can provide formatDatePragueLang(d, lang, pattern).
 */
export function formatDatePrague(
  d: Date,
  pattern = "EEEE d. MMMM yyyy"
): string {
  return formatInTimeZone(d, TIMEZONE, pattern, { locale: cs });
}
