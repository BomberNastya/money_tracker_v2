export const validateEmail = (
  fieldValue: string,
  fieldName: string
): string | undefined => {
  if (fieldName === 'email' && fieldValue.length > 0) {
    const pattern = /^[\w.]+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/;
    if (!pattern.test(fieldValue)) {
      return 'Wrong E-mail format';
    }
  }
  return undefined;
};

export const validatePasswordLength = (
  fieldValue: string,
  fieldName: string
): string | undefined => {
  if (fieldName === 'password' && fieldValue.length > 0) {
    if (fieldValue.length <= 5) {
      return 'Password is too short';
    }
  }
  return undefined;
};

export const validatePasswordHasLetters = (
  fieldValue: string,
  fieldName: string
): string | undefined => {
  if (fieldName === 'password' && fieldValue.length > 0) {
    if (!/[a-zA-Z]/.test(fieldValue)) {
      return 'Password should have at least one letter';
    }
  }
  return undefined;
};

export const validateRequired = (
  fieldValue: string,
  fieldName: string
): string | undefined => {
  if (fieldValue.length === 0) {
    return `${fieldName} is required`;
  }

  return undefined;
};
