type Indexed<T = unknown> = {
  [key in string]?: T;
};

export function merge(lhs: Indexed, rhs: Indexed): Indexed {
  const result = lhs;
  Object.keys(rhs).forEach((key) => {
    const lhsValue = lhs[key];
    const rhsValue = rhs[key];
    if (
      lhsValue &&
      rhsValue &&
      typeof lhsValue === 'object' &&
      typeof rhsValue === 'object'
    ) {
      result[key] = merge(lhsValue, rhsValue);
    } else {
      result[key] = rhs[key];
    }
  });
  return result;
}

export function set(
  object: Indexed | unknown,
  path: string,
  value: unknown
): Indexed | unknown {
  if (typeof path !== 'string') {
    throw new TypeError('path must be string');
  }
  if (typeof object !== 'object' || object === null) {
    return object;
  }
  const fields = path.split('.');
  const object2 = fields.reduceRight((obj, field, index) => {
    if (index === fields.length - 1) {
      return { [field]: value };
    }
    return { [field]: obj };
  }, {});
  return merge(object, object2);
}
