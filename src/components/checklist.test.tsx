import { describe, it, expect, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Checklist } from './checklist';
import { CHECKLIST_GROUPS } from '../content/pt-BR/checklist-items';

beforeEach(() => localStorage.clear());

describe('Checklist', () => {
  it('renders every item from every group', () => {
    render(<Checklist groups={CHECKLIST_GROUPS} />);
    const totalItems = CHECKLIST_GROUPS.reduce((sum, g) => sum + g.items.length, 0);
    expect(screen.getAllByRole('checkbox')).toHaveLength(totalItems);
  });

  it('persists toggled items across unmount', async () => {
    const user = userEvent.setup();
    const { unmount } = render(<Checklist groups={CHECKLIST_GROUPS} />);
    const box = screen.getByLabelText(/Passaporte válido/i) as HTMLInputElement;
    await user.click(box);
    expect(box.checked).toBe(true);

    unmount();
    render(<Checklist groups={CHECKLIST_GROUPS} />);
    const after = screen.getByLabelText(/Passaporte válido/i) as HTMLInputElement;
    expect(after.checked).toBe(true);
  });
});
