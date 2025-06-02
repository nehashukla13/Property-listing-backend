import mongoose, { Document, Schema } from 'mongoose';

export interface IProperty extends Document {
  id: string;
  title: string;
  type: string;
  price: number;
  state: string;
  city: string;
  areaSqFt: number;
  bedrooms: number;
  bathrooms: number;
  amenities: string[];
  furnished: boolean;
  availableFrom: Date;
  listedBy: string;
  tags: string[];
  colorTheme: string;
  rating: number;
  isVerified: boolean;
  listingType: string;
  createdBy: mongoose.Types.ObjectId;
}

const propertySchema = new Schema(
  {
    id: {
      type: String,
      required: true,
      unique: true
    },
    title: {
      type: String,
      required: true
    },
    type: {
      type: String,
      required: true
    },
    price: {
      type: Number,
      required: true
    },
    state: {
      type: String,
      required: true
    },
    city: {
      type: String,
      required: true
    },
    areaSqFt: {
      type: Number,
      required: true
    },
    bedrooms: {
      type: Number,
      required: true
    },
    bathrooms: {
      type: Number,
      required: true
    },
    amenities: {
      type: [String],
      default: []
    },
    furnished: {
      type: Boolean,
      default: false
    },
    availableFrom: {
      type: Date,
      required: true
    },
    listedBy: {
      type: String,
      required: true
    },
    tags: {
      type: [String],
      default: []
    },
    colorTheme: {
      type: String,
      default: ''
    },
    rating: {
      type: Number,
      default: 0
    },
    isVerified: {
      type: Boolean,
      default: false
    },
    listingType: {
      type: String,
      required: true
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    }
  },
  { timestamps: true }
);

// Create indexes for faster querying
propertySchema.index({ price: 1 });
propertySchema.index({ state: 1, city: 1 });
propertySchema.index({ bedrooms: 1, bathrooms: 1 });
propertySchema.index({ type: 1 });
propertySchema.index({ createdBy: 1 });

const Property = mongoose.model<IProperty>('Property', propertySchema);

export default Property;