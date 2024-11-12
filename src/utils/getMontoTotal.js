import { getItemById } from './getItemById';

export function getMontoTotal(pago, precios, detallesDeEntrega) {
  const detallesDePago = pago?.detallesPago;

  const importesDetallesDePago = detallesDePago.map((detalle) => {
    const precio = getItemById(detalle.idPrecio, precios)?.valor;
    const cantidad = getItemById(
      detalle.idDetalleDeEntrega,
      detallesDeEntrega
    ).cantidad;

    return precio * cantidad;
  });

  const montoTotal = importesDetallesDePago.reduce(
    (accumulator, currentValue) => accumulator + currentValue,
    0
  );

  return montoTotal;
}
