# O que acompanha esta distribuição

A edição 0.1.0 distribui o código, a skill, as cenas editáveis, o guia e os recursos com licença registrada. A lista de exclusões está em `distribution-exclusions.json`.

## Incluído

- Código e documentação do Editonny sob MIT, com atribuição original, e adaptações Fassa Frame.
- Fontes, modelos de detecção/segmentação e efeitos sonoros do motor com avisos em `skills/editonny/engine/THIRD_PARTY_NOTICES.md`.
- Objetos 3D da biblioteca com declaração CC0 preservada no diretório correspondente.
- Modelos de cena e ferramentas para trabalhar com mídia fornecida pelo usuário.

## Não incluído

- Vídeos, músicas, fundos, locuções e imagens da biblioteca herdada sem comprovação individual de redistribuição nesta preparação.
- Gravações reais, conversas, identidade de clientes, projetos, renders e credenciais do ambiente de trabalho.
- Dependências instaladas, ambientes virtuais, modelos de transcrição baixados e caches.

O manifesto original de vídeos permanece na ferramenta como inventário de referências. `media status --json` reporta os arquivos ausentes e retorna código 1 nesta edição. Isso é intencional e não deve ser apresentado como biblioteca completa. **Não baixe ou redistribua esses arquivos automaticamente:** use material próprio/autorizado ou uma cena que não dependa deles. O motor recusa a aplicação de um vídeo ausente sem alterar o projeto.

A edição local anterior não foi reduzida nem modificada. Este repositório começa com um snapshot de distribuição: os commits e arquivos privados do ambiente de trabalho não foram transportados. A origem exata está em [upstream.md](upstream.md); o histórico original continua no repositório do Matheus.
