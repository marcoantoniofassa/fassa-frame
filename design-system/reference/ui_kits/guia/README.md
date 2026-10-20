# UI kit — Guia (web)
Recreation of `editonny/web/index.html` (site-guia que monta pedidos) in the new estúdio visual language.
Screens: Início (hero + ilustração do estúdio + como funciona + fechamento), Criar prompt (briefing → pedido gerado), Catálogo (cenas de motion + diálogo), Exemplos e prompts, Instalação.
Files: Header.jsx, Home.jsx, CreatePrompt.jsx, Catalog.jsx (serves both catálogo and exemplos), Install.jsx. All compose `window.EditonnyDesignSystem_f6f5bd` primitives.
Copy is lifted verbatim from the codebase (pt-BR).
The screen scripts are inlined in `index.html` (each `<script data-source>` names its original file) so the page also opens from `file://`. Shared tokens and assets resolve to `design-system/tokens`, `design-system/assets`, and the skill media.
