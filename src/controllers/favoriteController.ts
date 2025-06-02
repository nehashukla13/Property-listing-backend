import { Request, Response } from 'express';
import Favorite from '../models/Favorite';
import Property from '../models/Property';

// @desc    Get user's favorite properties
// @route   GET /api/favorites
// @access  Private
export const getFavorites = async (req: Request, res: Response): Promise<void> => {
  try {
    const favorites = await Favorite.find({ user: req.user._id })
      .populate('property');

    res.json(favorites);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Add property to favorites
// @route   POST /api/favorites/:propertyId
// @access  Private
export const addFavorite = async (req: Request, res: Response): Promise<void> => {
  try {
    const propertyId = req.params.propertyId;
    
    // Check if property exists using custom id field
    const property = await Property.findOne({ id: propertyId });
    
    if (!property) {
      res.status(404).json({ message: 'Property not found' });
      return;
    }
    
    // Check if already favorited using property._id
    const existingFavorite = await Favorite.findOne({
      user: req.user._id,
      property: property._id  // Use the MongoDB _id after finding the property
    });
    
    if (existingFavorite) {
      res.status(400).json({ message: 'Property already in favorites' });
      return;
    }
    
    // Create favorite using property._id
    const favorite = await Favorite.create({
      user: req.user._id,
      property: property._id  // Use the MongoDB _id after finding the property
    });
    
    res.status(201).json(favorite);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Remove property from favorites
// @route   DELETE /api/favorites/:propertyId
// @access  Private
export const removeFavorite = async (req: Request, res: Response): Promise<void> => {
  try {
    const propertyId = req.params.propertyId;
    
    // First find the property using custom id
    const property = await Property.findOne({ id: propertyId });
    
    if (!property) {
      res.status(404).json({ message: 'Property not found' });
      return;
    }
    
    // Then find the favorite using property._id
    const favorite = await Favorite.findOne({
      user: req.user._id,
      property: property._id
    });
    
    if (!favorite) {
      res.status(404).json({ message: 'Favorite not found' });
      return;
    }
    
    await Favorite.deleteOne({ _id: favorite._id });
    
    res.json({ message: 'Property removed from favorites' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};