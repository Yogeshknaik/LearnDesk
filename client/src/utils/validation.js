export const validateEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const validatePassword = (password) => {
  return password.length >= 6;
};

export const validateRequired = (value) => {
  return value && value.trim().length > 0;
};

export const validateEmployeeId = (id) => {
  return /^[A-Z0-9]{6,}$/i.test(id);
};

export const validateNumber = (value, min = 0, max = Infinity) => {
  const num = Number(value);
  return !isNaN(num) && num >= min && num <= max;
};
