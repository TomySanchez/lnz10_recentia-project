import { dataDetallesDePagos } from '../data';
import { getItemById } from './getItemById';

export function getMontoTotal(idPago) {
  const detallesDePago = dataDetallesDePagos.filter(
    (detalle) => detalle.idPago == idPago
  );

  const importesDetallesDePago = detallesDePago.map((detalle) => {
    const precio = getItemById(detalle.idPrecio, 'precio').valor;
    const cantidad = getItemById(
      detalle.idDetalleDeEntrega,
      'detalleDeEntrega'
    ).cantidad;

    return precio * cantidad;
  });

  const montoTotal = importesDetallesDePago.reduce(
    (accumulator, currentValue) => accumulator + currentValue,
    0
  );

  return montoTotal;
}
