const { response } = require('express');
const bcrypt = require('bcryptjs');
const User = require('../models/User-model');
const { generateJWT } = require('../helpers/jwt');

const loginUser = async (req, res = response) => {
  const { email, password } = req.body;
  try {
    const existUser = await User.findOne({ email });
    if (!existUser) {
      return res.status(400).json({
        ok: false,
        msg: 'El usuario no existe con ese email'
      });
    }
    const validPassword = bcrypt.compareSync(password, existUser.password);
    if (!validPassword) {
      return res.status(400).json({
        ok: false,
        msg: 'Password incorrecto',
      })
    }
    const token = await generateJWT(existUser.id, existUser.name);
    res.status(200).json({
      ok: true,
      uid: existUser.id,
      name: existUser.name,
      token
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: 'Por favor hable con el administrador'
    });
  }
}

const createUser = async (req, res = response) => {
  const { email, password } = req.body;
  try {
    const existUser = await User.findOne({ email });
    if (existUser) {
      return res.status(400).json({
        ok: false,
        msg: 'El usuario ya existe con ese correo'
      })
    }
    const user = new User(req.body);

    const salt = bcrypt.genSaltSync();
    user.password = bcrypt.hashSync(password, salt);
    await user.save();
    const token = await generateJWT(user.id, user.name);
    return res.status(201).json({
      ok: true,
      uid: user.id,
      name: user.name,
      token
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: 'Por favor hable con el administrador'
    });
  }
}

const revalidatToken = async (req, res = response) => {
  const { uid, name } = req;
  const token = await generateJWT(uid, name);
  res.status(200).json({
    ok: true,
    uid,
    name,
    token
  })
}

module.exports = {
  loginUser,
  createUser,
  revalidatToken,
}