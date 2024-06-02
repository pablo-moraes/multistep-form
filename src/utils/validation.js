/**
 * Check if received a valid email
 * @param {string} email 
 * @returns 
 */
export const validEmail = email => {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
}

/**
 * Check if the field is empty
 * @param {string} value 
 * @returns 
 */
export const isEmpty = value => {
  return !value.trim();
}


/**
 * Validate if all fields are verified
 * @param {Object} fields 
 * @returns 
 */
export const allFieldsVerified = fields => {
  return Object.values(fields).every(field => field.verified)
}
