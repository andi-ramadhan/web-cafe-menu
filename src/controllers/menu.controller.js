const { nanoid } = require('nanoid');
const Menu = require('../models/menu.model');
const imageService = require('../services/image.service');
const fs = require('fs').promises;

exports.addMenu = async (req, res) => {
  let imageFilename = null;

  try {
    if (!req.file) {
      return res.status(400).json({
        status: 'error',
        message: 'Image is required'
      });
    }

    // comporess img and get filename
    try {
      compressedImage = await imageService.compressImage(req.file);
    } catch (compressionError) {
      return res.status(400).json({
        status: 'error',
        message: `Image processing failed: ${compressionError.message}`
      });
    }

    const { category } = req.body; 
    const menuId = `${category}-${nanoid(5)}`;

    const menuPayload = {
      menuId,
      ...req.body,
      image: compressedImage.webpFilename
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
        menuImage: menu.image
      }
    });
  } catch (err) {
    // If menu creation fails, add both files to cleanup queue
    if (compressedImage) {
      imageService.deleteImage(compressedImage.webpFilename);
    }

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
    const menu = await Menu.findOne({ menuId: id });
    if (!menu) {
      return res.status(404).json({
        status: 'error',
        message: 'Menu not found'
      });
    }

    if (req.file) {
      await imageService.deleteImage(menu.image);

      const imageFilename = await imageService.compressImage(req.file);
      req.body.image = imageFilename;
    }

    const updatedMenu = await Menu.findOneAndUpdate(
      { menuId: id },
      req.body,
      { new: true, runValidators: true }
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
    if (req.file) {
      await imageService.deleteImage(req.file.filename).catch(console.error);
    }

    res.status(500).json({
      status: 'error',
      error: err.message
    });
  }
};

exports.deleteMenu = async (req, res) => {
  const { id } = req.params;

  try {
    const menu = await Menu.findOne({ menuId: id });

    if (!menu) {
      return res.status(404).json({
        status: 'error',
        message: 'Menu not found'
      });
    }

    await imageService.deleteImage(menu.image);
    await menu.deleteOne();

    res.status(200).json({
      stauts: 'success',
      message: 'Menu deleted successfully',
      data: {
        menuId: menu.menuId,
        name: menu.name,
        category: menu.category
      }
    });
  } catch (err) {
    res.status(500).json({
      status: 'error',
      error: err.message
    });
  }
};