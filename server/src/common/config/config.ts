import 'dotenv/config';

export default () => ({
  app: {
    port: Number(process.env.PORT || 8080),
  },

  db: {
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    name: process.env.DB_NAME,
    cert: process.env.MYSQL_CA_CERT,
  },

  cors: {
    origin: process.env.CLIENT_URL?.split(',').map((url) => url.trim()) || [],
  },

  jwtoken: {
    secretKey: process.env.SECRET_KEY,
    expiresIn: process.env.JWT_EXPIRES_IN,
  },
  cloudinary: {
    cloudName: process.env.CLOUD_NAME,
    cloudinary_api_key: process.env.CLOUD_API_KEY,
    cloudinary_api_secret: process.env.CLOUD_API_SECRET,
  },
});
