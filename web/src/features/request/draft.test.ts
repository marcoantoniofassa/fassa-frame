import { describe, expect, it } from 'vitest';
import { applyExample, DEFAULT_DRAFT, parseDraft, withScene } from './draft';

describe('parseDraft', () => {
  it.each([null, undefined, '{bad', 42, [], 'text'])('returns the defaults for %j', value => {
    expect(parseDraft(value)).toEqual(DEFAULT_DRAFT);
  });

  it('keeps valid fields and replaces invalid or unknown ones', () => {
    const draft = parseDraft({ agent: 'claude', folder: '/Videos', goal: 7, format: 'cinema', pace: 'calm', captions: 'none', effects: 'expressive', sceneId: 'revenue-counter', extra: true });
    expect(draft).toEqual({ ...DEFAULT_DRAFT, agent: 'claude', folder: '/Videos', pace: 'calm', captions: 'none', effects: 'expressive', sceneId: 'revenue-counter' });
  });

  it('caps very long strings', () => {
    expect(parseDraft({ goal: 'a'.repeat(9000) }).goal).toHaveLength(4000);
  });

  it('rejects scene ids that are not slugs', () => {
    expect(parseDraft({ sceneId: '../etc/passwd' }).sceneId).toBeNull();
  });
});

describe('draft updates', () => {
  const example = { id: 'lesson', goal: 'Edit a lesson', format: 'horizontal', effects: 'educational' } as const;

  it('applyExample sets goal, format, and effects, clears the scene, and keeps folder and agent', () => {
    const current = { ...DEFAULT_DRAFT, agent: 'claude' as const, folder: '/Videos/Ana', sceneId: 'revenue-counter' };
    expect(applyExample(current, example)).toEqual({ ...current, goal: 'Edit a lesson', format: 'horizontal', effects: 'educational', sceneId: null });
    expect(current.sceneId).toBe('revenue-counter');
  });

  it('applyExample keeps the current format and effects when the example has none', () => {
    const current = { ...DEFAULT_DRAFT, format: 'square' as const, effects: 'expressive' as const };
    expect(applyExample(current, { id: 'review', goal: 'Review' })).toMatchObject({ format: 'square', effects: 'expressive', goal: 'Review' });
  });

  it('withScene selects the scene and turns visuals back on', () => {
    expect(withScene({ ...DEFAULT_DRAFT, effects: 'none' }, 'revenue-counter')).toMatchObject({ sceneId: 'revenue-counter', effects: 'subtle' });
    expect(withScene({ ...DEFAULT_DRAFT, effects: 'educational' }, 'revenue-counter').effects).toBe('educational');
  });
});
