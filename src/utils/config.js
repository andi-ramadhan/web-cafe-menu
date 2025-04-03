const config = {
  mongo: {
    host: process.env.MONGO_HOST,
    port: process.env.MONGO_PORT,
    usr: process.env.MONGO_USER,
    pwd: process.env.MONGO_PASSWORD,
    db: process.env.MONGO_DB,
  },
  server: {
    port: process.env.PORT,
  },
  jwt: {
    secret: process.env.JWT_SECRET,
  },
  cloudinary: {
    name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
  }
};

module.exports = config;