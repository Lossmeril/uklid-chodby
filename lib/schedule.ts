import { FLATS_PER_LEVEL, LEVELS, TOTAL_FLATS, type Flat } from "./config";
import { fridayOfWeek } from "./date";

export type LevelIndex = 1 | 2 | 3 | 4;

export function flatsForLevel(level: LevelIndex): number[] {
  const start = (level - 1) * FLATS_PER_LEVEL + 1;
  return Array.from({ length: FLATS_PER_LEVEL }, (_, i) => start + i);
}

export function hallwayFlatForWeek(
  level: LevelIndex,
  weekIndex: number
): number {
  const flats = flatsForLevel(level);
  const idx = (weekIndex - 1) % flats.length;
  return flats[idx];
}

export function basementFlatForWeek(weekIndex: number): number {
  return ((weekIndex - 1) % TOTAL_FLATS) + 1;
}

export type WeekRow = {
  weekIndex: number;
  friday: Date;
  hallwayAssigneeByLevel: Record<LevelIndex, number>;
  basementAssignee: number;
};

export function buildWeeks(params: {
  startFriday: Date;
  weeksToShow: number;
}): WeekRow[] {
  const { startFriday, weeksToShow } = params;

  const levels: LevelIndex[] = [1, 2, 3, 4];

  return Array.from({ length: weeksToShow }, (_, i) => {
    const weekIndex = i + 1;
    const friday = fridayOfWeek(startFriday, weekIndex);

    const hallwayAssigneeByLevel = levels.reduce((acc, level) => {
      acc[level] = hallwayFlatForWeek(level, weekIndex);
      return acc;
    }, {} as Record<LevelIndex, number>);

    return {
      weekIndex,
      friday,
      hallwayAssigneeByLevel,
      basementAssignee: basementFlatForWeek(weekIndex),
    };
  });
}

export function flatHeaderLabel(flatNumber: number, flats: Flat[]): string {
  const f = flats.find((x) => x.number === flatNumber);
  if (!f) return `Flat ${flatNumber}`;
  return f.label ? `${flatNumber} — ${f.label}` : `Flat ${flatNumber}`;
}
