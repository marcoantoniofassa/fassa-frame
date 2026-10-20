import type { SceneMotif } from '@editonny/design-system';

// Schematic previews per catalog category; the real composition is rendered by the agent.
const MOTIF: Record<string, SceneMotif> = {
  Pointers: 'tarja', 'Captions and titles': 'tarja', Transitions: 'zoom', 'Image entrances': 'zoom', Neon: 'zoom',
  'Video effects': 'confete', Comedy: 'confete', Interfaces: 'chat', 'Proof cards': 'antes', 'Scene objects': 'seta',
};
const GENERAL: SceneMotif[] = ['contador', 'passos', 'antes', 'seta'];
const BACKGROUNDS = ['black', 'orange', 'volt', 'fire'] as const;

export const motifFor = (category: string, index: number): SceneMotif =>
  MOTIF[category] ?? (category.includes('panels') ? 'passos' : category.includes('demonstrations') ? 'antes' : GENERAL[index % GENERAL.length]!);

export const backgroundFor = (index: number): (typeof BACKGROUNDS)[number] => BACKGROUNDS[index % BACKGROUNDS.length]!;
