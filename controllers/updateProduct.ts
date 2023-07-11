import { Request, Response } from 'express';
import Product, { ProductDocument } from '../models/product';

export const updateProduct = async (req: Request, res: Response): Promise<Response> => {
   const id: string = req.params.id;
   const productData: ProductDocument = req.body;
   try {
      await Product.findByIdAndUpdate(id, productData);
      return res.status(200).json({ result: 'Changes executed successfully' });
   } catch (error) {
      console.log(error);
      res.status(500).json({ error: `Internal Server Error when update product` });
   }
};
