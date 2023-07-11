import { Request, Response } from 'express';
import Category, { CategoryDocument } from '../models/category';

export const updateCategory = async (req: Request, res: Response): Promise<Response> => {
   const id: string = req.params.id;
   const categoryData: CategoryDocument = req.body;
   try {
      await Category.findByIdAndUpdate(id, categoryData);
      return res.status(200).json({ result: 'Changes executed successfully' });
   } catch (error) {
      console.log(error);
      res.status(500).json({ error: `Internal Server Error when update category` });
   }
};
