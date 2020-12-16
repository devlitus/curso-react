/*
  Rutas events
  host + /api/events
*/
const { Router } = require('express');
const { check } = require('express-validator');
const {validatJWT} = require('../middlewares/validat-jwt');
const { validateFiles } = require('../middlewares/files-validator');
const {getEvent, createEvent, updateEvent, deleteEvent} = require('../controllers/events');
const router = Router();

router.use(validatJWT);
router.get('/', getEvent);
router.post(
  '/',
  [
    check('title', 'El campo es obligatorio').not().isEmpty(),
    check('start', 'El campo es obligatorio').isDate({format: 'DD/MM/YYYY'}),
    check('end', 'El campo es obligatorio').isDate({format: 'DD/MM/YYYY'}),
    validateFiles
  ],
  createEvent);
router.put('/:id', updateEvent);
router.delete('/:id', deleteEvent);
module.exports = router;