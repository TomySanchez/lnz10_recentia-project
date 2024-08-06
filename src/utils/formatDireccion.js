import { formatDepartamento } from './formatDepartamento';

export function formatDireccion(direccionObj) {
  const { calle, numero, piso, departamento } = direccionObj;

  const formattedDireccion = `${calle} ${numero}${formatDepartamento(
    piso,
    departamento
  )}`;

  return formattedDireccion;
}
