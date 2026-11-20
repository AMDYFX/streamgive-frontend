import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations('Apply');
  return { title: t('heading'), description: t('metadataDescription') };
}

export default function ApplyLayout({ children }: { children: React.ReactNode }) {
  return children;
}
