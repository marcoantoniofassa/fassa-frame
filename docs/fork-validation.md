> Registro histórico da preparação local anterior à distribuição independente. Para a release atual, consulte [release-validation.md](release-validation.md).

# Verificação do Fassa Frame 0.1.0

Data: 19/10/2026. Base Editonny: `05d3dedcddcf6717001b0a3ef91411ec08f614d4`.

## Evidência executada

- Baseline upstream: 55 testes Python aprovados antes das mudanças.
- Fork: lint de regras, ESLint sem warnings, typecheck dos dois workspaces e 49 ícones aprovados.
- Testes Node: 15 aprovados. Biome curado: 23 arquivos JS/TS verificados, sem alterações automáticas.
- Python core: 56 testes; instalação/CLI/pacote incluem nome novo, rollback, backup, idempotência, caminhos com espaços e coexistência com Editonny.
- Vitest: 126 testes aprovados com `npx vitest run --maxWorkers=1`. A execução com todos os workers (`npm run check`) excedeu os 5 segundos no teste do showcase sob carga alta do Mac; não é registrada como gate completo aprovado. A configuração do fork agora limita Vitest a um worker para evitar disputa de CPU. Depois dessa mudança e da instalação definitiva, `npm run check` completo passou (exit 0), incluindo 56 testes Python, 15 Node, 126 Vitest, lint, typecheck e 49 ícones. O teste continua exercitando o clique real, armazenamento bloqueado e tema final, com movimento reduzido e consulta restrita ao cabeçalho.
- Motor: `npm run test:engine`, 38 testes aprovados fora do sandbox de rede local. Inclui FFmpeg real, normalização em -16 LUFS, backup, política estrita e cobertura incompleta sem OCR. As falhas iniciais de loopback no sandbox não foram tratadas como falhas do motor.
- Navegador: Playwright com Chrome instalado, desktop e Pixel 7, três idiomas e dois temas. Primeira execução: 165 aprovados, 28 pulados por plataforma, 3 falhas (dois timeouts e um aviso de preload CSS). Reexecução apenas dos três casos: todos aprovados em 16,2 s; nenhuma asserção foi removida. A instabilidade inicial permanece registrada.
- Build final do guia: `npm run build` aprovado, incluindo as três línguas e catálogo.
- Render HyperFrames 0.8.171 aprovado no checkout definitivo, com Chrome instalado e telemetria desativada: lint, check, três snapshots e MP4 1080×1920 de 3 s, com áudio. Decodificação FFmpeg sem erro; frames antes e durante a transição glow inspecionados. Material sintético, sem inferir qualidade de todas as cenas. Artefatos em `.work/engine smoke 8koyp20b/`.
- Catálogo: 79/79 vídeos presentes, 153.699.178 bytes, nenhum ausente ou com hash inválido.
- Instalação real em home temporário com espaços, `--no-sync`: registros Codex e Claude resolvem a mesma fonte; catálogo executado pelos dois caminhos. Isso verifica arquivos e CLI, não descoberta dentro de sessões novas dos clientes.
- Preview real no Chrome: marcações, trims, rascunhos, aprovação e bloqueio de script HTML da mídia aprovados (`npm run test:preview`).
- Instalação definitiva no Hub: os dois registros foram detectados pelo harness e executaram o mesmo catálogo; doctor Fassa Frame 0.1.0 retornou `ok: true`. Nove hashes de scripts/mídia de produção permaneceram idênticos.
- Frontmatter da skill validado com o validador de skill-creator. Referências locais da skill conferidas.

Capturas do guia em português inspecionadas em desktop e viewport móvel 390×844: identidade legível e controles visíveis. Arquivos locais `guide-desktop.png` e `guide-mobile.png` na pasta de validação.

## Simulação funcional das instruções

Leitura independente da skill e referências, sem edição de mídia nem chamada paga:

| Pedido | Comportamento indicado |
| --- | --- |
| Corrigir uma palavra de legenda em reel FFmpeg aprovado, -16 LUFS e pausa de luto | Alterar a palavra, preservar áudio, cortes, pausa e máscaras aprovados |
| Câmeras com impacto, detector sem rosto e OCR indisponível | Conferir quadros/movimento; não confundir detecção negativa com anonimização |
| Meme com duas pessoas e reprodução exata de movimento, somente image-to-video disponível | Preparar roteiro e requisitos; declarar limite do modelo; não gerar sem autorização |
| VSL Remotion com três gráficos | Manter Remotion, dados verificáveis e componentes adequados; não converter para cenas HTML por padrão |

Esses casos validam a orientação escrita; não provam obediência de todo modelo nem resultado audiovisual real.

## Limites

Nenhum vídeo de produção foi reeditado; nenhum serviço gerativo pago ou mídia privada foi enviado a terceiros. Não foram baixados modelos de transcrição/OCR. Descoberta nativa em uma nova conversa Claude/Codex ainda depende de reabrir o cliente. Não houve commit, push, publicação, registro de marca nem revisão jurídica. As pendências de licenças e dependências estão em `commercial-readiness.md`.

Logs e artefatos locais de QA ficam em `.work/validation/`, fora do pacote distribuível. Os testes não certificam privacidade; a entrega de cada vídeo exige revisão audiovisual.
