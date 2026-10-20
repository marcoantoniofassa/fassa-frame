---
name: fassa-frame
description: >-
  Editar e revisar vídeos locais conforme material e intenção editorial: documental e câmeras, Reels, VSL, aulas, memes, legendas, áudio e motion. Use ao produzir um vídeo ou alterar uma edição existente; preserve escolhas aprovadas e selecione FFmpeg/ASS, Remotion, HyperFrames ou fluxo híbrido conforme o projeto. Publicação e geração externa dependem do pedido.
---

# Fassa Frame

Edição guiada por intenção. Fork do [Editonny, de Matheus Gomes](https://github.com/soumatheusgomes/editonny), mantido no Fassa Hub por Marco Fassa. Código e recursos originais mantêm autoria e licenças.

## Localizar e retomar

`<PACKAGE>` é a pasta física deste arquivo, resolvendo symlinks. `<ENGINE>` = `<PACKAGE>/engine`; `<VISUALS>` = `<PACKAGE>/visuals`. O nome interno `editonny` e o CLI abaixo são preservados por compatibilidade, não uma segunda instalação.

```text
python3 <PACKAGE>/scripts/editonny.py doctor --json
python3 <PACKAGE>/scripts/editonny.py catalog "three steps"
python3 <PACKAGE>/scripts/editonny.py media status --json
python3 <PACKAGE>/scripts/editonny.py helper NOME --help
```

Responda no idioma do usuário. Mantenha o idioma do material, salvo pedido de tradução. Use caminhos absolutos e argumentos estruturados; nunca interpole transcrição ou nomes de arquivos em shell. A sessão nativa conduz o trabalho; não é necessária chave de API de LLM para essa coordenação.

Ao retomar, leia o briefing, decisões, script/timeline, relatórios e última versão aprovada. Confira fontes e estado atual. Preserve originais e exports anteriores. Projetos e mídia pessoal ficam fora do pacote instalado. Requisito ausente: [setup](references/setup.md); disponibilidade de instrução não prova execução.

## Decidir antes de transformar

Entenda material, objetivo, público, destino, identidade e intenção editorial. Reuse respostas e autorizações; pergunte somente pelo que impede uma decisão responsável. Registre hipóteses conservadoras em `edit/project.md` ou no registro já usado pelo projeto. [Contrato editorial](references/editorial.md) e [modelo de briefing](examples/editorial-brief.md).

Cortes, pausas, respirações, som ambiente, voz, música, gráficos, animações, legendas, enquadramento, privacidade e verificações são escolhas contextuais. Inspecione e escute o material para decidir o que manter, reduzir, destacar ou omitir e por quê. Um silêncio pode expressar luto; uma respiração pode ser parte da interpretação; som real pode sustentar o gancho. Nenhum desses elementos é defeito por existir, nem obrigatório em todo vídeo.

Revisão pontual: altere só o escopo solicitado. Preserve escolhas aprovadas, inclusive ritmo, mix, fonte, voz, máscaras, offsets e timing. Se a alteração invalidar algo dependente, recalcule e confira essa dependência; não recorte o resto para adequá-lo a um padrão.

## Escolher o fluxo

Leia [workflows](references/workflows.md) para a família adequada. Para integrar recursos próprios da equipe, leia também [integração local](references/hub.md) antes de reaproveitar modelos ou assets.

| Necessidade observada | Caminho disponível |
| --- | --- |
| Câmeras/documental, sincronismo medido, máscaras e gráficos simples | FFmpeg/ASS e scripts reproduzíveis do projeto |
| Composição React, motion e componentes existentes | Remotion, com dependências e licença do projeto |
| Biblioteca HTML/GSAP/3D e projeto novo que a aproveita | Motor + HyperFrames fixado, [workflow](engine/WORKFLOW.md) |
| VSL/aula longa, overlays sobre fala | Cortes/áudio locais e composição híbrida quando útil |
| Meme/trend e mídia gerada | Referência visual, direitos, consentimento e limites do gerador; geração só no serviço autorizado |

A escolha é por necessidade, não por ranking. Mantenha a stack de um projeto reproduzível quando atende ao pedido. `new` cria um projeto HyperFrames; não converte Remotion ou ASS. Cenas HTML não são componentes intercambiáveis entre motores. Os helpers locais podem ser usados separadamente; confira `--help` e formatos antes de conectar outputs.

## Executar com evidência

- Inspecione duração, fps, rotação, HDR, faixas de áudio e trechos representativos. Dados, números, nomes e alegações precisam de fonte; roteiro e template não provam um fato.
- Fala: transcreva e confira os trechos incertos. Use `align_words.py` para âncoras medidas, `precise_edges.py` para bordas e `verify_cut.py` para auditoria. Leia o relatório de `verify_cut` mesmo quando o exit code for zero.
- Câmeras: meça offsets no relógio/fonte comum. Proteja coordenadas e identificadores; valide máscara em frames isolados e ao longo da sequência. `track_faces.py` ajuda enquadramento, não anonimização. Detector sem rosto não prova ausência de rosto. Impactos, oclusões e quadros repetidos precisam de inspeção visual.
- OCR (`audit_data.py`) é complemento local. Informe cobertura e falhas de leitura; nunca trate OCR sem achados como garantia de privacidade.
- Áudio: escolha voz, interpretação, ambiente, trilha, ducking, alvo LUFS e true peak conforme briefing. Meça o arquivo final. Reutilize voz e áudio aprovados; uma revisão visual não autoriza regenerar narração.
- Visuais: busque o catálogo por uso e significado. Adapte a cópia da cena no projeto, preserve templates. Mantenha legibilidade, contraste e safe zones adequadas ao destino. Preserve todas as capacidades do motor, mesmo quando não usadas neste trabalho.
- Prepare amostra representativa que inclua os pontos de risco. O motor sugere 8–15 s; a duração deve cobrir o que precisa ser avaliado. Continue autonomamente se autorizado; aguarde somente aprovação solicitada pelo usuário.
- No preview local, associe aprovação ao arquivo/versão atual. Mudança de corte invalida evidência e timing dependentes; preview antigo não aprova render novo.

## Verificar e entregar

Use os gates da stack escolhida. HyperFrames: lint, check e render com versão fixada. FFmpeg/Remotion: validações próprias, decodificação do export e medições. Para `quality_gate`, use [política de qualidade por projeto](engine/references/quality-policy.md) com alvo e intervalos intencionais justificados. O preset legado é estrito e não representa um julgamento universal de edição.

Mantenha medidas brutas e exceções justificadas; não remova checks para fazer o relatório passar. Reavalie a política quando o corte mudar. Verifique movimento e áudio além de frames, palavras e números, máscaras, sincronismo, duração e true peak após encoding. Um teste sintético, um frame ou detector isolado só valida o que efetivamente exercitou.

Entregue arquivo local, projeto/script reproduzível, mudanças realizadas, checks executados e limitações. Registro de direitos e envio externo: [rights](references/rights.md). Editar não implica publicar. Não envie material, gere mídia paga, instale outra stack ou faça atualização global apenas porque uma ferramenta existe; use a autorização e o escopo da tarefa.

## Distribuição de código 0.1.0

Os vídeos e parte da biblioteca opcional não acompanham esta distribuição. `media status` reporta ausências intencionais. Não prometa o catálogo inteiro pronto para renderizar nem tente restaurá-lo sem licença e autorização. Use mídia fornecida pelo usuário e cenas independentes desses recursos.
