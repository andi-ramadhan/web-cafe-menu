const Joi = require('joi');

const menuSchema = Joi.object({
  name: Joi.string().required(),
  description: Joi.string().required(),
  price: Joi.number().positive().required(),
  image: Joi.string().required(),
  category: Joi.string().valid('coffee', 'nonCoffee', 'food').required()
});

exports.validateMenu = (req, res, next) => {
  const { error } = menuSchema.validate(req.body);
  
  if (error) {
    return res.status(400).json({
      status: 'error',
      message: error.details[0].message
    });
  }
  
  next();
};