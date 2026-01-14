import { t } from "@/lib/i18n";
import { IoMdBarcode } from "react-icons/io";
import { MdOutlineFence } from "react-icons/md";
import { PiBroomBold, PiSnowflakeBold } from "react-icons/pi";
import { TbStairs } from "react-icons/tb";

const PosterExport = () => {
  return (
    <div className="w-full mx-auto print-page px-20 py-10">
      <h2 className="font-bold text-3xl">{t("cs", "appTitle")}</h2>
      <h2 className="text-base text-gray-500">{t("en", "appTitle")}</h2>
      <h2 className="text-base text-gray-500">{t("uk", "appTitle")}</h2>
      <div className=" grid grid-cols-2">
        <div>
          <h3 className="text-lg font-bold mb-4 mt-8">
            {t("cs", "cleanupIncludes")}
          </h3>
          <div className="grid grid-cols-1 gap-5">
            <div className="flex flex-row flex-nowrap items-center gap-5 pr-10 text-gray-700">
              <span className="text-[#E8738A] opacity-50">
                <PiBroomBold size={48} />
              </span>
              <div className="flex flex-col pt-3 gap-1">
                {t("cs", "cleanupIncludesItem1")}
                <span className="text-xs text-gray-500">
                  {t("en", "cleanupIncludesItem1")}
                </span>
                <span className="text-xs text-gray-500">
                  {t("uk", "cleanupIncludesItem1")}
                </span>
              </div>
            </div>
            <div className="flex flex-row flex-nowrap items-center gap-5 pr-10 text-gray-700">
              <span className="text-[#E8738A] opacity-50">
                <MdOutlineFence size={48} />
              </span>
              <div className="flex flex-col pt-3 gap-1">
                {t("cs", "cleanupIncludesItem2")}
                <span className="text-xs text-gray-500">
                  {t("en", "cleanupIncludesItem2")}
                </span>
                <span className="text-xs text-gray-500">
                  {t("uk", "cleanupIncludesItem2")}
                </span>
              </div>
            </div>
            <div className="flex flex-row flex-nowrap items-center gap-5 pr-10 text-gray-700">
              <span className="text-[#E8738A] opacity-50">
                <IoMdBarcode size={48} />
              </span>
              <div className="flex flex-col pt-3 gap-1">
                {t("cs", "cleanupIncludesItem3")}
                <span className="text-xs text-gray-500">
                  {t("en", "cleanupIncludesItem3")}
                </span>
                <span className="text-xs text-gray-500">
                  {t("uk", "cleanupIncludesItem3")}
                </span>
              </div>
            </div>
          </div>

          <h3 className="text-lg font-bold mb-2 mt-8">
            {t("cs", "cleanupBasement")}
          </h3>
          <p className="pb-4">{t("cs", "cleanupBasementIncludes")}</p>
          <div className="grid grid-cols-1 gap-5">
            <div className="flex flex-row flex-nowrap items-center gap-5 pr-10 text-gray-700">
              <span className="text-[#0C7779] opacity-50">
                <PiBroomBold size={48} />
              </span>
              <div className="flex flex-col pt-3 gap-1">
                {t("cs", "cleanupBasementIncludesItem1")}
                <span className="text-xs text-gray-500">
                  {t("en", "cleanupBasementIncludesItem1")}
                </span>
                <span className="text-xs text-gray-500">
                  {t("uk", "cleanupBasementIncludesItem1")}
                </span>
              </div>
            </div>
            <div className="flex flex-row flex-nowrap items-center gap-5 pr-10 text-gray-700">
              <span className="text-[#0C7779] opacity-50">
                <TbStairs size={48} />
              </span>
              <div className="flex flex-col pt-3 gap-1">
                {t("cs", "cleanupBasementIncludesItem2")}
                <span className="text-xs text-gray-500">
                  {t("en", "cleanupBasementIncludesItem2")}
                </span>
                <span className="text-xs text-gray-500">
                  {t("uk", "cleanupBasementIncludesItem2")}
                </span>
              </div>
            </div>
            <div className="flex flex-row flex-nowrap items-center gap-5 pr-10 text-gray-700">
              <span className="text-[#0C7779] opacity-50">
                <PiSnowflakeBold size={48} />
              </span>
              <div className="flex flex-col pt-3 gap-1">
                {t("cs", "cleanupBasementIncludesItem3")}
                <span className="text-xs text-gray-500">
                  {t("en", "cleanupBasementIncludesItem3")}
                </span>
                <span className="text-xs text-gray-500">
                  {t("uk", "cleanupBasementIncludesItem3")}
                </span>
              </div>
            </div>
          </div>
        </div>
        <div className="w-full rounded-lg bg-red-400 grid place-items-center p-20 text-center">
          <div className="">
            <div className="mb-5">
              <h3 className="text-white text-5xl font-bold mb-4">
                {t("cs", "liveSchedule")}
              </h3>
              <h3 className="text-white/50 text-2xl">
                {t("en", "liveSchedule")}
              </h3>
              <h3 className="text-white/50 text-2xl">
                {t("uk", "liveSchedule")}
              </h3>
            </div>

            <div>
              <p className="text-white/80 text-xl mb-3">
                {t("cs", "liveScheduleDesc")}
              </p>
              <p className="text-white/50 text-base">
                {t("en", "liveScheduleDesc")}
              </p>
              <p className="text-white/50 text-base">
                {t("uk", "liveScheduleDesc")}
              </p>
            </div>

            <div className="bg-white aspect-square rounded-lg w-60 mx-auto mt-10"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PosterExport;
