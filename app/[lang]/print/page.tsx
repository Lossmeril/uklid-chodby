import { LevelTable } from "@/components/LevelTable";
import { FLATS, SCHEDULE_START_FRIDAY } from "@/lib/config";
import { parseYMD } from "@/lib/date";
import { buildWeeksForYear } from "@/lib/schedule"; // or wherever you put it
import { isLang, type Lang, DEFAULT_LANG, t } from "@/lib/i18n";

export default async function PrintPage(props: {
  params: Promise<{ lang: string }>;
}) {
  const { lang: langRaw } = await props.params;
  const lang: Lang = isLang(langRaw) ? langRaw : DEFAULT_LANG;

  const startFriday = parseYMD(SCHEDULE_START_FRIDAY);

  // Pick year from the start date (or hardcode)
  const year = startFriday.getUTCFullYear();
  const weeks = buildWeeksForYear({ startFriday, year });

  return (
    <main className="p-4">
      {/* ...instructions... */}
      <LevelTable lang={lang} level={1} flats={FLATS} weeks={weeks} />
      <LevelTable lang={lang} level={2} flats={FLATS} weeks={weeks} />
      <LevelTable lang={lang} level={3} flats={FLATS} weeks={weeks} />
      <LevelTable lang={lang} level={4} flats={FLATS} weeks={weeks} />
    </main>
  );
}
