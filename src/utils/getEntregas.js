import { dataEntregas } from '../data';

export function getEntregas(idRecorrido) {
  let arrayEntregas = dataEntregas.filter(
    (entrega) => entrega.idRecorrido == idRecorrido
  );

  return arrayEntregas;
}
