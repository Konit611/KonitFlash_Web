import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getDictionary, hasLocale } from "../dictionaries";

export async function generateMetadata({
  params,
}: PageProps<"/[lang]/guides">): Promise<Metadata> {
  const { lang } = await params;
  if (!hasLocale(lang)) return {};
  const dict = await getDictionary(lang);
  return { title: dict.meta.guides.title };
}

export default async function GuidesPage({
  params,
}: PageProps<"/[lang]/guides">) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const dict = await getDictionary(lang);

  return (
    <section className="mx-auto w-full max-w-5xl px-6 py-20">
      <header className="flex flex-col gap-3">
        <span className="text-xs font-medium uppercase tracking-wider text-brand-mint">
          {dict.guidesPage.eyebrow}
        </span>
        <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">
          {dict.guidesPage.heading}
        </h1>
        <p className="max-w-xl text-zinc-300">{dict.guidesPage.description}</p>
      </header>
    </section>
  );
}
