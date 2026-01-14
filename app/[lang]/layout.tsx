import "@/app/globals.css";
import type { ReactNode } from "react";
import { isLang, type Lang, LANGS, DEFAULT_LANG } from "@/lib/i18n";

export const metadata = {
  robots: { index: false, follow: false },
};

export default async function LangLayout(props: {
  children: ReactNode;
  params: Promise<{ lang: string }>;
}) {
  const { lang: langRaw } = await props.params;
  const lang: Lang = isLang(langRaw) ? langRaw : DEFAULT_LANG;

  return (
    <html lang={lang}>
      <body>
        <div className="mx-auto p-4 md:p-8">
          <div className="mb-6 flex items-center justify-end gap-3 no-print">
            <div className="flex gap-2">
              {LANGS.map((l) => (
                <a
                  key={l}
                  href={`/${l}`}
                  className={[
                    "rounded-lg px-3 py-1 text-sm bg-amber-400/20 hover:bg-amber-500/30 transition-colors",
                    l === lang
                      ? "font-semibold bg-amber-500 hover:bg-amber-600"
                      : "",
                  ].join(" ")}
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={`/${l}.png`}
                    alt={l.toUpperCase()}
                    className="h-full w-full object-cover"
                  />
                </a>
              ))}
            </div>
          </div>

          {props.children}
        </div>
      </body>
    </html>
  );
}
