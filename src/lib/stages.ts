export const STAGE_IDS = ['mrv-fee', 'ds-160', 'scheduling', 'documents', 'interview'] as const;
export type StageId = (typeof STAGE_IDS)[number];

export type Stage = {
  id: StageId;
  slug: StageId;
  order: number;
};

export const STAGES: readonly Stage[] = STAGE_IDS.map((id, i) => ({
  id,
  slug: id,
  order: i,
}));

export const stageIds = STAGES.map((s) => s.id);

export function getStageIndex(id: StageId): number {
  return STAGES.findIndex((s) => s.id === id);
}

export function getStageBySlug(slug: string): Stage | undefined {
  return STAGES.find((s) => s.slug === slug);
}
