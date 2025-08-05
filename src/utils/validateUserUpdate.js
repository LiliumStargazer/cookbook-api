// src/utils/validateUserUpdate.js
function validateUserUpdate(data) {
  if ('username' in data) {
    if (typeof data.username !== 'string' || data.username.length < 3) {
      return 'Username non valido';
    }
  }
  if ('password' in data) {
    if (typeof data.password !== 'string' || data.password.length < 6) {
      return 'Password non valida';
    }
  }
  if ('email' in data) {
    const emailRegex = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/;
    if (typeof data.email !== 'string' || !emailRegex.test(data.email)) {
      return 'Email non valida';
    }
  }
  if ('favoriteDishes' in data) {
    if (!Array.isArray(data.favoriteDishes)) {
      return 'favoriteDishes deve essere un array';
    }
  }
  return null;
}
module.exports = validateUserUpdate;