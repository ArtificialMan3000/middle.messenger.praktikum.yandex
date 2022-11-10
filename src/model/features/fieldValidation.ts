type TValidationRule = {
  regexp?: RegExp;
  excludeRegexp?: RegExp;
  minLength?: number;
  maxLength?: number;
};

export const validationRules: Record<string, TValidationRule> = {};

validationRules.first_name = {
  regexp: /^[A-ZА-Я][A-ZА-Яa-zа-я-]*$/,
};

validationRules.second_name = validationRules.first_name;

validationRules.login = {
  regexp: /[A-Za-z\-_0-9]*/,
  excludeRegexp: /^[0-9]+$/,
  minLength: 3,
  maxLength: 20,
};

validationRules.email = {
  regexp: /^[A-Za-z0-9-.]+@[A-Za-z0-9-]+\.[A-Za-z0-9-]+$/,
};

validationRules.newPassword = {
  regexp: /^(?=.*\d)(?=.*[A-Z]).*$/,
  minLength: 8,
  maxLength: 40,
};

validationRules.phone = {
  regexp: /^\+?\d+$/,
  minLength: 10,
  maxLength: 15,
};

validationRules.message = {
  minLength: 1,
};

export const isFieldValid = (fieldName: string, fieldValue: string) => {
  if (!validationRules[fieldName]) {
    return true;
  }

  let isValid = false;
  let isValidByRegexp = false;
  let isValidByExcludeRegexp = false;
  let isValidByMinLength = false;
  let isValidByMaxLength = false;

  const { regexp, excludeRegexp, minLength, maxLength } =
    validationRules[fieldName];

  if (regexp) {
    const mustMatch = new RegExp(regexp);

    if (mustMatch.test(fieldValue)) {
      isValidByRegexp = true;
    }
  } else {
    isValidByRegexp = true;
  }

  if (excludeRegexp) {
    const mustNotMatch = new RegExp(excludeRegexp);
    if (!mustNotMatch.test(fieldValue)) {
      isValidByExcludeRegexp = true;
    }
  } else {
    isValidByExcludeRegexp = true;
  }

  if (minLength) {
    isValidByMinLength = fieldValue.length >= minLength;
  } else {
    isValidByMinLength = true;
  }

  if (maxLength) {
    isValidByMaxLength = fieldValue.length <= maxLength;
  } else {
    isValidByMaxLength = true;
  }

  isValid =
    isValidByRegexp &&
    isValidByExcludeRegexp &&
    isValidByMinLength &&
    isValidByMaxLength;

  return isValid;
};

export const setValidityStatus = (
  input: HTMLInputElement,
  className: string
) => {
  const { name, value } = input;
  const isValid = isFieldValid(name, value);
  if (isValid) {
    input.classList.remove(className);
  } else {
    input.classList.add(className);
  }
};
