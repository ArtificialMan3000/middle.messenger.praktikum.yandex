export function extendClassName(additionalClass = '', className = '') {
  const whitespace = className.length > 0 ? ' ' : '';
  return `${className}${whitespace}${additionalClass}`;
}
