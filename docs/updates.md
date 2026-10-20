# Atualizar sem perder seu trabalho

[← Voltar ao início](../README.md)

As versões ficam em [Releases](https://github.com/marcoantoniofassa/fassa-frame/releases). O [histórico de mudanças](../CHANGELOG.md) explica o que mudou. Estar no GitHub não instala atualizações automaticamente no seu computador.

## Para quem usa a ferramenta

Copie no assistente:

> Confira a versão instalada da Fassa Frame e as releases deste repositório. Leia o que mudou e atualize para a versão estável disponível. Preserve minhas gravações, meus projetos e a instalação anterior. Se houver mudanças locais, não sobrescreva: prepare uma instalação separada. Verifique a instalação e me diga qual versão ficou ativa.

Evite trocar a versão da ferramenta no meio de uma entrega importante. Registre no projeto a versão usada para editar; teste a nova em uma cópia antes de adotá-la.

## Para quem mantém a instalação

O instalador faz backup da instalação gerenciada e tenta restaurá-la se a sincronização das dependências falhar. Isso não substitui o backup dos projetos. Um registro que já pertence a outra instalação não deve ser sobrescrito.

Baixe a nova release em uma pasta separada, confira o SHA-256 do pacote e siga `docs/installation.md`. Para voltar, reinstale a release anterior preservada. O comando `--uninstall` remove registros; não apaga seus projetos.

O código de desenvolvimento e o código que veio do Editonny são acompanhados separadamente. [Procedimento de atualização da base →](upstream.md)
