import { render } from '@testing-library/react';
import { NextIntlClientProvider } from 'next-intl';

import messages from '../messages/en.json';

export function renderWithLocale(ui: React.ReactElement) {
  return render(
    <NextIntlClientProvider locale="en" messages={{ LocaleSwitcher: messages.LocaleSwitcher }}>
      {ui}
    </NextIntlClientProvider>,
  );
}
