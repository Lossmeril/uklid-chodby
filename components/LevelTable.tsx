import React from "react";
import type { Flat } from "@/lib/config";
import type { LevelIndex, WeekRow } from "@/lib/schedule";
import { flatHeaderLabel, flatsForLevel } from "@/lib/schedule";
import { weekendLabel } from "@/lib/date";
import { t, type Lang } from "@/lib/i18n";

export function LevelTable(props: {
  lang: Lang;
  level: LevelIndex;
  flats: Flat[];
  weeks: WeekRow[];
}) {
  const { lang, level, flats, weeks } = props;
  const levelFlats = flatsForLevel(level);

  return (
    <div className="print-page">
      <div className="mb-3 flex items-baseline justify-between">
        <h2 className="text-2xl font-semibold">
          {t(lang, "levelTitle", { level })}
        </h2>
        <div className="text-sm text-gray-600">{t(lang, "levelSubtitle")}</div>
      </div>

      <table className="w-full border-collapse text-sm">
        <thead>
          <tr>
            <th className="border px-2 py-2 text-left">{t(lang, "thWeek")}</th>
            <th className="border px-2 py-2 text-left">
              {t(lang, "thWeekend")}
            </th>
            {levelFlats.map((n) => (
              <th key={n} className="border px-2 py-2 text-left">
                {flatHeaderLabel(n, flats)}
              </th>
            ))}
            <th className="border px-2 py-2 text-left">
              {t(lang, "thBasement")}
            </th>
          </tr>
        </thead>

        <tbody>
          {weeks.map((w) => {
            const hallwayAssignee = w.hallwayAssigneeByLevel[level];
            return (
              <tr key={w.weekIndex} className="align-top">
                <td className="border px-2 py-2 font-medium">
                  {t(lang, "week")} {w.weekIndex}
                </td>
                <td className="border px-2 py-2">{weekendLabel(w.friday)}</td>

                {levelFlats.map((n) => {
                  const isAssignee = n === hallwayAssignee;
                  return (
                    <td
                      key={n}
                      className={[
                        "border px-2 py-2",
                        isAssignee ? "font-semibold bg-gray-100" : "",
                      ].join(" ")}
                    >
                      {isAssignee ? t(lang, "cleanThisLevel") : ""}
                    </td>
                  );
                })}

                <td className="border px-2 py-2">
                  {t(lang, "flat")} {w.basementAssignee}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>

      <div className="mt-3 text-xs text-gray-600">
        {t(lang, "basementRotates")}
      </div>
    </div>
  );
}
