const express = require('express');
const UsuarioController = require('../controllers/UsuarioController');

const router = express.Router();

router.post('/', (req, res, next) => {
    UsuarioController.login(req, res).catch(next);
});

module.exports = router;
