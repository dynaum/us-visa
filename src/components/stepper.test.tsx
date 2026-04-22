import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { NextIntlClientProvider } from 'next-intl';
import { Stepper } from './stepper';
import messages from '../../messages/pt-BR.json';

function wrap(ui: React.ReactNode) {
  return (
    <NextIntlClientProvider locale="pt-BR" messages={messages}>
      {ui}
    </NextIntlClientProvider>
  );
}

describe('Stepper', () => {
  it('marks the active stage with aria-current=step', () => {
    render(wrap(<Stepper activeStageId="ds-160" />));
    const active = screen.getByRole('link', { current: 'step' });
    expect(active).toHaveTextContent(/DS-160/i);
  });

  it('renders a link for every stage', () => {
    render(wrap(<Stepper activeStageId="mrv-fee" />));
    expect(screen.getAllByRole('link')).toHaveLength(5);
  });
});
