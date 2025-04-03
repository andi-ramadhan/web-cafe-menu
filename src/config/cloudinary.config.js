const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const multer = require('multer');
const config = require('../utils/config');

cloudinary.config({
  cloud_name: config.cloudinary.name,
  api_key: config.cloudinary.api_key,
  api_secret: config.cloudinary.api_secret
});

let uploadInProgress = false;

const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: 'web-cafe-menu',
    allowed_formats: ['jpg', 'jpeg', 'png', 'webp'],
    transformation: [
      { width: 800, height: 800, crop: "limit" },
      { quality: "auto:eco" },
      { fetch_format: "webp" }
    ],
    format: 'webp',
    public_id: (req, file) => {
      const uniqueSuffix = Date.now();
      const filename = file.originalname.split('.')[0];
      return `${filename}-${uniqueSuffix}`;
    }
  }
});

const preventMultipleUploads = (req, res, next) => {
  if (uploadInProgress) {
    return res.status(429).json({
      status: 'error',
      message: 'Another upload is in progress. Please wait'
    });
  }
  uploadInProgress = true;
  next();
};

const markUploadComplete = (req, res, next) => {
  uploadInProgress = false;
  next();
}

const upload = multer({
  storage,
  limits: {
    fileSize: 5 * 1024 * 1024 // 5MB max file size
  }
});

module.exports = {
  upload,
  cloudinary,
  preventMultipleUploads,
  markUploadComplete
};