export type Flat = {
  number: number;
  label?: string; // optional household name
};

export const LEVELS = 4;
export const FLATS_PER_LEVEL = 3;
export const TOTAL_FLATS = LEVELS * FLATS_PER_LEVEL;

export const TIMEZONE = "Europe/Prague";

/**
 * Pick a “week 1” anchor Friday.
 * The schedule week index is computed by full weeks since this date.
 *
 * Tip: set this to the first Friday you want the rotation to start.
 */
export const SCHEDULE_START_FRIDAY = "2026-01-02"; // YYYY-MM-DD (example)

export const WEEKS_TO_SHOW = 12; // nice because basement cycle is 12 weeks

export const FLATS: Flat[] = Array.from({ length: TOTAL_FLATS }, (_, i) => {
  const number = i + 1;

  // You can fill in known household names here:
  const labelMap: Record<number, string> = {
    1: "Shushkevych",
    2: "Pylypko, Udalova",
    3: "Solíková",
    4: "Kovář, Kuchařová",

    6: "Skalický",
    7: "Zahálka",
    8: "Buryi, Pashko",
    9: "Špitálská",
    10: "Chládek",
    11: "Chládek",
  };

  return { number, label: labelMap[number] };
});
