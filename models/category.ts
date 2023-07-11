import mongoose, { Document, Schema, Types } from 'mongoose';

export interface CategoryDocument extends Document {
   name: string;
   products?: Types.ObjectId[];
}

const categorySchema: Schema<CategoryDocument> = new mongoose.Schema({
   name: { type: String, required: true },
   products: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Product' }],
});

export default mongoose.model('Category', categorySchema);
