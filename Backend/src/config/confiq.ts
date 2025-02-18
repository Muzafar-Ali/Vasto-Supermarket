import dotenv from "dotenv";
dotenv.config();

const config = {
  port: process.env.PORT || 4000,
  environment: process.env.ENV_NODE,
  mongoURI: process.env.MONGO_URI,
  jwtSecret: process.env.JWT_SECRET,
  jwtExpiresIn: process.env.JWT_EXPIRES_IN,
  jwtCookieExpiresIn: process.env.JWT_COOKIE_EXPIRES_IN,
  saltWorkFactor: process.env.SALT,
}

export default config;