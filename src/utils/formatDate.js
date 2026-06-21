export function formatDate(value) {
  if (!value || typeof value !== 'string') {
    return '';
  }

  return value.replaceAll('-', '/');
}
