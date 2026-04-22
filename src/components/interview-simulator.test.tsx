import { describe, it, expect, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { NextIntlClientProvider } from 'next-intl';
import { InterviewSimulator } from './interview-simulator';
import { INTERVIEW_QUESTIONS } from '../content/pt-BR/interview-questions';
import messages from '../../messages/pt-BR.json';

beforeEach(() => localStorage.clear());

function wrap(ui: React.ReactNode) {
  return (
    <NextIntlClientProvider locale="pt-BR" messages={messages}>
      {ui}
    </NextIntlClientProvider>
  );
}

describe('InterviewSimulator', () => {
  it('starts with the first question', () => {
    render(wrap(<InterviewSimulator questions={INTERVIEW_QUESTIONS} />));
    expect(screen.getByText(INTERVIEW_QUESTIONS[0].pt)).toBeInTheDocument();
  });

  it('advances to the next question', async () => {
    const user = userEvent.setup();
    render(wrap(<InterviewSimulator questions={INTERVIEW_QUESTIONS} />));
    await user.click(screen.getByRole('button', { name: /Próxima/i }));
    expect(screen.getByText(INTERVIEW_QUESTIONS[1].pt)).toBeInTheDocument();
  });

  it('persists practiced state across unmount', async () => {
    const user = userEvent.setup();
    const { unmount } = render(wrap(<InterviewSimulator questions={INTERVIEW_QUESTIONS} />));
    await user.click(screen.getByRole('checkbox', { name: /Marcar como praticada/i }));

    unmount();
    render(wrap(<InterviewSimulator questions={INTERVIEW_QUESTIONS} />));
    const box = screen.getByRole('checkbox', {
      name: /Marcar como praticada/i,
    }) as HTMLInputElement;
    expect(box.checked).toBe(true);
  });
});
