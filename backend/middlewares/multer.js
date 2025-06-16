// middlewares/multer.middleware.js

import multer from 'multer';
import { CloudinaryStorage } from 'multer-storage-cloudinary';
import cloudinary from '../utils/cloudinary.js';

// Configure cloudinary storage for multer
const storage = new CloudinaryStorage({
  cloudinary,
  params: async (req, file) => {
    let folder = 'general';

  // Handle video upload flow
  if (file.fieldname === 'videoFile') {
    folder = 'videos';
  } else if (file.fieldname === 'thumbnailFile') {
    folder = 'thumbnails';
  }
  
  // Handle channel creation flow
  else if (file.fieldname === 'channelAvatar') {
    folder = 'channels/avatars';
  } else if (file.fieldname === 'channelBanner') {
    folder = 'channels/banners';
  }

    return {
      folder: folder,
      resource_type: file.fieldname === 'videoFile' ? 'video' : 'image',
      public_id: `${Date.now()}-${file.originalname}`
    };
  }
});

// Initialize multer with this storage
const upload = multer({ storage });

export default upload;
