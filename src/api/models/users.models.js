const pool = require('../../utils/conexion_db');
const { getById } = require('./events.models');

const User = {
//función para insertar nuevo usuario:
  create: async (user) => {
    const sqlInsert = `INSERT INTO users (name, email, phone, password) VALUES (?,?,?,?)`;
    const [result] = await pool.query(sqlInsert, [user.name, user.email, user.phone, user.password]);

    if (result.affectedRows === 0) {
      return false; // Si no se inserta, se de vuelve flase
    }
    return result.insertId; // Si se hace bien se da el id
  },

  //busqueda de usuario por nombre
  getByName: async (name) => {
    const sqlSelect = 'SELECT * FROM users WHERE name = ? '; //consulta 
    const [result] = await pool.query(sqlSelect,  [name]);
    return result;
  },

  //busqueda de usuario por id
  getById: async (id) => {
    const sqlSelect = 'SELECT * FROM users WHERE id = ?'; //consulta 
    const [result] = await pool.query(sqlSelect, [id]);
    return result;
  }
};

module.exports = User;