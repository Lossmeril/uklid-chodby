export const LANGS = ["cs", "en", "uk"] as const;
export type Lang = (typeof LANGS)[number];

export const DEFAULT_LANG: Lang = "cs";

export function isLang(x: string): x is Lang {
  return (LANGS as readonly string[]).includes(x);
}

type Dict = Record<string, string>;

export const dict: Record<Lang, Dict> = {
  cs: {
    appTitle: "Úklid – rozpis",
    dashboardTitle: "Nástěnka úklidu",
    today: "Dnes",
    currentWeek: "Aktuálně",
    week: "Týden",
    weekend: "Víkend",
    task: "Úkol",
    cleanHallway: "Úklid chodby (Pá/So/Ne)",
    cleanBasement: "Úklid sklepa",
    basement: "Sklep (celý dům)",
    level: "Patro",
    printSchedule: "Tisknutelný rozpis",
    printHint: "(vytiskne 4× A4 na šířku)",
    printInstructionsTitle: "Instrukce pro tisk",
    printInstructions1: "Otevřete tisk (Ctrl/Cmd + P)",
    printInstructions2: "Papír: A4",
    printInstructions3: "Orientace: na šířku",
    printInstructions4: "Okraje: výchozí (nebo minimální)",
    levelTitle: "Patro {level} — úklid chodby",
    levelSubtitle: "Každý byt uklízí jednou za 3 týdny (víkend).",
    thWeek: "Týden",
    thWeekend: "Víkend",
    thBasement: "Sklep (celý dům)",
    cleanThisLevel: "✅ Úklid tohoto patra",
    basementRotates: "Sklep rotuje byty 1–12 (každý byt jednou za 12 týdnů).",
    scanToOpen: "Naskenujte pro otevření nástěnky",
    flat: "Byt",
  },
  en: {
    appTitle: "Cleaning – schedule",
    dashboardTitle: "Cleaning dashboard",
    today: "Today",
    currentWeek: "Current",
    week: "Week",
    weekend: "Weekend",
    task: "Task",
    cleanHallway: "Clean hallway (Fri/Sat/Sun)",
    cleanBasement: "Clean basement",
    basement: "Basement (whole building)",
    level: "Level",
    printSchedule: "Print-friendly schedule",
    printHint: "(prints 4× A4 landscape)",
    printInstructionsTitle: "Print instructions",
    printInstructions1: "Open print dialog (Ctrl/Cmd + P)",
    printInstructions2: "Paper size: A4",
    printInstructions3: "Orientation: Landscape",
    printInstructions4: "Margins: Default (or Minimum)",
    levelTitle: "Level {level} — Hallway Cleaning",
    levelSubtitle: "Each flat cleans once every 3 weeks (weekend).",
    thWeek: "Week",
    thWeekend: "Weekend",
    thBasement: "Basement (whole building)",
    cleanThisLevel: "✅ Clean this level",
    basementRotates:
      "Basement rotates through flats 1–12 (each flat once every 12 weeks).",
    scanToOpen: "Scan to open dashboard",
    flat: "Flat",
  },
  uk: {
    appTitle: "Прибирання — графік",
    dashboardTitle: "Панель прибирання",
    today: "Сьогодні",
    currentWeek: "Поточний",
    week: "Тиждень",
    weekend: "Вихідні",
    task: "Завдання",
    cleanHallway: "Прибрати коридор (Пт/Сб/Нд)",
    cleanBasement: "Прибрати підвал",
    basement: "Підвал (увесь будинок)",
    level: "Поверх",
    printSchedule: "Версія для друку",
    printHint: "(друк 4× A4 альбом)",
    printInstructionsTitle: "Інструкції для друку",
    printInstructions1: "Відкрийте друк (Ctrl/Cmd + P)",
    printInstructions2: "Папір: A4",
    printInstructions3: "Орієнтація: альбомна",
    printInstructions4: "Поля: стандартні (або мінімальні)",
    levelTitle: "Поверх {level} — прибирання коридору",
    levelSubtitle: "Кожна квартира прибирає раз на 3 тижні (вихідні).",
    thWeek: "Тиждень",
    thWeekend: "Вихідні",
    thBasement: "Підвал (увесь будинок)",
    cleanThisLevel: "✅ Прибрати цей поверх",
    basementRotates:
      "Підвал: ротація квартир 1–12 (кожна квартира раз на 12 тижнів).",
    scanToOpen: "Скануйте, щоб відкрити панель",
    flat: "Квартира",
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
