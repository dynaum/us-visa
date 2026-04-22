import { describe, it, expect, beforeEach } from 'vitest';
import {
  readChecklist,
  writeChecklist,
  readInterview,
  writeInterview,
  toggleChecklistItem,
  togglePracticed,
} from './progress';

beforeEach(() => {
  localStorage.clear();
});

describe('checklist state', () => {
  it('returns empty object when nothing is stored', () => {
    expect(readChecklist()).toEqual({});
  });

  it('roundtrips a written value', () => {
    writeChecklist({ passport: true, photo: false });
    expect(readChecklist()).toEqual({ passport: true, photo: false });
  });

  it('resets state when storage is corrupt', () => {
    localStorage.setItem('us-visa.checklist.v1', 'not-json');
    expect(readChecklist()).toEqual({});
  });

  it('resets state when stored JSON fails schema validation', () => {
    localStorage.setItem('us-visa.checklist.v1', JSON.stringify({ passport: 'yes' }));
    expect(readChecklist()).toEqual({});
  });

  it('toggleChecklistItem flips a single key and persists', () => {
    toggleChecklistItem('passport');
    expect(readChecklist()).toEqual({ passport: true });
    toggleChecklistItem('passport');
    expect(readChecklist()).toEqual({ passport: false });
  });
});

describe('interview state', () => {
  it('returns empty set of practiced ids when nothing stored', () => {
    expect(readInterview()).toEqual({ practiced: [] });
  });

  it('roundtrips a written value', () => {
    writeInterview({ practiced: ['q1', 'q2'] });
    expect(readInterview()).toEqual({ practiced: ['q1', 'q2'] });
  });

  it('togglePracticed adds then removes an id', () => {
    togglePracticed('q1');
    expect(readInterview().practiced).toEqual(['q1']);
    togglePracticed('q1');
    expect(readInterview().practiced).toEqual([]);
  });
});
