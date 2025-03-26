const express = require('express');
const router = express.Router();
const menuController = require('../controllers/menu.controller');
const { validateMenu, validateEditMenu } = require('../middlewares/validator');

router.get('/', menuController.getAllMenu);
router.post('/', validateMenu, menuController.addMenu);
router.put('/:id', validateEditMenu, menuController.editMenu);
router.delete('/:id', menuController.deleteMenu);

module.exports = router;
