import mongoose, { Document, Model } from 'mongoose';

// Define the interface for your document (schema)
interface IGameResult extends Document {
  score: number;
  timestamp: Date;
}

// Define the schema
const gameResultSchema = new mongoose.Schema({
  score: Number,
  timestamp: { type: Date, default: Date.now },
});

// Define the model
const GameResultModel: Model<IGameResult> = mongoose.models.GameResultModel ||
  mongoose.model<IGameResult>('GameResultModel', gameResultSchema);

export default GameResultModel;
