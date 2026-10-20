import { IconButton, SegmentedControl, StatusLine, Wordmark, type StatusState } from '../../components/index';

export type PreviewTab = 'cut' | 'style' | 'final';
export type PreviewStatus = { state: StatusState; badge?: string; text: string; meta?: string; awaiting?: PreviewTab };
type TopBarProps = { tab: PreviewTab; setTab: (tab: PreviewTab) => void; status: PreviewStatus; project?: string; onHelp: () => void };

/** Preview top bar (wordmark, stages, shortcuts) and the agent status strip below it. */
export function TopBar({ tab, setTab, status, project = 'coffee-tutorial', onHelp }: TopBarProps) {
  return (
    <div className="tpl-topbar">
      <header className="tpl-topbar__bar">
        <div className="tpl-topbar__title">
          <Wordmark iconOnly size={26} />
          <span className="tpl-topbar__name">Edit preview</span>
          <span className="tpl-topbar__project">{`/ ${project}`}</span>
        </div>
        <SegmentedControl label="Stages" value={tab} onChange={value => setTab(value as PreviewTab)}
          options={[{ value: 'cut', label: 'Cut', dot: status.awaiting === 'cut' }, { value: 'style', label: 'Style', dot: status.awaiting === 'style' }, { value: 'final', label: 'Final' }]} />
        <div className="tpl-topbar__end"><IconButton icon="keyboard" label="Keyboard shortcuts" onClick={onHelp} size={40} /></div>
      </header>
      <StatusLine state={status.state} badge={status.badge} text={status.text} meta={status.meta} />
    </div>
  );
}
