import { describe, expect, it } from 'vitest';
import { phrasesFor } from './request/phrases';
import { filterExamples, filterScenes, normalize } from './search';

const scene = (id: string, name: string, category: string, whenToUse = '') => ({ id, name, category, categoryLabel: category, whenToUse, duration: null, format: null, layout: null, hidesCaptions: false });
const example = (id: string, title: string, category: string, extra: Record<string, unknown> = {}) => ({ id, title, category, categoryLabel: category, summary: '', when: '', goal: '', tips: [] as string[], ...extra }) as never;

const en = phrasesFor('en-US');

describe('search', () => {
  it('normalizes accents and case', () => {
    expect(normalize('Café ÇÃO')).toBe('cafe cao');
  });

  it('combines accent-insensitive terms with the category filter', () => {
    const scenes = [scene('a', 'Café comparison', 'Health', 'explain options'), scene('b', 'Café comparison', 'Other')];
    expect(filterScenes(scenes, 'cafe comparison', 'Health')).toHaveLength(1);
    expect(filterScenes(scenes, 'nonexistent', '')).toHaveLength(0);
    expect(filterScenes(scenes, '  ', '')).toHaveLength(2);
    expect(filterScenes(scenes, 'a', 'Missing')).toHaveLength(0);
  });

  it('matches scene ids and localized category labels', () => {
    const scenes = [{ ...scene('revenue-counter', 'Contador de receita', 'General'), categoryLabel: 'Geral' }];
    expect(filterScenes(scenes, 'revenue', '')).toHaveLength(1);
    expect(filterScenes(scenes, 'geral', '')).toHaveLength(1);
  });

  it('searches every text field of an example, including tips', () => {
    const entries = [example('a', 'Review', 'Review', { summary: 'Check audio', when: 'After the cut', goal: 'Preserve words', tips: ['Check breaths'] }), example('b', 'Review', 'Edit')];
    expect(filterExamples(entries, 'review breaths', 'Review', en)).toEqual([entries[0]]);
    expect(filterExamples(entries, 'words cut', '', en)).toEqual([entries[0]]);
    expect(filterExamples(entries, '', '', en)).toEqual(entries);
    expect(filterExamples(entries, 'review', 'Another', en)).toEqual([]);
  });

  it('matches an example by its format ratio and visual style, as the request words them', () => {
    const entries = [example('ad', 'Ad', 'Edit', { format: 'vertical', effects: 'expressive' }), example('lesson', 'Lesson', 'Teach', { format: 'horizontal', effects: 'educational' }), example('plain', 'Plain', 'Edit')];
    expect(filterExamples(entries, '9:16', '', en)).toEqual([entries[0]]);
    expect(filterExamples(entries, '16:9 educational', '', en)).toEqual([entries[1]]);
    expect(filterExamples(entries, 'didáticos', '', phrasesFor('pt-BR'))).toEqual([entries[1]]);
  });
});
