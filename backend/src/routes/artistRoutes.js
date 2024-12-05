import { Router } from 'express';
import { 
  getAllArtists, 
  getArtistById, 
  createArtist, 
  updateArtist, 
  deleteArtist,
  deleteArtistImage, 
} from '../controllers/artistsController.js';
// import { authenticateToken } from '../middlewares/authenticateToken.js';
import { artistValidator } from '../validations/artist.Validation.js'; // Import artist-specific validation
import { idValidator } from '../validations/generic.Validation.js'; // Validate IDs
import { uploadFileMiddleware } from '../middlewares/upload.js'; // File upload middleware


const router = Router();


// Routes for managing artists WITH AUTHENTIFICATION
// router.get('/', authenticateToken(['user']), getAllArtists); // Get all artists
// router.get('/:id', authenticateToken(['user', 'mod', 'admin']), idValidator, getArtistById); // Get an artist by ID
// router.post('/', authenticateToken(['user', 'mod', 'admin']), artistValidator, createArtist); // Create an artist
// router.patch('/:id', authenticateToken(['user', 'mod', 'admin']), idValidator, artistValidator, updateArtist); // Update an artist
// router.delete('/:id', authenticateToken(['user', 'mod', 'admin']), idValidator, deleteArtist); // Delete an artist

//Routes for managing artists WITHOUT AUTHENTIFICATION
router.get('/', getAllArtists); // Get all artists
router.get('/:id', idValidator, getArtistById); 
router.post('/', uploadFileMiddleware, artistValidator, createArtist 
);
router.put('/:id', uploadFileMiddleware, (req, res, next) => {
  next();
}, idValidator, artistValidator, updateArtist);
router.delete('/:id', idValidator, deleteArtist); 
router.delete('/:id/file', idValidator, deleteArtistImage); // Ensure this matches the intended endpoint

// router.put('/:id', upload.single('photo'), artistsController.updateArtist);

export default router;


