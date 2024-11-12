export function calcularMontoTotalRecorrido(
  idRecorrido,
  entregas,
  pagos,
  precios
) {
  const entregasDelRecorrido = entregas?.filter(
    (e) => e.idRecorrido == idRecorrido
  );

  let montoTotal = 0;

  entregasDelRecorrido.forEach((entrega) => {
    const pagoAsociado = pagos.find((pago) => pago.id === entrega.idPago);

    if (pagoAsociado) {
      pagoAsociado.detallesPago.forEach((detallePago) => {
        const detalleEntrega = entrega.detallesEntrega.find(
          (det) => det.idDetalleEntrega === detallePago.idDetalleDeEntrega
        );
        const precio = precios.find((pre) => pre.id === detallePago.idPrecio);

        if (detalleEntrega && precio) {
          montoTotal += detalleEntrega.cantidad * precio.valor;
        }
      });
    }
  });

  return `$ ${montoTotal}`;
}
