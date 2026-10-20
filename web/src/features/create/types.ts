import type { ExamplePreset } from '../request/draft';
import type { SceneRef } from '../request/prompt';

/** What the Create page needs from the catalog and the example library. */
export type CreateData = { examples: Array<ExamplePreset & { title: string }>; scenes: SceneRef[] };
