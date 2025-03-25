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
  const { category } = req.body;
  
  try {
    const existingMenu = await Menu.findOne({ menuId: id});

    if (!existingMenu) {
      return res.status(404).json({
        status: 'error',
        message: 'Menu not found'
      });
    }

    //if category is being updated, generate new menuId
    let updateData = { ...req.body };
    if (category && category !== existingMenu.category) {
      updateData.menuId = `${category}-${id.split('-')[1]}`; //keep the same id
    }

    let updatedMenu = await Menu.findOneAndUpdate(
      { menuId: id },
      updateData,
      { new: true }
    );

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
    const findMenu = await Menu.findOne({ menuId: id });

    if (!findMenu) {
      res.status(404).json
    }
  }
};