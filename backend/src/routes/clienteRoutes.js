const express = require('express');
const ClienteController = require('../controllers/ClienteController');

const router = express.Router();

router.get('/', (req, res, next) => ClienteController.listar(req, res).catch(next));
router.get('/:id', (req, res, next) => ClienteController.buscarPorId(req, res).catch(next));
router.post('/', (req, res, next) => ClienteController.criar(req, res).catch(next));
router.put('/:id', (req, res, next) => ClienteController.atualizar(req, res).catch(next));
router.delete('/:id', (req, res, next) => ClienteController.excluir(req, res).catch(next));

module.exports = router;
