import { getDetalles } from './getDetalles';
import { getItemById } from './getItemById';
import { getMultipleItemsById } from './getMultipleItemsById';

export function getMontoTotalRecorrido(idRecorrido) {
  const entregas = getMultipleItemsById(idRecorrido, 'entregas');

  const importesEntregas = entregas.map((entrega) => {
    const pagos = getMultipleItemsById(entrega.id, 'pagos');

    const importesPagos = pagos.map((pago) => {
      const detallesDePago = getDetalles(pago.id, 'pagos');
      const importes = detallesDePago.map((detalle) => {
        const precio = getItemById(detalle.idPrecio, 'precio').valor;
        const cantidad = getItemById(
          detalle.idDetalleDeEntrega,
          'detalleDeEntrega'
        ).cantidad;

        return precio * cantidad;
      });
      return importes.reduce(
        (accumulator, currentValue) => accumulator + currentValue,
        0
      );
    });

    return importesPagos.reduce(
      (accumulator, currentValue) => accumulator + currentValue,
      0
    );
  });

  const montoTotal = importesEntregas.reduce(
    (accumulator, currentValue) => accumulator + currentValue,
    0
  );

  return `$ ${montoTotal}`;
}
