# Contrato editorial

O registro pode ser `edit/project.md` ou o documento vigente do projeto. Não crie uma segunda fonte de decisões.

## Briefing mínimo

Material e fontes; objetivo e público; destino/proporção/duração desejada; identidade e referências; intenção (o que a pessoa deve compreender/sentir/fazer); escopo atual; escolhas aprovadas e autorizações. Use [o exemplo](../examples/editorial-brief.md) como formulário, não como preset de valores.

Para cada camada relevante, registre decisão + motivo + evidência: montagem/cortes, ritmo/pausas/respirações, ambiente, voz, trilha/efeitos, gráficos/dados, animação, legendas, enquadramento, privacidade e critérios de conferência. Camadas desnecessárias podem ficar ausentes. Uma entrevista, VSL, meme e peça de luto não precisam da mesma gramática.

## Kit de marca

Identidade recorrente fica num kit da marca, fora do pacote (pasta do time): logo e variações, fontes, cores, tela final pronta (arquivo e duração), CTA, assinatura e restrições. Leia o kit indicado no briefing antes de desenhar textos e motion. Havendo tela final no kit, feche o vídeo com ela salvo briefing que a desligue; reutilize o arquivo em vez de recriá-lo. Sem kit, pergunte pela identidade em vez de inventar uma.

## Revisão de material aprovado

1. Identifique versão, hash ou arquivo exato aprovado e pedido novo.
2. Marque o intervalo/camada a alterar e dependências realmente afetadas.
3. Preserve os demais parâmetros. Trocar uma frase da legenda não autoriza novo corte, voz ou trilha.
4. Gere nova versão sem sobrescrever o render anterior; escreva primeiro em arquivo temporário.
5. Confira região alterada e dependências; compare duração, sincronismo e comportamento que deveria permanecer.
6. Registre nova evidência de aprovação somente se de fato concedida. Autorização de execução não é aprovação inventada do resultado.

Se o projeto já usa script, EDL e dados separados, mantenha esse contrato. Para projetos novos do motor, `project.json` é a configuração e `edit/project.md` registra decisões; um briefing não substitui a timeline.

## Verificação por consequência

Fala cortada, dado inventado, rosto identificável sem autorização e perda do original são problemas independentes de estilo. Já pausa, tela escura, ritmo, voz e música exigem contexto. Associe uma exceção de silêncio/preto ao intervalo e motivo; valide se o render ainda corresponde ao motivo depois de uma alteração.

Alvos de mix e margens precisam ser explícitos. Um alvo -16 LUFS pode atender um documental; o preset -14 LUFS pode atender outro destino. Não normalize áudio aprovado automaticamente. Meça a diferença entre voz e trilha no arquivo exportado, não apenas no ganho nominal.

## Legibilidade e continuidade da voz

Avalie texto no tamanho de exibição, não só no arquivo 1080p. Para vídeos verticais destinados ao celular, uma amostra reduzida a 360 × 640 ajuda a revelar legendas e gráficos pequenos. Quando a leitura exige esforço, aumente a tipografia e reorganize linhas, cartões e colunas; não se limite a uma ampliação que preserve um layout apertado. Confira sobreposição, cortes e área segura depois da mudança.

Uma voz nominalmente igual pode variar a interpretação entre gerações. Se uma fala contínua soa remendada, confira se os trechos foram gerados separadamente. Quando autorizado, prefira gerar a passagem contínua completa em uma tomada, mantendo o restante aprovado. Faça as telas acompanharem a fala, em vez de recortar o novo áudio para reproduzir pausas antigas. Transcrição correta e volume consistente não comprovam naturalidade: a revisão deve incluir escuta.
