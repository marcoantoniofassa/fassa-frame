# Condições para uma distribuição comercial

Esta versão é uma base local verificável. Não é uma liberação jurídica ou certificação de qualidade para venda. A pesquisa inicial de nome não verificou INPI, domínio ou perfis; nenhuma marca foi registrada.

| Grupo | Evidência preservada | Situação nesta entrega |
| --- | --- | --- |
| Código Editonny | LICENSE.md MIT, autor Matheus Gomes, histórico e commit base | Texto original preservado; não reatribuir autoria |
| Adaptações Fassa Frame | NOTICE.md; diff local; versão 0.1.0 | MIT declarado para contribuições novas de Marco |
| Fontes | OFL/Apache e notices junto aos arquivos, listados no motor | Inventário herdado; conferir avisos/termos de cada fonte na distribuição final |
| YuNet e segmentação | Licenças, origem e hashes documentados no motor | Manter restrições do modelo; tracking não é anonimização |
| SFX | Receipts, manifestos e notices CC0/MIT herdados | Manter registros por recurso; conferir a origem de qualquer adição |
| 79 vídeos do catálogo | media.json com tamanho e SHA-256; integridade verificada | Manifesto não traz campos de licença/autor por clipe; falta comprovação de redistribuição antes de vender o bundle |
| Imagens, músicas e objetos | Pastas da biblioteca e avisos existentes | Revisão por recurso pendente; não presumir licença pela do repositório |
| FFmpeg, HyperFrames, GSAP, Remotion, Whisper | Dependências/locks e avisos próprios; Remotion externo opcional | Conferir termos e build efetivo no produto a distribuir |
| Assets pessoais/de clientes | Apenas referências locais na skill | Não incluídos no pacote; não liberados para revenda por esta tarefa |
| Integrações gerativas | Receitas/contratos; nenhum serviço pago exercitado | Cada conta, modelo e uso exige seus termos e autorização |

## Dependências do guia

`npm audit --json`, em 20/10/2026, confirmou 5 entradas high na cadeia de desenvolvimento `eslint-config-next → @next/eslint-plugin-next → fast-glob → micromatch → braces`. Advisory reportado: https://github.com/advisories/GHSA-vfj7-8cjw-p6xm (stack exhaustion com padrões profundamente aninhados). O relatório propôs trocar `eslint-config-next` por 14.2.35, incompatível com o pin 16.4.2 do upstream. Não foi aplicado `audit fix --force`. Reavaliar correção compatível antes de distribuir o ambiente de desenvolvimento. O pacote da skill não inclui node_modules do guia.

## Critério de release

Antes de oferecer o produto: confirmar nome/marca; registrar o fork em remoto autorizado; revisar licenças por asset e retirar/substituir somente o que não puder ser distribuído; resolver/avaliar advisories vigentes; exercer instalação e uso reais nos clientes e sistemas anunciados; documentar suporte, recuperação e limites. Preservar capacidades na instalação interna enquanto recursos para distribuição são avaliados. Não anunciar testes do autor upstream como testes realizados aqui.
