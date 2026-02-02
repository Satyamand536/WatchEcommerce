/**
 * Validates email format strictly
 * - Must contain exactly one @
 * - Must have a valid domain extension (.com, .in, etc.)
 * - No spaces allowed
 * - Format: name@domain.extension
 */
const validateEmail = (email) => {
    if (!email) return false;
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    return emailRegex.test(email) && !/\s/.test(email); // Ensure no spaces
};

/**
 * Validates password strength
 * - Minimum 8 characters
 * - At least 1 uppercase letter
 * - At least 1 lowercase letter
 * - At least 1 number
 * - At least 1 special character (@#$%^&*!)
 * - No spaces
 */
const validatePassword = (password) => {
    if (!password) return false;
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return passwordRegex.test(password) && !/\s/.test(password); // Ensure no spaces
};

/**
 * Validates name
 * - Minimum 3 characters
 * - Alphabets and spaces only
 * - No numbers or symbols
 */
const validateName = (name) => {
    if (!name) return false;
    const nameRegex = /^[a-zA-Z\s]{3,}$/;
    return nameRegex.test(name);
};

module.exports = {
    validateEmail,
    validatePassword,
    validateName
};
