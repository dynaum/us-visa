'use client';

import { useLocale } from 'next-intl';
import { useRouter, usePathname } from 'next/navigation';
import { routing } from '@/i18n/routing';

export function LocaleSwitcher() {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  if (routing.locales.length < 2) return null;

  return (
    <select
      aria-label="Locale"
      value={locale}
      onChange={(e) => {
        const next = e.target.value;
        const stripped = pathname.replace(new RegExp(`^/${locale}`), '') || '/';
        router.push(`/${next}${stripped === '/' ? '' : stripped}`);
      }}
      className="rounded-md border border-[var(--border-strong)] bg-white px-2.5 py-1.5 text-xs font-semibold uppercase tracking-wider text-[var(--foreground-muted)]"
    >
      {routing.locales.map((l) => (
        <option key={l} value={l}>
          {l}
        </option>
      ))}
    </select>
  );
}
