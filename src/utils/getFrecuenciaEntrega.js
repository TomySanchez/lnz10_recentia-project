export function getFrecuenciaEntrega(cantSemanas) {
  switch (cantSemanas) {
    case null:
      return '-';
    case 1:
      return 'Cada semana';
    default:
      return `Cada ${cantSemanas} semanas`;
  }
}
