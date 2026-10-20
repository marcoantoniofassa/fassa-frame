'use client';
import { useEffect, useState } from 'react';
import { Button, Dialog, Kbd, Toast } from '../../components/index';
import { CutView } from './CutView';
import { StyleView } from './StyleView';
import { TopBar, type PreviewStatus, type PreviewTab } from './TopBar';

const STATUS: Record<PreviewTab, PreviewStatus> = {
  cut: { state: 'awaiting', badge: 'Your turn', text: 'The first cut is ready. Mark what to change or approve it.', meta: 'cut v2 · 00:45 · 4 blocks', awaiting: 'cut' },
  style: { state: 'awaiting', badge: 'Your turn', text: 'Cut approved. Choose the finishing style.', meta: '9:16 · 1080p', awaiting: 'style' },
  final: { state: 'done', text: 'Final video ready and checked.', meta: 'final.mp4 · 1080p · 38 MB' },
};
const SHORTCUTS = [[['Space'], 'Play or pause'], [['←', '→'], 'Back or forward 1 frame'], [['I'], 'Mark the start of a section'], [['O'], 'Mark the end and write what to change'], [['M'], 'Request motion at this point'], [['?'], 'Open this help']] as const;

/** Recreation of the local edit preview: Cut → approve dialog → Style → save → Final, plus the shortcuts dialog. */
export function PreviewApp({ tab: initial = 'cut', image }: { tab?: PreviewTab; image: string }) {
  const [tab, setTab] = useState<PreviewTab>(initial);
  const [message, setMessage] = useState<string | null>(null);
  const [dialog, setDialog] = useState<'approve' | 'help' | null>(null);
  useEffect(() => {
    if (!message) return;
    const id = setTimeout(() => setMessage(null), 2200);
    return () => clearTimeout(id);
  }, [message]);
  const savedStyle = (text: string) => { setMessage(text); setTimeout(() => setTab('final'), 900); };
  return (
    <div className="tpl-preview">
      <TopBar tab={tab} setTab={setTab} status={STATUS[tab]} onHelp={() => setDialog('help')} />
      {tab === 'style'
        ? <StyleView image={image} toast={savedStyle} />
        : <CutView key={tab} final={tab === 'final'} image={image} toast={setMessage} onApprove={tab === 'final' ? () => setMessage('Video approved. Ready to post.') : () => setDialog('approve')} />}
      <div className="tpl-toasts" data-corner="top">{message && <Toast>{message}</Toast>}</div>
      <Dialog open={dialog === 'approve'} eyebrow="Cut review" title="Approve the cut?" onClose={() => setDialog(null)}
        actions={<><Button size="sm" variant="ghost" onClick={() => setDialog(null)}>Back</Button><Button size="sm" onClick={() => { setDialog(null); setTab('style'); setMessage('Cut approved'); }}>Approve</Button></>}>
        The agent moves on to style, captions, and motion. Your unsaved marks are sent along.
      </Dialog>
      <Dialog open={dialog === 'help'} title="Keyboard shortcuts" onClose={() => setDialog(null)} actions={<Button size="sm" onClick={() => setDialog(null)}>Got it</Button>}>
        <dl className="tpl-shortcuts">
          {SHORTCUTS.map(([keys, label]) => <div key={label} style={{ display: 'contents' }}><dt>{keys.map(key => <Kbd key={key}>{key}</Kbd>)}</dt><dd>{label}</dd></div>)}
        </dl>
      </Dialog>
    </div>
  );
}
