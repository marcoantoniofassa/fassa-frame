# Instalação e recuperação

Para quem só quer editar, comece pelo [guia de primeiros passos](getting-started.md). Este documento é para o assistente ou a pessoa que prepara o computador.

## Requisitos

- Codex ou Claude Code com acesso a arquivos locais; conta e permissões próprias.
- Python 3.9+ para o instalador. O motor usa Python >=3.10,<3.14, gerenciado por uv.
- uv, FFmpeg/ffprobe e Node.js 22.13+ ou 24+ com npm/npx.
- Internet para baixar dependências e, no primeiro uso, os recursos exigidos pela operação.

Remotion é opcional e depende do ambiente/licença do projeto. Voz, imagens e música geradas por serviços externos são opcionais e podem ter cobrança separada. Não há chave de API incluída no pacote.

## Obter a versão

Com acesso ao repositório privado, baixe o pacote em [Releases](https://github.com/marcoantoniofassa/fassa-frame/releases). Confira o SHA-256 publicado ao lado do ZIP e extraia para uma pasta nova.

Quem usa Git pode clonar `https://github.com/marcoantoniofassa/fassa-frame.git` e selecionar a tag `v0.1.0`. Prefira uma release identificada em vez de acompanhar alterações de desenvolvimento durante uma entrega.

## Instalar

Na pasta extraída, primeiro simule. Use `codex`, `claude` ou `both` conforme o cliente desejado:

```sh
python3 install.py --dry-run --target both
python3 install.py --target both
python3 ~/.local/share/fassa-frame/scripts/editonny.py doctor --json
```

O instalador mantém uma cópia em `~/.local/share/fassa-frame` e registra links em `~/.agents/skills/fassa-frame` e/ou `~/.claude/skills/fassa-frame`. Respeita `CLAUDE_CONFIG_DIR` no home real. Abra uma nova conversa após instalar.

Um destino pertencente a outra instalação causa erro, sem sobrescrita. Preserve-o e confira sua origem antes de decidir como migrar. `--home /pasta/temporaria` permite teste isolado; `--no-sync` copia os arquivos sem instalar dependências e não comprova prontidão para editar.

## Biblioteca opcional

Esta edição não redistribui todos os arquivos de mídia do catálogo. `python3 fassa-frame.py media status --json` mostra os ausentes e retorna 1 por esse motivo. Leia [distribution.md](distribution.md). Para a primeira edição, use sua própria gravação e recursos independentes dessa biblioteca.

## Atualizar ou recuperar

Use uma release nova em outra pasta e rode o instalador. A instalação gerenciada anterior recebe backup em `~/.local/share/fassa-frame-backups/`; falhas na sincronização provocam tentativa de restauração automática. Para voltar, reinstale um pacote anterior verificado. `--uninstall` remove registros, preservando arquivos e configuração. Projetos devem permanecer fora da instalação.

## Guia local e desenvolvimento

Opcional, disponível no checkout Git completo. O ZIP de instalação contém a skill, o motor e os guias de uso, mas não inclui o aplicativo web nem suas dependências. Para abrir o guia completo no navegador, use o checkout:

```sh
npm ci --ignore-scripts
npm run check
npm run build
python3 fassa-frame.py guide
```

O guia usa loopback local. Não publica nada. Smoke do motor: `npm run test:engine`, `npm run test:preview` e `python3 scripts/smoke_engine.py`. O primeiro uso pode exigir downloads. Resultados efetivamente observados: [release-validation.md](release-validation.md).

macOS foi exercitado no ambiente de preparação. Windows e Linux não foram certificados por esta distribuição; não confunda a existência de código portável com validação nesses sistemas.
