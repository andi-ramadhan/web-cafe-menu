const { nanoid } = require('nanoid');
const Menu = require('../models/menu.model');

exports.addMenu = async (req, res) => {
  try {
    const { category } = req.body; 
    const menuId = `${category}-${nanoid(5)}`;

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
    if (Object.keys(req.body).length === 0) {
      return res.status(400).json({
        status: 'error',
        message: 'Update data is required'
      });
    }

    const updatedMenu = await Menu.findOneAndUpdate(
      { menuId: id },
      req.body,
      {
        new: true,
        runValidators: true
      }
    );

    if (!updatedMenu) {
      return res.status(404).json({
        status: 'error',
        message: 'Menu not found'
      });
    }

    res.status(200).json({
      message: 'Menu updated successfully',
      data: {
        menuId: updatedMenu.menuId,
        menuName: updatedMenu.name,
        menuDescription: updatedMenu.description,
        menuPrice: updatedMenu.price,
        menuImage: updatedMenu.image,
        category: updatedMenu.category
      }
    });
  } catch (err) {
    res.status(500).json({
      status: 'error',
      error: err.message
    });
  }
};

exports.deleteMenu = async (req, res) => {
  const { id } = req.params;

  try {
    const deletedMenu = await Menu.findOneAndDelete({ menuId: id });

    if (!deletedMenu) {
      return res.status(404).json({
        status: 'error',
        message: 'Menu not found'
      });
    }

    res.status(200).json({
      stauts: 'success',
      message: 'Menu deleted successfully',
      data: {
        menuId: deletedMenu.menuId,
        name: deletedMenu.name,
        category: deletedMenu.category
      }
    });
  } catch (err) {
    res.status(500).json({
      status: 'error',
      error: err.message
    });
  }
};