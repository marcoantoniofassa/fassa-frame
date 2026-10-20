// Brief choices stored as stable keys; each locale's phrases turn them into request text.
export const FORMATS = ['vertical', 'horizontal', 'square', 'portrait'] as const;
export const PACES = ['natural', 'dynamic', 'calm'] as const;
export const CAPTIONS = ['readable', 'subtle', 'none'] as const;
export const EFFECTS = ['subtle', 'educational', 'expressive', 'none'] as const;
export const AGENTS = ['codex', 'claude'] as const;

export type Format = (typeof FORMATS)[number];
export type Pace = (typeof PACES)[number];
export type Captions = (typeof CAPTIONS)[number];
export type Effects = (typeof EFFECTS)[number];
export type Agent = (typeof AGENTS)[number];

/** Aspect ratio shown on format pickers; the same in every language. */
export const RATIOS: Record<Format, string> = { vertical: '9:16', horizontal: '16:9', square: '1:1', portrait: '4:5' };
/** How each agent invokes the skill. */
export const ENTRIES: Record<Agent, string> = { codex: '$fassa-frame', claude: '/fassa-frame' };
