import { dataPagos } from '../data';

export function getPagos(idEntrega) {
  let arrayPagos = dataPagos.filter((pago) => pago.idEntrega == idEntrega);

  return arrayPagos;
}
