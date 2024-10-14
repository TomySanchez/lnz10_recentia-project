export function sortItemsArrayById(array, key, order = 'asc') {
  if (order === 'desc') {
    return array.sort((a, b) => b[key] - a[key]);
  } else {
    return array.sort((a, b) => a[key] - b[key]);
  }
}
