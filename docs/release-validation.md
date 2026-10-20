# Verificação da distribuição 0.1.0

Preparada em 20/10/2026, em macOS. Este documento separa a distribuição de código da instalação local usada em projetos reais.

## Escopo

- Snapshot isolado; checkout e projetos anteriores preservados.
- MIT original, atribuição, revisão de origem e avisos de terceiros mantidos.
- README e guias em português, com capa SVG própria. Capa renderizada e inspecionada.
- Recursos opcionais sem comprovação individual de redistribuição excluídos, com lista versionada. O diagnóstico de mídia continua informando os arquivos ausentes; não foi convertido em sucesso artificial.
- Teste de distribuição ajustado para comprovar esse estado: biblioteca de vídeos ausente, manifesto preservado e nenhuma mídia corrompida. Testes de recusa sem alteração de projeto permanecem ativos.

## Resultados

| Verificação | Resultado observado |
| --- | --- |
| Regras de lint, ESLint e tipos | Passaram; compilação de produção do guia também concluiu com TypeScript |
| Python | 56 testes aprovados, incluindo instalação isolada, recuperação e preservação de arquivos |
| Node | 15 testes aprovados |
| Interface (Vitest) | 128 testes em 19 arquivos aprovados em série |
| Ícones | 49 ícones verificados |
| Motor | Ambiente sincronizado pelo lock; `doctor --json` retornou `ok: true` |
| Catálogo e instalador | Consulta ao catálogo e simulação em home temporário exercitadas |
| Navegador | 168 cenários aplicáveis aprovados somando a suíte integral e a repetição da auditoria afetada; 28 cenários condicionais não aplicáveis. A repetição de qualidade passou em 61 casos, com 1 skip previsto. |
| Segredos | Gitleaks não encontrou segredos no conteúdo preparado; verificação final antes do push |

A primeira execução concorrente de testes de interface teve estouros de tempo. A execução em série passou, e esse modo ficou explícito no comando da suíte; os limites de tempo e os casos não foram reduzidos.

O Chromium reportou avisos de CSS de rota pré-carregado e ainda não utilizado. A auditoria registra especificamente esse diagnóstico de desempenho como anotação, sem classificá-lo como erro de aplicação. Erros JavaScript, outros avisos, problemas graves de acessibilidade e overflow continuam bloqueantes. A primeira execução integral do navegador teve seis falhas somente por esse diagnóstico; a auditoria foi repetida após separar esse caso.

`npm audit` em 20/10/2026 reportou 5 entradas high na cadeia de desenvolvimento `eslint-config-next → @next/eslint-plugin-next → fast-glob → micromatch → braces`. O ajuste automático sugerido rebaixa o pacote principal para uma major incompatível; não foi aplicado `--force`. Os pins herdados foram preservados. Esse alerta permanece pendente para manutenção, especialmente antes de disponibilizar um serviço público. A skill instalada não inclui os node_modules do guia.

## Limites

A instalação em home temporário não comprova descoberta nativa em todo cliente. Não houve certificação Windows/Linux, nova edição audiovisual completa, uso de geração paga nem implantação do guia público nesta tarefa. Exemplos são fictícios. Uma cena que depende de mídia não incluída exige material próprio/autorizado. Verificações automáticas não substituem a revisão humana do vídeo.
