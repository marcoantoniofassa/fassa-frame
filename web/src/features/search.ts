import type { Effects, Format } from './request/options';
import type { RequestPhrases } from './request/phrases';

/** Lowercase, accent-free text for search. */
export const normalize = (value: unknown): string => String(value).normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase();

/** True when every whitespace-separated term of `query` appears in `haystack`, ignoring case and accents. */
export function matchesAll(haystack: string, query: string): boolean {
  const terms = normalize(query).trim().split(/\s+/).filter(Boolean);
  const text = normalize(haystack);
  return terms.every(term => text.includes(term));
}

type Searchable = { category: string };
type SceneLike = Searchable & { id: string; name: string; categoryLabel: string; whenToUse: string };
type ExampleLike = Searchable & { id: string; title: string; categoryLabel: string; summary: string; when: string; goal: string; tips: string[]; format?: Format; effects?: Effects };

export const filterScenes = <T extends SceneLike>(scenes: T[], query: string, category: string): T[] =>
  scenes.filter(scene => (!category || scene.category === category) && matchesAll(`${scene.name} ${scene.id} ${scene.categoryLabel} ${scene.whenToUse}`, query));

/** Example text plus its preset format and visuals as the request words them (`9:16 (vertical)`), so ratios and styles match. */
export const filterExamples = <T extends ExampleLike>(examples: T[], query: string, category: string, phrases: Pick<RequestPhrases, 'formats' | 'effects'>): T[] =>
  examples.filter(example => (!category || example.category === category)
    && matchesAll([example.id, example.title, example.categoryLabel, example.summary, example.when, example.goal,
      example.format ? phrases.formats[example.format] : '', example.effects ? phrases.effects[example.effects] : '', ...example.tips].join(' '), query));
