# Origem e evolução

- Fassa Frame: adaptações e manutenção de Marco Fassa.
- Base: [Editonny, de Matheus Gomes](https://github.com/soumatheusgomes/editonny).
- Revisão de origem: [`05d3dedcddcf6717001b0a3ef91411ec08f614d4`](https://github.com/soumatheusgomes/editonny/commit/05d3dedcddcf6717001b0a3ef91411ec08f614d4).
- Correções portadas depois da origem: [`08e86fe`](https://github.com/soumatheusgomes/editonny/commit/08e86fe) e [`4d87901`](https://github.com/soumatheusgomes/editonny/commit/4d87901) (0.1.1).
- Repositório da distribuição: `https://github.com/marcoantoniofassa/fassa-frame`.
- Versão inicial: `0.1.0`. Fonte da versão: `skills/editonny/VERSION` e manifests dos plugins.

O histórico original permanece no upstream. Este repositório começa com um snapshot de distribuição do código e das adaptações locais, sem importar os blobs de mídia cuja redistribuição não foi comprovada. `LICENSE.md`, `NOTICE.md`, comentários de autoria e avisos de terceiros foram preservados. Os nomes internos `editonny`, schemas e workspaces continuam compatíveis.

## Atualizar a base de código

1. Trabalhe em uma branch e preserve alterações locais. Nunca sobrescreva a instalação em uso.
2. Em um checkout separado do upstream, compare a revisão de origem com a candidata. Leia alterações de licença, dependências, contratos e recursos.
3. Porte os commits ou diffs aplicáveis para a branch da Fassa Frame. Os dois históricos são independentes; não faça um merge cego nem reintroduza os arquivos excluídos.
4. Resolva explicitamente política editorial, instalação, textos, identidade e verificações. Não restabeleça limpeza automática de pausas e respirações como regra universal.
5. Execute testes, instalação em home temporário e render sintético representativo. Reavalie cada recurso novo antes de distribuí-lo.
6. Atualize a revisão de origem, a versão, o changelog e as evidências; publique uma nova release com pacote e checksum.

Atualizações da ferramenta para usuários: [updates.md](updates.md). Recuperação da instalação: [installation.md](installation.md).
