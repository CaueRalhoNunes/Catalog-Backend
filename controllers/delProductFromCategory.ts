import { UpdateWriteOpResult } from 'mongoose';
import Category from '../models/category';
import Product from '../models/product';
import { Request, Response } from 'express';

export const deleteProductFromCategory = async (req: Request, res: Response): Promise<Response> => {
   const productId: string = req.params.id;
   try {
      const updateCategory: UpdateWriteOpResult = await Category.updateOne({ $pull: { products: productId } })
         .where('products')
         .equals(productId);
      if (updateCategory) {
         await Product.findByIdAndUpdate(productId, { $unset: { category: 1 } });
      }
      return res.status(200).json({ result: 'Operation Success' });
   } catch (error) {
      console.log(error);
      res.status(500).json({ error: `Internal Server Error when delete product from category` });
   }
};
