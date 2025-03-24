const Menu = require('../models/menu.model');

exports.addMenu = async (req, res) => {
  try {

    const menu = await Menu.create(req.body);

    return res.status(201).json({
      status: 'success',
      message: 'Menu added successfully',
      data: menu
    });
  } catch (err) {
    res.status(400).json({
      status: 'error',
      message: err.message 
    });
  }
};

exports.getAllMenu = async (req, res) => {
  try {
    const { category, name } = req.query;
    const query = {};
    
    if (category) query.category = category;
    if (name) query.name = { $regex: name, $options: 'i'};

    const resultMenus = await Menu.find(query);

    if (!resultMenus.length) {
      return res.status(404).json({
        status: 'fail',
        message: 'No menus found',
      });
    }
    
    res.json({
      status: 'success',
      data: resultMenus
    });
  } catch (err) {
    res.status(500).json({ 
      status: 'error',
      message: err.message 
    });
  }
};