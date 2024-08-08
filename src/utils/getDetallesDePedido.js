import { dataDetallesDePedidos } from '../data';

export function getDetallesDePedido(idPedido) {
  let arrayDetallesDePedidos = dataDetallesDePedidos.filter(
    (detalle) => detalle.idPedido == idPedido
  );

  return arrayDetallesDePedidos;
}
