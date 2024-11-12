import {
  dataDirecciones,
  dataLocalidades,
  dataMetodosDePago,
  dataPrecios,
  dataProductos
} from '../data';

export function getItemById(id, itemType_itemsArray) {
  let data;

  /* TODO Condicional temporal. Una vez haya reemplazado todos los JSONs por datos de API eliminaré el condicional, quedando solo el contenido de condición se cumple. También cambiaré el nombre de 'itemType_itemsArray' a 'itemsArray'. */
  if (Array.isArray(itemType_itemsArray)) {
    const item = itemType_itemsArray.find((i) => i.id == id);

    return item;
  } else {
    switch (itemType_itemsArray) {
      /*  case 'barrio':
        data = dataBarrios;
        break; */
      /* case 'cliente':
        data = dataClientes;
        break; */
      /* case 'detalleDeEntrega':
        data = dataDetallesDeEntregas;
        break; */
      /* case 'detalleDePedido':
        data = dataDetallesDePedidos;
        break; */
      /* case 'detalleDePago':
        data = dataDetallesDePagos;
        break; */
      case 'direccion':
        data = dataDirecciones;
        break;
      /* case 'entrega':
        data = dataEntregas;
        break; */
      case 'localidad':
        data = dataLocalidades;
        break;
      case 'metodoDePago':
        data = dataMetodosDePago;
        break;
      /* case 'pago':
        data = dataPagos;
        break; */
      /* case 'pedido':
        data = dataPedidos;
        break; */
      case 'precio':
        data = dataPrecios;
        break;
      case 'producto':
        data = dataProductos;
        break;
      /* case 'recorrido':
        data = dataRecorridos;
        break; */
      default:
        data = null;
    }
  }

  if (data) {
    const item = data.find((i) => i.id == id);

    return item;
  } else {
    console.error('itemType_itemsArray no es válido:', itemType_itemsArray);
  }
}
