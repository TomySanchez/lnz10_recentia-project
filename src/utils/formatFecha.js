import dayjs from 'dayjs';

export function formatFecha(fecha) {
  if (!fecha) {
    return null;
  }

  const formattedFecha = dayjs(fecha).format('DD/MM/YY');

  return formattedFecha;
}
