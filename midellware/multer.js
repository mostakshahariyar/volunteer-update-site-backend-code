import multer from 'multer';
import { CloudinaryStorage } from 'multer-storage-cloudinary';
import cloudinary from '../utils/cloudnary.js';

const storage = new CloudinaryStorage({
        cloudinary: cloudinary,
        params: {
          folder: 'avatar', // optional, specify the folder in Cloudinary
          allowed_formats: ['jpg', 'png', 'jpeg']
        }
});

export const parser = multer({ storage: storage }).single('avatar');
