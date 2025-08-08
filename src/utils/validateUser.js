// utils/validateUser.js
function validateUserData({ username, password, email, favoriteDishes }) {
  if (favoriteDishes && !Array.isArray(favoriteDishes)) {
    return 'favoriteDishes deve essere un array';
  }
  if (!username || typeof username !== 'string' || username.length < 3) {
    return 'Username non valido: deve contenere almeno 3 caratteri';
  }
  if (!password || typeof password !== 'string' || password.length < 6) {
    return 'Password non valida: la password deve contenere almeno 6 caratteri';
  }
  if (!email || typeof email !== 'string' || !/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email)) {
    return 'Email non valida';
  }
  return null;
}
module.exports = validateUserData;