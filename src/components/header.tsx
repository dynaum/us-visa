import Link from 'next/link';
import { useLocale, useTranslations } from 'next-intl';
import { LocaleSwitcher } from './locale-switcher';

export function Header() {
  const locale = useLocale();
  const t = useTranslations('nav');
  const base = `/${locale}`;

  const links = [
    { href: `${base}`, label: t('home') },
    { href: `${base}/guide`, label: t('guide') },
    { href: `${base}/tools/checklist`, label: t('checklist') },
    { href: `${base}/tools/interview-simulator`, label: t('simulator') },
  ];

  return (
    <header className="border-b">
      <div className="mx-auto flex max-w-5xl flex-wrap items-center justify-between gap-4 px-4 py-3">
        <Link href={base} className="font-semibold">
          US Visa Guide
        </Link>
        <nav className="flex flex-wrap gap-4 text-sm">
          {links.map((l) => (
            <Link key={l.href} href={l.href} className="hover:underline">
              {l.label}
            </Link>
          ))}
        </nav>
        <LocaleSwitcher />
      </div>
    </header>
  );
}
