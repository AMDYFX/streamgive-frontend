import { screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { renderWithIntl } from '@/test/renderWithIntl';

import { ApplicationStatusPanel } from './ApplicationStatusPanel';

describe('ApplicationStatusPanel', () => {
  it('shows the pending state', () => {
    renderWithIntl(<ApplicationStatusPanel application={{ status: 'PENDING', reviewNote: null }} />);

    expect(screen.getByText(/pending review/i)).toBeInTheDocument();
  });

  it('shows the approved state with a link to the NGO admin page', () => {
    renderWithIntl(<ApplicationStatusPanel application={{ status: 'APPROVED', reviewNote: null }} />);

    expect(screen.getByText(/has been approved/i)).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'manage your streams' })).toHaveAttribute(
      'href',
      '/ngo-admin',
    );
  });

  it('shows the rejected state with the reviewer note', () => {
    renderWithIntl(
      <ApplicationStatusPanel
        application={{ status: 'REJECTED', reviewNote: 'Missing registration documents.' }}
      />,
    );

    expect(screen.getByText(/was not approved/i)).toBeInTheDocument();
    expect(screen.getByText(/Missing registration documents\./)).toBeInTheDocument();
  });

  it('omits the note line when a rejection has no reviewer note', () => {
    renderWithIntl(<ApplicationStatusPanel application={{ status: 'REJECTED', reviewNote: null }} />);

    expect(screen.queryByText(/reviewer's note/i)).not.toBeInTheDocument();
  });

  it('shows the approved state in Spanish', () => {
    renderWithIntl(
      <ApplicationStatusPanel application={{ status: 'APPROVED', reviewNote: null }} />,
      'es',
    );

    expect(screen.getByText('Tu solicitud ha sido aprobada.')).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'administrar tus flujos' })).toHaveAttribute(
      'href',
      '/ngo-admin',
    );
  });
});
