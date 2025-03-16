const { body, query, validationResult } = require('express-validator');
const Event = require('./../models/events.models');

// Controlador para crear un nuevo evento
const createEvent = async (req, res) => {
  
  // Validación de los datos 
  await body('name').notEmpty().withMessage('El nombre es obligatorio').run(req);
  await body('date').isDate().withMessage('La fecha no tiene el formato correcto(YYYY-MM-DD)').run(req);
  await body('description').notEmpty().withMessage('La descripción es obligatoria').run(req);
  await body('location').notEmpty().withMessage('La localización es obligatoria').run(req);
  await body('type').isIn(['Triatlón','Duatlón','Acuatlón','Atletismo','Ciclismo','Natación','Otro']).withMessage('Los tipos de evento pueden ser:(Triatlón,Duatlón,Acuatlón,Atletismo,Ciclismo,Natación,Otro').run(req);
  await body('organizator').notEmpty().withMessage('El organizador es obligatorio').run(req);
  
  // Comprobamos si hay errores em la validación
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const eventData = req.body;  // Los datos del evento vienen del cuerpo de la solicitud
  
  try{
    // para crear el evento
    const result = await Event.create(eventData);

    if (!result) {
      return res.status(400).json({ message: 'No se ha insertado' });
    }    
    return res.status(201).json({ eventid: result });

  } catch (error) {
    // Si ocurre un error
    return res.status(500).json({ message: 'Error en el servidor', error: error.sqlMessage || error });
  }

};

// ver todos los eventos
const getAllEvents = async (req, res) => {
  try {
    let results = null;
    var filterType = req.query.type;
    if(filterType) {
      [results]  = await Event.getAll(false, filterType);
    } else {
      [results]  = await Event.getAll();
    }
   
    return res.status(200).json(results);
  }  catch (error) {
    // Si ocurre un error
    return res.status(500).json({ message: 'Error en el servidor', error: error.message });
  }
};

const getAllEventsOrder= async (req, res) => {
  try {
    const [results] = await Event.getAll(true);
    return res.status(200).json(results);
  }  catch (error) {
    // Si ocurre un error
    return res.status(500).json({ message: 'Error en el servidor', error: error.message });
  }
};

const getAllEventsInRange = async (req, res) => {
  try {
    console.log('getAllEventsInRange');
    await query('from').isDate().withMessage('La fecha from es obligaroria, con el formato correcto(YYYY-MM-DD)').run(req);
    await query('to').isDate().withMessage('La fecha to es obligaroria, con el formato correcto(YYYY-MM-DD)').run(req);
    // Comprobamos si hay errores em la validación
    console.log('getAllEventsInRange');
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const [results] = await Event.getAll(false, false, { from: req.query.from, to: req.query.to});
    return res.status(200).json(results);
  }  catch (error) {
    // Si ocurre un error
    return res.status(500).json({ message: 'Error en el servidor', error: error.message });
  }
};

// Controlador paraver un evento por su ID
const getEventById = async (req, res) => {
  const { eventId } = req.params;  // Obtiene el ID del evento de los parámetros de la URL
  const [results] = await Event.getById(eventId);
  console.log(JSON.stringify(results));
    return res.status(200).json(results);
};

//  para actualizar un evento
const updateEvent = async (req, res) => {
  // Validación de los datos 
  await body('name').notEmpty().withMessage('El nombre es obligatorio').run(req);
  await body('date').isDate().withMessage('La fecha no tiene el formato correcto(YYYY-MM-DD)').run(req);
  await body('description').notEmpty().withMessage('La descripción es obligatoria').run(req);
  await body('location').notEmpty().withMessage('La localización es obligatoria').run(req);
  await body('type').isIn(['Triatlón','Duatlón','Acuatlón','Atletismo','Ciclismo','Natación','Otro']).withMessage('Los tipos de evento pueden ser:(Triatlón,Duatlón,Acuatlón,Atletismo,Ciclismo,Natación,Otro').run(req);
  await body('organizator').notEmpty().withMessage('El organizador es obligatorio').run(req);
  
  // Comprobamos si hay errores em la validación
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const { eventId } = req.params;  // Obtiene el ID del evento de los parámetros de la URL
    const eventData = req.body;  // Los datos del evento vienen del cuerpo de la solicitud
    console.log('modificando '+ eventId);
    // para actualizar el evento
    const result = await Event.update(eventId, eventData);
    if (!result) {
      return res.status(500).json({ message: 'Error al actualizar el evento', error: err });
    }
    return res.status(200).json({ message: 'Evento actualizado exitosamente' });
  } catch (error) {
    // Si ocurre un error
    return res.status(500).json({ message: 'Error en el servidor', error: error.sqlMessage || error });
  }
};

// para eliminar un evento
const deleteEvent = async (req, res) => {
  const { eventId } = req.params;  // Obtiene el ID del evento de los parámetros de la URL
  
  const result = await Event.delete(eventId);
  if (!result) {
    return res.status(500).json({ message: 'Error al eliminar el evento'});
  }

  return res.status(200).json({ message: 'Evento eliminado exitosamente' });
};


module.exports = {createEvent, getAllEvents,getEventById, updateEvent, deleteEvent, getAllEventsOrder, getAllEventsInRange};
