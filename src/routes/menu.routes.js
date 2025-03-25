const express = require('express');
const router = express.Router();
const menuController = require('../controllers/menu.controller');
const { validateMenu } = require('../middlewares/validator');

router.get('/', menuController.getAllMenu);
// router.get('/menu/:id');
router.post('/', validateMenu, menuController.addMenu);
router.put('/:id', validateMenu, menuController.editMenu);
// router.delete('/menu/:id');

module.exports = router;
