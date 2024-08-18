import {
  dataBarrios,
  dataClientes,
  dataDirecciones,
  dataEntregas,
  dataLocalidades,
  dataMetodosDePago,
  dataPagos,
  dataPedidos,
  dataPrecios,
  dataProductos,
  dataRecorridos
} from '../data';

export function getItemById(id, itemType) {
  let data;
  switch (itemType) {
    case 'barrio':
      data = dataBarrios;
      break;
    case 'cliente':
      data = dataClientes;
      break;
    case 'direccion':
      data = dataDirecciones;
      break;
    case 'entrega':
      data = dataEntregas;
      break;
    case 'localidad':
      data = dataLocalidades;
      break;
    case 'metodoDePago':
      data = dataMetodosDePago;
      break;
    case 'pago':
      data = dataPagos;
      break;
    case 'pedido':
      data = dataPedidos;
      break;
    case 'precio':
      data = dataPrecios;
      break;
    case 'producto':
      data = dataProductos;
      break;
    case 'recorrido':
      data = dataRecorridos;
      break;
    default:
      data = null;
  }

  if (data) {
    const item = data.find((i) => i.id == id);

    return item;
  } else {
    console.error('itemType no es válido:', itemType);
  }
}
