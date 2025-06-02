import mongoose, { Document, Schema } from 'mongoose';

export interface IRecommendation extends Document {
  from: mongoose.Types.ObjectId;
  to: mongoose.Types.ObjectId;
  property: mongoose.Types.ObjectId;
  message: string;
  isRead: boolean;
}

const recommendationSchema = new Schema(
  {
    from: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    to: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    property: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Property',
      required: true
    },
    message: {
      type: String,
      default: ''
    },
    isRead: {
      type: Boolean,
      default: false
    }
  },
  { timestamps: true }
);

const Recommendation = mongoose.model<IRecommendation>('Recommendation', recommendationSchema);

export default Recommendation;