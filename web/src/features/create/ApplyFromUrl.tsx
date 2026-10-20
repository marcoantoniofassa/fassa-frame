'use client';
import { useTranslations } from 'next-intl';
import { useSearchParams } from 'next/navigation';
import { useEffect, useRef } from 'react';
import { useRouter } from '@/i18n/navigation';
import { useToast } from '../feedback/ToastProvider';
import { draftStore } from '../preferences/use-draft';
import { applyExample, withScene } from '../request/draft';
import type { CreateData } from './types';

/** Applies ?example=<id> or ?scene=<id> from catalog and example links once, then removes them from the URL. */
export function ApplyFromUrl({ examples, scenes }: CreateData) {
  const params = useSearchParams();
  const router = useRouter();
  const t = useTranslations('Create');
  const { show } = useToast();
  // The effect re-runs when the toast or router identity changes; each query string is applied only once.
  const handled = useRef<string | null>(null);
  useEffect(() => {
    const exampleId = params.get('example');
    const sceneId = params.get('scene');
    // Next keeps visited pages mounted; forget the last query once it is gone so the same link works again.
    if (exampleId === null && sceneId === null) { handled.current = null; return; }
    const key = params.toString();
    if (handled.current === key) return;
    handled.current = key;
    // Only ids from the server-provided lists are applied; anything else is ignored.
    const example = examples.find(item => item.id === exampleId);
    const scene = scenes.find(item => item.id === sceneId);
    if (example) draftStore.set(draft => applyExample(draft, example));
    if (scene) draftStore.set(draft => withScene(draft, scene.id));
    if (example) show(t('exampleApplied', { title: example.title }));
    else if (scene) show(t('sceneAdded'));
    router.replace('/create', { scroll: false });
  }, [params, examples, scenes, router, show, t]);
  return null;
}
