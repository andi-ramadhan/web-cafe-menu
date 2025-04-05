const { nanoid } = require('nanoid');
const Menu = require('../models/menu.model');
const { cloudinary } = require('../config/cloudinary.config');

exports.addMenu = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        status: 'error',
        message: 'Image is required'
      });
    }

    const { category } = req.body; 
    const menuId = `${category}-${nanoid(5)}`;

    const menuPayload = {
      menuId,
      ...req.body,
      image: req.file.path
    };

    try {
      const menu = await Menu.create(menuPayload);

      return res.status(201).json({
        status: 'success',
        message: 'Menu added successfully',
        data: {
          menuId: menuId,
          name: menu.name,
          description: menu.description,
          price: menu.price,
          image: menu.image
        }
      });
    } catch (dbError) {
      if (req.file?.path) {
        const publicId = `web-cafe-menu/${req.file.filename}`;
        await cloudinary.uploader.destroy(publicId).catch(console.error);
      }
      throw dbError;  
    }
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
      // delete old image if it exists
      const oldPublicId = `web-cafe-menu/${menu.image.split('/').slice(-1)[0].split('.')[0]}`;
      try {
        await cloudinary.uploader.destroy(oldPublicId);
        console.log('Old image deleted from Cloudinary:', oldPublicId);

        req.body.image = req.file.path;
      } catch (cloudinaryErr) {
        console.error('Cloudinary deletion error:', cloudinaryErr);
      }
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
    if (req.file?.path) {
      const publicId = req.file.filename;
      await cloudinary.uploader.destroy(publicId).catch(console.error);
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

    // delete img from cloudinary
    if (menu.image) {
      const publicId = `web-cafe-menu/${menu.image.split('/').slice(-1)[0].split('.')[0]}`;
      try {
        await cloudinary.uploader.destroy(publicId);
        console.log('Image deleted from Cloudinary:', publicId);
      } catch (cloudinaryErr) {
        console.error('Cloudinary deletion error:', cloudinaryErr);
      }
    }

    await menu.deleteOne();

    res.status(200).json({
      status: 'success',
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
      message: err.message
    });
  }
};