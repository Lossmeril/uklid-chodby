import { LevelTable } from "@/components/LevelTable";
import { FLATS, SCHEDULE_START_FRIDAY, WEEKS_TO_SHOW } from "@/lib/config";
import { parseYMD } from "@/lib/date";
import { buildWeeks } from "@/lib/schedule";
import { isLang, type Lang, DEFAULT_LANG, t } from "@/lib/i18n";

export default async function PrintPage(props: {
  params: Promise<{ lang: string }>;
}) {
  const { lang: langRaw } = await props.params;
  const lang: Lang = isLang(langRaw) ? langRaw : DEFAULT_LANG;

  const startFriday = parseYMD(SCHEDULE_START_FRIDAY);
  const weeks = buildWeeks({ startFriday, weeksToShow: WEEKS_TO_SHOW });

  return (
    <main className="p-4">
      <div className="no-print mb-4 rounded-2xl border p-4">
        <div className="text-lg font-semibold">
          {t(lang, "printInstructionsTitle")}
        </div>
        <ul className="mt-2 list-disc pl-5 text-sm text-gray-700">
          <li>{t(lang, "printInstructions1")}</li>
          <li>{t(lang, "printInstructions2")}</li>
          <li>{t(lang, "printInstructions3")}</li>
          <li>{t(lang, "printInstructions4")}</li>
        </ul>
      </div>

      <LevelTable lang={lang} level={1} flats={FLATS} weeks={weeks} />
      <LevelTable lang={lang} level={2} flats={FLATS} weeks={weeks} />
      <LevelTable lang={lang} level={3} flats={FLATS} weeks={weeks} />
      <LevelTable lang={lang} level={4} flats={FLATS} weeks={weeks} />
    </main>
  );
}
