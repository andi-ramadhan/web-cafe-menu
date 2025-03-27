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
};

module.exports = config;