import { dataDetallesDePagos } from '../data';

export function getDetallesDePago(idPago) {
  let arrayDetallesDePagos = dataDetallesDePagos.filter(
    (detalle) => detalle.idPago == idPago
  );

  return arrayDetallesDePagos;
}
