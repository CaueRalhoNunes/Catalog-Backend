import mongoose, { Document, Schema, Types } from 'mongoose';

export interface ProductDocument extends Document {
   name: string;
   price: number;
   description: string;
   category: Types.ObjectId;
   image: Types.ObjectId;
}

const productSchema: Schema<ProductDocument> = new mongoose.Schema({
   name: { type: String, required: true },
   price: { type: Number, required: true },
   description: { type: String, required: true },
   category: { type: mongoose.Schema.Types.ObjectId, ref: 'Category' },
   image: { type: mongoose.Schema.Types.ObjectId, ref: 'Image' },
});

export default mongoose.model('Product', productSchema);
