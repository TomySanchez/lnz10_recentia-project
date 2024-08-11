import { dataDetallesDeEntregas } from '../data';

export function getDetallesDeEntrega(idEntrega) {
  let arrayDetallesDeEntregas = dataDetallesDeEntregas.filter(
    (detalle) => detalle.idEntrega == idEntrega
  );

  return arrayDetallesDeEntregas;
}
