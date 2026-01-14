import type { Flat } from "@/lib/config";
import type { LevelIndex, WeekRow } from "@/lib/schedule";
import { flatHeaderLabel, flatsForLevel } from "@/lib/schedule";
import { weekendLabel } from "@/lib/date";
import { t, type Lang } from "@/lib/i18n";

function chunk<T>(arr: T[], size: number): T[][] {
  const out: T[][] = [];
  for (let i = 0; i < arr.length; i += size) out.push(arr.slice(i, i + size));
  return out;
}

export function LevelTable(props: {
  lang: Lang;
  level: LevelIndex;
  flats: Flat[];
  weeks: WeekRow[]; // full year
}) {
  const { lang, level, flats, weeks } = props;
  const levelFlats = flatsForLevel(level);

  // Every 3 weeks is one full hallway rotation for a level (3 flats)
  const rotations = chunk(weeks, 3);

  return (
    <div className="print-page">
      <h2 className="text-center font-black mb-3 uppercase text-lg">
        {t(lang, "appTitle")}
      </h2>
      <table className="w-full border-collapse text-sm">
        <thead>
          <tr>
            {levelFlats.map((n) => (
              <th
                key={n}
                className="border border-slate-300 px-2 py-1.5 text-center uppercase font-black text-base"
              >
                {flatHeaderLabel(n, flats)}
              </th>
            ))}
          </tr>
        </thead>

        <tbody>
          {rotations.map((group) => {
            if (group.length === 0) return null;

            const start = group[0].weekIndex;
            const end = group[group.length - 1].weekIndex;

            return (
              <tr key={`${start}-${end}`} className="align-top">
                {levelFlats.map((flatNumber) => {
                  const assignedWeek = group.find(
                    (w) => w.hallwayAssigneeByLevel[level] === flatNumber
                  );

                  const hasBasementThisWeekend =
                    assignedWeek &&
                    assignedWeek.basementAssignee === flatNumber;

                  return (
                    <td
                      key={flatNumber}
                      className={[
                        "border border-slate-300 px-2 py-1.5 text-slate-800 text-center text-xs relative ",
                        hasBasementThisWeekend ? "bg-amber-100" : "",
                      ].join(" ")}
                    >
                      {assignedWeek ? (
                        <div className="font-normal">
                          {weekendLabel(assignedWeek.friday, lang)}
                          {hasBasementThisWeekend ? (
                            <span className="mt-1 ml-1 text-[7px] uppercase">
                              ({t(lang, "includingBasementAndSnow")})
                            </span>
                          ) : null}

                          <span className="ml-2 text-3xl absolute text-slate-950/20 -translate-y-1/2 top-[11px] right-2">
                            &#9744;
                          </span>
                        </div>
                      ) : (
                        <div className="text-gray-400">—</div>
                      )}
                    </td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>

      <div className="mt-3 text-sm text-gray-600">
        {t(lang, "levelSubtitle")}
      </div>
    </div>
  );
}
