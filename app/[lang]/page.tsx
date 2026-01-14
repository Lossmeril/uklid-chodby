import { DashboardThisWeek } from "@/components/DashboardThisWeek";
import { FLATS, SCHEDULE_START_FRIDAY } from "@/lib/config";
import { parseYMD, pragueNow } from "@/lib/date";
import { isLang, type Lang, DEFAULT_LANG } from "@/lib/i18n";

export default async function DashboardPage(props: {
  params: Promise<{ lang: string }>;
}) {
  const { lang: langRaw } = await props.params;
  const lang: Lang = isLang(langRaw) ? langRaw : DEFAULT_LANG;

  const startFriday = parseYMD(SCHEDULE_START_FRIDAY);
  const now = pragueNow();

  return (
    <DashboardThisWeek
      lang={lang}
      flats={FLATS}
      startFriday={startFriday}
      now={now}
    />
  );
}
