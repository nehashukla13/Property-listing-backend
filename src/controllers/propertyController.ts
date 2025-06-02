import { Request, Response } from 'express';
import Property, { IProperty } from '../models/Property';
// Remove clearCache import

// @desc    Get all properties with filtering
// @route   GET /api/properties
// @access  Public
export const getProperties = async (req: Request, res: Response): Promise<void> => {
  try {
    const {
      type,
      minPrice,
      maxPrice,
      state,
      city,
      minArea,
      maxArea,
      bedrooms,
      bathrooms,
      furnished,
      listingType,
      isVerified,
      tags,
      page = 1,
      limit = 10
    } = req.query;

    // Build filter object
    const filter: any = {};

    if (type) filter.type = type;
    if (state) filter.state = state;
    if (city) filter.city = city;
    if (bedrooms) filter.bedrooms = Number(bedrooms);
    if (bathrooms) filter.bathrooms = Number(bathrooms);
    if (furnished) filter.furnished = furnished === 'true';
    if (listingType) filter.listingType = listingType;
    if (isVerified) filter.isVerified = isVerified === 'true';
    
    // Price range
    if (minPrice || maxPrice) {
      filter.price = {};
      if (minPrice) filter.price.$gte = Number(minPrice);
      if (maxPrice) filter.price.$lte = Number(maxPrice);
    }
    
    // Area range
    if (minArea || maxArea) {
      filter.areaSqFt = {};
      if (minArea) filter.areaSqFt.$gte = Number(minArea);
      if (maxArea) filter.areaSqFt.$lte = Number(maxArea);
    }
    
    // Tags (comma-separated)
    if (tags) {
      const tagArray = (tags as string).split(',');
      filter.tags = { $in: tagArray };
    }

    // Pagination
    const pageNum = Number(page);
    const limitNum = Number(limit);
    const skip = (pageNum - 1) * limitNum;

    const properties = await Property.find(filter)
      .skip(skip)
      .limit(limitNum)
      .sort({ createdAt: -1 });

    const total = await Property.countDocuments(filter);

    res.json({
      properties,
      page: pageNum,
      pages: Math.ceil(total / limitNum),
      total
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Get property by ID
// @route   GET /api/properties/:id
// @access  Public
export const getPropertyById = async (req: Request, res: Response): Promise<void> => {
  try {
    const property = await Property.findById(req.params.id);

    if (property) {
      res.json(property);
    } else {
      res.status(404).json({ message: 'Property not found' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Create a property
// @route   POST /api/properties
// @access  Private
export const createProperty = async (req: Request, res: Response): Promise<void> => {
  try {
    const propertyData = {
      ...req.body,
      createdBy: req.user._id
    };

    const property = await Property.create(propertyData);

    // Remove cache clearing

    res.status(201).json(property);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Update a property
// @route   PUT /api/properties/:id
// @access  Private
export const updateProperty = async (req: Request, res: Response): Promise<void> => {
  try {
    const property = await Property.findById(req.params.id);

    if (!property) {
      res.status(404).json({ message: 'Property not found' });
      return;
    }

    // Check if user is the property creator
    if (property.createdBy.toString() !== req.user._id.toString()) {
      res.status(403).json({ message: 'Not authorized to update this property' });
      return;
    }

    const updatedProperty = await Property.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    // Remove cache clearing

    res.json(updatedProperty);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Delete a property
// @route   DELETE /api/properties/:id
// @access  Private
export const deleteProperty = async (req: Request, res: Response): Promise<void> => {
  try {
    const property = await Property.findById(req.params.id);

    if (!property) {
      res.status(404).json({ message: 'Property not found' });
      return;
    }

    // Check if user is the property creator
    if (property.createdBy.toString() !== req.user._id.toString()) {
      res.status(403).json({ message: 'Not authorized to delete this property' });
      return;
    }

    await Property.findByIdAndDelete(req.params.id);

    // Remove cache clearing

    res.json({ message: 'Property removed' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};