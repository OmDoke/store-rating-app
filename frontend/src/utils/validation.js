const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PASSWORD_REGEX = /^(?=.*[A-Z])(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,16}$/;

export const validateName = (value) => {
  const trimmed = value?.trim() || '';
  if (!trimmed) return 'Name is required.';
  if (trimmed.length < 20 || trimmed.length > 60) return 'Name must be between 20 and 60 characters.';
  return '';
};

export const validateEmail = (value) => {
  const trimmed = value?.trim() || '';
  if (!trimmed) return 'Email is required.';
  if (!EMAIL_REGEX.test(trimmed)) return 'Please enter a valid email address.';
  return '';
};

export const validateAddress = (value) => {
  const trimmed = value?.trim() || '';
  if (trimmed.length > 400) return 'Address cannot exceed 400 characters.';
  return '';
};

export const validatePassword = (value) => {
  if (!value) return 'Password is required.';
  if (!PASSWORD_REGEX.test(value)) return 'Password must be 8-16 characters and include one uppercase letter and one special character.';
  return '';
};

export const validateLoginForm = (values) => ({
  email: validateEmail(values.email),
  password: values.password ? '' : 'Password is required.',
});

export const validateSignupForm = (values) => ({
  name: validateName(values.name),
  email: validateEmail(values.email),
  address: validateAddress(values.address),
  password: validatePassword(values.password),
});

export const validatePasswordUpdateForm = (values) => ({
  currentPassword: values.currentPassword ? '' : 'Current password is required.',
  newPassword: validatePassword(values.newPassword),
});
