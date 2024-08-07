import {
  dataBarrios,
  dataClientes,
  dataDirecciones,
  dataLocalidades,
  dataProductos
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
    case 'localidad':
      data = dataLocalidades;
      break;
    case 'producto':
      data = dataProductos;
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
