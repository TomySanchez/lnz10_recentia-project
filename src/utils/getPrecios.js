import { dataPrecios } from '../data';

export function getPrecios(idProducto) {
  let arrayPrecios = dataPrecios.filter(
    (precio) => precio.idProducto == idProducto
  );

  return arrayPrecios;
}
