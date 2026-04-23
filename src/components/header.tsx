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
    <header className="sticky top-0 z-20 border-b border-[var(--border-subtle)] bg-[var(--background)]/85 backdrop-blur-md">
      <div className="mx-auto max-w-5xl px-4 py-3 sm:px-6">
        <div className="flex items-center justify-between gap-3">
          <Link
            href={base}
            className="flex flex-none items-center gap-2 font-semibold tracking-tight"
          >
            <span
              aria-hidden
              className="grid h-8 w-8 place-items-center rounded-xl bg-gradient-to-br from-brand-500 to-brand-700 text-sm font-bold text-white shadow-sm"
            >
              US
            </span>
            <span className="font-[family-name:var(--font-fraunces)] text-base sm:text-lg">
              Visa Guide
            </span>
          </Link>
          <LocaleSwitcher />
        </div>
        <nav
          className="-mx-4 mt-2 flex gap-1 overflow-x-auto px-4 text-sm sm:mx-0 sm:mt-3 sm:px-0"
          aria-label="Main"
        >
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="flex-none rounded-full border border-transparent px-3 py-1.5 font-semibold text-neutral-700 transition-colors hover:border-[var(--border-subtle)] hover:bg-[var(--surface-muted)] hover:text-[var(--foreground)]"
            >
              {l.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
