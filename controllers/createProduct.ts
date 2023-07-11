import { Request, Response } from 'express';
import Product, { ProductDocument } from '../models/product';
import Category from '../models/category';

interface Query {
   name?: RegExp;
   category?: string;
}

const filterProducts = async (req: Request, res: Response): Promise<Response> => {
   const getPage = req.query.page || 1;
   const getSearch: string = req.query.search as string;
   const getCategory: string = req.query.category as string;
   const convertPageValue: number = +getPage;
   const itemsPerPage: number = 10;
   const calcResult: number = itemsPerPage * convertPageValue - 10;
   let query: Query = {};

   if (getSearch) {
      const regex: RegExp = new RegExp(getSearch, 'i');
      query.name = regex;
   }
   if (getCategory) {
      query.category = getCategory;
   }
   try {
      const showProducts: ProductDocument[] = await Product.find(query).skip(calcResult).limit(itemsPerPage);
      return res.json(showProducts);
   } catch (error) {
      console.log(error);
      return res.status(500).json({ error: 'An error occurred while fetching products.' });
   }
};

const createProductPost = async (req: Request, res: Response): Promise<Response> => {
   const productData: ProductDocument = req.body;
   try {
      const newProduct: ProductDocument = await Product.create(productData);
      const productId: string = newProduct.id;
      await Category.findOneAndUpdate({ $push: { products: productId } });
      await Product.findByIdAndUpdate(newProduct.id, { image: res.locals.id });
      return res.status(200).json(newProduct);
   } catch (error) {
      console.log(error);
      res.status(500).json({ error: `Internal Server Error when creating product` });
   }
};

export { filterProducts, createProductPost };
