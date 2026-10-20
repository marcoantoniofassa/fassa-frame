'use client';
import { useToast } from './ToastProvider';

type CopyMessages = { success: string; fallback: string };

function select(element: Element) {
  const range = document.createRange();
  range.selectNodeContents(element);
  const selection = getSelection();
  selection?.removeAllRanges();
  selection?.addRange(range);
}

/** Copies text to the clipboard; without clipboard access it selects `element` so the visitor can copy manually. */
export function useCopy() {
  const { show } = useToast();
  return async (text: string, messages: CopyMessages, element?: Element | null): Promise<boolean> => {
    try {
      if (!navigator.clipboard?.writeText) throw new Error('Clipboard unavailable');
      await navigator.clipboard.writeText(text);
      show(messages.success, 'success');
      return true;
    } catch {
      if (element) select(element);
      show(messages.fallback, 'error');
      return false;
    }
  };
}
