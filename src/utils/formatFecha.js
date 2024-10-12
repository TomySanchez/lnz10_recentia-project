import dayjs from 'dayjs';

export function formatFecha(fecha) {
  const formattedFecha = dayjs(fecha).format('DD/MM/YY');

  return formattedFecha;
}
