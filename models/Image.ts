import mongoose, { Document, Schema } from 'mongoose';

export interface ImageDocument extends Document {
   name: string;
   content: Buffer;
}

const imageSchema: Schema<ImageDocument> = new mongoose.Schema({
   name: String,
   content: Buffer,
});

export default mongoose.model('Image', imageSchema);
