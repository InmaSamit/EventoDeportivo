const { json } = require('express');
const pool = require('../../utils/conexion_db');

//metodo para crear un evento
const Event = {

  create: async (eventData) => {    
    const query = 'INSERT INTO events (name, description, date, location, type, organizator) VALUES (?, ?, ?, ?, ?, ?)';    
    const [result] = await pool.query(query, [eventData.name, eventData.description, eventData.date, eventData.location, eventData.type, eventData.organizator]);
    
    if (result.affectedRows === 0) {
      return false; // Si no se inserta, se de vuelve flase
    }
    return result.insertId; // Si se hace bien se da el id
  }, //consulta y ejecucion

  // metodo para obtener todos los eventos
  getAll: async (orderByDate = false, filterType = false, between = false) => {
    console.log('getAll:');
    let query = 'SELECT * FROM events';
    let params = [];
    if(filterType || between){
      query += ' WHERE '
    } 
    if(filterType) {
      query += 'type = ?';
      params.push(filterType);
    }
    if(between) {
      query += ' date BETWEEN ? AND ? ';
      params.push(between.from);
      params.push(between.to);
    }
    if(orderByDate){
      query += ' ORDER BY date DESC'
    }
    console.log(query);
    console.log(JSON.stringify(params));
    return await pool.query(query,params);
  }, //consuta y ejecuccion

  // Método paraver un evento por su ID
  getById: async (eventId) => {
    const query = 'SELECT * FROM events WHERE id = ?';
    return await pool.query(query, [eventId]);
  }, //consulta y ejecución

  // Método para actualizar los datos de un evento
  update: async (eventId, eventData) => {    
    const query = 'UPDATE events SET name = ?, date = ?, location = ?, type = ?,description = ?, organizator = ? WHERE id = ?';       
    const [result] = await pool.query(query, [eventData.name, eventData.date, eventData.location, eventData.type, eventData.description,eventData.organizator,eventId]);
      
    if (result.affectedRows === 0) {
      return false; // Si no se inserta, se de vuelve flase
    }
    return result; // Si se hace bien se da el id
  }, //consulta y ehcucion

  // Método para eliminar un evento por su ID
  delete: async (eventId) => {    
    const query = 'DELETE FROM events WHERE id = ?';    
    const [result] = await pool.query(query, [eventId]);
    if (result.affectedRows === 0) {
      return false; // Si no se inserta, se de vuelve flase
    }
    return result; // Si se hace bien se da el id
  }
};

module.exports = Event;
