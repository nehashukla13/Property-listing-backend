import { Request, Response } from 'express';
import Recommendation from '../models/Recommendation';
import User from '../models/User';
import Property from '../models/Property';

// @desc    Get recommendations received by user
// @route   GET /api/recommendations
// @access  Private
export const getRecommendations = async (req: Request, res: Response): Promise<void> => {
  try {
    const recommendations = await Recommendation.find({ to: req.user._id })
      .populate('from', 'name email')
      .populate('property')
      .sort({ createdAt: -1 });

    res.json(recommendations);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Recommend a property to another user
// @route   POST /api/recommendations
// @access  Private
export const createRecommendation = async (req: Request, res: Response): Promise<void> => {
  try {
    const { toEmail, propertyId, message } = req.body;

    // Find recipient user
    const toUser = await User.findOne({ email: toEmail });

    if (!toUser) {
      res.status(404).json({ message: 'Recipient user not found' });
      return;
    }

    // Check if property exists
    const property = await Property.findById(propertyId);

    if (!property) {
      res.status(404).json({ message: 'Property not found' });
      return;
    }

    // Create recommendation
    const recommendation: any = await Recommendation.create({
      from: req.user._id,
      to: toUser._id,
      property: propertyId,
      message
    });

    res.status(201).json(recommendation);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};
