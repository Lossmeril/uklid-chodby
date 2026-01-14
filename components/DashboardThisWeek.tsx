import React from "react";
import type { Flat } from "@/lib/config";
import { flatHeaderLabel } from "@/lib/schedule";
import type { LevelIndex } from "@/lib/schedule";
import { basementFlatForWeek, hallwayFlatForWeek } from "@/lib/schedule";
import {
  formatDatePrague,
  fridayOfWeek,
  weekendLabel,
  weekIndexSince,
} from "@/lib/date";
import { t, type Lang } from "@/lib/i18n";

export function DashboardThisWeek(props: {
  lang: Lang;
  flats: Flat[];
  startFriday: Date;
  now: Date;
}) {
  const { lang, flats, startFriday, now } = props;

  const weekIndex = weekIndexSince(startFriday, now);
  const friday = fridayOfWeek(startFriday, weekIndex);

  const levels: LevelIndex[] = [1, 2, 3, 4];
  const basement = basementFlatForWeek(weekIndex);

  return (
    <div className="space-y-4">
      <div className="rounded-2xl border p-4 shadow-sm">
        <div className="flex flex-wrap items-baseline justify-between gap-2">
          <h1 className="text-2xl font-semibold">
            {t(lang, "dashboardTitle")}
          </h1>
          <div className="text-sm text-gray-600">
            {t(lang, "today")}: {formatDatePrague(now)}
          </div>
        </div>

        <div className="mt-2 text-gray-700">
          <span className="font-medium">{t(lang, "currentWeek")}:</span>{" "}
          {t(lang, "week")} {weekIndex} ({weekendLabel(friday)})
        </div>

        <div className="mt-3 grid gap-3 md:grid-cols-2">
          {levels.map((level) => {
            const flat = hallwayFlatForWeek(level, weekIndex);
            return (
              <div key={level} className="rounded-2xl border p-4">
                <div className="text-sm text-gray-600">
                  {t(lang, "level")} {level}
                </div>
                <div className="mt-1 text-lg font-semibold">
                  {flatHeaderLabel(flat, flats)}
                </div>
                <div className="mt-1 text-sm text-gray-700">
                  {t(lang, "task")}: {t(lang, "cleanHallway")}
                </div>
              </div>
            );
          })}

          <div className="rounded-2xl border p-4 md:col-span-2">
            <div className="text-sm text-gray-600">{t(lang, "basement")}</div>
            <div className="mt-1 text-lg font-semibold">
              {flatHeaderLabel(basement, flats)}
            </div>
            <div className="mt-1 text-sm text-gray-700">
              {t(lang, "task")}: {t(lang, "cleanBasement")}
            </div>
          </div>
        </div>
      </div>

      <div className="rounded-2xl border p-4 text-sm text-gray-700">
        {t(lang, "printSchedule")}:{" "}
        <a className="underline" href={`/${lang}/print`}>
          /{lang}/print
        </a>{" "}
        <span className="text-gray-500">{t(lang, "printHint")}</span>
      </div>
    </div>
  );
}
