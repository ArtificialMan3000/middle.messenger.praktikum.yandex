type TPlainObject<T = any> = {
  [key in string]: T;
};

export function merge(lhs: TPlainObject, rhs: TPlainObject): TPlainObject {
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
  object: TPlainObject | unknown,
  path: string,
  value: unknown
): TPlainObject | unknown {
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

export function isPlainObject(value: unknown): value is TPlainObject {
  return (
    typeof value === 'object' &&
    value !== null &&
    value.constructor === Object &&
    Object.prototype.toString.call(value) === '[object Object]'
  );
}

export function isArray(value: unknown): value is [] {
  return Array.isArray(value);
}

export function isArrayOrObject(value: unknown): value is [] | TPlainObject {
  return isPlainObject(value) || isArray(value);
}

export function isEqual(lhs: TPlainObject, rhs: TPlainObject) {
  if (Object.keys(lhs).length !== Object.keys(rhs).length) {
    return false;
  }

  // TODO Переделать на forEach
  // eslint-disable-next-line no-restricted-syntax
  for (const [key, value] of Object.entries(lhs)) {
    const rightValue = rhs[key];
    if (isArrayOrObject(value) && isArrayOrObject(rightValue)) {
      if (isEqual(value, rightValue)) {
        // eslint-disable-next-line no-continue
        continue;
      }
      return false;
    }

    if (value !== rightValue) {
      return false;
    }
  }

  return true;
}
