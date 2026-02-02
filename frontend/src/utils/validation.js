export const validateEmail = (email) => {
    if (!email) return false;
    // Must start with letter, no number at start. Common TLDs enforced.
    const emailRegex = /^[a-zA-Z][a-zA-Z0-9._-]*@[a-zA-Z0-9.-]+\.(com|in|org|net|edu|gov|io|co|tech|biz|info)$/i;
    return emailRegex.test(email) && !/\s/.test(email);
  };
  
  export const validatePassword = (password) => {
    if (!password) return false;
    // Min 8 chars, 1 upper, 1 lower, 1 number, 1 special
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return passwordRegex.test(password) && !/\s/.test(password);
  };
  
  export const validateName = (name) => {
    if (!name) return false;
    // Min 3 chars, Max 50, alphabets only
    const nameRegex = /^[a-zA-Z\s]{3,50}$/;
    return nameRegex.test(name);
  };
  
  export const getPasswordStrength = (password) => {
    if (!password) return 0;
    let strength = 0;
    if (password.length >= 8) strength++;
    if (/[A-Z]/.test(password)) strength++;
    if (/[a-z]/.test(password)) strength++;
    if (/[0-9]/.test(password)) strength++;
    if (/[@$!%*?&]/.test(password)) strength++;
    return strength;
  };
  
