import express from 'express';
import { getRecommendations, createRecommendation } from '../controllers/recommendationController';
import { protect } from '../middleware/auth';

const router = express.Router();

router.get('/', protect, getRecommendations);
router.post('/', protect, createRecommendation);

export default router;