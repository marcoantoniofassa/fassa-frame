# Novidades

## Próxima versão

Correções achadas na edição de um Reel real (22/10/2026):

- Os sons que o compositor sugere (`counting`, `ding`, `risk`) passam a ser aceitos pelo plano de som; antes o `sound_plan.py` parava com "type does not exist".
- Legenda com rosto baixo no 9:16 não cai mais sobre o rosto: vai pra baixo do queixo ou acima da cabeça. `captions.y` fixa a altura por projeto.
- O mesmo corte sai com a mesma duração em qualquer pasta e tamanho de saída: o `render_cut.py` mede o ruído da gravação em vez de usar -35 dB fixo quando falta o arquivo de regiões (48,07 x 48,43 s no caso real).
- Recorte de pessoa segue o tamanho do vídeo, não o da linha do tempo; antes um vídeo recomposto em outro tamanho quebrava a exportação.

## 0.1.1 (21/10/2026)

- Narração sintética opcional com Gemini TTS (`gen_voice.py`), com a chave de quem edita, uma tomada por passagem e conferência por transcrição. Resposta da [issue #1](https://github.com/marcoantoniofassa/fassa-frame/issues/1).
- Vídeos de case, produto e lançamento: roteiro com arco narrativo proposto antes do corte, motion nos pontos-chave, sincronismo por ação e passada de enxugamento.
- Kit de marca fora do pacote, com a tela final proposta como encerramento de vídeo novo.
- Correções trazidas do Editonny: cenas copiadas voltam a animar e seguram até o último quadro; endereços do HyperFrames corrigidos; auditoria de corte declara o regime de transcrição.
- Site com a identidade do README: papel claro, preto, âmbar, azul e enquadramentos; tema escuro preservado.
- Entrada e instalação explicadas para quem trabalha com marketing e comunicação, nos três idiomas do guia.
- Links de download, créditos e badges corrigidos para distinguir Fassa Frame de sua base Editonny.
- Revisão desktop/mobile, contraste, navegação, instalação e preparação para hospedagem; divulgação pública continua sob decisão do mantenedor.

## 0.1.0 (20/10/2026)

Primeira distribuição independente da Fassa Frame, baseada no Editonny de Matheus Gomes.

- Página inicial em português, pedidos prontos e primeiros passos para marketing e gestão.
- Instalação compartilhada para Codex e Claude Code, com simulação, proteção de destinos e recuperação.
- Edição guiada pela intenção e preservação das escolhas aprovadas em revisões pontuais.
- Ferramentas locais de edição, cenas, transcrição e conferência mantidas com atribuição.
- Pacote versionado com checksum; guia para atualizar sem misturar projetos e ferramenta.
- Distribuição sem materiais privados e sem os arquivos opcionais cuja redistribuição individual não foi comprovada.

Esta versão é para testes acompanhados. Os limites e as verificações estão em `docs/release-validation.md` e `docs/distribution.md`.
