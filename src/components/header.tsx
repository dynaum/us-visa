import Link from 'next/link';
import { useLocale, useTranslations } from 'next-intl';
import { LocaleSwitcher } from './locale-switcher';

export function Header() {
  const locale = useLocale();
  const t = useTranslations('nav');
  const base = `/${locale}`;

  const links = [
    { href: `${base}/guide`, label: t('guide') },
    { href: `${base}/tools/checklist`, label: t('checklist') },
    { href: `${base}/tools/interview-simulator`, label: t('simulator') },
  ];

  return (
    <header className="sticky top-0 z-20 border-b border-[var(--border-subtle)] bg-[var(--background)]/80 backdrop-blur-md">
      <div className="mx-auto flex max-w-5xl flex-wrap items-center justify-between gap-4 px-4 py-3">
        <Link href={base} className="flex items-center gap-2 font-semibold tracking-tight">
          <span
            aria-hidden
            className="grid h-8 w-8 place-items-center rounded-lg bg-gradient-to-br from-brand-500 to-brand-700 text-sm font-bold text-white shadow-sm"
          >
            US
          </span>
          <span className="font-[family-name:var(--font-instrument-serif)] text-lg">Visa Guide</span>
        </Link>
        <nav className="flex flex-wrap items-center gap-1 text-sm">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="rounded-md px-3 py-1.5 font-medium text-neutral-700 transition-colors hover:bg-[var(--surface-muted)] hover:text-[var(--foreground)]"
            >
              {l.label}
            </Link>
          ))}
        </nav>
        <LocaleSwitcher />
      </div>
    </header>
  );
}
