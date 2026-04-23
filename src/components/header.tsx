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
    <header className="sticky top-0 z-20 border-b border-[var(--border-subtle)] bg-white/90 backdrop-blur-md supports-[backdrop-filter]:bg-white/75">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-14 items-center justify-between gap-4 sm:h-16">
          <Link
            href={base}
            className="flex flex-none items-center gap-2.5 text-[var(--foreground)]"
          >
            <span
              aria-hidden
              className="grid h-8 w-8 place-items-center rounded-md bg-[var(--foreground)] text-[11px] font-bold tracking-wider text-white"
            >
              US
            </span>
            <span className="font-[family-name:var(--font-newsreader)] text-lg font-medium tracking-tight sm:text-xl">
              Visa Guide
            </span>
          </Link>

          <nav
            className="hidden items-center gap-1 text-sm md:flex"
            aria-label="Navegação principal"
          >
            {links.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className="rounded-md px-3 py-2 font-medium text-[var(--foreground-muted)] transition-colors hover:bg-[var(--surface-muted)] hover:text-[var(--foreground)]"
              >
                {l.label}
              </Link>
            ))}
          </nav>

          <LocaleSwitcher />
        </div>

        <nav
          className="-mx-4 flex gap-1 overflow-x-auto border-t border-[var(--border-subtle)] px-4 py-2 text-sm md:hidden"
          aria-label="Navegação principal"
        >
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="flex-none rounded-md px-3 py-1.5 font-medium text-[var(--foreground-muted)] transition-colors hover:bg-[var(--surface-muted)] hover:text-[var(--foreground)]"
            >
              {l.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
