import type { RequestPhrases } from './types';

export const enUS: RequestPhrases = {
  folderLabel: 'Edit the videos in',
  folderPlaceholder: '[enter the video folder]',
  goalLabel: 'Goal',
  defaultGoal: 'turn the footage into a clear, engaging video',
  formatLabel: 'Format',
  paceLabel: 'Pace',
  captionsLabel: 'Captions',
  visualsLabel: 'Visuals',
  sceneReference: reference => `Catalog reference: ${reference}. Adapt the text to the actual footage.`,
  cleanupLabel: 'Editorial intent',
  cleanup: 'Choose cuts, pauses, breaths, ambient sound, voice, music, graphics, animation, captions, framing, privacy treatment, and checks for the footage, goal, audience, destination, identity, and editorial intent. Inspect and listen before deciding what to keep, reduce, or remove. Preserve complete words, meaning, originals, and approved choices. For targeted revisions, change only the requested scope and verify affected dependencies.',
  closing: 'First check the environment and files. Preserve the originals, spoken words, and meaning. Do not invent prices, results, or testimonials. Prepare an 8–15 second sample for me to review before finishing the full video. Do not use paid services or upload media to third parties without my authorization. When finished, report the output file and the checks performed.',
  formats: { vertical: '9:16 (vertical)', horizontal: '16:9 (horizontal)', square: '1:1 (square)', portrait: '4:5 (portrait feed)' },
  paces: { natural: 'natural, preserving intentional pauses', dynamic: 'dynamic, with precise cuts that preserve complete words', calm: 'calm, with room for expression and comprehension' },
  captions: { readable: 'readable, with subtle emphasis on important words', subtle: 'subtle, without animation', none: 'no captions' },
  effects: { subtle: 'subtle, only when they help explain the speech', educational: 'educational, with steps, pointers, and titles', expressive: 'expressive, with balanced transitions and emphasis', none: 'no visual scenes or additional effects' },
};
