import "@/app/globals.css";
import type { ReactNode } from "react";
import { isLang, type Lang, LANGS, DEFAULT_LANG } from "@/lib/i18n";

export default async function LangLayout(props: {
  children: ReactNode;
  params: Promise<{ lang: string }>;
}) {
  const { lang: langRaw } = await props.params;
  const lang: Lang = isLang(langRaw) ? langRaw : DEFAULT_LANG;

  return (
    <html lang={lang}>
      <body>
        <div className="mx-auto max-w-5xl p-4 md:p-8">
          <div className="mb-6 flex items-center justify-between gap-3">
            <div className="text-sm text-gray-600">Language:</div>
            <div className="flex gap-2">
              {LANGS.map((l) => (
                <a
                  key={l}
                  href={`/${l}`}
                  className={[
                    "rounded-xl border px-3 py-1 text-sm",
                    l === lang ? "font-semibold bg-gray-100" : "",
                  ].join(" ")}
                >
                  {l.toUpperCase()}
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
