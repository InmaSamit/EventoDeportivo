//controlador
const { body, validationResult } = require('express-validator');
const userModel = require('../models/userModel'); // Pdt importar modelousuario

// Función para crear un usuario
const createUsuario = async (req, res) => {
  // Validación de los datos 
  await body('name').notEmpty().withMessage('El nombre es obligatorio').run(req);
  await body('email').isEmail().withMessage('El correo electrónico no es válido').run(req);
  await body('phone').optional().isMobilePhone().withMessage('El teléfono debe ser válido').run(req);

  // Comprobamos si hay errores em la validación
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    // Intentamos insertar el usuario en la base de datos
    const result = await userModel.insertUser(req.body);
    
    if (!result) {
      return res.status(400).json({ message: 'No se ha insertado' });
    }    
    return res.status(201).json({ userid: result });
  } catch (error) {
    // Si ocurre un error
    return res.status(500).json({ message: 'Error en el servidor', error: error.message });
  }
};

module.exports = { createUsuario };
