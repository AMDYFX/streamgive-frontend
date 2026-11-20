import { render, screen } from '@testing-library/react';
import { getLocale } from 'next-intl/server';
import { describe, expect, it, vi } from 'vitest';

import { loadPlatformImpact } from '@/lib/impact';

import { StatsStrip } from './StatsStrip';

vi.mock('@/lib/impact', () => ({
  loadPlatformImpact: vi.fn(),
}));

vi.mock('next-intl/server', () => ({
  getLocale: vi.fn(),
}));

describe('StatsStrip', () => {
  it('renders null when the API is unreachable, instead of zeros or an error', async () => {
    vi.mocked(loadPlatformImpact).mockRejectedValue(new Error('backend unreachable'));

    await expect(StatsStrip()).resolves.toBeNull();
  });

  it.each([
    ['en', '12,345.6789012', '23,456', '34,567'],
    ['es', '12.345,6789012', '23.456', '34.567'],
  ])(
    'renders the stats in the selected %s locale',
    async (locale, committed, streams, ngos) => {
      vi.mocked(getLocale).mockResolvedValue(locale);
      vi.mocked(loadPlatformImpact).mockResolvedValue({
        totalCommitted: 123456789012n,
        totalWithdrawn: 0n,
        activeStreams: 23456,
        ngoCount: 34567,
      });

      render(await StatsStrip());

      expect(screen.getByText(committed)).toBeInTheDocument();
      expect(screen.getByText(streams)).toBeInTheDocument();
      expect(screen.getByText(ngos)).toBeInTheDocument();
    },
  );
});
