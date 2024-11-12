export function calcularMontoTotalEntrega(idEntrega, entregas, pagos, precios) {
  const entrega = entregas.find((e) => e.id === idEntrega);
  if (!entrega) {
    return 0;
  }

  let montoTotal = 0;

  entrega.detallesEntrega.forEach((detalle) => {
    const pago = pagos.find((p) =>
      p.detallesPago.some(
        (d) => d.idDetalleDeEntrega === detalle.idDetalleEntrega
      )
    );

    if (pago) {
      const detallePago = pago.detallesPago.find(
        (d) => d.idDetalleDeEntrega === detalle.idDetalleEntrega
      );
      if (detallePago) {
        const precio = precios.find((p) => p.id === detallePago.idPrecio);
        if (precio) {
          montoTotal += detalle.cantidad * precio.valor;
        }
      }
    }
  });

  return `$ ${montoTotal}`;
}
