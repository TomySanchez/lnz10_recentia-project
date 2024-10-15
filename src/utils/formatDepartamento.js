export function formatDepartamento(floor, apartment) {
  if (floor && apartment) {
    return `, Dpto. ${floor}-${apartment}`;
  }
  return '';
}
