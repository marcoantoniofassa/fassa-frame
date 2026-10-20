import { AGENTS, CAPTIONS, EFFECTS, FORMATS, PACES, type Agent, type Captions, type Effects, type Format, type Pace } from './options';

/** The brief a visitor fills in on the Create page; persisted in their browser. */
export type RequestDraft = {
  agent: Agent;
  folder: string;
  goal: string;
  format: Format;
  pace: Pace;
  captions: Captions;
  effects: Effects;
  sceneId: string | null;
};

/** The fields of an example that personalize a draft. */
export type ExamplePreset = { id: string; goal: string; format?: Format; effects?: Effects };

export const DEFAULT_DRAFT: RequestDraft = { agent: 'codex', folder: '', goal: '', format: 'vertical', pace: 'natural', captions: 'readable', effects: 'subtle', sceneId: null };

const MAX_TEXT = 4000;
const SCENE_ID = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
const pick = <T extends string>(list: readonly T[], value: unknown, fallback: T): T => (list.includes(value as T) ? value as T : fallback);
const text = (value: unknown) => (typeof value === 'string' ? value.slice(0, MAX_TEXT) : '');

/** Reads untrusted stored data field by field; anything invalid falls back to the default. */
export function parseDraft(value: unknown): RequestDraft {
  if (!value || typeof value !== 'object' || Array.isArray(value)) return DEFAULT_DRAFT;
  const raw = value as Record<string, unknown>;
  return {
    agent: pick(AGENTS, raw.agent, DEFAULT_DRAFT.agent),
    folder: text(raw.folder),
    goal: text(raw.goal),
    format: pick(FORMATS, raw.format, DEFAULT_DRAFT.format),
    pace: pick(PACES, raw.pace, DEFAULT_DRAFT.pace),
    captions: pick(CAPTIONS, raw.captions, DEFAULT_DRAFT.captions),
    effects: pick(EFFECTS, raw.effects, DEFAULT_DRAFT.effects),
    sceneId: typeof raw.sceneId === 'string' && SCENE_ID.test(raw.sceneId) ? raw.sceneId : null,
  };
}

/** Personalizes the draft with an example: its goal, and its format and visuals when it sets them. Clears the scene. */
export function applyExample(draft: RequestDraft, example: ExamplePreset): RequestDraft {
  return { ...draft, goal: example.goal, format: example.format ?? draft.format, effects: example.effects ?? draft.effects, sceneId: null };
}

/** Adds a catalog scene; a draft without visuals switches back to subtle visuals so the scene can be used. */
export function withScene(draft: RequestDraft, sceneId: string): RequestDraft {
  return { ...draft, sceneId, effects: draft.effects === 'none' ? 'subtle' : draft.effects };
}
