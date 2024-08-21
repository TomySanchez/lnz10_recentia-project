import { dataEntregas, dataPagos, dataPrecios } from '../data';

export function getMultipleItemsById(id, itemsType) {
  let data;
  let entityId;
  switch (itemsType) {
    case 'entregas':
      data = dataEntregas;
      entityId = 'idRecorrido';
      break;
    case 'pagos':
      data = dataPagos;
      entityId = 'idEntrega';
      break;
    case 'precios':
      data = dataPrecios;
      entityId = 'idProducto';
  }

  if (data) {
    const item = data.filter((i) => i[entityId] == id);

    return item;
  } else {
    console.error('itemsType no es válido:', itemsType);
    return [];
  }
}
