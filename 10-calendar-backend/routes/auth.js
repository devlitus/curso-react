/*
  Rutas de Usuarios / auth
  host + /api/auth
*/
const { Router } = require('express');
const { check } = require('express-validator');
const { validateFiles } = require('../middlewares/files-validator');
const { createUser, loginUser, revalidatToken } = require('../controllers/auth');
const router = Router();

router.post(
  '/',
  [
    check('email', 'El campo es obligatorio').isEmail(),
    check('password', 'El campo es obligatorio').isLength({ min: 6 }),
    validateFiles,
  ],
  loginUser);
router.post(
  '/register',
  [
    check('name', 'El campo es obligatorio').not().isEmpty(),
    check('email', 'El campo es obligatorio').isEmail(),
    check('password', 'El campo es obligatorio').isLength({ min: 6 }),
    validateFiles,
  ],
  createUser);
router.get('/renew', revalidatToken);


module.exports = router;