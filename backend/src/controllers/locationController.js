import { validationResult } from 'express-validator';
import Location from '../models/locationModel.js';
import Contact from '../models/contactModel.js'; // Assuming related model

// Get All Locations
export const getAllLocations = async (req, res) => {
  try {
    const locations = await Location.findAll({
      include: { model: Contact, as: 'contact' }, // Include associated contacts
    });

    res.status(200).json({
      code: 1,
      message: 'Locations retrieved successfully',
      data: locations,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch locations' });
  }
};

// Get Location by ID
export const getLocationById = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { id } = req.params;
    const location = await Location.findByPk(id, {
      include: { model: Contact, as: 'contact' }, // Include associated contacts
    });

    if (!location) {
      return res.status(404).json({ code: -6, message: 'Location not found' });
    }

    res.status(200).json({
      code: 1,
      message: 'Location detail retrieved successfully',
      data: location,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch location' });
  }
};

// Create New Location
export const createLocation = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { name, category, latitude, longitude, description, contact_id } = req.body;

    const newLocation = await Location.create({
      name,
      category,
      latitude,
      longitude,
      description,
      contact_id: contact_id || null, // Allow optional contact association
    });

    res.status(201).json({
      code: 1,
      message: 'Location created successfully',
      data: newLocation,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to create location' });
  }
};

// Update Existing Location
export const updateLocation = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { id } = req.params;
    const { name, category, latitude, longitude, description, contact_id } = req.body;

    const location = await Location.findByPk(id);
    if (!location) {
      return res.status(404).json({ code: -3, message: 'Location not found' });
    }

    await location.update({
      name: name || location.name,
      category: category || location.category,
      latitude: latitude || location.latitude,
      longitude: longitude || location.longitude,
      description: description || location.description,
      contact_id: contact_id || location.contact_id,
    });

    res.status(200).json({
      code: 1,
      message: 'Location updated successfully',
      data: location,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to update location' });
  }
};

// Delete Location
export const deleteLocation = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { id } = req.params;
    const location = await Location.findByPk(id);

    if (!location) {
      return res.status(404).json({ code: -3, message: 'Location not found' });
    }

    await location.destroy();

    res.status(200).json({
      code: 1,
      message: 'Location deleted successfully',
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to delete location' });
  }
};
