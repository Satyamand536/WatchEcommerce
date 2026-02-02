const { validateEmail, validatePassword, validateName } = require('../utils/validators');

const validateSignup = (req, res, next) => {
    const { name, email, password } = req.body;

    if (!validateName(name)) {
        return res.status(400).json({ 
            success: false, 
            message: 'Name must be at least 3 characters long and contain only alphabets.' 
        });
    }

    if (!validateEmail(email)) {
        return res.status(400).json({ 
            success: false, 
            message: 'Please enter a valid email address (e.g., name@domain.com) with no spaces.' 
        });
    }

    if (!validatePassword(password)) {
        return res.status(400).json({ 
            success: false, 
            message: 'Password must be at least 8 characters long, contain uppercase, lowercase, number, and special character.' 
        });
    }

    // Sanitize email to lowercase
    req.body.email = email.toLowerCase().trim();
    req.body.name = name.trim();
    next();
};

const validateSignin = (req, res, next) => {
    const { email } = req.body;

    if (!validateEmail(email)) {
        return res.status(400).json({ 
            success: false, 
            message: 'Please enter a valid email address.' 
        });
    }

    // Sanitize email to lowercase
    req.body.email = email.toLowerCase().trim();
    next();
};

const validateSubscribe = (req, res, next) => {
    const { email } = req.body;

    if (!validateEmail(email)) {
        return res.status(400).json({ 
            success: false, 
            message: 'Please enter a valid email address.' 
        });
    }

    // Sanitize email to lowercase
    req.body.email = email.toLowerCase().trim();
    next();
};

module.exports = {
    validateSignup,
    validateSignin,
    validateSubscribe
};
