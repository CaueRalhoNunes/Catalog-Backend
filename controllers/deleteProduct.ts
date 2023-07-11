import { Request, Response } from 'express';
import Product, { ProductDocument } from '../models/product';
import Category from '../models/category';
import Image from '../models/Image';

export const deleteProduct = async (req: Request, res: Response): Promise<Response> => {
   const productId: string = req.params.id;
   const getProduct: ProductDocument = await Product.findById(productId);
   try {
      if (!getProduct) {
         return res.status(404).json({ error: `Product not found` });
      }
      await Image.findByIdAndDelete(getProduct.image._id);
      await Product.findByIdAndDelete(productId);
      await Category.updateOne({ $pull: { products: productId } });
      return res.status(200).json({ result: 'Product deleted successfully' });
   } catch (error) {
      console.log(error);
      res.status(500).json({ error: `Internal Server Error when deleting product` });
   }
};
