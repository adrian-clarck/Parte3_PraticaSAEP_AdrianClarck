const express = require('express');
const VeiculoController = require('../controllers/VeiculoController');

const router = express.Router();

router.get('/', (req, res, next) => VeiculoController.listar(req, res).catch(next));
router.get('/:id', (req, res, next) => VeiculoController.buscarPorId(req, res).catch(next));
router.post('/', (req, res, next) => VeiculoController.criar(req, res).catch(next));
router.put('/:id', (req, res, next) => VeiculoController.atualizar(req, res).catch(next));
router.delete('/:id', (req, res, next) => VeiculoController.excluir(req, res).catch(next));

module.exports = router;
