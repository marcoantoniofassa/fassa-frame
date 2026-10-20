# UI kit — Preview da edição
Recreation of `editonny/skills/editonny/editor/preview/` — the local review app the agent opens: tabs Corte / Estilo / Final, status line, 9:16 player, transport, timeline with beats + waveform + marks, marcações, approve flow, style form (tipo de edição, cor de destaque, gancho, legendas, elementos, trilha), keyboard-shortcut dialog.
Files: TopBar.jsx, CutView.jsx (also Final with `final` prop), StyleView.jsx.
Flow: Aprovar → confirm dialog → Estilo → Salvar estilo → Final.
The screen scripts are inlined in `index.html` (each `<script data-source>` names its original file) so the page also opens from `file://`. Shared tokens and assets resolve to `design-system/tokens`, `design-system/assets`, and the skill media.
