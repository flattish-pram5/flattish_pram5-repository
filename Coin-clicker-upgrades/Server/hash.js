const crypto = require('crypto');

/**
 * Хешує пароль за допомогою SHA-256.
 * @param {string} password - Пароль користувача.
 * @returns {string} - Захешований пароль.
 */
function encodePassword(password) {
    return crypto.createHash('sha256').update(password).digest('hex');
}

/**
 * Порівнює введений пароль з хешованим паролем.
 * @param {string} password - Введений пароль.
 * @param {string} hashedPassword - Хешований пароль.
 * @returns {boolean} - true, якщо паролі співпадають, інакше false.
 */
function comparePassword(password, hashedPassword) {
    const hashedInput = encodePassword(password);
    return hashedInput === hashedPassword;
}

/**
 * Генерує "токен" на основі email + часу, хешований через SHA-256.
 * @param {string} email - Email користувача.
 * @returns {string} - Генерований токен.
 */
function generateToken(email) {
    const timestamp = Date.now().toString();
    return crypto.createHash('sha256').update(email + timestamp).digest('hex');
}

module.exports = { encodePassword, comparePassword, generateToken };