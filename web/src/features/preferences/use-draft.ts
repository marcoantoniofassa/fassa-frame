'use client';
import { DEFAULT_DRAFT, parseDraft, type RequestDraft } from '../request/draft';
import { createStore, useStore } from './store';

export const draftStore = createStore('editonny:draft', parseDraft, DEFAULT_DRAFT);

/** The visitor's saved brief, a patch updater, and a reset. */
export function useDraft(): [RequestDraft, (patch: Partial<RequestDraft> | ((draft: RequestDraft) => RequestDraft)) => void, () => void] {
  const draft = useStore(draftStore);
  const update = (patch: Partial<RequestDraft> | ((draft: RequestDraft) => RequestDraft)) =>
    draftStore.set(previous => (typeof patch === 'function' ? patch(previous) : { ...previous, ...patch }));
  return [draft, update, draftStore.reset];
}
