import { validationResult } from 'express-validator';
import Artist from '../models/artistModel.js'; // Assuming Sequelize model
import fs from 'fs';
import path from 'path';

// Get All Artists
export const getAllArtists = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const artists = await Artist.findAll(); // Using Sequelize to fetch all artists
    const artistsWithPhoto = artists.map((artist) => ({
      ...artist.toJSON(),
      photo: artist.photo || null,
    }));

    res.status(200).json({
      code: 1,
      message: 'Artists List',
      data: artistsWithPhoto,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to retrieve artists' });
  }
};

// Get Artist by ID
export const getArtistById = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { id } = req.params;
    const artist = await Artist.findByPk(id);
    if (!artist) {
      return res.status(404).json({ code: -6, message: 'Artist not found' });
    }

    res.status(200).json({
      code: 1,
      message: 'Artist Detail',
      data: artist,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to retrieve artist' });
  }
};

// Create New Artist
export const createArtist = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { artistName, artistEmail, webPage, contact, phone } = req.body;
    const photo = req.file ? req.file.filename : null;

    const newArtist = await Artist.create({
      artistName,
      artistEmail,
      webPage: webPage || null,
      contact,
      phone,
      photo,
    });

    res.status(201).json({
      code: 1,
      message: 'Artist Added Successfully',
      data: newArtist,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to create artist' });
  }
};

// Update Existing Artist
export const updateArtist = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { id } = req.params;
    const { artistName, artistEmail, webPage, contact, phone } = req.body;
    const photo = req.file ? req.file.filename : null;

    const artist = await Artist.findByPk(id);
    if (!artist) {
      return res.status(404).json({ code: -3, message: 'Artist not found' });
    }

    artist.artistName = artistName || artist.artistName;
    artist.artistEmail = artistEmail || artist.artistEmail;
    artist.webPage = webPage || artist.webPage;
    artist.contact = contact || artist.contact;
    artist.phone = phone || artist.phone;
    if (photo) artist.photo = photo;

    await artist.save();

    res.status(200).json({
      code: 1,
      message: 'Artist Updated Successfully',
      data: artist,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to update artist' });
  }
};

// Delete Artist
export const deleteArtist = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { id } = req.params;
    const artist = await Artist.findByPk(id);
    if (!artist) {
      return res.status(404).json({ code: -3, message: 'Artist not found' });
    }

    // Remove associated photo if exists
    if (artist.photo) {
      const photoPath = path.join(__dirname, '../uploads', artist.photo);
      if (fs.existsSync(photoPath)) {
        fs.unlinkSync(photoPath);
      }
    }

    await artist.destroy();

    res.status(200).json({
      code: 1,
      message: 'Artist Deleted Successfully',
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to delete artist' });
  }
};

// Delete Artist Image
export const deleteArtistImage = async (req, res) => {
  try {
    const { id } = req.params;

    const artist = await Artist.findByPk(id);
    if (!artist) {
      return res.status(404).json({ code: -3, message: 'Artist not found' });
    }

    // Remove photo from disk if exists
    if (artist.photo) {
      const photoPath = path.join(__dirname, '../uploads', artist.photo);
      if (fs.existsSync(photoPath)) {
        fs.unlinkSync(photoPath);
      }
    }

    // Update artist to remove photo reference
    artist.photo = null;
    await artist.save();

    res.status(200).json({
      code: 1,
      message: 'Photo deleted successfully',
    });
  } catch (error) {
    console.error('Error deleting photo:', error);
    res.status(500).json({ error: 'Failed to delete photo' });
  }
};



