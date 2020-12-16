const {respose: response} = require('express');
const jwt = require('jsonwebtoken');

const validatJWT = (req, res = response, next) => {
  const token = req.header('x-token');
  if(!token) {
    return res.status(401).json({
      ok: false,
      msg: 'no hay token'
    })
  }
  try {
    const {uid, name} = jwt.verify(token, process.env.SECRET_JWT_SEED);
    req.uid = uid;
    req.name = name;
  } catch (error) {
    console.log(error);
    return res.status(401).json({
      ok: false,
      msg: 'token no válido',
    })
  }
  next()
}


module.exports ={validatJWT}