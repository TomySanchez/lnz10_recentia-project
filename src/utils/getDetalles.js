import {
  dataDetallesDeEntregas,
  dataDetallesDePagos,
  dataDetallesDePedidos
} from '../data';

export function getDetalles(id, detailsType) {
  let data;
  let entityId;
  switch (detailsType) {
    case 'entregas':
      data = dataDetallesDeEntregas;
      entityId = 'idEntrega';
      break;
    case 'pagos':
      data = dataDetallesDePagos;
      entityId = 'idPago';
      break;
    case 'pedidos':
      data = dataDetallesDePedidos;
      entityId = 'idPedido';
      break;
  }

  if (data) {
    const item = data.filter((i) => i[entityId] == id);

    return item;
  } else {
    console.error('detailsType no es válido:', detailsType);
  }
}
