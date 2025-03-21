const express = require('express');
const router = express.Router();
const menuController = require('../controllers/menu.controller');
const menuValidator = require('../middlewares/validator');

router.get('/menu');
router.get('/menu/:id');
router.post('/menu');
router.put('/menu/:id');
router.delete('/menu/:id');

module.exports = router;
