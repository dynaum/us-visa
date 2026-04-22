import { useTranslations } from 'next-intl';

export default function HomePlaceholder() {
  const t = useTranslations('home');
  return (
    <main className="p-8">
      <h1>{t('heading')}</h1>
    </main>
  );
}
