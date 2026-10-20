# Preparação para divulgação

Esta revisão alinha o guia à capa do README: papel claro, preto, âmbar, azul e enquadramentos. O site ajuda a entender, montar pedidos e instalar; ele não recebe vídeos nem substitui o assistente local.

## O que divulgar

- Repositório: https://github.com/marcoantoniofassa/fassa-frame
- Instalação: seguir o README ou copiar o pedido assistido da página de instalação.
- Pacote: usar a versão identificada em Releases e conferir o checksum. O pacote da skill não inclui o aplicativo web.
- Origem: adaptação do Editonny de Matheus Gomes, com créditos e licença MIT preservados. Recursos de terceiros mantêm suas próprias licenças.

O repositório permanece privado por decisão de Marco. Os links do site apontam para os destinos definitivos e passam a funcionar para visitantes sem acesso quando ele mudar a visibilidade. Não anunciar acesso público antes dessa mudança.

## Publicar o guia

O código pronto para hospedagem é `web/`, no checkout deste repositório. Veja [hosting.md](hosting.md). A publicação precisa usar este checkout atualizado; o site anterior pode continuar servindo a versão antiga até uma implantação autorizada. Não copiar configurações de conta, segredos ou conteúdo privado para este repositório.

Antes de divulgar o endereço definitivo, configurar a origem real em `NEXT_PUBLIC_SITE_URL`, conferir URLs canônicas, imagens de compartilhamento e todos os caminhos localizados no destino, além de verificar os links de download em uma sessão sem login. Remover `noindex` só quando houver decisão explícita de indexar o site; acesso por link e indexação são decisões diferentes.

## Limitações que precisam ficar claras

- Codex ou Claude Code e as ferramentas de vídeo devem estar instalados no computador. O assistente pode exigir assinatura; serviços externos opcionais podem cobrar e exigem autorização.
- A biblioteca opcional de mídia não é completa nesta distribuição. Usar gravações próprias/autorizadas; veja [distribution.md](distribution.md).
- A revisão humana do vídeo continua necessária. O site não promete transcrição, cortes, voz ou áudio perfeitos.
- A validação da instalação foi feita em macOS. Não apresentar Windows/Linux como certificados sem exercitá-los.
- Em 20/10/2026, a auditoria manteve cinco entradas high na cadeia de desenvolvimento ESLint → fast-glob → micromatch → braces (GHSA-vfj7-8cjw-p6xm). Não há correção compatível indicada pelo audit; a sugestão de downgrade major não foi aplicada. A cadeia não integra o runtime de produção do guia nem o ZIP da skill, mas deve ser acompanhada na manutenção. Não tratar padrões de lint recebidos de terceiros como confiáveis.

## Evidência desta revisão

Os resultados observados e os limites ficam em [validation.md](validation.md). Uma lista de preparação não substitui o teste do endereço implantado nem autoriza publicação.
