const express = require('express');
const router = express.Router();
const menuController = require('../controllers/menu.controller');
const { validateMenu, validateEditMenu } = require('../middlewares/validator');
const { upload, preventMultipleUploads, markUploadComplete } = require('../config/cloudinary.config');
const { verifyToken } = require('../middlewares/auth.middleware');

router.get('/', menuController.getAllMenu);
router.post('/', 
  verifyToken,
  preventMultipleUploads,
  upload.single('image'),
  markUploadComplete,
  validateMenu,
  menuController.addMenu
);
router.put('/:id',
  verifyToken,
  preventMultipleUploads,
  upload.single('image'),
  markUploadComplete,
  validateEditMenu,
  menuController.editMenu
);
router.delete('/:id', verifyToken, menuController.deleteMenu);

module.exports = router;
