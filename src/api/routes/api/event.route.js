const express= require('express');
const router = express.Router();
const {checkToken, checkOrganizator} = require('../../middleware/auth');

const eventController = require('./../../controllers/event.controller');

router.post('/', checkToken, checkOrganizator ,eventController.createEvent);  
router.get('/', checkToken, eventController.getAllEvents);  
router.get('/upcoming', checkToken, eventController.getAllEventsOrder);
router.get('/date', checkToken, eventController.getAllEventsInRange);  
router.get('/:eventId', checkToken, eventController.getEventById);  
router.put('/:eventId', checkToken, checkOrganizator, eventController.updateEvent);  
router.delete('/:eventId', checkToken, checkOrganizator, eventController.deleteEvent);  

// Avanzadas



module.exports = router;


