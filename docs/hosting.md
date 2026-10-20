# Guia no navegador

O guia é o aplicativo Next.js em `web/`. O repositório contém o código e um exportador estático; não contém credenciais nem configurações de conta de hospedagem. Preparar o código não altera a visibilidade do GitHub nem publica o site.

## Preview e servidor Next.js

A partir da raiz do checkout:

```sh
npm ci --ignore-scripts
npm run check
NEXT_PUBLIC_SITE_URL=https://seu-dominio.example npm run build
npm run start -w @editonny/web
```

Substitua o domínio de exemplo pelo endereço real antes do build de produção. O fallback `localhost` serve apenas ao desenvolvimento. Em provedores que pedem uma pasta raiz do aplicativo, selecione `web/` e preserve o acesso aos workspaces, fontes e catálogo da raiz do repositório. O arquivo `next.config.ts` registra as dependências externas rastreadas pelo build.

Os caminhos públicos têm prefixos `/pt-br`, `/en` e `/es`, com nomes de páginas localizados. O servidor inclui headers de segurança. `/design-system` é uma referência de desenvolvimento, marcada para não indexar.

## Exportação estática

`scripts/export-web.mjs` prepara um site em `dist/fassa-frame/`, com base `/fassa-frame`, três idiomas e redirecionamento inicial para português. Ele não publica os arquivos. O export mantém `noindex,nofollow` para revisão por link; isso não é controle de acesso. O destino precisa servir o conteúdo sob essa mesma base, com MIME correto para fontes e imagens e regras próprias de headers de segurança. O servidor Next e o export estático têm roteamentos diferentes e devem ser verificados separadamente.

```sh
NEXT_PUBLIC_SITE_URL=https://seu-dominio.example node scripts/export-web.mjs
```

Não enviar o checkout inteiro ao hosting: somente o aplicativo compilado ou a pasta exportada, conforme o provedor. Nunca incluir vídeos privados, `.env`, caches, credenciais ou o ZIP da skill no site. Downloads apontam para GitHub Releases.

## Divulgação

Veja [public-launch.md](public-launch.md). Defina o destino e confirme a publicação autorizada antes de implantar. Após a implantação, valide sem login: início, criação de pedido, exemplos, catálogo, instalação, idiomas, navegação móvel, imagens de compartilhamento e acesso à release. Os testes locais não comprovam que a versão está no ar.
