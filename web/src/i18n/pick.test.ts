import { describe, expect, it } from 'vitest';
import { pickMessages } from './pick';

describe('pickMessages', () => {
  const messages = { Nav: { home: 'Home' }, Home: { bento: { raw: 'Raw' }, phone: { alt: 'Phone' }, hero: { title: 'Hi' } }, Install: { cta: 'Go' } };

  it('keeps only the listed groups, including nested ones', () => {
    expect(pickMessages(messages, ['Nav', 'Home.bento', 'Home.phone'])).toEqual({ Nav: { home: 'Home' }, Home: { bento: { raw: 'Raw' }, phone: { alt: 'Phone' } } });
  });

  it('fails loudly on a group that does not exist', () => {
    expect(() => pickMessages(messages, ['Home.missing'])).toThrow('Unknown message group: Home.missing');
  });
});
