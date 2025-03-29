const express = require('express');
const router = express.Router();
const menuController = require('../controllers/menu.controller');
const { validateMenu, validateEditMenu } = require('../middlewares/validator');
const { upload } = require('../config/storage.config');

router.get('/', menuController.getAllMenu);
router.post('/', upload.single('image'), validateMenu, menuController.addMenu);
router.put('/:id', upload.single('image'), validateEditMenu, menuController.editMenu);
router.delete('/:id', menuController.deleteMenu);

module.exports = router;
