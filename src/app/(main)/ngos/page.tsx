import type { Metadata } from 'next';
import Link from 'next/link';
import { getTranslations } from 'next-intl/server';
import { Suspense } from 'react';

import { NgoExplorer } from '@/components/ngos/NgoExplorer';
import { getNgo, getNgos, type NgoProfile } from '@/lib/api';

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations('Explorer');
  return { title: t('heading'), description: t('description') };
}

export default async function NgosPage() {
  const t = await getTranslations('Explorer');
  let ngos: NgoProfile[] = [];
  let loadError = false;

  try {
    const list = await getNgos();
    // No aggregate stats on the list endpoint — fetch each profile for its
    // stats. Same N+1 tradeoff already accepted on the platform impact page.
    //
    // allSettled, not all: one NGO's profile 5xx-ing or timing out must not
    // blank out the entire explorer (issue #213) — the rest of the list
    // still loaded fine and should still render.
    const results = await Promise.allSettled(list.map((ngo) => getNgo(ngo.id)));
    ngos = results
      .filter(
        (result): result is PromiseFulfilledResult<NgoProfile | null> =>
          result.status === 'fulfilled',
      )
      .map((result) => result.value)
      .filter((profile): profile is NgoProfile => profile !== null);
  } catch {
    loadError = true;
  }

  return (
    <main id="main" className="px-6 py-16 sm:px-12">
        <h1 className="text-2xl font-bold">{t('heading')}</h1>

        {loadError && (
          <div className="mt-4">
            <p className="text-red-600 dark:text-red-400">
              {t('loadError')}
            </p>
            <Link
              href="/ngos"
              className="mt-3 inline-block rounded-md border border-gray-300 px-4 py-2 text-sm font-medium hover:bg-gray-50 dark:border-gray-700 dark:hover:bg-gray-800"
            >
              {t('retry')}
            </Link>
          </div>
        )}

        {!loadError && (
          // NgoExplorer reads useSearchParams() to restore/sync filters in
          // the URL, which requires a Suspense boundary — otherwise it
          // forces the whole route into client-side rendering.
          <Suspense fallback={null}>
            <NgoExplorer ngos={ngos} />
          </Suspense>
        )}
      </main>
  );
}
