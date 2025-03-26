const Joi = require('joi');

const menuSchema = Joi.object({
  name: Joi.string().required(),
  description: Joi.string().required(),
  price: Joi.number().positive().required(),
  image: Joi.string().required(),
  category: Joi.string().valid('coffee', 'nonCoffee', 'food').required()
});

const editMenuSchema = Joi.object({
  name: Joi.string(),
  description: Joi.string(),
  price: Joi.number().positive(),
  image: Joi.string()
})

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

exports.validateEditMenu = (req, res, next) => {
  const { error } = editMenuSchema.validate(req.body);

  if (error) {
    return res.status(400).json({
      status: 'error',
      message: error.details[0].message
    });
  }

  next();
};