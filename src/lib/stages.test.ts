import { describe, it, expect } from 'vitest';
import { STAGES, stageIds, getStageIndex, getStageBySlug } from './stages';

describe('stages', () => {
  it('has exactly 5 stages in the expected order', () => {
    expect(stageIds).toEqual(['mrv-fee', 'ds-160', 'scheduling', 'documents', 'interview']);
  });

  it('every stage has a unique slug equal to its id', () => {
    const slugs = STAGES.map((s) => s.slug);
    expect(new Set(slugs).size).toBe(STAGES.length);
    for (const s of STAGES) expect(s.slug).toBe(s.id);
  });

  it('getStageIndex returns zero-based position', () => {
    expect(getStageIndex('mrv-fee')).toBe(0);
    expect(getStageIndex('interview')).toBe(4);
  });

  it('getStageBySlug returns the stage or undefined', () => {
    expect(getStageBySlug('ds-160')?.id).toBe('ds-160');
    expect(getStageBySlug('nope')).toBeUndefined();
  });
});
