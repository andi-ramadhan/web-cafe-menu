const express = require('express');
const router = express.Router();
const menuController = require('../controllers/menu.controller');
const { validateMenu, validateEditMenu } = require('../middlewares/validator');
const { upload, preventMultipleUploads, markUploadComplete } = require('../config/cloudinary.config');

router.get('/', menuController.getAllMenu);
router.post('/',
  preventMultipleUploads,
  upload.single('image'),
  markUploadComplete,
  validateMenu,
  menuController.addMenu
);
router.put('/:id',
  preventMultipleUploads,
  upload.single('image'),
  markUploadComplete,
  validateEditMenu,
  menuController.editMenu
);
router.delete('/:id', menuController.deleteMenu);

module.exports = router;
