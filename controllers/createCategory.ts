import { Request, Response } from 'express';
import Category, { CategoryDocument } from '../models/category';
import Product from '../models/product';

export const createCategory = async (req: Request, res: Response): Promise<Response> => {
   const categoryData: CategoryDocument = req.body;
   try {
      const newCategory: CategoryDocument = await Category.create(categoryData);
      const categoryId: string = newCategory.id;
      newCategory.products.forEach(async (id) => {
         await Product.findByIdAndUpdate(id, { category: categoryId });
      });
      return res.status(200).json(newCategory);
   } catch (error) {
      console.log(error);
      res.status(500).json({ error: `Internal Server Error when creating category` });
   }
};
