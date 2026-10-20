import type { Captions, Effects, Format, Pace } from '../options';

/** Every piece of request text that depends on the interface language. */
export type RequestPhrases = {
  folderLabel: string;
  folderPlaceholder: string;
  goalLabel: string;
  defaultGoal: string;
  formatLabel: string;
  paceLabel: string;
  captionsLabel: string;
  visualsLabel: string;
  sceneReference: (reference: string) => string;
  cleanupLabel: string;
  /** The contextual editorial policy (AGENTS.md). English is canonical; translations keep every clause. */
  cleanup: string;
  closing: string;
  formats: Record<Format, string>;
  paces: Record<Pace, string>;
  captions: Record<Captions, string>;
  effects: Record<Effects, string>;
};
