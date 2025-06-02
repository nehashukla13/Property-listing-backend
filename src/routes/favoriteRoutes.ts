import express from 'express';
import { getFavorites, addFavorite, removeFavorite } from '../controllers/favoriteController';
import { protect } from '../middleware/auth';
// Remove cacheMiddleware import

const router = express.Router();

router.get('/', protect, getFavorites); // Remove cacheMiddleware
router.post('/:propertyId', protect, addFavorite);
router.delete('/:propertyId', protect, removeFavorite);

export default router;