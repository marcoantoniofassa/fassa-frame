import type { RequestPhrases } from './types';

export const ptBR: RequestPhrases = {
  folderLabel: 'Edite os vídeos em',
  folderPlaceholder: '[informe a pasta dos vídeos]',
  goalLabel: 'Objetivo',
  defaultGoal: 'transformar o material em um vídeo claro e envolvente',
  formatLabel: 'Formato',
  paceLabel: 'Ritmo',
  captionsLabel: 'Legendas',
  visualsLabel: 'Visuais',
  sceneReference: reference => `Referência do catálogo: ${reference}. Adapte o texto ao material real.`,
  cleanupLabel: 'Intenção editorial',
  cleanup: 'Escolha cortes, pausas, respirações, som ambiente, voz, música, gráficos, animação, legendas, enquadramento, privacidade e verificações conforme material, objetivo, público, destino, identidade e intenção editorial. Inspecione e escute antes de decidir o que manter, reduzir ou remover. Preserve palavras completas, sentido, originais e escolhas aprovadas. Em revisões pontuais, altere apenas o escopo pedido e confira as dependências afetadas.',
  closing: 'Primeiro verifique o ambiente e os arquivos. Preserve os originais, as palavras faladas e o sentido. Não invente preços, resultados ou depoimentos. Prepare uma amostra de 8–15 segundos para eu revisar antes de finalizar o vídeo completo. Não use serviços pagos nem envie mídia a terceiros sem minha autorização. Ao terminar, informe o arquivo final e as verificações realizadas.',
  formats: { vertical: '9:16 (vertical)', horizontal: '16:9 (horizontal)', square: '1:1 (quadrado)', portrait: '4:5 (retrato para o feed)' },
  paces: { natural: 'natural, preservando pausas intencionais', dynamic: 'dinâmico, com cortes precisos que preservam palavras completas', calm: 'calmo, com espaço para expressão e compreensão' },
  captions: { readable: 'legíveis, com ênfase sutil nas palavras importantes', subtle: 'discretas, sem animação', none: 'sem legendas' },
  effects: { subtle: 'sutis, só quando ajudam a explicar a fala', educational: 'didáticos, com passos, indicações e títulos', expressive: 'expressivos, com transições e ênfases equilibradas', none: 'sem cenas visuais nem efeitos adicionais' },
};
