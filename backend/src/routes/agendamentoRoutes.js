const express = require('express');
const AgendamentoController = require('../controllers/AgendamentoController');

const router = express.Router();

router.get('/', (req, res, next) => AgendamentoController.listar(req, res).catch(next));
router.get('/:id', (req, res, next) => AgendamentoController.buscarPorId(req, res).catch(next));
router.post('/', (req, res, next) => AgendamentoController.criar(req, res).catch(next));
router.put('/:id', (req, res, next) => AgendamentoController.atualizar(req, res).catch(next));
router.delete('/:id', (req, res, next) => AgendamentoController.excluir(req, res).catch(next));

module.exports = router;
