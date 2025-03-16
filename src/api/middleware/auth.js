const jwt = require('jsonwebtoken');
const User = require('./../models/users.models');
const { use } = require('../routes/api/users.route');

const checkToken = async (req, res, next) => {

  console.log('Checkeando usuario...')
  
  try {
    //comprobar si el token viene incluido en la cabecera de Authorization
    var header = req.headers['authorization'];
    if (!header) {
      return res.status(401).json({ message: 'Es necesario incluir el token' });
    }
    //Obtenemos el token, eliminando el Bearer    
    const token = header.split(' ')[1];
    let data;
    //recuperar la informacion del usuario asociado al token
    try {
      data = jwt.verify(token, process.env.JWT_API_SECRET);
    } catch (error) {
      return res.status(403).json({ message: `El token es incorrecto ${error}` });
    }

    const user = await User.getById(data.id);
    
    //el usuario no existe
    if (!user) {
      return res.status(403).json({ message: 'El usuario no existe' });
    }
    // enviar el usuario dentro de la request
    req.user = user[0];

    console.log('Usuario logeado..' + req.user.name)
    next();
 
  } catch (error) {
    return res.status(500).json({ message: `Error inesperado ${error}` });
  }

};

const checkOrganizator = async (req, res, next) => {
  if (req.user.role !== 'ADMIN'){
    return res.status(403).json({ message: 'Acceso solo a administradores' });
  }
  next();
};

module.exports = {checkToken, checkOrganizator};
