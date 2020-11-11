const Joi = require('joi');
let pattern = /^[0-9]+$/;

const registerValidation = (data) => {
    const schema = Joi.object({
        name: Joi.string()
                .required(),
        phone: Joi.string()
                .required()
                .pattern(new RegExp(pattern))
                .min(12)
                .max(14)
                .messages({
                        'string.pattern.base' : 'invalid phone number'
                }),
        password: Joi.string()
                .required()
                
    });

    return schema.validate(data)
}

const loginValidation = (data) => {
    const schema = Joi.object({
        phone: Joi.string()
                .required()
                .pattern(new RegExp(pattern))
                .min(12)
                .max(14)
                .messages({
                        'string.pattern.base' : 'invalid phone number'
                }),
        password: Joi.string()
                .required()
                
    });

    return schema.validate(data)
}

module.exports = {registerValidation, loginValidation};