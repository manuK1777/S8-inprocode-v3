import { validationResult } from 'express-validator';
import Event from '../models/eventModel.js';

export const getAllEvents = async (req, res) => {
  try {
    const events = await Event.findAll();
    res.status(200).json({ code: 1, message: 'Events retrieved successfully', data: events });
  } catch (error) {
    console.error('Error fetching events:', error);
    res.status(500).json({ code: 0, message: 'Error fetching events' });
  }
};

export const getEventById = async (req, res) => {
  try {
    const { id } = req.params; // Extract ID from the request params
    console.log("ID:", id);
    
    const event = await Event.findByPk(id); // Fetch the event by primary key

    if (!event) {
      return res.status(404).json({ message: "Event not found" });
    }

    res.status(200).json({ message: "Event retrieved successfully", event });
  } catch (error) {
    console.error("Error fetching event:", error);
    res.status(500).json({ message: "Failed to retrieve event" });
  }
};

export const createEvent = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ code: 0, message: 'Validation errors', errors: errors.array() });
  }

  try {
    const { title, description, start_time, end_time, color } = req.body;

    const newEvent = await Event.create({
      title,
      description,
      start_time,
      end_time,
      color,
    });

    res.status(201).json({ code: 1, message: 'Event created successfully', data: newEvent });
  } catch (error) {
    console.error('Error creating event:', error);
    res.status(500).json({ code: 0, message: 'Error creating event' });
  }
};

export const updateEvent = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ code: 0, message: 'Validation errors', errors: errors.array() });
  }

  try {
    const { id } = req.params;
    const { title, description, start_time, end_time, color } = req.body;

    const event = await Event.findByPk(id);
    if (!event) {
      return res.status(404).json({ code: 0, message: 'Event not found' });
    }

    await event.update({
      title,
      description,
      start_time,
      end_time,
      color,
    });

    res.status(200).json({ code: 1, message: 'Event updated successfully', data: event });
  } catch (error) {
    console.error('Error updating event:', error);
    res.status(500).json({ code: 0, message: 'Error updating event' });
  }
};

export const deleteEvent = async (req, res) => {
  try {
    const { id } = req.params;

    const event = await Event.findByPk(id);
    if (!event) {
      return res.status(404).json({ code: 0, message: 'Event not found' });
    }

    await event.destroy();
    res.status(200).json({ code: 1, message: 'Event deleted successfully' });
  } catch (error) {
    console.error('Error deleting event:', error);
    res.status(500).json({ code: 0, message: 'Error deleting event' });
  }
};
