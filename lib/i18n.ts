export const LANGS = ["cs", "en", "uk"] as const;
export type Lang = (typeof LANGS)[number];

export const DEFAULT_LANG: Lang = "cs";

export function isLang(x: string): x is Lang {
  return (LANGS as readonly string[]).includes(x);
}

type Dict = Record<string, string>;

export const dict: Record<Lang, Dict> = {
  cs: {
    appTitle: "Rozpis úklidů chodby Dukelská 322",
    dashboardTitle: "Tento týden uklízí",
    today: "Dnes",
    currentWeek: "Úklid tento týden",
    week: "týden",
    weekend: "Víkend",
    thisWeekCleans: "Tento týden uklízí",
    basement: "sklep",
    snow: "sníh",
    includingBasementAndSnow: "vč. sklepa a sněhu",
    level: "Patro",
    printSchedule: "Tisknutelný rozpis",

    levelSubtitle:
      "Každý byt uklízí chobu jednou za 3 týdny (o víkendu). Úklidem se rozumí úklid chodby včetně mezipatra a dvou schodišť směrem dolů.",
    cleanupIncludes: "Úklid zahrnuje:",
    cleanupIncludesItem1: "zametení a vytření podlahy",
    cleanupIncludesItem2: "otření zábradlí, včetně kovové konstrukce",
    cleanupIncludesItem3:
      "vymetení oklepávací rohože u vchodu (pouze první patro)",

    cleanupBasement: "Úklid sklepa",
    cleanupBasementIncludes:
      "Úklid sklepa, který se opakuje každých 12 týdnů, zahrnuje:",
    cleanupBasementIncludesItem1: "vymetení a vytření podlahy ve sklepě",
    cleanupBasementIncludesItem2:
      "vymetení a vytření schodů vedoucích do sklepa, včetně ramp pro kočárky",
    cleanupBasementIncludesItem3:
      "úklid sněhu na chodníku před vchodem (pokud je potřeba)",

    liveSchedule: "Živý rozpis",
    liveScheduleDesc:
      "Podívejte se na aktuální rozpis úklidů chodby na tento týden online:",
  },
  en: {
    appTitle: "Hallway cleaning schedule – Dukelská 322",
    dashboardTitle: "This week cleans",
    today: "Today",
    currentWeek: "Cleaning this week",
    week: "week",
    weekend: "Weekend",
    thisWeekCleans: "This week cleans",
    basement: "basement",
    snow: "snow",
    includingBasementAndSnow: "including basement and snow",
    level: "Level",
    printSchedule: "Printable schedule",

    levelSubtitle:
      "Each flat cleans the hallway once every 3 weeks (on the weekend). Cleaning means cleaning the hallway including the mezzanine and the two staircases going downwards.",
    cleanupIncludes: "Cleaning includes:",
    cleanupIncludesItem1: "sweeping and mopping the floor",
    cleanupIncludesItem2: "wiping handrails, including the metal structure",
    cleanupIncludesItem3:
      "cleaning the doormat at the entrance (first floor only)",

    cleanupBasement: "Basement cleaning",
    cleanupBasementIncludes:
      "Basement cleaning, which repeats every 12 weeks, includes:",
    cleanupBasementIncludesItem1: "sweeping and mopping the basement floor",
    cleanupBasementIncludesItem2:
      "sweeping and mopping the stairs leading to the basement, including stroller ramps",
    cleanupBasementIncludesItem3:
      "snow removal on the sidewalk in front of the entrance (if necessary)",

    liveSchedule: "Live schedule",
    liveScheduleDesc:
      "View the current hallway cleaning schedule for this week online:",
  },

  uk: {
    appTitle: "Графік прибирання коридору Dukelská 322",
    dashboardTitle: "Цього тижня прибирають",
    today: "Сьогодні",
    currentWeek: "Прибирання цього тижня",
    week: "тиждень",
    weekend: "Вихідні",
    thisWeekCleans: "Цього тижня прибирають",
    basement: "підвал",
    snow: "сніг",
    includingBasementAndSnow: "включно з підвалом та снігом",
    level: "Поверх",
    printSchedule: "Версія для друку",

    levelSubtitle:
      "Кожна квартира прибирає коридор раз на 3 тижні (у вихідні). Прибирання включає коридор, мезонін та два сходові прольоти вниз.",
    cleanupIncludes: "Прибирання включає:",
    cleanupIncludesItem1: "підмітання та миття підлоги",
    cleanupIncludesItem2:
      "протирання поручнів, включно з металевою конструкцією",
    cleanupIncludesItem3:
      "очищення килимка для вибивання біля входу (лише перший поверх)",

    cleanupBasement: "Прибирання підвалу",
    cleanupBasementIncludes:
      "Прибирання підвалу, яке повторюється кожні 12 тижнів, включає:",
    cleanupBasementIncludesItem1: "підмітання та миття підлоги в підвалі",
    cleanupBasementIncludesItem2:
      "підмітання та миття сходів, що ведуть до підвалу, включно з пандусами для візків",
    cleanupBasementIncludesItem3:
      "прибирання снігу на тротуарі перед входом (за потреби)",

    liveSchedule: "Онлайн-розклад",
    liveScheduleDesc:
      "Перегляньте актуальний розклад прибирання коридору на цей тиждень онлайн:",
  },
};

export function t(
  lang: Lang,
  key: keyof (typeof dict)["cs"],
  vars?: Record<string, string | number>
) {
  const template = dict[lang][key] ?? dict[DEFAULT_LANG][key] ?? String(key);
  if (!vars) return template;
  return template.replace(/\{(\w+)\}/g, (_, k) => String(vars[k] ?? `{${k}}`));
}
