import { Request, Response, NextFunction } from 'express';
import Image, { ImageDocument } from '../models/Image';

export const addImage = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
   try {
      const { originalname, buffer } = req.file;
      const newImage: ImageDocument = await Image.create({
         name: originalname,
         content: buffer,
      });
      res.locals.id = newImage.id;
      next();
   } catch (error) {
      console.log(error);
      res.status(500).json({ error: `Internal Server Error when addImage` });
   }
};
