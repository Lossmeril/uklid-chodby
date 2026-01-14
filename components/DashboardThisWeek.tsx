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
import { TbStairs, TbStairsDown } from "react-icons/tb";
import {
  PiBroomBold,
  PiNumberCircleFour,
  PiNumberCircleOne,
  PiNumberCircleThree,
  PiNumberCircleTwo,
  PiSnowflakeBold,
} from "react-icons/pi";
import { MdOutlineFence } from "react-icons/md";
import { IoMdBarcode } from "react-icons/io";

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

        <div className="mt-3 grid gap-3 grid-cols-2 md:grid-cols-3 xl:grid-cols-6">
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

        <div className="pt-10">
          <p className="">{t(lang, "levelSubtitle")}</p>

          <h3 className="text-lg font-bold mb-4 mt-8">
            {t(lang, "cleanupIncludes")}
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            <div className="flex flex-row flex-nowrap items-center gap-5 pr-10 text-gray-700">
              <span className="text-[#E8738A] opacity-50">
                <PiBroomBold size={48} />
              </span>
              {t(lang, "cleanupIncludesItem1")}
            </div>
            <div className="flex flex-row flex-nowrap items-center gap-5 pr-10 text-gray-700">
              <span className="text-[#E8738A] opacity-50">
                <MdOutlineFence size={48} />
              </span>
              {t(lang, "cleanupIncludesItem2")}
            </div>
            <div className="flex flex-row flex-nowrap items-center gap-5 pr-10 text-gray-700">
              <span className="text-[#E8738A] opacity-50">
                <IoMdBarcode size={48} />
              </span>
              {t(lang, "cleanupIncludesItem3")}
            </div>
          </div>

          <h3 className="text-lg font-bold mb-2 mt-8">
            {t(lang, "cleanupBasement")}
          </h3>
          <p className="pb-4">{t(lang, "cleanupBasementIncludes")}</p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            <div className="flex flex-row flex-nowrap items-center gap-5 pr-10 text-gray-700">
              <span className="text-[#0C7779] opacity-50">
                <PiBroomBold size={48} />
              </span>
              {t(lang, "cleanupBasementIncludesItem1")}
            </div>
            <div className="flex flex-row flex-nowrap items-center gap-5 pr-10 text-gray-700">
              <span className="text-[#0C7779] opacity-50">
                <TbStairs size={48} />
              </span>
              {t(lang, "cleanupBasementIncludesItem2")}
            </div>
            <div className="flex flex-row flex-nowrap items-center gap-5 pr-10 text-gray-700">
              <span className="text-[#0C7779] opacity-50">
                <PiSnowflakeBold size={48} />
              </span>
              {t(lang, "cleanupBasementIncludesItem3")}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
