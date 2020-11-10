const Joi = require('joi');

const registerValidation = (data) => {
    const schema = Joi.object({
        name: Joi.string()
                .required(),
        phone: Joi.string()
                .required()
                .min(12)
                .max(14),
        password: Joi.string()
                .required()
                
    });

    return schema.validate(data)
}

const loginValidation = (data) => {
    const schema = Joi.object({
        phone: Joi.string()
                .required()
                .min(12)
                .max(14),
        password: Joi.string()
                .required()
                
    });

    return schema.validate(data)
}

module.exports = {registerValidation, loginValidation};