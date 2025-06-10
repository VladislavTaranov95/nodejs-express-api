export const email = (value) => /.+@.+\..+/.test(value) || 'Email must be valid'

export const required = (field) => (value) => !!value || `${field} is required`

export const min = (field, min) => (value) =>
  value.length >= 8 || `${field} must be at least ${min} characters long`
