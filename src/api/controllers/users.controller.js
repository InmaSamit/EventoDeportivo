//controlador
const { body, validationResult } = require('express-validator');
const { createToken } = require('../../utils/jwt');
const User = require('../models/users.models');
const bcrypt = require('bcrypt');

// Función para crear un usuario
const register = async (req, res) => {

  // Validación de los datos 
  await body('name').notEmpty().withMessage('El nombre es obligatorio').run(req);
  await body('email').isEmail().withMessage('El correo electrónico no es válido').run(req);
  await body('phone').optional().isMobilePhone().withMessage('El teléfono debe ser válido').run(req);
  await body('password').notEmpty().withMessage('El password es obligatorio').run(req);

  // Comprobamos si hay errores em la validación
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    // Preparamos el usuario a insertar
    const userData = req.body; 
    userData.password = bcrypt.hashSync( userData.password, 10);
    
    // Intentamos insertar el usuario en la base de datos
    const result = await User.create(userData);
    
    if (!result) {
      return res.status(400).json({ message: 'No se ha insertado' });
    }    
    return res.status(201).json({ userid: result });

  } catch (error) {
    // Si ocurre un error
    return res.status(500).json({ message: 'Error en el servidor', error: error.message });
  }
};

// Función para crear un token en base a un usuario registrado
const login = async (req, res) => {

  // Validación de los datos 
  await body('name').notEmpty().withMessage('El nombre es obligatorio').run(req);
  await body('password').notEmpty().withMessage('El password es obligatorio').run(req);
  
  // Comprobamos si hay errores em la validación
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  // Obtenemos el usuario de bbdd
  const result = await User.getByName(req.body.name);
  
  if (result.length < 1) {
    return res.status(403).json({ message: 'No existe un usuario' });
  }    

  const user = result[0];

  // comparar la contraseña que me has enviado con la guardada en la BD
  const isSame = bcrypt.compareSync(req.body.password, user.password);
  
  if(!isSame){
    return res.status(403).json({ message: 'Contraseña incorrecta' });
  }

  //coinciden las contraseña--> se crea el token
  const token = createToken(user);
  res.json({ success: true, token: 'Bearer ' + token });
};

// Función para devolver la info de usuario del token
const getProfile = async (req, res) => {
  return res.status(200).json(req.user);
}

module.exports = { register, login, getProfile};
