import { render } from '@testing-library/react';
import { NextIntlClientProvider } from 'next-intl';
import type { ComponentProps, ReactElement } from 'react';

import en from '../../messages/en.json';
import es from '../../messages/es.json';

export function renderWithIntl(element: ReactElement, locale: 'en' | 'es' = 'en') {
  // The landing-page steps are arrays used through t.raw(), which the
  // message type does not represent even though next-intl supports them.
  const messages = (locale === 'en' ? en : es) as unknown as NonNullable<
    ComponentProps<typeof NextIntlClientProvider>['messages']
  >;
  return render(
    <NextIntlClientProvider locale={locale} messages={messages}>
      {element}
    </NextIntlClientProvider>,
  );
}
