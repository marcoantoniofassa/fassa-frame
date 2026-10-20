import { SceneCard, type SceneCardLabels } from '@editonny/design-system';
import type { CSSProperties } from 'react';
import { Link } from '@/i18n/navigation';
import styles from '../library/library.module.css';
import { backgroundFor, motifFor } from './motif';
import type { Scene } from './scenes';

/** Server-rendered list shown until the interactive catalog hydrates (and for crawlers); its cards link to each scene's dialog. */
export function CatalogStatic({ scenes, labels }: { scenes: Scene[]; labels: Partial<SceneCardLabels> }) {
  return (
    <ul className={styles.grid}>
      {scenes.map((scene, i) => (
        <li key={scene.id} className={styles.item} style={{ '--i': String(Math.min(i, 12)) } as CSSProperties}>
          <SceneCard name={scene.name} group={scene.categoryLabel} when={scene.whenToUse} motif={motifFor(scene.category, i)} bg={backgroundFor(i)} duration={scene.duration} format={scene.format} labels={labels} href={{ pathname: '/catalog', query: { scene: scene.id } }} as={Link} className={styles.fill} />
        </li>
      ))}
    </ul>
  );
}
