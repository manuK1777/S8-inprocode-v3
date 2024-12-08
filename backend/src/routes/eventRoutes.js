import express from 'express';
import { eventValidator } from '../validations/event.Validation.js';
import { validate } from '../middlewares/validate.js'; 
import { idValidator } from '../validations/generic.Validation.js';
import {
  getAllEvents,
  getEventById,
  createEvent,
  updateEvent,
  deleteEvent,
} from '../controllers/eventController.js';

const router = express.Router();

router.get('/', getAllEvents);

router.get('/:id', idValidator, validate, getEventById);

router.post('/', eventValidator, validate, createEvent);

router.put('/:id', eventValidator, validate, updateEvent);

router.delete('/:id', validate, deleteEvent); 

export default router;

