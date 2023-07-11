import Image, { ImageDocument } from '../models/Image';
import { Request, Response } from 'express';

export const convert = async (req: Request, res: Response): Promise<Response> => {
   try {
      const getImageId: string = req.params.id;
      const { content }: ImageDocument = await Image.findById(getImageId);
      const image: Buffer = Buffer.from(content as any, 'base64');

      res.writeHead(200, {
         'Content-Type': 'image/png',
         'Content-Length': image.length,
      });
      return res.end(image);
   } catch (error) {
      console.error('An error occurred while converting the image:', error);
      return res.status(500).json({ error: 'Internal Server Error' });
   }
};
