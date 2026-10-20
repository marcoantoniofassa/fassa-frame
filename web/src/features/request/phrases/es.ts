import type { RequestPhrases } from './types';

export const es: RequestPhrases = {
  folderLabel: 'Edita los videos en',
  folderPlaceholder: '[indica la carpeta de los videos]',
  goalLabel: 'Objetivo',
  defaultGoal: 'convertir el material en un video claro y atractivo',
  formatLabel: 'Formato',
  paceLabel: 'Ritmo',
  captionsLabel: 'Subtítulos',
  visualsLabel: 'Visuales',
  sceneReference: reference => `Referencia del catálogo: ${reference}. Adapta el texto al material real.`,
  cleanupLabel: 'Intención editorial',
  cleanup: 'Elige cortes, pausas, respiraciones, sonido ambiente, voz, música, gráficos, animación, subtítulos, encuadre, privacidad y verificaciones según el material, objetivo, público, destino, identidad e intención editorial. Inspecciona y escucha antes de decidir qué conservar, reducir o eliminar. Conserva palabras completas, significado, originales y decisiones aprobadas. En revisiones puntuales, cambia solo el alcance solicitado y verifica las dependencias afectadas.',
  closing: 'Primero revisa el entorno y los archivos. Conserva los originales, las palabras habladas y el sentido. No inventes precios, resultados ni testimonios. Prepara una muestra de 8–15 segundos para que la revise antes de terminar el video completo. No uses servicios de pago ni subas contenido a terceros sin mi autorización. Al terminar, indica el archivo final y las comprobaciones realizadas.',
  formats: { vertical: '9:16 (vertical)', horizontal: '16:9 (horizontal)', square: '1:1 (cuadrado)', portrait: '4:5 (retrato para el feed)' },
  paces: { natural: 'natural, conservando las pausas intencionales', dynamic: 'dinámico, con cortes precisos que conservan las palabras completas', calm: 'tranquilo, con espacio para la expresión y la comprensión' },
  captions: { readable: 'legibles, con un énfasis sutil en las palabras importantes', subtle: 'discretos, sin animación', none: 'sin subtítulos' },
  effects: { subtle: 'sutiles, solo cuando ayudan a explicar el discurso', educational: 'didácticos, con pasos, indicaciones y títulos', expressive: 'expresivos, con transiciones y énfasis equilibrados', none: 'sin escenas visuales ni efectos adicionales' },
};
