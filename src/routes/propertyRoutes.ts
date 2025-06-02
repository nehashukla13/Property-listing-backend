import express from 'express';
import { getProperties, createProperty, updateProperty, deleteProperty } from '../controllers/propertyController';
import { protect } from '../middleware/auth';
// Remove cacheMiddleware import

const router = express.Router();

router.get('/', getProperties); // Remove cacheMiddleware
router.get('/:id', getProperties); // Remove cacheMiddleware
router.post('/', protect, createProperty);
router.put('/:id', protect, updateProperty);
router.delete('/:id', protect, deleteProperty);

export default router;