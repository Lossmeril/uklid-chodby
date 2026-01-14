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
import { CardMainContent, CardTitle } from "./Text";
import { Card } from "./Card";
import { TbStairsDown } from "react-icons/tb";
import {
  PiNumberCircleFour,
  PiNumberCircleOne,
  PiNumberCircleThree,
  PiNumberCircleTwo,
  PiSnowflakeBold,
} from "react-icons/pi";

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
      <div className="rounded-lg p-12 shadow-sm w-full bg-gray-200">
        <div className="flex flex-wrap items-baseline justify-between gap-2">
          <h1 className="text-2xl font-semibold">
            {t(lang, "dashboardTitle")}
          </h1>
          <div className="text-sm text-gray-600">
            {t(lang, "today")}: {formatDatePrague(now)}
          </div>
        </div>

        <div className="mt-2 text-gray-700">
          <span className="font-medium">{t(lang, "currentWeek")}: </span>
          {weekendLabel(friday, lang)}
        </div>

        <div className="mt-3 grid gap-3 md:grid-cols-3 xl:grid-cols-6">
          {levels.map((level) => {
            const flat = hallwayFlatForWeek(level, weekIndex);
            const icons = [
              <PiNumberCircleOne key="1" size={60} />,
              <PiNumberCircleTwo key="2" size={60} />,
              <PiNumberCircleThree key="3" size={60} />,
              <PiNumberCircleFour key="4" size={60} />,
            ];
            return (
              <Card key={level} bgColor="#E8738A">
                <div className="opacity-50 my-5">{icons[level - 1]}</div>
                <CardTitle>
                  {t(lang, "thisWeekCleans") +
                    " " +
                    level +
                    ". " +
                    t(lang, "level").toLowerCase() +
                    " "}
                </CardTitle>

                <CardMainContent>
                  {flatHeaderLabel(flat, flats)}
                </CardMainContent>
              </Card>
            );
          })}

          <Card bgColor="#0C7779">
            <div className="opacity-50 my-5">
              <TbStairsDown size={60} />
            </div>
            <CardTitle>
              {t(lang, "thisWeekCleans") + " " + t(lang, "basement")}
            </CardTitle>
            <CardMainContent>
              {flatHeaderLabel(basement, flats)}
            </CardMainContent>
          </Card>

          <Card bgColor="#3F9AAE">
            <div className="opacity-50 my-5">
              <PiSnowflakeBold size={60} />
            </div>
            <CardTitle>
              {t(lang, "thisWeekCleans") + " " + t(lang, "snow")}
            </CardTitle>
            <CardMainContent>
              {flatHeaderLabel(basement, flats)}
            </CardMainContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
