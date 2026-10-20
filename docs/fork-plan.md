> Registro histórico da preparação local anterior à distribuição independente. Para a release atual, consulte [release-validation.md](release-validation.md).

# Fassa Frame: plano de implementação

## Resultado e desenho

Produto local de edição guiada por intenção, derivado do Editonny de Matheus Gomes (MIT), para Claude Code e Codex. Nome definido por Atlas a pedido de Marco em 19/10/2026. Identidade: grafite, papel e âmbar; assinatura “Edição guiada por intenção”. Busca web preliminar não substitui disponibilidade de marca/domínio.

Base: upstream `05d3dedcddcf6717001b0a3ef91411ec08f614d4`. Manter histórico, motor, cenas, mídia e comandos compatíveis. Nomes internos `skills/editonny`, `EDITONNY_ENGINE_DIR` e workspaces npm permanecem para reduzir conflitos. Entradas públicas usam `fassa-frame`. Uma instalação física compartilhada, com dois registros nativos.

Alternativas consideradas: reescrever motor perderia recursos e elevaria manutenção; instalar só um wrapper deixaria regras editoriais conflitantes. Escolha: fork completo com mudanças concentradas e rastreadas, sem migração dos projetos existentes.

## Restrições

- Cada edição considera material, objetivo, público, destino, identidade e intenção. Nenhuma técnica recebe uma classificação universal de qualidade.
- Preservar originais, versões, escolhas aprovadas, sincronismo, privacidade e fatos. Mudanças pontuais não autorizam recortar o resto.
- FFmpeg/ASS, Remotion, híbrido e HyperFrames são escolhas de trabalho. Cenas HTML não são componentes Remotion/ASS.
- Repertório privado e assets do Hub são referências locais, nunca conteúdo do pacote comercial.
- Sem publicação, push, envio de mídia a terceiros, geração paga nem reedição dos vídeos atuais. Testes usam material sintético local.
- Commit e lançamento público ficam fora desta entrega. Alterações de outras sessões são preservadas.

## Tarefas e verificações

### 1. Base, instalação e identidade pública
Files: `install.py`, `scripts/package.py`, lançador `fassa-frame.py`, manifests dos plugins, metadados da skill, README em três idiomas, `docs/installation.md`, `docs/upstream.md`, `docs/brand.md`, `docs/fork-validation.md`, testes de instalação/pacote/CLI e `vitest.config.mts`.
Depends-on: nenhuma.

- [x] Registrar baseline e configurar branch local do fork.
- [x] Adaptar instalação transacional existente para `fassa-frame`, sem sobrescrever Editonny ou instalações alheias; testar idempotência, rollback, backup e paths com espaços.
- [x] Atualizar entradas/branding mantendo créditos, LICENSE e contratos internos. Pacote inclui documentação nova e exclui dados locais.
- [x] Preparar rastreabilidade de upstream, atualização isolada e recuperação.

### 2. Política editorial e repertório
Files: `AGENTS.md`, `CLAUDE.md`, `skills/editonny/SKILL.md`, `skills/editonny/references/{editorial,workflows,hub,rights}.md`, `skills/editonny/engine/WORKFLOW.md`, exemplos sintéticos em `skills/editonny/examples/`, textos do guia em `web/` e testes associados.
Depends-on: 1.

- [x] Instruções centrais curtas; referências por modo; briefing e registro de decisões, revisão e proveniência dos assets.
- [x] Documental/câmeras, Reels, VSL, memes e identidades identidades de cada projeto; referências do Hub sem copiar mídia privada.
- [x] Preservar todos os helpers e o catálogo; documentar contratos reais e limites (OCR, tracking, alinhamento, revisão de corte).
- [x] Verificar cenários realistas de revisão pontual, pausa de luto, meme e modelo ausente.

### 3. Critérios de qualidade por projeto
Files: `skills/editonny/engine/helpers/quality_gate.py`, novo `quality_policy.py`, `tests/integration/test_quality_policy.py`, `skills/editonny/engine/references/quality-policy.md`.
Depends-on: baseline; independente das tarefas 1 e 2.

- [x] Adicionar política JSON explícita para alvo LUFS, intervalos intencionais de silêncio/preto e limiar de medição de silêncio, mantendo medidas brutas e justificativas no relatório.
- [x] Sem política, preservar contrato anterior; regras documentais não eliminam as verificações técnicas.
- [x] Testes RED/GREEN para -16 LUFS, pausa aprovada, intervalo inesperado, dados inválidos e normalização coerente com alvo. Não instalar nem baixar modelos.

### 4. Integração e entrega
Files: checkout independente `tools/fassa-frame/` no Hub; registro de skills por symlinks `.agents/skills/fassa-frame`, `.claude/skills/fassa-frame`; `.gitignore` do Hub; `docs/codex/fassa-frame.md`.
Depends-on: 1, 2, 3.

- [x] Executar suites Python/Node, lint/typecheck/build do escopo; verificar inventário e hashes de mídia.
- [x] Instalação em home temporário e execução CLI a partir dos dois registros; render sintético FFmpeg e smoke HyperFrames quando dependências disponíveis; examinar amostra.
- [x] Testar descoberta estrutural sem afirmar exercício nativo em Claude/Codex não realizado.
- [x] Integrar no Hub, reler registros, preservar checksums das referências de produção e registrar limitações comerciais e operacionais.

## Estado

Execução autorizada por Marco: “bora planejar e executar isso ai”. Escolha do nome delegada: “defina pra mim.” Aprovação existente satisfaz os gates de planejamento. Sem revisão adversarial/cross-IA; verificação funcional proporcional e um worker delimitado.

Entrega local concluída. Ver resultados, instabilidade inicial e limitações em [fork-validation.md](fork-validation.md). Descoberta em sessão nativa nova, publicação e liberação comercial não são afirmadas.
