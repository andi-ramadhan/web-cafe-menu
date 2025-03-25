const { nanoid } = require('nanoid');
const Menu = require('../models/menu.model');

exports.addMenu = async (req, res) => {
  try {
    const { category } = req.body; 
    const menuId = `${category}-${nanoid(16)}`;

    const menuPayload = {
      menuId: menuId,
      ...req.body
    };

    const menu = await Menu.create(menuPayload);

    return res.status(201).json({
      status: 'success',
      message: 'Menu added successfully',
      data: {
        menuId: menuId,
        menuName: menu.name,
        menuDescription: menu.description,
        menuPrice: menu.price,
      }
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
    if (name) query.name = { $regex: name, $options: 'i'}; // i makes the search case-insensitive

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

exports.editMenu = async (req, res) => {
  const { id } = req.params;
  
  try {
    const [updated] = await Menu.updateMany(
      ...req.body,
      {
        where: { menuId: id }
      }
    );

    if (!updated) {
      res.status(404).json({ error: 'No Menus Found'})
    }

    const updatedMenu = await Menu.findOne({ where: { menuId: id } });
    res.status(200).json({
      message: 'Menu updated successfully',
      data: {
        menuId: updatedMenu.id,
        menuName: updatedMenu.name,
        menuDescription: updatedMenu.description,
        menuPrice: updatedMenu.price,
        menuImage: updatedMenu.image
      }
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};