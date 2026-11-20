'use client';

import Link from 'next/link';
import { useTranslations } from 'next-intl';

import type { NgoApplicationStatus } from '@/lib/api';

const PANEL_STYLES = {
  PENDING:
    'border-yellow-200 bg-yellow-50 text-yellow-900 dark:border-yellow-900 dark:bg-yellow-950 dark:text-yellow-200',
  APPROVED:
    'border-green-200 bg-green-50 text-green-900 dark:border-green-900 dark:bg-green-950 dark:text-green-200',
  REJECTED:
    'border-red-200 bg-red-50 text-red-900 dark:border-red-900 dark:bg-red-950 dark:text-red-200',
} as const;

export function ApplicationStatusPanel({ application }: { application: NgoApplicationStatus }) {
  const t = useTranslations('ApplicationStatus');
  return (
    <div
      role="status"
      className={`mt-8 max-w-md rounded-lg border p-6 ${PANEL_STYLES[application.status]}`}
    >
      {application.status === 'PENDING' && (
        <>
          <p className="font-medium">{t('pending')}</p>
          <p className="mt-1 text-sm">
            {t('pendingHelp')}
          </p>
        </>
      )}

      {application.status === 'APPROVED' && (
        <>
          <p className="font-medium">{t('approved')}</p>
          <p className="mt-1 text-sm">
            {t('approvedBeforeLink')}{' '}
            <Link href="/ngo-admin" className="underline">
              {t('manageStreams')}
            </Link>
            {t('approvedAfterLink')}
          </p>
        </>
      )}

      {application.status === 'REJECTED' && (
        <>
          <p className="font-medium">{t('rejected')}</p>
          {application.reviewNote && (
            <p className="mt-1 text-sm">{t('reviewerNote', { note: application.reviewNote })}</p>
          )}
        </>
      )}
    </div>
  );
}
