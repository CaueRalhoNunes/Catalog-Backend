import { Request, Response } from 'express';
import Category, { CategoryDocument } from '../models/category';
import Product from '../models/product';

export const deleteCategory = async (req: Request, res: Response): Promise<Response> => {
   const CategoryId: string = req.params.id;
   try {
      const test: CategoryDocument = await Category.findById(CategoryId);
      if (test) {
         test.products.forEach((id) => {
            Product.findByIdAndUpdate(id, { $unset: { category: CategoryId } }).exec();
         });
      }
      await Category.findByIdAndDelete(CategoryId);
      if (!Category) {
         return res.status(404).json({ error: 'Category not found' });
      }
      return res.status(200).json({ result: 'Category deleted successfully' });
   } catch (error) {
      console.log(error);
      res.status(500).json({ error: `Internal Server Error when deleting Category` });
   }
};
